import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const signup = async (userData) => {
    try {
      setIsLoading(true);
      setError("");

      const res = await fetch(`/api/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        const errorMsg = data.message || "Failed to create account. Please try again.";
        setError(errorMsg);
        dispatch({ type: "LOGOUT" });
        return { success: false, message: errorMsg };
      }

      dispatch({
        type: "LOGIN",
        payload: data.user,
      });

      navigate("/app", { replace: true });
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
    signup,
    isLoading,
    error,
    setError,
  };
};

export default useSignup;
