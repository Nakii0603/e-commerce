import React from "react";

export default function Navbar() {
  return (
    <header className=" bg-slate-200">
      <div className="flex mx-4 justify-between max-w-[1400px] mx-auto h-[50px] items-center">
        <h2 className="text-[30px]">Nova</h2>
        <div className="flex gap-10">
          <p>About</p>
          <p>Contact</p>
          <p>you account name</p>
        </div>
      </div>
    </header>
  );
}
