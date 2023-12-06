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
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          >
            <source
              src="https://player.vimeo.com/external/399004883.sd.mp4?s=8affd188fc46668d31466167837a15a407780db3&profile_id=164&oauth2_token_id=57447761"
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
