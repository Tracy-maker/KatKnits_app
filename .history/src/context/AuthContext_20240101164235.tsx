import { getCurrentUser } from "@/lib/appwrite/api";
import { IUser } from "@/types";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams();

  const checkAuthUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [setUser, setIsAuthenticated, getCurrentUser]); 
  

  useEffect(() => {
    async function handleAuthentication() {

      const currentPath = window.location.pathname;
  
      
      if (currentPath.includes("/sign-in") || currentPath.includes("/sign-up") || currentPath.includes("/verify-email")) {
        return;
      }
  
      const cookieFallback = localStorage.getItem("cookieFallback");
    
      if (!cookieFallback || cookieFallback === "[]") {
        navigate("/sign-in");
        return;
      }
    
      if (token) {
        navigate("/reset-password");
        return;
      }
    
      const isAuthenticated = await checkAuthUser();
      if (!isAuthenticated) {
        navigate("/sign-in");
      }
    }
    
    handleAuthentication();
  }, [navigate, token, checkAuthUser]);
  
  

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);