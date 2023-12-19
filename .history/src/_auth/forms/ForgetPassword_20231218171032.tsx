import React, { useState, FormEvent } from "react";
import { account } from "../services/appwriteConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Input, Form } from '@shadcn/ui'; // Import from shadcn/ui
import { useNavigate } from "react-router-dom";

type PasswordState = {
  newPassword: string;
  repeatedPassword: string;
};

const ResetPassword: React.FC = () => {
  const history = useNavigate();
  const [password, setPassword] = useState<PasswordState>({
    newPassword: "",
    repeatedPassword: "",
  });

  const changePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userId");
    const secret = urlParams.get("secret");

    if (password.newPassword === password.repeatedPassword) {
      await account.updateRecovery(
        userId ?? '', // Fallback to empty string if userId is null
        secret ?? '', // Fallback to empty string if secret is null
        password.newPassword,
        password.repeatedPassword
      );
      history("/home");
    } else {
      toast.error('Both new password and the repeated password should be the same');
    }
  };

  return (
    <div className="container-xl p-3 my-5 border">
      <h2 className="text-center"> Reset your password </h2>
      <Form onSubmit={changePassword} className="container">
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            Enter your new password :
          </label>
          <Input
            required
            type="password"
            name="newPassword"
            onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
            className="form-control"
            id="newPassword"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="repeatedPassword" className="form-label">
            Repeat your new password :
          </label>
          <Input
            required
            type="password"
            name="repeatedPassword"
            onChange={(e) => setPassword({ ...password, repeatedPassword: e.target.value })}
            className="form-control"
            id="repeatedPassword"
          />
        </div>
        <Button type="submit" className="btn-success">
          Change Password
        </Button>
      </Form>
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
