import PostForm from "@/components/forms/PostForm";
import { useParams } from "react-router-dom";

const EditPost = () => {
 const {id} = useParams();

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="https://img.icons8.com/?size=80&id=66625&format=png"
            width={76}
            height={76}
            alt="add"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>

        <PostForm />
      </div>
    </div>
  );
};

export default EditPost;