import React from "react";

export default function Navbar() {
  return (
    <header className=" ">
      <div className="flex fixed justify-between  max-w-[1400px] left-0 right-0 mx-auto h-[50px] items-center">
        <h2 className="text-[30px] text-[#FF5349]">Nova</h2>
        <div className="flex gap-10 max-md:gap-6 max-sm:gap-3">
          <p>About</p>
          <p>Contact</p>
          <p>you account name</p>
        </div>
      </div>
    </header>
  );
}
