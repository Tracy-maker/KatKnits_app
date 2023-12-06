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
              width="70%"
              height="auto"
            >
              <source
                src="https://player.vimeo.com/external/539549260.sd.mp4?s=7039d46a0a62282cf5d6655c6918b536a935af3c&profile_id=165&oauth2_token_id=57447761"
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
