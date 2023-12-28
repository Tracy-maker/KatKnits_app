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
    const emailExists = await isEmailRegistered(userEmail);
    if (!emailExists) {
      toast.error("This email is not registered.");
      return;
    }

    if (userEmail.includes("@")) {
      try {
        await account.createRecovery(
          userEmail,
          "http://localhost:5173/reset-password"
        );
        toast.success("Email has been sent!");
      } catch (error) {
        console.error("Error sending recovery email:", error);
        toast.error("Failed to send recovery email.");
      }
    } else {
      toast.error("Please enter a valid email.");
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