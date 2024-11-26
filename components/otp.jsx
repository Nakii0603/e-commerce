"use client";
import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";

const Otp = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [otp, setOtp] = useState("");
  const [customInput, setCustomInput] = useState("");

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    setIsMobile(/android|iPad|iPhone|iPod/i.test(userAgent));
  }, []);

  // Handle numeric-only input for the custom input field
  const handleCustomInputChange = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    setCustomInput(value);
  };

  return (
    <div>
      <h1>{isMobile ? "Mobile Device" : "Desktop/PC"}</h1>
      <OtpInput
        value={otp}
        onChange={(value) => setOtp(value)}
        numInputs={6}
        renderSeparator={<span></span>}
        renderInput={(props) => (
          <input
            {...props}
            inputMode="numeric"
            type="number"
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
      <div>
        <input
          className="input-number"
          type="text"
          maxLength="5"
          value={customInput}
          onChange={handleCustomInputChange}
          style={{
            width: "200px",
            height: "40px",
            fontSize: "1.5rem",
            textAlign: "center",
            margin: "1rem",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />
      </div>
      <button
        type="button"
        style={{
          width: "300px",
          height: "40px",
          backgroundColor: "#FF5349",
          color: "white",
          borderRadius: "6px",
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Otp;
