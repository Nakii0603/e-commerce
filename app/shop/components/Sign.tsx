"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    repassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);

  const handleOnChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleNextStep = async () => {
    if (step === 1) {
      // Step 1: Send OTP to the email
      
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/api/otp/send-otp`,
          { email: formData.email }
        );

        if (response.data.message === "OTP sent successfully to your email") {
          setOtpSent(true);
          setStep(2);
        } else {
          setErrorMessage("Failed to send OTP. Try again.");
        }
      } catch (error) {
        setErrorMessage("Failed to send OTP. Try again.");
      }
    } else if (step === 2) {
      // Step 2: Verify OTP
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/api/otp/verify-otp`,
          {
            email: formData.email,
            otp: formData.otp,
          }
        );
        if (response.data.message === "OTP verified successfully") {
          setStep(3);
        } else {
          setErrorMessage("Invalid OTP. Please try again.");
        }
      } catch (error) {
        setErrorMessage("Failed to verify OTP. Try again.");
      }
    } else if (step === 3) {
      // Step 3: Submit Password after OTP is verified
      if (!formData.password || !formData.repassword) {
        setErrorMessage("Both password fields are required");
        return;
      }

      if (formData.password !== formData.repassword) {
        setErrorMessage("Passwords do not match");
        return;
      }

      // Ensure OTP was verified before registration
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/api/auth/shop/register`,
          {
            email: formData.email,
            password: formData.password,
          }
        );

        const message = response.data.message;
        if (message === "Shop registered successfully") {
          router.push("/"); 
          setErrorMessage("");
        } else {
          message == "Email already in use";
          setErrorMessage("Email already in use");
        }
      } catch (error) {
        setErrorMessage("Error creating account. Please try again.");
      }
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="flex flex-col gap-4">
        <h1 className="text-2xl flex justify-center mb-4">Sign Up shop </h1>

        {step === 1 && (
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleOnChange("email", e.target.value)}
              className="w-[300px] border-[1px] border-black h-[40px] rounded-md px-2"
            />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button
              type="button"
              onClick={handleNextStep}
              className="w-[300px] h-[40px] bg-[#1443FF] text-white rounded-md"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && otpSent && (
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={(e) => handleOnChange("otp", e.target.value)}
              className="w-[300px] border-[1px] border-black h-[40px] rounded-md px-2"
            />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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
                className="w-[140px] h-[40px] bg-[#FF5349] text-white rounded-md"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-2">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleOnChange("password", e.target.value)}
              className="w-[300px] border-[1px] border-black h-[40px] rounded-md px-2"
            />
            <input
              type="password"
              placeholder="Re-enter Password"
              value={formData.repassword}
              onChange={(e) => handleOnChange("repassword", e.target.value)}
              className="w-[300px] border-[1px] border-black h-[40px] rounded-md px-2"
            />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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
                className="w-[140px] h-[40px] bg-[#FF5349] text-white rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
