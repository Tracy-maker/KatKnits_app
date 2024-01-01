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
  }, [setUser, setIsAuthenticated, getCurrentUser]); // 添加这些函数和状态作为依赖项
  

  useEffect(() => {
    async function handleAuthentication() {
      // 只在特定页面执行认证状态检查
      const path = window.location.pathname;
      if (path === "/sign-up" || path === "/verify-email") {
        // 如果用户在尝试访问注册或验证邮箱页面，不执行重定向
        return;
      }
  
      const cookieFallback = localStorage.getItem("cookieFallback");
  
      // 如果没有 cookieFallback 或者它为空，且不在登录页面，则重定向到登录页面
      if ((!cookieFallback || cookieFallback === "[]") && path !== "/sign-in") {
        navigate("/sign-in");
        return;
      }
  
      // 如果有 token 参数，重定向到密码重置页面
      if (token) {
        navigate("/reset-password");
        return;
      }
  
      // 执行用户认证状态检查
      const isAuthenticated = await checkAuthUser();
      if (!isAuthenticated && path !== "/sign-in") {
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
