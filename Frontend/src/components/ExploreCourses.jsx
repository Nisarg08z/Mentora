import React from 'react';
import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopAnalytics, TbBrandOpenai } from "react-icons/tb";
import { LiaUikit } from "react-icons/lia";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { SiGoogledataproc, SiOpenaigym } from "react-icons/si";
import { BsClipboardDataFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const courseIcons = [
  { title: "Web Development", icon: <TbDeviceDesktopAnalytics className="w-10 h-10 text-gray-700" />, bg: "bg-purple-100" },
  { title: "UI/UX Design", icon: <LiaUikit className="w-10 h-10 text-gray-700" />, bg: "bg-green-100" },
  { title: "App Development", icon: <MdAppShortcut className="w-10 h-10 text-gray-700" />, bg: "bg-pink-200" },
  { title: "Ethical Hacking", icon: <FaHackerrank className="w-10 h-10 text-gray-700" />, bg: "bg-purple-100" },
  { title: "AI / ML", icon: <TbBrandOpenai className="w-10 h-10 text-gray-700" />, bg: "bg-green-100" },
  { title: "Data Science", icon: <SiGoogledataproc className="w-10 h-10 text-gray-700" />, bg: "bg-pink-200" },
  { title: "Data Analytics", icon: <BsClipboardDataFill className="w-10 h-10 text-gray-700" />, bg: "bg-purple-100" },
  { title: "AI Tools", icon: <SiOpenaigym className="w-10 h-10 text-gray-700" />, bg: "bg-green-100" },
];

const ExploreCourses = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-white text-gray-800 px-6 py-16 flex flex-col lg:flex-row items-center justify-between gap-10">
      
      {/* Left Text Block */}
      <div className="lg:w-[40%] w-full flex flex-col items-start justify-center gap-4">
        <h2 className="text-3xl sm:text-4xl font-bold">Explore Our Courses</h2>
        <p className="text-[16px] text-gray-600">
          Discover a variety of cutting-edge courses designed to elevate your skills in technology, design, data, and AI — all in one place.
        </p>
        <button
          onClick={() => navigate("/allcourses")}
          className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-md bg-black text-white hover:bg-gray-800 transition"
        >
          Explore Courses <SiViaplay className="w-5 h-5" />
        </button>
      </div>

      {/* Course Category Grid */}
      <div className="lg:w-[60%] w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
        {courseIcons.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center space-y-3 text-sm font-medium">
            <div className={`w-[80px] h-[80px] rounded-xl flex items-center justify-center ${item.bg}`}>
              {item.icon}
            </div>
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreCourses;
