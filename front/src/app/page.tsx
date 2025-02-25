import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import UploadPage from "@/components/UploadPage";
import React from "react";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-zinc-950 flex flex-col">
      <div className="sticky top-0 z-50 bg-zinc-950">
        <Navbar />
      </div>

      <div className="flex flex-col flex-grow items-center justify-center">
        <Hero />
        <div className="w-full flex items-center justify-center mt-10">
          <UploadPage />
        </div>
      </div>

      <Footer />
    </div>
  );
}
