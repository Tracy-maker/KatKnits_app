import { account } from "@/lib/appwrite/config";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from "@/context/AuthContext";

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
  const { checkAuthUser } = useUserContext();

  const changePassword = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userId");
    const secret = urlParams.get("secret");

    if (password.newPassword === password.repeatedPassword) {
      try {
        await account.updateRecovery(
          userId!,
          secret!,
          password.newPassword,
          password.repeatedPassword
        );
        navigate("/sign-in");
      } catch (error) {
        toast.error("Failed to update password. Please try again.");
      }
    } else {
      toast.error("Both new password and the repeated password should be the same.");
    }
  };

  useEffect(() => {
    const isLoggedIn = checkAuthUser();

    if (isLoggedIn) {
      navigate("/");
    } else {
      toast.error("Login failed. Please try again.");
    }
  }, [checkAuthUser, navigate]);

  return (
    <div className="sm:w-420 flex-center flex-col">
      {/* Rest of your component code */}
    </div>
  );
};

export default ResetPassword;




  return (
    <div className="sm:w-420 flex-center flex-col">
      <img
        className="h-2/6"
        src="https://i.ibb.co/6Yc7HG4/catlogo.png"
        alt="catlogo"
      />

      <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Reset your password</h2>
     
      <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back! Please enter your details.
        </p>
      <form className="flex flex-col gap-5 w-full mt-4">
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="shad-form_label">
            Enter your new password:
          </label>
          <Input
            required
            type="password"
            name="password"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword({
                ...password,
                newPassword: e.target.value,
              });
            }}
            className="shad-input"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword2"  className="shad-form_label">
            Repeat your new password:
          </label>
          <Input
            required
            type="password"
            name="password"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword({
                ...password,
                repeatedPassword: e.target.value,
              });
            }}
            className="shad-input"
            id="exampleInputPassword2"
          />
        </div>
        <Button
         className="shad-button_primary"
          type="submit"
          onClick={(e) => changePassword(e as FormEvent<HTMLButtonElement>)}
        >
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

export default ResetPassword;
