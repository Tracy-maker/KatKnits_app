import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Topbar = () => {
  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            className="h-2/6"
            src="https://i.ibb.co/6Yc7HG4/catlogo.png"
            alt="catlogo"
          />
        </Link>
        <div>
          <Button></Button>
        </div>
      </div>
    </section>
  );
};

export default Topbar;