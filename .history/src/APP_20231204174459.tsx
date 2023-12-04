import { Route, Routes } from "react-router-dom";
import "./globals.css";
import SigninForm from "./_auth/forms/SigninForm";
import { Home } from "./_root/pages";
import SignupForm from "./_auth/forms/SignupForm";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>

        <Route/>
        <Route path="/sign-in" element={<SigninForm />} />
        <Route path="/sign-up" element={<SignupForm />} />

        <Route index element={<Home />} />
      </Routes>
    </main>
  );
};

export default App;
