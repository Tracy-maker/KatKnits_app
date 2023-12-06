import { HomeIcon } from "@heroicons/react/24/outline";
import React from "react";

export const sidebarLinks = [
    {
      icon:React.createElement(HomeIcon) ,
      route: "/",
      label: "Home",
    },
    {
      icon: "/assets/icons/wallpaper.svg",
      route: "/explore",
      label: "Explore",
    },
    {
      icon: "/assets/icons/people.svg",
      route: "/all-users",
      label: "People",
    },
    {
      icon: "/assets/icons/bookmark.svg",
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