import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  ArrowLongUpIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";

const LeftSidebar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            width={170}
            height={350}
            src="https://i.ibb.co/6Yc7HG4/catlogo.png"
            alt="catlogo"
          />
        </Link>
      </div>
    </nav>
  );
};

export default LeftSidebar;
