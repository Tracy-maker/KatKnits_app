import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { account } from "@/lib/appwrite/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const VerifyEmail: React.FC = () => {
  const [userEmail, setuserEmail] = useState<string>("");


  // Function to handle the verification of the email
  const handleVerifyEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userEmail && userEmail.includes('@')) {
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
      <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Verify Your Email</h2>
      <p className="text-light-3 small-medium md:base-regular mt-2">
        Welcome back! Please enter your details.
      </p>
      <form
        className="flex flex-col gap-5 w-full mt-4"
        onSubmit={handleVerifyEmail}
      >
        <div className="mb-3">
          <label htmlFor="verificationToken" className="shad-form_label ">
            Enter your Email:
          </label>
          <Input
            onChange={(e) =>setuserEmail(e.target.value)}
            type="text"
            required
            className="shad-input"
            id="verificationToken"
          />
        </div>
        <Button className="shad-button_primary" type="submit">
          Verify Email
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
