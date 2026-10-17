import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Predefined Joint Orientations for Sign Language (Euler angles in radians: [x, y, z])
const GESTURE_POSES = {
  idle: {
    duration: 1.0,
    RightArm: [-0.3, 0, -0.4],
    RightForeArm: [0.8, 0.4, 0.2],
    RightHand: [0, 0, 0],
    LeftArm: [-0.3, 0, 0.4],
    LeftForeArm: [0.8, -0.4, -0.2],
    LeftHand: [0, 0, 0],
    Head: [0, 0, 0],
    fingers: 'relaxed'
  },
  hello: {
    duration: 1.6,
    phases: [
      {
        t: 0.4,
        RightArm: [-0.8, 0.2, -1.2],
        RightForeArm: [1.8, 0.3, 0.5],
        RightHand: [0.2, -0.4, 0.3],
        Head: [0.05, -0.05, 0],
        fingers: 'open'
      },
      {
        t: 0.7,
        RightArm: [-0.9, 0.4, -1.3],
        RightForeArm: [1.6, 0.6, 0.4],
        RightHand: [0.3, 0.3, -0.2],
        Head: [-0.02, 0.05, 0],
        fingers: 'open'
      },
      {
        t: 1.0,
        RightArm: [-0.8, 0.2, -1.2],
        RightForeArm: [1.8, 0.3, 0.5],
        RightHand: [0.2, -0.3, 0.2],
        Head: [0.03, -0.02, 0],
        fingers: 'open'
      }
    ]
  },
  thank_you: {
    duration: 1.6,
    phases: [
      {
        t: 0.35,
        RightArm: [-0.9, 0.2, -0.5],
        RightForeArm: [2.1, 0.4, 0.2],
        RightHand: [0.3, 0, 0], // Touching chin/lips
        Head: [0.1, 0, 0],
        fingers: 'flat'
      },
      {
        t: 1.0,
        RightArm: [-0.4, 0.1, -0.3],
        RightForeArm: [0.6, 0.1, 0], // Sweeping forward and down toward viewer
        RightHand: [-0.2, 0, 0],
        Head: [-0.05, 0, 0],
        fingers: 'flat'
      }
    ]
  },
  you: {
    duration: 1.4,
    phases: [
      {
        t: 0.4,
        RightArm: [-0.5, 0, -0.2],
        RightForeArm: [0.9, 0.2, 0],
        RightHand: [0, 0, 0],
        Head: [0.05, 0, 0],
        fingers: 'point'
      },
      {
        t: 1.0,
        RightArm: [-0.7, 0, -0.1], // Pointing straight at viewer
        RightForeArm: [0.4, 0, 0],
        RightHand: [0, 0, 0],
        Head: [0.08, 0, 0],
        fingers: 'point'
      }
    ]
  },
  i_or_me: {
    duration: 1.4,
    phases: [
      {
        t: 0.5,
        RightArm: [-0.6, 0.3, -0.2],
        RightForeArm: [1.8, 0.5, 0],
        RightHand: [0.4, 0, 0], // Pointing directly to chest
        Head: [0.1, 0, 0],
        fingers: 'point'
      },
      {
        t: 1.0,
        RightArm: [-0.65, 0.3, -0.2],
        RightForeArm: [1.9, 0.5, 0],
        RightHand: [0.5, 0, 0],
        Head: [0.12, 0, 0],
        fingers: 'point'
      }
    ]
  },
  good: {
    duration: 1.4,
    phases: [
      {
        t: 0.4,
        RightArm: [-0.5, 0, -0.4],
        RightForeArm: [1.3, 0.3, 0],
        RightHand: [0, 0, 0],
        Head: [0.05, 0, 0],
        fingers: 'thumbs_up'
      },
      {
        t: 1.0,
        RightArm: [-0.6, 0, -0.3], // Nod thumbs up forward
        RightForeArm: [1.1, 0.2, 0],
        RightHand: [-0.2, 0, 0],
        Head: [0.1, 0, 0],
        fingers: 'thumbs_up'
      }
    ]
  },
  study: {
    duration: 1.8,
    phases: [
      {
        t: 0.3,
        LeftArm: [-0.4, 0, 0.4],
        LeftForeArm: [1.4, -0.8, -0.2], // Left hand flat like open book
        LeftHand: [0.2, 0, 0],
        RightArm: [-0.6, 0.2, -0.4],
        RightForeArm: [1.6, 0.6, 0.2],
        RightHand: [0.2, 0, 0],
        Head: [0.15, 0, 0],
        fingers: 'open'
      },
      {
        t: 0.6,
        RightArm: [-0.8, 0.3, -0.5], // Right hand fingers sweep towards eyes
        RightForeArm: [1.9, 0.4, 0.3],
        RightHand: [0.4, 0, 0],
        Head: [0.05, 0, 0],
        fingers: 'open'
      },
      {
        t: 1.0,
        RightArm: [-0.6, 0.2, -0.4],
        RightForeArm: [1.6, 0.6, 0.2],
        RightHand: [0.2, 0, 0],
        Head: [0.15, 0, 0],
        fingers: 'open'
      }
    ]
  },
  help: {
    duration: 1.6,
    phases: [
      {
        t: 0.4,
        LeftArm: [-0.5, 0, 0.3],
        LeftForeArm: [1.3, -0.7, -0.1], // Left hand supporting base
        RightArm: [-0.5, 0, -0.3],
        RightForeArm: [1.3, 0.5, 0.1], // Right hand fist on palm
        RightHand: [0, 0, 0],
        Head: [0.05, 0, 0],
        fingers: 'thumbs_up'
      },
      {
        t: 1.0,
        LeftArm: [-0.7, 0, 0.3],
        LeftForeArm: [1.1, -0.7, -0.1], // Both hands lift upward together
        RightArm: [-0.7, 0, -0.3],
        RightForeArm: [1.1, 0.5, 0.1],
        RightHand: [0, 0, 0],
        Head: [0.08, 0, 0],
        fingers: 'thumbs_up'
      }
    ]
  },
  quiet: {
    duration: 1.5,
    phases: [
      {
        t: 0.5,
        RightArm: [-0.8, 0.2, -0.3],
        RightForeArm: [2.0, 0.3, 0],
        RightHand: [0.2, 0, 0], // Finger vertically on lips
        Head: [0.05, 0, 0],
        fingers: 'point'
      },
      {
        t: 1.0,
        RightArm: [-0.85, 0.2, -0.3],
        RightForeArm: [2.05, 0.3, 0],
        RightHand: [0.25, 0, 0],
        Head: [0.02, 0, 0],
        fingers: 'point'
      }
    ]
  },
  again: {
    duration: 1.6,
    phases: [
      {
        t: 0.3,
        LeftArm: [-0.5, 0, 0.4],
        LeftForeArm: [1.3, -0.6, -0.2],
        RightArm: [-0.7, 0.3, -0.5],
        RightForeArm: [1.7, 0.6, 0.3],
        RightHand: [0.3, 0, 0],
        Head: [0.1, 0, 0],
        fingers: 'flat'
      },
      {
        t: 0.8,
        LeftArm: [-0.5, 0, 0.4],
        LeftForeArm: [1.3, -0.6, -0.2],
        RightArm: [-0.5, 0.1, -0.3],
        RightForeArm: [1.2, 0.2, 0],
        RightHand: [0.1, 0, 0],
        Head: [0.12, 0, 0],
        fingers: 'flat'
      }
    ]
  },
  yes: {
    duration: 1.4,
    phases: [
      { t: 0.3, RightArm: [-0.6, 0, -0.3], RightForeArm: [1.2, 0.3, 0], RightHand: [0.4, 0, 0], Head: [0.1, 0, 0], fingers: 'fist' },
      { t: 0.6, RightArm: [-0.6, 0, -0.3], RightForeArm: [1.2, 0.3, 0], RightHand: [-0.2, 0, 0], Head: [-0.05, 0, 0], fingers: 'fist' },
      { t: 0.9, RightArm: [-0.6, 0, -0.3], RightForeArm: [1.2, 0.3, 0], RightHand: [0.4, 0, 0], Head: [0.1, 0, 0], fingers: 'fist' }
    ]
  },
  no: {
    duration: 1.4,
    phases: [
      { t: 0.3, RightArm: [-0.6, 0, -0.3], RightForeArm: [1.1, 0.2, 0], RightHand: [0, 0.3, 0], Head: [0, 0.15, 0], fingers: 'pinch' },
      { t: 0.6, RightArm: [-0.6, 0, -0.3], RightForeArm: [1.1, 0.2, 0], RightHand: [0, -0.3, 0], Head: [0, -0.15, 0], fingers: 'pinch' },
      { t: 0.9, RightArm: [-0.6, 0, -0.3], RightForeArm: [1.1, 0.2, 0], RightHand: [0, 0.3, 0], Head: [0, 0.15, 0], fingers: 'pinch' }
    ]
  },
  bye: {
    duration: 1.6,
    phases: [
      { t: 0.3, RightArm: [-0.8, 0, -1.0], RightForeArm: [1.5, 0.3, 0.4], RightHand: [0, 0.4, 0], Head: [0, 0, 0], fingers: 'open' },
      { t: 0.6, RightArm: [-0.8, 0, -1.0], RightForeArm: [1.5, 0.3, 0.4], RightHand: [0, -0.4, 0], Head: [0, 0, 0], fingers: 'open' },
      { t: 0.9, RightArm: [-0.8, 0, -1.0], RightForeArm: [1.5, 0.3, 0.4], RightHand: [0, 0.4, 0], Head: [0, 0, 0], fingers: 'open' }
    ]
  }
};

export const SignAvatar3D = ({
  activeGesture = 'idle',
  isPlaying = true,
  speed = 1.0,
  onGestureComplete
}) => {
  const mountRef = useRef(null);
  const [modelType, setModelType] = useState('procedural'); // 'readyplayerme' or 'procedural'
  const bonesRef = useRef({});
  const fingersRef = useRef({ left: [], right: [] });
  const animTimeRef = useRef(0);
  const currentPoseRef = useRef(GESTURE_POSES.idle);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const width = container.clientWidth || 640;
    const height = container.clientHeight || 480;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0c10);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 20);
    // Upper body camera focus (chest to head framing)
    camera.position.set(0, 1.45, 1.85);
    camera.lookAt(0, 1.35, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup (Modern Studio Lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5e6, 2.0);
    keyLight.position.set(2, 3, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x00e5ff, 2.5);
    rimLight.position.set(-2, 2.5, -2);
    scene.add(rimLight);

    const warmFill = new THREE.DirectionalLight(0xffaa44, 1.0);
    warmFill.position.set(0, -1, 2);
    scene.add(warmFill);

    // 3. Avatar Load & Procedural Rig Setup
    const bones = {};
    const fingerJoints = { left: [], right: [] };

    // Function to build procedural 3D mannequin
    const createProceduralMannequin = () => {
      const mannequinGroup = new THREE.Group();
      mannequinGroup.name = 'ProceduralMannequin';

      const skinMat = new THREE.MeshStandardMaterial({
        color: 0x1e2430,
        roughness: 0.4,
        metalness: 0.2
      });
      const jointMat = new THREE.MeshStandardMaterial({
        color: 0x00e5ff,
        emissive: 0x005577,
        roughness: 0.2,
        metalness: 0.8
      });
      const handMat = new THREE.MeshStandardMaterial({
        color: 0x283142,
        roughness: 0.3,
        metalness: 0.3
      });
      const glowMat = new THREE.MeshStandardMaterial({
        color: 0xffe600,
        emissive: 0x887700,
        roughness: 0.1
      });

      // Spine & Torso
      const spine = new THREE.Group();
      spine.position.set(0, 1.0, 0);
      mannequinGroup.add(spine);
      bones['Spine'] = spine;

      const chestGeo = new THREE.CylinderGeometry(0.22, 0.18, 0.45, 16);
      const chestMesh = new THREE.Mesh(chestGeo, skinMat);
      chestMesh.position.y = 0.22;
      spine.add(chestMesh);

      // Neck & Head
      const neck = new THREE.Group();
      neck.position.set(0, 0.45, 0);
      spine.add(neck);
      bones['Neck'] = neck;

      const head = new THREE.Group();
      head.position.set(0, 0.12, 0);
      neck.add(head);
      bones['Head'] = head;

      const headGeo = new THREE.SphereGeometry(0.12, 24, 24);
      headGeo.scale(1, 1.25, 1.1);
      const headMesh = new THREE.Mesh(headGeo, skinMat);
      head.add(headMesh);

      // Stylized glowing visor on head
      const visorGeo = new THREE.BoxGeometry(0.16, 0.04, 0.1);
      const visorMesh = new THREE.Mesh(visorGeo, jointMat);
      visorMesh.position.set(0, 0.02, 0.09);
      head.add(visorMesh);

      // Function to build one arm hierarchy
      const buildArm = (side) => {
        const isRight = side === 'Right';
        const sign = isRight ? 1 : -1;

        const shoulder = new THREE.Group();
        shoulder.position.set(sign * 0.24, 0.4, 0);
        spine.add(shoulder);
        bones[`${side}Shoulder`] = shoulder;

        const shoulderJoint = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), jointMat);
        shoulder.add(shoulderJoint);

        const upperArm = new THREE.Group();
        shoulder.add(upperArm);
        bones[`${side}Arm`] = upperArm;

        const armMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.04, 0.28, 12), skinMat);
        armMesh.position.y = -0.14;
        upperArm.add(armMesh);

        const elbow = new THREE.Group();
        elbow.position.set(0, -0.28, 0);
        upperArm.add(elbow);
        bones[`${side}ForeArm`] = elbow;

        const elbowJoint = new THREE.Mesh(new THREE.SphereGeometry(0.042, 16, 16), jointMat);
        elbow.add(elbowJoint);

        const forearmMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.032, 0.26, 12), skinMat);
        forearmMesh.position.y = -0.13;
        elbow.add(forearmMesh);

        const hand = new THREE.Group();
        hand.position.set(0, -0.26, 0);
        elbow.add(hand);
        bones[`${side}Hand`] = hand;

        // Palm
        const palmMesh = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.08, 0.025), handMat);
        palmMesh.position.y = -0.04;
        hand.add(palmMesh);

        // Articulating Fingers (Thumb, Index, Middle, Ring, Pinky)
        const sideKey = isRight ? 'right' : 'left';
        const fingerOffsets = [
          { name: 'Thumb', x: sign * 0.04, y: -0.02, len: 0.04 },
          { name: 'Index', x: sign * 0.025, y: -0.08, len: 0.05 },
          { name: 'Middle', x: sign * 0.008, y: -0.085, len: 0.055 },
          { name: 'Ring', x: -sign * 0.012, y: -0.08, len: 0.05 },
          { name: 'Pinky', x: -sign * 0.028, y: -0.075, len: 0.042 }
        ];

        fingerOffsets.forEach((f) => {
          const baseJoint = new THREE.Group();
          baseJoint.position.set(f.x, f.y, 0);
          hand.add(baseJoint);

          const fingerMesh = new THREE.Mesh(
            new THREE.CylinderGeometry(0.009, 0.007, f.len, 8),
            f.name === 'Index' ? glowMat : jointMat
          );
          fingerMesh.position.y = -f.len / 2;
          baseJoint.add(fingerMesh);

          fingerJoints[sideKey].push({ name: f.name, joint: baseJoint });
        });
      };

      buildArm('Right');
      buildArm('Left');

      scene.add(mannequinGroup);
      setModelType('procedural');
    };

    // 4. Try loading Ready Player Me / external .glb model first
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      '/models/avatar.glb',
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(1.0, 1.0, 1.0);
        model.position.set(0, 0, 0);

        // Map ReadyPlayerMe standard bones
        model.traverse((node) => {
          if (node.isBone) {
            bones[node.name] = node;
          }
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });

        scene.add(model);
        setModelType('readyplayerme');
        console.log('✅ 3D Avatar: Loaded ReadyPlayerMe glTF avatar');
      },
      undefined,
      (error) => {
        // Fallback gracefully to procedural mannequin
        console.log('ℹ️ 3D Avatar: No /models/avatar.glb found, using procedural 3D mannequin.');
        createProceduralMannequin();
      }
    );

    bonesRef.current = bones;
    fingersRef.current = fingerJoints;

    // 5. Render Loop with LERP Bone Smoothing
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      if (isPlaying) {
        animTimeRef.current += delta * speed;
      }

      const activeKey = GESTURE_POSES[activeGesture] ? activeGesture : 'idle';
      const gestureData = GESTURE_POSES[activeKey] || GESTURE_POSES.idle;
      const duration = gestureData.duration || 1.5;
      const loopTime = animTimeRef.current % duration;
      const progress = loopTime / duration;

      // Determine target pose from keyframe phases
      let targetPose = gestureData;
      if (gestureData.phases && gestureData.phases.length > 0) {
        let phase = gestureData.phases[0];
        for (const p of gestureData.phases) {
          if (progress >= p.t) {
            phase = p;
          }
        }
        targetPose = phase;
      }

      // Idle subtle breathing sine wave
      const breath = Math.sin(animTimeRef.current * 1.5) * 0.03;
      if (bones['Spine']) {
        bones['Spine'].rotation.x = THREE.MathUtils.lerp(bones['Spine'].rotation.x, breath, 0.1);
      }

      // LERP joint rotations toward target pose
      const boneKeys = ['RightArm', 'RightForeArm', 'RightHand', 'LeftArm', 'LeftForeArm', 'LeftHand', 'Head'];
      boneKeys.forEach((key) => {
        const bone = bones[key];
        const targetRot = targetPose[key] || GESTURE_POSES.idle[key];
        if (bone && targetRot) {
          bone.rotation.x = THREE.MathUtils.lerp(bone.rotation.x, targetRot[0], 0.12);
          bone.rotation.y = THREE.MathUtils.lerp(bone.rotation.y, targetRot[1], 0.12);
          bone.rotation.z = THREE.MathUtils.lerp(bone.rotation.z, targetRot[2], 0.12);
        }
      });

      // Finger articulation based on finger state
      const fingerState = targetPose.fingers || 'relaxed';
      ['right', 'left'].forEach((side) => {
        const fList = fingersRef.current[side] || [];
        fList.forEach((f) => {
          let curl = 0.2;
          if (fingerState === 'open') curl = 0.05;
          if (fingerState === 'fist') curl = 1.3;
          if (fingerState === 'point') curl = f.name === 'Index' ? 0.0 : 1.4;
          if (fingerState === 'thumbs_up') curl = f.name === 'Thumb' ? -0.4 : 1.4;
          if (fingerState === 'pinch') curl = f.name === 'Thumb' || f.name === 'Index' ? 0.8 : 0.1;
          if (fingerState === 'flat') curl = 0.0;

          f.joint.rotation.x = THREE.MathUtils.lerp(f.joint.rotation.x, curl, 0.15);
        });
      });

      renderer.render(scene, camera);
    };

    animate();

    // 6. Resize listener
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[360px] flex items-center justify-center overflow-hidden rounded-2xl bg-[#090b0e]">
      <div ref={mountRef} className="w-full h-full absolute inset-0" />
      
      {/* 3D Model Status Badge */}
      <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-[10px] font-mono font-semibold text-cyan-300 border border-cyan-500/20 backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>{modelType === 'readyplayerme' ? 'ReadyPlayerMe 3D Model' : 'Three.js 3D Avatar (Active)'}</span>
      </div>
    </div>
  );
};

export default SignAvatar3D;
