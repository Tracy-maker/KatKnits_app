import React, { useState } from "react";
import { Button, Input } from "@shadcn/ui"; // Assuming these are provided by @shadcn/ui
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { account, databases } from "@/lib/appwrite/config";

const VerifyEmail: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>("");

  const isEmailRegistered = async (email: string): Promise<boolean> => {
    try {
      // Constructing the query as a single string
      const query = `email=${email}`;
      const result = await databases.listDocuments( appwriteConfig.userCollectionId,, query);
      return result.documents.length > 0;
    } catch (error) {
      console.error('Error checking email registration:', error);
      return false;
    }
  };
  

  const forgetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userEmail || !userEmail.includes("@")) {
      toast.error("Please enter a valid email!");
      return;
    }

    const emailRegistered = await isEmailRegistered(userEmail);
    if (!emailRegistered) {
      toast.error("This email is not registered.");
      return;
    }

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
