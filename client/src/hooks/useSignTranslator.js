import { useState, useEffect, useRef, useCallback } from 'react';

export const useSignTranslator = ({ onNewGesture } = {}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [currentGesture, setCurrentGesture] = useState('Waiting...');
  const [confidence, setConfidence] = useState(0);
  const [history, setHistory] = useState([]);
  const [fps, setFps] = useState(0);
  const [landmarks, setLandmarks] = useState(null);
  const [cameraError, setCameraError] = useState(null);

  const socketRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(document.createElement('canvas'));
  const intervalRef = useRef(null);
  const isProcessingRef = useRef(false);
  const frameCountRef = useRef(0);
  const lastFpsTimeRef = useRef(Date.now());
  const sessionIdRef = useRef(`session_${Math.random().toString(36).substring(2, 9)}`);

  // 1. Initialize WebSocket Connection
  const connectSocket = useCallback(() => {
    if (socketRef.current && (socketRef.current.readyState === WebSocket.OPEN || socketRef.current.readyState === WebSocket.CONNECTING)) {
      return;
    }

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws/sign-translator/${sessionIdRef.current}`;

    try {
      const ws = new WebSocket(wsUrl);
      ws.binaryType = 'arraybuffer';

      ws.onopen = () => {
        setIsConnected(true);
        console.log('✅ Sign Translator WebSocket connected');
      };

      ws.onmessage = (event) => {
        isProcessingRef.current = false;
        try {
          const data = JSON.parse(event.data);
          if (data.gesture) {
            setCurrentGesture(data.gesture);
            setConfidence(data.confidence || 0);

            if (data.landmarks) {
              setLandmarks(data.landmarks);
            }

            if (data.is_new && data.gesture !== 'Idle' && data.gesture !== 'Waiting...') {
              if (onNewGesture) {
                onNewGesture(data.gesture);
              }
              setHistory((prev) => [data.gesture, ...prev.slice(0, 15)]);
            }
          }
        } catch (e) {
          // ignore non-json
        }
      };

      ws.onerror = (err) => {
        console.warn('WebSocket connection error:', err);
      };

      ws.onclose = () => {
        setIsConnected(false);
        console.log('Sign Translator WebSocket disconnected');
      };

      socketRef.current = ws;
    } catch (err) {
      console.error('Failed to create WebSocket:', err);
    }
  }, [onNewGesture]);

  // 2. Start Camera & Frame Capture
  const startCamera = useCallback(async (videoElement) => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        },
        audio: false
      });

      if (videoElement) {
        videoElement.srcObject = stream;
        videoRef.current = videoElement;
        await videoElement.play();
      }

      setIsCameraActive(true);
      connectSocket();

      // Configure capture canvas (downsample to 480x360 for high FPS & low CPU)
      const captureCanvas = canvasRef.current;
      captureCanvas.width = 480;
      captureCanvas.height = 360;
      const ctx = captureCanvas.getContext('2d', { alpha: false });

      // Frame sender loop: ~30 FPS (every 33ms) matching RTSLR dynamic LSTM 30-frame sequence rate
      intervalRef.current = setInterval(() => {
        const ws = socketRef.current;
        const vid = videoRef.current;

        if (!ws || ws.readyState !== WebSocket.OPEN || !vid || vid.readyState < 2) {
          return;
        }

        // Avoid buffer queue buildup: drop frame if previous frame is still processing
        if (isProcessingRef.current) {
          return;
        }

        isProcessingRef.current = true;
        ctx.drawImage(vid, 0, 0, captureCanvas.width, captureCanvas.height);

        captureCanvas.toBlob(
          (blob) => {
            if (blob && ws.readyState === WebSocket.OPEN) {
              ws.send(blob);

              // FPS telemetry
              frameCountRef.current += 1;
              const now = Date.now();
              if (now - lastFpsTimeRef.current >= 1000) {
                setFps(frameCountRef.current);
                frameCountRef.current = 0;
                lastFpsTimeRef.current = now;
              }
            } else {
              isProcessingRef.current = false;
            }
          },
          'image/jpeg',
          0.65 // 65% JPEG quality ensures clean hand features with minimal bandwidth
        );
      }, 33);
    } catch (err) {
      console.error('Webcam access error:', err);
      setCameraError(err.name === 'NotAllowedError' ? 'Camera permission was denied' : 'Could not access webcam');
      setIsCameraActive(false);
    }
  }, [connectSocket]);

  // 3. Stop Camera & Streaming
  const stopCamera = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    setIsCameraActive(false);
    isProcessingRef.current = false;
    setLandmarks(null);
    setFps(0);
  }, []);

  // 4. Reset Server Session Buffer
  const resetSession = useCallback(() => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ action: 'reset' }));
    }
    setCurrentGesture('Waiting...');
    setConfidence(0);
    setHistory([]);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [stopCamera]);

  return {
    isConnected,
    isCameraActive,
    currentGesture,
    confidence,
    history,
    fps,
    landmarks,
    cameraError,
    startCamera,
    stopCamera,
    resetSession,
    connectSocket
  };
};
