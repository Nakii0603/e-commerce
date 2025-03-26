"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ShopNavbar from "../shop/components/ShopNavbar";
import CreatePost from "../shop/components/CreatePost";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login if token is not found
      router.push("/login");
    }
  }, [router]);



  return (
    <div>
      <ShopNavbar />
      <CreatePost />
    </div>
  );
}
