import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      setError("");

      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        const errorMsg = data.message || "Failed to sign in. Please try again.";
        setError(errorMsg);
        dispatch({ type: "LOGOUT" });
        return { success: false, message: errorMsg };
      }

      dispatch({
        type: "LOGIN",
        payload: data.user,
      });

      navigate("/", { replace: true });
      return { success: true, user: data.user };
    } catch (err) {
      const errorMsg = "Network error. Please try again.";
      setError(errorMsg);
      dispatch({ type: "LOGOUT" });
      return { success: false, message: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
    setError,
  };
};

export default useLogin;
