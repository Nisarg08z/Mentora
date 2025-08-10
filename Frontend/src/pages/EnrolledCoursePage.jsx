import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";

function EnrolledCourse() {
    const navigate = useNavigate()

    const { userData } = useSelector((state) => state.user);

 return (
  <div className="min-h-screen w-full px-6 py-12 bg-gradient-to-b from-gray-50 to-gray-100 relative">

    {/* Back Button */}
    <FaArrowLeftLong
      className="absolute top-6 left-6 w-7 h-7 text-gray-700 cursor-pointer hover:text-indigo-600 transition-colors duration-300"
      onClick={() => navigate("/")}
      role="button"
      aria-label="Go back"
    />

    {/* Page Title */}
    <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-12 select-none tracking-tight animate-fadeIn">
      My Enrolled Courses
    </h1>

    {/* No courses message */}
    {userData.enrolledCourses.length === 0 ? (
      <p className="text-center text-gray-500 text-lg mt-16 select-none animate-fadeIn">
        You haven’t enrolled in any course yet.
      </p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {userData.enrolledCourses.map((course, index) => (
          <div
            key={course._id}
            className="bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden w-72 hover:shadow-2xl transition-all duration-300 flex flex-col group animate-slideUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="overflow-hidden rounded-t-3xl">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-44 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
                loading="lazy"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
                {course.title}
              </h2>
              <p className="text-sm text-indigo-600 font-medium mb-1 uppercase tracking-wide">
                {course.category}
              </p>
              <p className="text-sm text-gray-600 mb-6">{course.level}</p>

              <button
                onClick={() => navigate(`/viewlecture/${course._id}`)}
                className="mt-auto bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 text-black py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300"
                aria-label={`Watch course ${course.title}`}
              >
                Watch Now
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);



}

export default EnrolledCourse
