import { Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;

  return <>{isAuthenticated ? <Navigate to="/" /> : <></>}</>;
};

export default AuthLayout;
