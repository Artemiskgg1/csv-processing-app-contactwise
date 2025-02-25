import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-black opacity-90 z-50 px-6 py-4 flex items-center justify-between ">
      <h1 className="text-2xl font-unigeo sm:text-3xl bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 font-bold text-transparent">
        contactwise
      </h1>
      <div className="flex items-center gap-2">
        <img
          src="/images/cw-logo.png"
          alt="ContactWise Logo"
          className="h-10 w-10"
        />
      </div>
    </nav>
  );
};

export default Navbar;
