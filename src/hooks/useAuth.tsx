
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authService } from "@/services/api";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const loadUser = async () => {
    const token = localStorage.getItem("authToken");
    
    if (!token) {
      setIsLoading(false);
      return;
    }
    
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
    } catch (error) {
      // If token is invalid, clear it
      localStorage.removeItem("authToken");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    loadUser();
  }, []);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("userData", JSON.stringify(response.user));
      setUser(response.user);
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    authService.logout();
    setUser(null);
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
