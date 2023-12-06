import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  ArrowLongUpIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
const navigate = useNavigate();


  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            width={150}
            height={350}
            src="https://i.ibb.co/6Yc7HG4/catlogo.png"
            alt="catlogo"
          />
        </Link>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut}
          >
            <ArrowRightOnRectangleIcon width={50} height={50} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
