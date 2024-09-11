"use client";
import React, { useState } from "react";
import OtpInput from "react-otp-input";

const Otp: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  return (
    <div>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span></span>}
        renderInput={(props) => (
          <input
            {...props}
            style={{
              border: "1px black solid",
              borderRadius: "6px",
              width: "3rem",
              height: "3rem",
              margin: "0.5rem",
              fontSize: "2rem",
              textAlign: "center",
            }}
          />
        )}
      />
      <button
        type="button"
        className="w-[300px] h-[40px] bg-[#FF5349] text-white rounded-md"
      >
        Next
      </button>
    </div>
  );
};

export default Otp;
