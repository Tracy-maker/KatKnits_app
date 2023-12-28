import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "react-toastify/dist/ReactToastify.css";
import { useToast } from "@/components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ValidEmail } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEmailRegistered } from "@/lib/appwrite/api";
import { account } from "@/lib/appwrite/config";

const VerifyEmail = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof ValidEmail>>({
    resolver: zodResolver(ValidEmail),
    defaultValues: {
      email: "",
    },
  });

  // Assuming you have defined isEmailRegistered function somewhere

async function onSubmit(values: z.infer<typeof ValidEmail>) {
  // Check if the email is registered
  const emailRegistered = await isEmailRegistered({ email: values.email });
  if (!emailRegistered) {
    toast {(title:"This email is not registered.")};
    return;
  }

  try {
    await account.createRecovery(
      values.email,
      "http://localhost:5173/reset-password"
    );
    toast.success("Email has been sent!");
  } catch (error) {
    console.error("Error sending recovery email:", error);
    toast.error("Failed to send recovery email.");
  }
};

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img
          className="h-2/6"
          src="https://i.ibb.co/6Yc7HG4/catlogo.png"
          alt="logo"
        />
        <h2 className="h3-bold md:h2-bold pt-2 sm:pt-4">Verify Your Email</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          " Welcome back! Ready for some wordy fun? "
        </p>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-6/12"
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="shad-button_primary">
          {isUserLoading ? (
            <div className="flex-center gap-2">
              <Loader /> Loading...
            </div>
          ) : (
            "Log in"
          )}
        </Button>

        <p className="text-small-regular text-light-2 text-center">
          No account?
          <Link
            to="/sign-up"
            className="text-primary-500 text-small-semibold ml-1"
          >
            Sign up
          </Link>
        </p>
        <p className="text-small-regular text-light-2 text-center">
          Forget your password?
          <Link
            to="/verify-email"
            className="text-primary-500 text-small-semibold ml-1"
          >
            Click me
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default VerifyEmail;
