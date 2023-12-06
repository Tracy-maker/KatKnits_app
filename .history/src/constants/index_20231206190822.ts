import { BookmarkIcon, GlobeAltIcon, HomeIcon, UsersIcon } from "@heroicons/react/24/outline";
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
    icon: "/assets/icons/gallery-add.svg",
    route: "/create-post",
    label: "Create Post",
  },
];

export const bottombarLinks = [
  {
    icon: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/wallpaper.svg",
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: "/assets/icons/bookmark.svg",
    route: "/saved",
    label: "Saved",
  },
  {
    imgURL: "/assets/icons/gallery-add.svg",
    route: "/create-post",
    label: "Create",
  },
];
