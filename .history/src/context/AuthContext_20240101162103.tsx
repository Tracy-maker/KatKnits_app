import { getCurrentUser } from "@/lib/appwrite/api";
import { IUser } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
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

  const checkAuthUser = async () => {
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
  };

  useEffect(() => {
    async function handleNavigation() {
      setIsLoading(true);
  
      // 检查 localStorage 中的 cookieFallback
      const cookieFallback = localStorage.getItem("cookieFallback");
      if (!cookieFallback || cookieFallback === "[]") {
        setIsLoading(false);
        navigate("/sign-in");
        return; // 如果 cookieFallback 不存在或为空，重定向到登录页面并结束函数
      }
  
      // 检查 URL 中的 token
      if (token) {
        setIsLoading(false);
        navigate("/reset-password");
        return; // 如果存在 token，重定向到重置密码页面并结束函数
      }
  
      // 检查用户认证状态
      try {
        const isAuthenticated = await checkAuthUser();
        if (!isAuthenticated) {
          navigate("/sign-in");
        }
      } catch (error) {
        console.error(error);
        navigate("/sign-in");
      } finally {
        setIsLoading(false);
      }
    }
  
    handleNavigation();
  }, [navigate, token]); // 移除 checkAuthUser 从依赖项，因为它可能不会改变
  

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
