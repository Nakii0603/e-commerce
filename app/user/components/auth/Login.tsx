"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState(""); // Change state variable to 'email'
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/auth/login`, // Adjusted endpoint
        { email, password } // Send email instead of username
      );
      const responseData = response.data;
      const token = response.data.token;
      localStorage.setItem("token", token);
      console.log(token);
      console.log("Login successful", responseData);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error during API call", error);
    }
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center h-screen">
      <h1>Login</h1>
      <input
        className="border-[1px] p-1 border-black rounded-[4px]"
        type="email" // Use 'email' input type for validation
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Update state to 'setEmail'
      />
      <input
        className="border-[1px] p-1 border-black rounded-[4px]"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <div
        onClick={handleLogin}
        className="bg-[#FF5349] w-[100%] text-center rounded-[4px] text-white p-1 cursor-pointer"
      >
        Login
      </div>
    </div>
  );
}
