import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { ValidEmail } from "@/lib/validation";
import { useEffect } from "react";
import {  resetPassword, verifyEmail } from "@/lib/appwrite/api";
import { toast } from "react-toastify";
import { useResetPassword } from "@/lib/react-query/queriesAndMutations";

const VerifyEmail = () => {
  const { mutate: getEmailLink, isLoading, error } = useResetPassword();
  const navigate = useNavigate();



  // 1. Define your form.
  const form = useForm<z.infer<typeof ValidEmail>>({
    resolver: zodResolver(ValidEmail),
    defaultValues: {
      email: "",
      token: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ValidEmail>) {
    try {
      getEmailLink({ email: values.email }, {
        onSuccess: () => {
          toast.success("Password reset email sent successfully!");
          navigate("/");
        },
        onError: (err) => {
          toast.error("Password reset failed. Please try again.");
          console.error(err); // Log the error for debugging
        }
      });
    } catch (error) {
      console.error(error); // Log the caught error
      toast.error("An unexpected error occurred.");
    }
  }
  

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img
          className="h-2/6"
          src="https://i.ibb.co/6Yc7HG4/catlogo.png"
          alt="catlogo"
        />
        <h2 className="h3-bold md:h2-bold pt-2 sm:pt-4">
          Password Memory Reboot
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          "Drop email, let's play password hide and seek! 🕵️‍♂️🔍"
        </p>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-6/12"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="shad-button_primary">
          {isLoading ? (
            <div className="flex-center gap-2">
              <Loader />
            </div>
          ) : (
            "Verify your email address"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default VerifyEmail;
