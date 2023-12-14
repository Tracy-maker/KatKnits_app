import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import { Button } from "../ui/button";

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-6">
        <Link to="/" className="flex gap-9 items-center">
          <img
            width={200}
            height={300}
            src="https://i.ibb.co/6Yc7HG4/catlogo.png"
            alt="catLogo"
          />
        </Link>

        <Link to={`/profile/${user.id}`} className="flex gap-4 items-center">
          <img
            src={
              user.imageUrl ||
              "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
            }
            alt="profile"
            className="h-10 w-10 rounded-full"
          />
          <div className="flex flex-col gap-1">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-1">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link ${isActive && "bg-purple-200"} `}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-3 items-center p-4"
                >
                  <img src={link.imgURL} alt={link.label} className="w-8 h-8" />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant="ghost"
        className="shad-button_ghost py-11"
        onClick={() => signOut()}
      >
        <img
          src="https://img.icons8.com/?size=64&id=46650&format=png"
          className="w-6 h-6"
          alt="logout"
        />
        <p>Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
