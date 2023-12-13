import { Models } from "appwrite";

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  return <div>UserCard</div>;
};

export default UserCard;
