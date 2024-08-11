import React from "react";
import ChannelCard from "@/components/chat/ChannelCard";
import { Models } from "appwrite";

type ChannelListProps = {
  channels: Models.Document[];
};

const ChannelList: React.FC<ChannelListProps> = ({ channels }) => {
  return (
    <ul className="flex flex-col flex-1 gap-4 justify-center items-center w-full">
      {channels.map((channel) => (
        <ChannelCard channel={channel} key={channel.$id} />
      ))}
    </ul>
  );
};

export default ChannelList;

export default ChannelCard;
