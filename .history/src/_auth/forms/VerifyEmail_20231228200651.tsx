import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, Button } from "@/components/ui/button";

import { isEmailRegistered } from "@/lib/appwrite/api";
import { account } from "@/lib/appwrite/config";
import { useState } from "react";

const VerifyEmail = () => {
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState<string>("");



  const forgetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegistered = await isEmailRegistered(userEmail);
    if (!emailRegistered) {
      toast({ title: "This email is not registered." });
      return;
    }

    try {
      await account.createRecovery(
        userEmail,
        "http://localhost:5173/reset-password"
      );
      toast({ title: "Email has been sent!" });
    } catch (error) {
      console.error("Error sending recovery email:", error);
      toast({ title: "Failed to send recovery email." });
    }
  }

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
            className="shad-input" // Assuming you still want to use the custom styles
          />
        </div>
        <Button type="submit" className="btn-primary">
          Reset Password
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
Key Changes:

Removed the FormField and related components, using a simple div for the input container.
The label and Input elements are used directly for the email input field.
ToastContainer is included for showing toast messages.
Added className to the Input component for styling. You can adjust the class names (shad-input, btn-primary, etc.) to match your CSS styles.
Make sure to include all necessary styles in your CSS files to achieve the desired appearance. The class names used in the JSX (like container-xl, text-center, btn-primary, etc.) should correspond to the classes defined in your CSS.







