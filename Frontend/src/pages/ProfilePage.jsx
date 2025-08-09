import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";

const ProfilePage = () => {
    let { userData } = useSelector(state => state.user);
    let navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full relative border border-gray-200 hover:shadow-2xl transition-shadow duration-300">

                {/* Back Button */}
                <button
                    onClick={() => navigate("/")}
                    className="absolute top-5 left-5 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                >
                    <FaArrowLeftLong className="w-5 h-5 text-gray-800" />
                </button>

                {/* Profile Header */}
                <div className="flex flex-col items-center text-center">
                    {userData.photoUrl ? (
                        <img
                            src={userData?.photoUrl}
                            alt="Profile"
                            className="w-28 h-28 rounded-full object-cover border-4 border-black shadow-md"
                        />
                    ) : (
                        <div className="w-28 h-28 rounded-full text-white flex items-center justify-center text-3xl font-semibold bg-black shadow-md">
                            {userData?.name?.[0]?.toUpperCase()}
                        </div>
                    )}
                    <h2 className="text-2xl font-bold mt-4 text-gray-800">{userData.name}</h2>
                    <p className="text-sm text-gray-500">{userData.role}</p>
                </div>

                {/* Profile Info */}
                <div className="mt-6 space-y-4">
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-semibold text-gray-700">Email:</span>
                        <span className="text-gray-800">{userData.email}</span>
                    </div>

                    <div className="flex justify-between border-b border-gray-200 pb-2 items-start">
                        <span className="font-semibold text-gray-700">Bio:</span>
                        <span className="text-gray-800 text-right break-words max-w-[70%]">
                            {userData.description || "No bio available"}
                        </span>
                    </div>


                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">Enrolled Courses:</span>
                        <span className="text-gray-800">{userData.enrolledCourses.length}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={() => navigate("/editprofile")}
                        className="px-6 py-2 rounded-lg bg-black text-white font-medium shadow-md hover:bg-gray-800 active:scale-95 transition"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
