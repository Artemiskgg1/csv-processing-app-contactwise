import React from "react";

const Hero = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center px-6 mb-2">
      <h1 className="text-3xl font-unigeo font-bold text-white md:text-7xl">
        The Best {""}
        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
          CSV Parser
        </span>
        <br /> & Background Job Processor.
      </h1>

      <p className="mt-4 text-sm md:text-lg text-gray-300 max-w-2xl">
        Upload and parse CSV files seamlessly while efficiently handling
        background tasks with <span className="text-blue-400">Bull</span> and
        <span className="text-purple-400"> Redis</span>. Our system ensures
        smooth data processing without slowing down your workflow.
      </p>
    </div>
  );
};

export default Hero;
