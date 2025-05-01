"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ShopNavbar from "../shop/components/ShopNavbar";
import CreateProduct from "../shop/components/CreateProduct";

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
