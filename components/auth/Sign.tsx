"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface SignInResponse {
  token: string;
}

export default function Sign() {
  const [email, setEmail] = useState<string>(""); // Type email as string
  const [password, setPassword] = useState<string>(""); // Type password as string
  const [error, setError] = useState<string | null>(null); // Type error as string | null
  const router = useRouter();

  // Email and password validation
  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isValidPassword = (password: string) => password.length >= 6; // Basic check for password length

  const handleSign = async () => {
    // Basic validation before submitting
    if (!isValidEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }
    if (!isValidPassword(password)) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const response = await axios.post<SignInResponse>(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/auth/sign`, // Adjusted endpoint
        { email, password } // Send email and password
      );

      const token = response.data.token;
      localStorage.setItem("token", token);
      router.push("/login"); // Adjust path if necessary
      console.log(token);
      console.log("Sign successful", response.data);
    } catch (error) {
      console.error("Error during API call", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center h-screen">
      <h1>Sign</h1>
      <input
        className="border-[1px] p-1 border-black rounded-[4px]"
        type="email"
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
        onClick={handleSign}
        className="bg-[#FF5349] w-[100%] text-center rounded-[4px] text-white p-1 cursor-pointer"
      >
        Login
      </div>
    </div>
  );
}
