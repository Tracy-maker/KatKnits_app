import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { account } from "@/lib/appwrite/config";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PasswordFormData {
  newPassword: string;
  repeatedPassword: string;
}

const ResetPassword: React.FC = () => {
  const { register, handleSubmit } = useForm<PasswordFormData>();
  const navigate = useNavigate();
  const location = useLocation();
  const [queryParams, setQueryParams] = useState<{ userId: string; secret: string; expire: string }>({
    userId: "",
    secret: "",
    expire: ""
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQueryParams({
      userId: params.get("userId") ?? "",
      secret: params.get("secret") ?? "",
      expire: params.get("expire") ?? ""
    });
  }, [location]);

  const handleResetPassword = async (data: PasswordFormData) => {
    if (data.newPassword !== data.repeatedPassword) {
      toast.error("Both new password and the repeated password should be the same.");
      return;
    }

    try {
      await account.updateRecovery(
        queryParams.userId,
        queryParams.secret,
        data.newPassword,
        data.repeatedPassword
      );
      navigate("/sign-in");
    } catch (error) {
      console.error("Password update error:", error);
      toast.error("Failed to update password. Please check your credentials.");
    }
  };

  return (
    <div className="sm:w-420 flex-center flex-col">
      <img className="h-2/6" src="https://i.ibb.co/6Yc7HG4/catlogo.png" alt="catlogo" />
      <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Reset your password</h2>
      <p className="text-light-3 small-medium md:base-regular mt-2">
        Once you do, you're all set to go!
      </p>
      <form className="flex flex-col gap-5 w-full mt-4" onSubmit={handleSubmit(handleResetPassword)}>
        <div className="mb-3">
          <label htmlFor="newPassword" className="shad-form_label">Enter your new password:</label>
          <Input required type="password" {...register("newPassword")} className="shad-input" id="newPassword" />
        </div>
        <div className="mb-3">
          <label htmlFor="repeatedPassword" className="shad-form_label">Repeat your new password:</label>
          <Input required type="password" {...register("repeatedPassword")} className="shad-input" id="repeatedPassword" />
        </div>
        <Button type="submit" className="shad-button_primary">Change Password</Button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default ResetPassword;