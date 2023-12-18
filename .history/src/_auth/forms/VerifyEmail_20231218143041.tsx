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
import { useNavigate } from "react-router-dom";
import { ValidEmail } from "@/lib/validation";
import { toast } from "react-toastify";

const VerifyEmail: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>("");

  const forgetPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (userEmail && userEmail.includes("@")) {
      await account.createRecovery(
        userEmail,
        "http://localhost:3000/reset-password"
      );
      toast.success(`Email has been sent!`);
    } else {
      toast.error(`Please enter your email!`);
    }
  };
  return (
    <div className="container-xl p-3 my-5 border">
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
    </div>
  );
};

export default VerifyEmail;
