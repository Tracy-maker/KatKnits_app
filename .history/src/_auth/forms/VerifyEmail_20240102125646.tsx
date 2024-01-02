import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { account } from "@/lib/appwrite/config";
import { useUserContext } from "@/context/AuthContext";

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const { setIsEmailVerified } = useUserContext();
  const [verificationToken, setVerificationToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
 

  // Function to handle the verification of the email
  const handleVerifyEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (userId && verificationToken) {
       
        await account.updateVerification(userId,verificationToken);
        setIsEmailVerified(true);
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
    <div className="container-xl p-3 my-5 border">
      <h2 className="text-center">Verify Your Email</h2>
      <form className="container" onSubmit={handleVerifyEmail}>
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
