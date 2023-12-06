import { Link } from "react-router-dom";

const LeftSidebar = () => {
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center"></Link>
      </div>
    </nav>
  );
};

export default LeftSidebar;
