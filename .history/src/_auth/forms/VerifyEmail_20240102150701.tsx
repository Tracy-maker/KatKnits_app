import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { account } from "@/lib/appwrite/config";

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const [verificationToken, setVerificationToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  // Function to handle the verification of the email
  const handleVerifyEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (userId && verificationToken) {
        await account.updateVerification(userId, verificationToken);
        toast.success("Email verified successfully!");
        navigate("/");
      } else {
        toast.error("Verification token is required.");
      }
    } catch (error) {
      toast.error("Failed to verify email.");
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
      <form  className="flex flex-col gap-5 w-full mt-4" onSubmit={handleVerifyEmail}>
       
        <div className="mb-3">
          <label htmlFor="verificationToken" className="form-label">
            Enter Verification Token:
          </label>
          <input
            onChange={(e) => setVerificationToken(e.target.value)}
            type="text"
            required
            className="form-control"
            id="verificationToken"
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Verify Email
        </button>
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
