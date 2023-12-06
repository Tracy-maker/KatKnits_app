import { Link, useLocation } from "react-router-dom";

import { bottombarLinks } from "@/constants";

const Bottombar = () => {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            key={`bottombar-${link.label}`}
            to={link.route}
            className={`${
              isActive && "rounded-[10px] bg-purple-200 "
            } flex-center flex-col gap-1 p-0.5 transition`}
          >
            <img src={link.imgURL} alt={link.label} width={35} height={35} />

            <p className="tiny-medium text-light-3">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
