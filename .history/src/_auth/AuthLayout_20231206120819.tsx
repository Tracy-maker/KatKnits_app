import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
      
            
            <video
              autoPlay
              loop
              muted
              controls={false}
              width="50%"
              height="auto"
            >
              <source
                src="◊"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
        
        </>
      )}
    </>
  );
};

export default AuthLayout;
