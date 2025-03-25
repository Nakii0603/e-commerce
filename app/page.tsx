import Navbar from "@/components/navbar";
import SignIn from "@/components/auth/Sign";
import React from "react";

export default function page() {
  return (
    <div>
      <Navbar />
      <SignIn />
    </div>
  );
}
