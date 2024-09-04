"use client";
import React, { useState } from "react";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [step, setStep] = useState(1);

  const handleOnChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleNextStep = () => {
    if (step === 1) {
      const emailInput = document.querySelector(
        'input[type="email"]'
      ) as HTMLInputElement;
      if (!formData.email) {
        setErrorMessage("Email is required");
        return;
      }
      if (!emailInput.validity.valid) {
        setErrorMessage("Invalid email format");
        return;
      }
    }
    if (step === 2 && (!formData.password || !formData.repassword)) {
      setErrorMessage("Both password fields are required");
      return;
    }
    if (step === 2 && formData.password !== formData.repassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setErrorMessage("");
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.repassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    console.log("Form submitted:", formData);
    setErrorMessage("");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h1 className="text-2xl flex justify-center mb-4">Бүртгүүлэх</h1>

        {step === 1 && (
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleOnChange("email", e.target.value)}
              className="w-[300px] border-[1px] border-black h-[40px] rounded-md px-2"
            />
            {errorMessage && (
              <p className="text-red-500 " aria-live="assertive">
                {errorMessage}
              </p>
            )}
            <button
              type="button"
              onClick={handleNextStep}
              className="w-[300px] h-[40px] bg-[#FF5349] text-white rounded-md"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
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
            {errorMessage && (
              <p className="text-red-500 text-center" aria-live="assertive">
                {errorMessage}
              </p>
            )}
            <div className="flex justify-between mt-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="w-[140px] h-[40px] bg-gray-300 text-black rounded-md"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
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
