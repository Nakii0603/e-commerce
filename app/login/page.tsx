import Login from "@/components/auth/Login";
import Otp from "@/components/otp";
import React from "react";

export default function page() {
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div>
        <Login />
      </div>
    </div>
  );
}
