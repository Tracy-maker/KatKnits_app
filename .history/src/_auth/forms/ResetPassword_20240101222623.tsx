import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate} from "react-router-dom";
import { account } from "../services/appwriteConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PasswordState {
  newPassword: string;
  repeatedPassword: string;
}

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<PasswordState>({
    newPassword: "",
    repeatedPassword: "",
  });

  const changePassword = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userId");
    const secret = urlParams.get("secret");

    if (password.newPassword === password.repeatedPassword) {
      await account.updateRecovery(
        userId!,
        secret!,
        password.newPassword,
        password.repeatedPassword
      );
      navigate("/");
    } else {
      toast.error('Both new password and the repeated password should be same');
    }
  };

  return (
    <div>
      <div className="container-xl p-3 my-5 border">
        <h2 className="text-center">Reset your password</h2>
        <form className="container">
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Enter your new password:
            </label>
            <input
              required
              type="password"
              name="password"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
            <label htmlFor="exampleInputPassword2" className="form-label">
              Repeat your new password:
            </label>
            <input
              required
              type="password"
              name="password"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPassword({
                  ...password,
                  repeatedPassword: e.target.value,
                });
              }}
              className="form-control"
              id="exampleInputPassword2"
            />
          </div>
          <button
            className="btn btn-success"
            type="submit"
            onClick={(e) => changePassword(e as FormEvent<HTMLButtonElement>)}
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
