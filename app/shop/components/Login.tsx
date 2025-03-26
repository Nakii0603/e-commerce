"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ShopLogin() {
  const [email, setEmail] = useState(""); // Change state variable to 'email'
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/auth/shop/login`, // Adjusted endpoint
        { email, password } // Send email instead of username
      );
      localStorage.setItem("token", response.data.token);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error during API call", error);
    }
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center h-screen">
      <h1>Login</h1>
      <input
        className="w-[300px] border-[1px] border-black h-[40px] rounded-md px-2"
        type="email" // Use 'email' input type for validation
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Update state to 'setEmail'
      />
      <input
        className="w-[300px] border-[1px] border-black h-[40px] rounded-md px-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <div
        onClick={handleLogin}
        className="bg-[#1443FF] w-[300px] text-center rounded-[4px] text-white p-1 cursor-pointer"
      >
        Login
      </div>
    </div>
  );
}
