import React, { useState } from "react";
import Loader from "@/components/shared/Loader";
import ChannelList from "@/components/chat/ChannelList";
import AddChannelForm from "@/components/chat/AddChannelForm";
import { useGetChannels } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const ChatChannels = () => {
  const {
    data: channels,
    isPending: isChannelsLoading,
    isError: isErrorChannels,
  } = useGetChannels();
  const [isAddingChannel, setIsAddingChannel] = useState(false);

  if (isErrorChannels) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Chat Channels</h2>
          <p className="body-medium text-light-1">
            Join a conversation or create a new channel to discuss with others!
          </p>
          {isChannelsLoading ? (
            <Loader />
          ) : (
            <>
              <ChannelList channels={channels?.documents || []} />
              {isAddingChannel ? (
                <AddChannelForm onCancel={() => setIsAddingChannel(false)} />
              ) : (
                <button
                  className="p-4 bg-blue-500 rounded-3xl text-white font-semibold mt-8"
                  onClick={() => setIsAddingChannel(true)}
                >
                  + Add New Channel
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatChannels;
