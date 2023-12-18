import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import "react-toastify/dist/ReactToastify.css";

import { toast } from "react-toastify";
import { useState } from "react";
import { account } from "@/lib/appwrite/config";

const VerifyEmail: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>("");

  const forgetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
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
      <h2 className="text-center">Password Recovery</h2>
      <form onSubmit={forgetPassword} className="container">
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Enter your email
          </label>
          <Input
            onChange={(e) => setUserEmail(e.target.value)}
            type="email"
            name="email"
            required
            id="emailInput"
            // Other props as needed
          />
        </div>
        <Button type="submit" className="btn-primary">
          Reset password
        </Button>
      </form>
      {/* ToastContainer and other components */}
    </div>
  );
};

export default VerifyEmail;
