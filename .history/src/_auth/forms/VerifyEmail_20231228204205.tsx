import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { account } from "@/lib/appwrite/config";

const VerifyEmail: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>("");

  const forgetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userEmail && userEmail.includes("@")) {
      await account.createRecovery(
        userEmail,
        "http://localhost:5173/reset-password"
      );
      toast.success(`Email has been sent!`);
    } else {
      toast.error(`Please enter your email!`);
    }
  };

  return (
    <div className="sm:w-420 flex-center flex-col">
      <img
        className="h-2/6"
        src="https://i.ibb.co/6Yc7HG4/catlogo.png"
        alt="catlogo"
      />
      <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
        Verify your Email address
      </h2>
      <p className="text-light-3 small-medium md:base-regular mt-2">
        Once you do, you're all set to go!
      </p>
      <form onSubmit={forgetPassword}  className="flex flex-col gap-5 w-full mt-4">
        <div className="mb-3">
          <label htmlFor="emailInput" className="shad-form_label">
            Enter your email
          </label>
          <Input
            onChange={(e) => setUserEmail(e.target.value)}
            type="email"
            name="email"
            required
            id="emailInput"
          />
        </div>
        <Button type="submit" className="btn-primary">
          Reset password
        </Button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default VerifyEmail;
