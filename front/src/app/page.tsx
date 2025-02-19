import Navbar from "@/components/Navbar";
import UploadPage from "@/components/UploadPage";
import React from "react";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-black bg-grid-small-white/[0.2]">
      {/* Navbar should be outside the flex container to remain sticky */}
      <Navbar />

      {/* Background effect container */}
      <div className="h-[50rem] w-full flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black[mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <UploadPage />
      </div>
    </div>
  );
}
