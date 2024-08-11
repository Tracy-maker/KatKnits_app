import React, { useState } from "react";

type AddChannelFormProps = {
  onCancel: () => void;
};

const AddChannelForm: React.FC<AddChannelFormProps> = ({ onCancel }) => {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");

  const handleAddChannel = () => {
    if (channelName.trim()) {
      // 调用API创建新频道
      console.log("Adding new channel:", channelName, description);
      // 清空表单并关闭
      setChannelName("");
      setDescription("");
      onCancel();
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-screen-sm">
      <input
        type="text"
        className="p-4 bg-dark-2 rounded-3xl border border-dark-4 w-full"
        placeholder="Enter channel name"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />
      <textarea
        className="p-4 bg-dark-2 rounded-3xl border border-dark-4 w-full"
        placeholder="Enter channel description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex gap-4">
        <button
          className="p-4 bg-blue-500 rounded-3xl text-white font-semibold"
          onClick={handleAddChannel}
        >
          Add Channel
        </button>
        <button
          className="p-4 bg-red-500 rounded-3xl text-white font-semibold"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddChannelForm;
