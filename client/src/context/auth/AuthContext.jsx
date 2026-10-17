import { createContext, useContext, useEffect, useReducer } from "react";
import { authReducer } from "./authReducer";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoggedin: false,
    isLoading: true,
  });

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          dispatch({ type: "LOGOUT" });
          return;
        }

        const data = await res.json();
        if (data.user) {
          dispatch({ type: "LOGIN", payload: data.user });
        } else {
          dispatch({ type: "LOGOUT" });
        }
      } catch (error) {
        dispatch({ type: "LOGOUT" });
      }
    };

    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      <div className="flex-1 flex flex-col min-h-screen">
        {children}
      </div>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthContextProvider");
  }
  return context;
};
