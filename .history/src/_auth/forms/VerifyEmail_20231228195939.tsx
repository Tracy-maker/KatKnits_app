import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { isEmailRegistered } from "@/lib/appwrite/api";
import { account } from "@/lib/appwrite/config";

const VerifyEmail = () => {
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState<string>("");



  const forgetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegistered = await isEmailRegistered(userEmail);
    if (!emailRegistered) {
      toast({ title: "This email is not registered." });
      return;
    }

    try {
      await account.createRecovery(
        userEmail,
        "http://localhost:5173/reset-password"
      );
      toast({ title: "Email has been sent!" });
    } catch (error) {
      console.error("Error sending recovery email:", error);
      toast({ title: "Failed to send recovery email." });
    }
  }

  return (
    <>
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
        onSubmit={forgetPassword}
        className="flex flex-col gap-3 w-6/12"
      >
        <FormField
         
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
          Reset password
        </Button>
      </form>
    </>
  );
};

export default VerifyEmail;
