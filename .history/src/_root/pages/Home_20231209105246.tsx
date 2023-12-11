import Loader from "@/components/shared/Loader";

const Home = () => {
  const isPosatLoading = true;
  const posts = null;

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
      {isPostLoading && !posts ?<Loader/>}
        </div>
      </div>
    </div>
  );

  return <div>Home</div>;
};

export default Home;