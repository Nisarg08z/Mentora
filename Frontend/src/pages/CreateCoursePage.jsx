import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import {createCourse} from '../utils/api'

const CreateCoursePage = () => {
    let navigate = useNavigate()
    let [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")

    const CreateCourseHandler = async () => {
        setLoading(true);
        try {
            const result = await createCourse(title, category);
            console.log(result);
            toast.success("Course Created");
            navigate("/courses");
            setTitle("");
        } catch (error) {
            toast.error(error.message || "Failed to create course");
        } finally {
            setLoading(false);
        }
    };

    return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
    <div className="max-w-xl w-full sm:w-[600px] bg-white shadow-lg rounded-lg p-6 relative">
      
      {/* Header */}
      <div className="flex items-center mb-6">
        <FaArrowLeftLong
          className="w-[22px] h-[22px] cursor-pointer text-gray-600 hover:text-black transition"
          onClick={() => navigate("/courses")}
        />
        <h2 className="text-2xl font-semibold flex-1 text-center text-gray-800">
          Create Course
        </h2>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        
        {/* Course Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Title
          </label>
          <input
            type="text"
            placeholder="Enter course title"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-black transition bg-gray-50 hover:bg-gray-100"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-black transition"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            <option value="App Development">App Development</option>
            <option value="AI/ML">AI/ML</option>
            <option value="AI Tools">AI Tools</option>
            <option value="Data Science">Data Science</option>
            <option value="Data Analytics">Data Analytics</option>
            <option value="Ethical Hacking">Ethical Hacking</option>
            <option value="UI UX Designing">UI UX Designing</option>
            <option value="Web Development">Web Development</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-md transition-all duration-200 hover:bg-gray-800 active:bg-gray-900 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loading}
          onClick={CreateCourseHandler}
        >
          {loading ? <ClipLoader size={30} color="white" /> : "Create"}
        </button>
      </form>
    </div>
  </div>
);

};

export default CreateCoursePage;
