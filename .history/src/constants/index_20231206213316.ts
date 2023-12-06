import {
  BookmarkIcon,
  GlobeAltIcon,
  HomeIcon,
  PlusIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import React from "react";

export const sidebarLinks = [
  {
    imgURL: React.createElement(HomeIcon),
    route: "/",
    label: "Home",
  },
  {
    imgURL: React.createElement(GlobeAltIcon),
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: React.createElement(UsersIcon),
    route: "/all-users",
    label: "People",
  },
  {
    imgURL: React.createElement(BookmarkIcon),
    route: "/saved",
    label: "Saved",
  },
  {
    imgURL: React.createElement(PlusIcon),
    route: "/create-post",
    label: "Create Post",
  },
];

export const bottombarLinks = [
  {
    imgURL: React.createElement(HomeIcon),
    route: "/",
    label: "Home",
  },
  {
    imgURL: React.createElement(GlobeAltIcon),
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: React.createElement(BookmarkIcon),
    route: "/saved",
    label: "Saved",
  },
  {
    imgURL: React.createElement(PlusIcon),
    route: "/create-post",
    label: "Create Post",
  },
];
