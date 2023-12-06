import { Link } from "react-router-dom";

const LeftSidebar = () => {
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            width={170}
            height={350}
            src="https://i.ibb.co/6Yc7HG4/catlogo.png"
            alt="catlogo"
            className="center"
          />
        </Link>
      </div>
    </nav>
  );
};

export default LeftSidebar;
