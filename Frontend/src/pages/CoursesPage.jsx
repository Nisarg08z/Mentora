import React, { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCreatorCourseData } from "../redux/courseSlice";
import img1 from "../assets/empty.jpg";
import { FaArrowLeftLong } from "react-icons/fa6";
import { getCreatorCourses } from "../utils/api";

const CoursesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { creatorCourseData } = useSelector((state) => state.course);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCreatorCourses();
        dispatch(setCreatorCourseData(data));
      } catch (error) {
        toast.error(error.message || "Failed to fetch creator courses");
      }
    };

    fetchCourses();
  }, [dispatch]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-full min-h-screen p-4 sm:p-6 bg-gray-100">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <div className="flex items-center gap-3">
            <FaArrowLeftLong
              className="w-6 h-6 cursor-pointer text-gray-700 hover:text-black transition-colors"
              onClick={() => navigate("/dashboard")}
            />
            <h1 className="text-xl font-semibold text-gray-800">Courses</h1>
          </div>

          <button
            className="bg-black text-white px-4 py-2 rounded-lg shadow hover:bg-gray-800 transition-colors"
            onClick={() => navigate("/createcourses")}
          >
            Create Course
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-xl shadow-md p-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Course
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Price
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {creatorCourseData?.map((course, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  {/* Course Info */}
                  <td className="py-3 px-4 flex items-center gap-4">
                    <img
                      src={course?.thumbnail || img1}
                      alt=""
                      className="w-20 h-14 object-cover rounded-md"
                    />
                    <span className="font-medium text-gray-700">
                      {course?.title}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4 text-gray-700">
                    ₹{course?.price || "NA"}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        course?.isPublished
                          ? "text-green-600 bg-green-100"
                          : "text-red-600 bg-red-100"
                      }`}
                    >
                      {course?.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>

                  {/* Edit Action */}
                  <td className="py-3 px-4">
                    <FaEdit
                      className="text-gray-500 hover:text-blue-600 cursor-pointer transition-colors"
                      onClick={() =>
                        navigate(`/addcourses/${course?._id}`)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-center text-sm text-gray-400 mt-6">
            A list of your recent courses.
          </p>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {creatorCourseData?.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-3 hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={course?.thumbnail || img1}
                  alt=""
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h2 className="font-medium text-sm text-gray-800">
                    {course?.title}
                  </h2>
                  <p className="text-gray-600 text-xs mt-1">
                    ₹{course?.price || "NA"}
                  </p>
                </div>
                <FaEdit
                  className="text-gray-500 hover:text-blue-600 cursor-pointer transition-colors"
                  onClick={() =>
                    navigate(`/addcourses/${course?._id}`)
                  }
                />
              </div>
              <span
                className={`w-fit px-3 py-1 text-xs rounded-full font-medium ${
                  course?.isPublished
                    ? "text-green-600 bg-green-100"
                    : "text-red-600 bg-red-100"
                }`}
              >
                {course?.isPublished ? "Published" : "Draft"}
              </span>
            </div>
          ))}
          <p className="text-center text-sm text-gray-400 mt-4">
            A list of your recent courses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
