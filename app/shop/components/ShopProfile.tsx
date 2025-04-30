"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { tr } from "framer-motion/client";

export default function ShopProfile() {
  const [shop, setShop] = useState<string | null>(null);
  const [shopData, setShopData] = useState<any>(null); // or a specific type if you know the structure
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility
  const router = useRouter();

  const getInfo = async () => {
    try {
      const shopId = localStorage.getItem("shopId");
      console.log(shopId);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/auth/shop/getInfo/${shopId}`);
      const shopData = response.data.shop;
      setShopData(shopData);
      setIsModalOpen(true)
    } catch (error) {
      console.log("Error during API call");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div>
      <div className="w-[40px] text-center rounded-[4px] text-white  p-1 cursor-pointer" onClick={getInfo}>
        <img src="/user.png" alt="User Icon" />
      </div>

      {/* Modal overlay with blurred background */}
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0  bg-opacity-50 backdrop-blur-sm"
            onClick={closeModal} // Close modal when clicking outside
          ></div>

          <div className="fixed right-0 top-0 w-[300px] h-full bg-white text-black border-[1px] border-black p-4 z-10 rounded-l-[8px]">
            {" "}
            <h2 className="text-xl font-semibold">Shop Information</h2>
            {shopData && (
              <div>
                <p>Shop Name: {shopData.shopName}</p>
                <p>Email: {shopData.email}</p>
                <p>Phone: {shopData.phoneNumber}</p>
                <p>Shop ID: {shopData.shopId}</p>
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
