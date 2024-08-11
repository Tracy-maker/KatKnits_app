import React from "react";
import { Models } from "appwrite";

type ChannelCardProps = {
  channel: Models.Document;
};

const ChannelCard: React.FC<ChannelCardProps> = ({ channel }) => {
  return (
    <li className="bg-dark-2 rounded-3xl border border-dark-4 p-5 lg:p-7 w-full max-w-screen-sm">
      <h3 className="text-lg font-semibold">{channel.name}</h3>
      <p className="text-sm text-light-1">{channel.description || "No description available"}</p>
    </li>
  );
};

export default ChannelCard;
