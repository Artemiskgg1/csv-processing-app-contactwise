import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-zinc-950 z-50 px-6 py-4 flex items-center justify-between ">
      {/* Left Side - CSV Parser */}
      <h1 className="text-2xl sm:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-blue-200 to-blue-600 font-hatton">
        contactwise
      </h1>

      {/* Right Side - ContactWise with Logo */}
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
