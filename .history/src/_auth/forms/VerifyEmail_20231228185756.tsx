import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "react-toastify/dist/ReactToastify.css";
import { useToast } from "react-toastify";
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

const VerifyEmail = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { mutateAsync: signInAccount } = useSignInAccoun();

  // 1. Define your form.
  const form = useForm<z.infer<typeof ValidEmail>>({
    resolver: zodResolver(ValidEmail),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ValidEmail>) {
    const session = await signInAccount({
      email: values.email,
    });
    if (!session) {
      toast({ title: "Sign up failed. Please try again." });
      return;
    }
  }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img
          className="h-2/6"
          src="https://i.ibb.co/6Yc7HG4/catlogo.png"
          alt="logo"
        />
        <h2 className="h3-bold md:h2-bold pt-2 sm:pt-4">
          Verify your Email
        </h2>
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
