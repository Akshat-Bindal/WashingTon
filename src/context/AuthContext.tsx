"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize token from localStorage on mount
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("token");
      if (savedToken) setTokenState(savedToken);
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setToken = (t: string | null) => {
    try {
      if (t) {
        localStorage.setItem("token", t);
      } else {
        localStorage.removeItem("token");
        // Also clear lastPage when logging out
        localStorage.removeItem("lastPage");
      }
      setTokenState(t);
    } catch (error) {
      console.error("Error updating localStorage:", error);
      // Still update state even if localStorage fails
      setTokenState(t);
    }
  };

  return (
    <AuthContext.Provider value={{ token, setToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};