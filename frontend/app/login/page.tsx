import Otp from "@/components/otp";
import React from "react";

export default function page() {
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div>
        <h1>login</h1>
        <Otp />
      </div>
    </div>
  );
}
