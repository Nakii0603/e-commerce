"use client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const handleShop = () => {
    router.push("shop");
  };

  return (
    <header className=" ">
      <div className="flex fixed justify-between  max-w-[1400px] left-0 right-0 mx-auto h-[50px] items-center">
        <h2 className="text-[30px] text-[#FF5349]">Nova</h2>
        <div className="flex gap-10 max-md:gap-6 max-sm:gap-3">
          <p className=" cursor-pointer">About</p>
          <p className=" cursor-pointer">Contact</p>
          <p
            className="mr-2 text-[#FF5349] cursor-pointer"
            onClick={handleShop}
          >
            shop owner
          </p>
        </div>
      </div>
    </header>
  );
}
