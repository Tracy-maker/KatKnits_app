import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
        <img
          className="h-2/6"
          src="https://i.ibb.co/6Yc7HG4/catlogo.png"
          alt="catlogo"
        />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
