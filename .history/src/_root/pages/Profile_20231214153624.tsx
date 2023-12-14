import React from "react";
import { useParams } from "react-router-dom";

const Profile = () => {

  const {id} =useParams();

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={
              currentUser.imageUrl ||
              "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
            }
            alt="creator"
            className="h-16 w-16 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
