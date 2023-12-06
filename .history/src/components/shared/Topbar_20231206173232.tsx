import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  ArrowLongUpIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

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
          <Link to={`/profile/${user.id}`} className="flex-center gap-3"></Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;