import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProfileUploader, Loader } from "@/components/shared";

import { useUserContext } from "@/context/AuthContext";
import {
  useGetUserById,
  useUpdateUser,
} from "@/lib/react-query/queriesAndMutations";
import { profileValidation } from "@/lib/validation";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  // const { toast } = useToast();
  // const navigate = useNavigate();
  const { id } = useParams();
  const { user, setUser } = useUserContext();
  const form = useForm<z.infer<typeof profileValidation>>({
    resolver: zodResolver(profileValidation),
    defaultValues: {
      file: [],
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || "",
    },
  });

  const { data: currentUser } = useGetUserById(id || "");
  const { mutateAsync: updateUser, isLoading: isLoadingUpdate } =
    useUpdateUser();

  if (!currentUser) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof profileValidation>) {
    const updatedUser = await updateUser({
      userId: currentUser!.$id,
      name: values.name,
      bio: values.bio,
      file: values.file,
      imageUrl: currentUser?.imageUrl,
      imageId: currentUser?.imageId,
    });

    if (!updatedUser) {
      toast.error("Updated user failed, please try again");
    }
  }

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start gap-3 justify-start w-full max-w-5xl">
          <img
            src="https://img.icons8.com/?size=80&id=38TErZI9R52x&format=png"
            alt="edit"
            width={76}
            height={76}
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Profile</h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-7 w-full mt-4 max-w-5xl"
          >
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProfile;
