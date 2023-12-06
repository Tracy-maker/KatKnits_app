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
          <div >
            
            <video
              autoPlay
              loop
              muted
              controls={false}
              width="50%"
              height="auto"
            >
              <source
                src="https://player.vimeo.com/external/513373860.hd.mp4?s=3aa9a256b9e4eea8b6ed071af5cf6052c3d88c69&profile_id=174&oauth2_token_id=57447761"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </>
      )}
    </>
  );
};

export default AuthLayout;
