"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthPage() {
  const router = useRouter();
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    repassword: "",
  });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);

  const handleToggle = () => {
    setIsLoginView(!isLoginView);
    setStep(1);
    setFormData({ email: "", otp: "", password: "", repassword: "" });
    setLoginData({ email: "", password: "" });
  };

  const handleOnChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleNextStep = async () => {
    if (step === 1) {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/otp/send-otp`, {
          email: formData.email,
        });
        if (response.data.message === "OTP sent successfully to your email") {
          toast.success("OTP sent successfully");
          setOtpSent(true);
          setStep(2);
        } else {
          toast.error("Failed to send OTP. Try again.");
        }
      } catch {
        toast.error("Failed to send OTP. Try again.");
      }
    } else if (step === 2) {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/otp/verify-otp`, {
          email: formData.email,
          otp: formData.otp,
        });
        if (response.data.message === "OTP verified successfully") {
          toast.success("OTP verified successfully");
          setStep(3);
        } else {
          toast.error("Invalid OTP. Please try again.");
        }
      } catch {
        toast.error("Failed to verify OTP. Try again.");
      }
    } else if (step === 3) {
      if (!formData.password || !formData.repassword) {
        toast.error("Both password fields are required");
        return;
      }
      if (formData.password !== formData.repassword) {
        toast.error("Passwords do not match");
        return;
      }

      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/auth/shop/register`, {
          email: formData.email,
          password: formData.password,
        });
        if (response.data.message === "Shop registered successfully") {
          toast.success("Registration successful! Redirecting to login...");
          setTimeout(() => router.push("/"), 2000);
        } else {
          toast.error("Email already in use");
        }
      } catch {
        toast.error("Error creating account. Please try again.");
      }
    }
  };

  const handleLogin = async () => {
    const { email, password } = loginData;

    if (!email || !password) {
      toast.error("Both fields are required");
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/auth/shop/login`, {
        email,
        password,
      });
      console.log(response.data);
      const { message, token, shopId } = response.data;

      if (message === "Email or password wrong") {
        toast.error("Email or password wrong");
        return;
      }

      if (message === "Login successful") {
        localStorage.setItem("token", token);
        localStorage.setItem("shopId", shopId);
        toast.success("Login successful");
        router.push("dashboard");
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="flex h-screen">
      <ToastContainer position="top-center" autoClose={3000} />
      {/* Left Panel - Signup */}
      <motion.div
        className={`w-1/2 max-sm:w-full flex justify-center items-center ${
          isLoginView ? "bg-primary-blue text-white max-sm:hidden" : ""
        } transition-colors duration-800`}
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -200 }}
        transition={{ duration: 0.8 }}
      >
        <AnimatePresence mode="wait">
          {!isLoginView && (
            <motion.form
              key="signup"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-4"
            >
              <h1 className="text-2xl flex justify-center mb-4">Sign Up shop</h1>

              {step === 1 && (
                <>
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => handleOnChange("email", e.target.value)}
                    className="w-[300px] border border-black h-[40px] rounded-md px-2"
                  />
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-[300px] h-[40px] bg-primary-blue text-white rounded-md"
                  >
                    Next
                  </button>
                </>
              )}

              {step === 2 && otpSent && (
                <>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={formData.otp}
                    onChange={(e) => handleOnChange("otp", e.target.value)}
                    className="w-[300px] border border-black h-[40px] rounded-md px-2"
                  />
                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="w-[140px] h-[40px] bg-gray-300 text-black rounded-md"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-[140px] h-[40px] bg-primary-blue text-white rounded-md"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => handleOnChange("password", e.target.value)}
                    className="w-[300px] border border-black h-[40px] rounded-md px-2"
                  />
                  <input
                    type="password"
                    placeholder="Re-enter Password"
                    value={formData.repassword}
                    onChange={(e) => handleOnChange("repassword", e.target.value)}
                    className="w-[300px] border border-black h-[40px] rounded-md px-2"
                  />
                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="w-[140px] h-[40px] bg-gray-300 text-black rounded-md"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-[140px] h-[40px] bg-primary-blue text-white rounded-md"
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}

              <p className="mt-4 text-primary-blue cursor-pointer text-sm text-center" onClick={handleToggle}>
                Already have an account? Login
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Right Panel - Login */}
      <motion.div
        className={`w-1/2 flex max-sm:w-full justify-center items-center ${
          !isLoginView ? "bg-primary-blue text-white max-sm:hidden" : ""
        } transition-colors duration-800`}
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        transition={{ duration: 0.8 }}
      >
        <AnimatePresence mode="wait">
          {isLoginView && (
            <motion.form
              key="login"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-4"
            >
              <h1 className="text-2xl mb-4 text-center">Login shop</h1>

              <input
                type="email"
                placeholder="Email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className="w-[300px] border border-black h-[40px] rounded-md px-2"
              />
              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-[300px] border border-black h-[40px] rounded-md px-2"
              />

              <div
                onClick={handleLogin}
                className="bg-primary-blue w-[300px] text-center rounded-md text-white py-2 cursor-pointer"
              >
                Login
              </div>

              <p className="mt-4 text-primary-blue cursor-pointer text-sm text-center" onClick={handleToggle}>
                Don’t have an account? Sign up
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
