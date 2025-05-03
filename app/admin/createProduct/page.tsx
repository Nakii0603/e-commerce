"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ShopNavbar from "../components/ShopNavbar";
import CreateProduct from "../components/CreateProduct";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, [router]);

  return (
    <div>
      <ShopNavbar />
      <CreateProduct />
    </div>
  );
}
