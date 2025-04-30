"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ShopProfile() {
  const [shopData, setShopData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const getInfo = async () => {
    try {
      const shopId = localStorage.getItem("shopId");
      const token = localStorage.getItem("token");
      const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/auth/shop/getInfo/${shopId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const shopData = response.data.shop;
      setShopData(shopData);
      setIsModalOpen(true);
    } catch (error) {
      console.log("Error during API call");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="w-[40px] text-center rounded-[4px] text-white  p-1 cursor-pointer" onClick={getInfo}>
        <img src="/user.png" alt="User Icon" />
      </div>
      {isModalOpen && (
        <>
          <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="fixed right-0 top-0 w-[300px] h-full bg-white text-black border-[1px] border-black p-4 z-10 rounded-l-[8px]">
            <h2 className="text-xl font-semibold">Shop Information</h2>
            {shopData && (
              <div>
                <div className="flex">
                  <p className=" font-bold">Shop Name:</p>
                  <span>{shopData.shopName}</span>
                </div>
                <div className="flex">
                  <p className=" font-bold">Email:</p>
                  <span>{shopData.email}</span>
                </div>
                <div className="flex">
                  <p className=" font-bold">Phone:</p>
                  <span>{shopData.phoneNumber}</span>
                </div>
              </div>
            )}
            <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
}
