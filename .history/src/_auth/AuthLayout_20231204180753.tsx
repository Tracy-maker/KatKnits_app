import { Navigate } from "react-router-dom";


const AuthLayout = () => {
    const isAuthenticated =false;

  return (
    <>{isAuthenticated ? (<Navigate/>)}</>
  )
}

export default AuthLayout