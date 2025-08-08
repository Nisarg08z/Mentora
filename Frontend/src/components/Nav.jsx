import React, { useState } from 'react';
import logo from "../assets/logo.png";
import { GiHamburgerMenu, GiSplitCross } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { logoutUser } from "../utils/api";

const Nav = () => {
  const [showHam, setShowHam] = useState(false);
  const [showPro, setShowPro] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.user);

  const handleLogout = async () => {
    try {
      const result = await logoutUser();
      dispatch(setUserData(null));
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error?.response?.data?.message || "Logout failed");
    }
  };

  const Avatar = () => (
    <div
      className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-lg border-2 bg-black border-white cursor-pointer z-[1000]'
      onClick={() => setShowPro(prev => !prev)}
    >
      {userData?.photoUrl ? (
        <img src={userData.photoUrl} className='w-full h-full rounded-full object-cover' alt="Avatar" />
      ) : (
        userData?.name?.slice(0, 1).toUpperCase()
      )}
    </div>
  );

  return (
  <div>
  {/* Navbar */}
  <div className="w-full h-[70px] fixed top-0 px-5 py-2 flex items-center justify-between bg-[#00000047] z-10">
    {/* Logo */}
    <div className="lg:w-1/5 w-2/5 lg:pl-[50px]">
      <img
        src={logo}
        alt="Logo"
        className="w-[60px] rounded-md border-2 border-white cursor-pointer"
        onClick={() => navigate("/")}
      />
    </div>

    {/* Right Side */}
    <div className="flex items-center gap-4">
      {!userData ? (
        <button
          onClick={() => navigate("/login")}
          className="px-5 py-2 border border-white text-white rounded-lg text-base bg-[#000000cc] hover:bg-white hover:text-black transition"
        >
          Login
        </button>
      ) : (
        <div className="relative">
          <Avatar/>

          {/* Profile Dropdown */}
          {showPro && (
            <div className="absolute top-[60px] right-0 w-48 bg-[#1f1f1f] border border-gray-700 rounded-xl shadow-lg z-[9999] p-2">
              <button
                onClick={() => {
                  setShowPro(false);
                  navigate("/profile");
                }}
                className="w-full text-left px-4 py-2 rounded-lg text-gray-200 hover:bg-gray-700 transition"
              >
                My Profile
              </button>
              <button
                onClick={() => {
                  setShowPro(false);
                  navigate("/enrolledcourses");
                }}
                className="w-full text-left px-4 py-2 rounded-lg text-gray-200 hover:bg-gray-700 transition"
              >
                My Courses
              </button>
              {userData?.role === "educator" && (
                <button
                  onClick={() => {
                    setShowPro(false);
                    navigate("/dashboard");
                  }}
                  className="w-full text-left px-4 py-2 rounded-lg text-gray-200 hover:bg-gray-700 transition"
                >
                  Dashboard
                </button>
              )}
              <button
                onClick={() => {
                  setShowPro(false);
                  handleLogout();
                }}
                className="w-full text-left px-4 py-2 rounded-lg text-red-500 hover:bg-red-900 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
</div>


);

};

export default Nav;
