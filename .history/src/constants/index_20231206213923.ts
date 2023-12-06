import {
  BookmarkIcon,
  GlobeAltIcon,
  HomeIcon,
  PlusIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import React from "react";

export const sidebarLinks: INavLink[] = [
  {
    imgURL: <HomeIcon />,
    route: "/",
    label: "Home",
  },
  {
    imgURL: <GlobeAltIcon />,
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: <UsersIcon />,
    route: "/all-users",
    label: "People",
  },
  {
    imgURL: <BookmarkIcon />,
    route: "/saved",
    label: "Saved",
  },
  {
    imgURL: <PlusIcon />,
    route: "/create-post",
    label: "Create Post",
  },
];

export const bottombarLinks: INavLink[] = [
  {
    imgURL: <HomeIcon />,
    route: "/",
    label: "Home",
  },
  {
    imgURL: <GlobeAltIcon />,
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: <BookmarkIcon />,
    route: "/saved",
    label: "Saved",
  },
  {
    imgURL: <PlusIcon />,
    route: "/create-post",
    label: "Create Post",
  },
];
