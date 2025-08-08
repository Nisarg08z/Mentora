import React from 'react';
import about from "../assets/about.jpg";
import VideoPlayer from './VideoPlayer';
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { BiSolidBadgeCheck } from "react-icons/bi";

const About = () => {
  return (
    <section className="w-full px-4 md:px-10 lg:px-20 py-12 flex flex-col lg:flex-row items-center justify-center gap-10 bg-white">
      {/* Left Side - Image & Video */}
      <div className="relative w-full lg:w-1/2 flex items-center justify-center">
        <img
          src={about}
          alt="About"
          className="w-full max-w-[500px] h-auto rounded-xl shadow-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <VideoPlayer />
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="w-full lg:w-1/2 space-y-6 text-gray-800">
        {/* Section Title */}
        <div className="flex items-center gap-3 text-primary text-lg font-medium">
          <span>About Us</span>
          <TfiLayoutLineSolid className="w-6 h-6" />
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl font-bold leading-snug">
          We Maximize Your Learning Growth
        </h2>

        {/* Description */}
        <p className="text-base leading-relaxed text-gray-600">
          We provide a modern Learning Management System to simplify online education,
          track progress, and enhance student-instructor collaboration efficiently.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <BiSolidBadgeCheck className="text-green-600 w-5 h-5" />
            Simplified Learning
          </div>
          <div className="flex items-center gap-2">
            <BiSolidBadgeCheck className="text-green-600 w-5 h-5" />
            Expert Trainers
          </div>
          <div className="flex items-center gap-2">
            <BiSolidBadgeCheck className="text-green-600 w-5 h-5" />
            Big Experience
          </div>
          <div className="flex items-center gap-2">
            <BiSolidBadgeCheck className="text-green-600 w-5 h-5" />
            Lifetime Access
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
