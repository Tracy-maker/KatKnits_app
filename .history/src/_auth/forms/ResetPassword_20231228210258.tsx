import React, { useState } from "react";
import { account } from "@/lib/appwrite/config";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PasswordFormData = {
  newPassword: string;
  repeatedPassword: string;
};

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<PasswordFormData>({
    newPassword: "",
    repeatedPassword: "",
  });

  const  changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userId");
    const secret = urlParams.get("secret");

    if (password.newPassword === password.repeatedPassword) {
      await account.updateRecovery(
        userId ?? "", // Using nullish coalescing to ensure string type
        secret ?? "",
        password.newPassword,
        password.repeatedPassword
      );
      navigate("/sign-in");
    } else {
      toast.error(
        "Both new password and the repeated password should be the same."
      );
    }
  };

  return (
    <div>
      <div className="container-xl p-3 my-5 border">
        <h2 className="text-center"> Reset your password </h2>
        <form className="container">
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Enter your new password :
            </label>
            <input
              required
              type="password"
              name="password"
              onChange={(e) => {
                setPassword({
                  ...password,
                  newPassword: e.target.value,
                });
              }}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Repeat your new password :
            </label>
            <input
              required
              type="password"
              name="password"
              onChange={(e) => {
                setPassword({
                  ...password,
                  repeatedPassword: e.target.value,
                });
              }}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button
            className="btn btn-success"
            type="submit"
            onClick={() => changePassword}
          >
            Change Password
          </button>
        </form>
      </div>
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

export default ResetPassword;