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
    icon: React.createElement(HomeIcon),
    route: "/",
    label: "Home",
  },
  {
    icon: React.createElement(GlobeAltIcon),
    route: "/explore",
    label: "Explore",
  },
  {
    icon: React.createElement(UsersIcon),
    route: "/all-users",
    label: "People",
  },
  {
    icon: React.createElement(BookmarkIcon),
    route: "/saved",
    label: "Saved",
  },
  {
    icon: React.createElement(PlusIcon),
    route: "/create-post",
    label: "Create Post",
  },
];

export const bottombarLinks = [
  {
    icon: React.createElement(HomeIcon),
    route: "/",
    label: "Home",
  },
  {
    icon: React.createElement(GlobeAltIcon),
    route: "/explore",
    label: "Explore",
  },
  {
    icon: React.createElement(BookmarkIcon),
    route: "/saved",
    label: "Saved",
  },
  {
    icon: React.createElement(PlusIcon),
    route: "/create-post",
    label: "Create Post",
  },
];
