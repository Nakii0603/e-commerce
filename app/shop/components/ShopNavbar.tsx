"use client";
import Link from "next/link";
import ShopProfile from "./ShopProfile";

export default function ShopNavbar() {
  return (
    <div className="bg-[#FF5349]">
      <div className="flex justify-between items-center h-[60px] px-10 max-w-[1440px] mx-auto text-white gap-6">
        <div className="flex gap-6">
          <Link className="text-[24px] max-md:text-[16px]" href="/dashboard">
            Create post
          </Link>
          <Link className="text-[24px] max-md:text-[16px]" href="/product">
            Product list
          </Link>
          <Link className="text-[24px] max-md:text-[16px]" href="#">
            Orders
          </Link>
          {/* <Link className="text-[24px] max-md:text-[16px]" href="#">
            Users
          </Link>
          <Link className="text-[24px] max-md:text-[16px]" href="#">
            Lottery
          </Link> */}
        </div>
        <ShopProfile />
      </div>
    </div>
  );
}
