import React from "react";
import { useForm } from "react-hook-form";
import { account } from "@/lib/appwrite/config";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PasswordFormData = {
  newPassword: string;
  repeatedPassword: string;
};

const ForgetPassword: React.FC = () => {
  const history = useNavigate();
  const { handleSubmit, register } = useForm<PasswordFormData>();



  const onSubmit = async (data: PasswordFormData) => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userId");
    const secret = urlParams.get("secret");

    if (data.newPassword === data.repeatedPassword) {
      try {
        await account.updateRecovery(
          userId ?? "",
          secret ?? "",
          data.newPassword,
          data.repeatedPassword
        );
        history("/");
      } catch (error) {
        console.error("Error updating password:", error);
        toast.error("Failed to update password.");
      }
    } else {
      toast.error("Both new password and the repeated password should be the same.");
    }
  };

  return (
    <div className="container-xl p-3 my-5 border">
      <h2 className="text-center">Reset your password</h2>
      <form className="container" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            Enter your new password:
          </label>
          <Input
            required
            type="password"
            {...register("newPassword")}
            className="form-control"
            id="newPassword"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="repeatedPassword" className="form-label">
            Repeat your new password:
          </label>
          <Input
            required
            type="password"
            {...register("repeatedPassword")}
            className="form-control"
            id="repeatedPassword"
          />
        </div>
        <Button type="submit" className="btn-success">
          Change Password
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

export default ForgetPassword;