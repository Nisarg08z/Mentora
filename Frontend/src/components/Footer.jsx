import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#111] text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo + Description */}
        <div>
          <img
            src={logo}
            alt="Logo"
            className="h-12 mb-4 rounded-md border border-gray-700"
          />
          <h2 className="text-xl font-bold text-white mb-3">Mentora</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            AI-powered learning platform to help you grow smarter. Learn anything, anytime, anywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li
              className="hover:text-white transition cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className="hover:text-white transition cursor-pointer"
              onClick={() => navigate("/allcourses")}
            >
              Courses
            </li>
            <li
              className="hover:text-white transition cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </li>
            <li
              className="hover:text-white transition cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              My Profile
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-semibold mb-3">Explore Categories</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="hover:text-white transition cursor-pointer">Web Development</li>
            <li className="hover:text-white transition cursor-pointer">AI/ML</li>
            <li className="hover:text-white transition cursor-pointer">Data Science</li>
            <li className="hover:text-white transition cursor-pointer">UI/UX Design</li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Mentora. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
