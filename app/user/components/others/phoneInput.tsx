"use client";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import OtpInput from "react-otp-input";
import { useState } from "react";

export default function Example() {
  const [step, setStep] = useState<number>(1);
  const [otp, setOtp] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);

  const handleNextStep = () => {
    if (step === 1 && phoneNumber) {
      setStep(2);
    } else if (step === 2 && otp.length === 6) {
      console.log("OTP submitted:", otp, phoneNumber);
    }
  };

  const handlePrevStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center h-screen">
      {step === 1 && (
        <div>
          <PhoneInput
            className="w-[300px] border border-black rounded-md p-1"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={setPhoneNumber}
            inputMode="tel" // Ensures numeric keyboard on mobile
          />
          <button
            onClick={handleNextStep}
            disabled={!phoneNumber}
            className="w-[300px] h-[40px] bg-[#FF5349] text-white rounded-md mt-2"
          >
            Next
          </button>
        </div>
      )}
      {step === 2 && (
        <div>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span style={{ width: "10px" }}></span>}
            renderInput={(props) => (
              <input
                {...props}
                className="border-[1px] text-center rounded-[4px] border-black"
                type="text"
                inputMode="numeric" // Ensures numeric keyboard
                style={{
                  width: "40px",
                  height: "40px",
                }}
              />
            )}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handlePrevStep}
              className="w-[140px] h-[40px] bg-[#FF5349] text-white rounded-md"
            >
              Back
            </button>
            <button
              onClick={handleNextStep}
              disabled={otp.length !== 6}
              className="w-[140px] h-[40px] bg-[#FF5349] text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
