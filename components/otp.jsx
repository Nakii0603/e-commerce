"use client";
import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";

const Otp = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android|iPad|iPhone|iPod/i.test(userAgent)) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

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
            type="tel"
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
