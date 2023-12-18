import { Route, Routes } from "react-router-dom";
import "./globals.css";
import SigninForm from "./_auth/forms/SigninForm";
import {
  AllUsers,
  CreatePost,
  EditPost,
  Explore,
  Home,
  PostDetails,
  Profile,
  Saved,
  UpdateProfile,
  Chat,
} from "./_root/pages";
import SignupForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { Toaster } from "@/components/ui/toaster";
import ForgetPassword from "./_auth/forms/ForgetPassword";
import VerifyEmail from "./_auth/forms/VerifyEmail";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
          <Route path="/text-chat" element={<Chat />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
