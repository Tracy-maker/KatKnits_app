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
import { SigninValidation } from "@/lib/validation";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const SigninForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount();

  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });
    if (!session) {
      toast({ title: "Sign up failed. Please try again." });
      return;
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({ title: "Sign up failed. Please try again." });
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
          Log in to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          "Welcome back! Ready for some wordy fun?"
        </p>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-6/12 mt-1"
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
            "Sign Up"
          )}
        </Button>

        <p className="text-small-regular text-light-2 text-center">
          No account? Time to join the party!
          <Link
            to="/sign-up"
            className="text-primary-500 text-small-semibold ml-1"
          >
            Sign up
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default SigninForm;
