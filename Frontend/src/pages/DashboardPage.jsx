import React from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import img from "../assets/empty.jpg";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const { creatorCourseData } = useSelector((state) => state.course);

  const courseProgressData =
    creatorCourseData?.map((course) => ({
      name: course.title.slice(0, 10) + "...",
      lectures: course.lectures.length || 0,
    })) || [];

  const enrollData =
    creatorCourseData?.map((course) => ({
      name: course.title.slice(0, 10) + "...",
      enrolled: course.enrolledStudents?.length || 0,
    })) || [];

  const totalEarnings =
    creatorCourseData?.reduce((sum, course) => {
      const studentCount = course.enrolledStudents?.length || 0;
      const courseRevenue = course.price ? course.price * studentCount : 0;
      return sum + courseRevenue;
    }, 0) || 0;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Back Button */}
      <button
        className="absolute top-6 left-6 flex items-center gap-2 px-3 py-2 rounded-lg bg-white shadow hover:shadow-md transition-all border border-gray-200"
        onClick={() => navigate("/")}
      >
        <FaArrowLeftLong className="w-5 h-5" /> Back
      </button>

      <div className="w-full px-6 py-16 space-y-10">
        {/* Welcome Section */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col md:flex-row items-center gap-6">
          <img
            src={userData?.photoUrl || img}
            alt="Educator"
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
          />
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome, {userData?.name || "Educator"} 👋
            </h1>
            <h2 className="text-lg font-medium text-gray-700">
              Total Earnings:{" "}
              <span className="font-semibold text-green-600">
                ₹{totalEarnings.toLocaleString()}
              </span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              {userData?.description ||
                "Start creating amazing courses for your students!"}
            </p>
            <button
              onClick={() => navigate("/courses")}
              className="px-5 py-2 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition-colors mt-3"
            >
              Create Courses
            </button>
          </div>
        </div>

        {/* Graphs Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Course Progress Chart */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Course Progress
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                <XAxis dataKey="name" stroke="#555" />
                <YAxis stroke="#555" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                  }}
                />
                <Bar
                  dataKey="lectures"
                  fill="#000"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Enrolled Students Chart */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Student Enrollment
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={enrollData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                <XAxis dataKey="name" stroke="#555" />
                <YAxis stroke="#555" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                  }}
                />
                <Bar
                  dataKey="enrolled"
                  fill="#4b5563"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
