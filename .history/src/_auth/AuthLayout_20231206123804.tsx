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
            className="hidden xl:block h-screen w-2/4 object-cover bg-no-repeat"
          >
            <source
              src="https://player.vimeo.com/progressive_redirect/playback/785976610/rendition/540p/file.mp4?loc=external&oauth2_token_id=57447761&signature=1a7bf04cee4eda62824128bd5af9796de9d60b961ae62418278a81323b278875"
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
