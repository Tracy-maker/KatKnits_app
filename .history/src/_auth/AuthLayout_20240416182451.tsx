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
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat rounded-xl"
          >
            <source
              src="https://videos.pexels.com/video-files/6853337/6853337-hd_720_1366_25fps.mp4"
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
