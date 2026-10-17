import { useState } from "react";
import { useAuth } from "../context/auth/AuthContext";

const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { dispatch } = useAuth();

  const logout = async () => {
    try {
      setIsLoading(true);
      setError("");

      const res = await fetch(`/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        setError(data.message || "Logout failed");
        return { success: false, message: data.message || "Logout failed" };
      }

      dispatch({ type: "LOGOUT" });
      return { success: true };
    } catch (err) {
      setError(err.message || "Something went wrong during logout");
      return { success: false, message: err.message || "Something went wrong during logout" };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    logout,
    isLoading,
    error,
    setError,
  };
};

export default useLogout;
