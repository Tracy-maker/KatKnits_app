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
            width={190}
            height={350}
            src="https://i.ibb.co/6Yc7HG4/catlogo.png"
            alt="catLogo"
          />
        </Link>

        <Link to={`/profile/${user.id}`} className="flex  items-center">
          <img
            src={
              user.imageUrl ||
              "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
            }
            alt="profile"
            className="h-10 w-10 rounded-full"
          />
          <div className="flex flex-col">
            <p></p>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default LeftSidebar;
