import React, { useEffect, useState } from "react";
import Card from "../components/Card.jsx";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import ai from "../assets/SearchAi.png";
import { useSelector } from "react-redux";

function AllCourses() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [filterCourses, setFilterCourses] = useState([]);
  const { courseData } = useSelector((state) => state.course);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let courseCopy = courseData.slice();
    if (category.length > 0) {
      courseCopy = courseCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    setFilterCourses(courseCopy);
  };

  useEffect(() => {
    setFilterCourses(courseData);
  }, [courseData]);

  useEffect(() => {
    applyFilter();
  }, [category]);

  const categories = [
    "App Development",
    "AI/ML",
    "AI Tools",
    "Data Science",
    "Data Analytics",
    "Ethical Hacking",
    "UI UX Designing",
    "Web Development",
    "Others",
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Nav />

      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setIsSidebarVisible((prev) => !prev)}
        className="fixed top-24 left-4 z-50 bg-black text-white px-4 py-2 rounded-lg shadow-lg md:hidden hover:bg-gray-800 transition"
      >
        {isSidebarVisible ? "Close Filters" : "Show Filters"}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[280px] bg-white border-r border-gray-200 shadow-lg 
        transform transition-transform duration-300 ease-in-out z-50
        ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
            <FaArrowLeftLong
              className="cursor-pointer hover:text-black transition"
              onClick={() => navigate("/")}
            />
            Filters
          </h2>
          <button
            className="md:hidden text-sm text-gray-500 hover:text-black"
            onClick={() => setIsSidebarVisible(false)}
          >
            ✕
          </button>
        </div>

        {/* Filter Form */}
        <form
          className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-60px)]"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* AI Search Button */}
          <button
            onClick={() => navigate("/searchwithai")}
            className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-gradient-to-r from-gray-800 to-black text-white rounded-lg shadow hover:opacity-90 transition"
          >
            Search with AI
            <img
              src={ai}
              className="w-6 h-6 rounded-full border border-white"
              alt="AI Search"
            />
          </button>

          {/* Category Checkboxes */}
          <div>
            <h3 className="font-medium text-gray-700 mb-3">Categories</h3>
            <div className="space-y-3">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    className="accent-black w-4 h-4"
                    value={cat}
                    onChange={toggleCategory}
                  />
                  <span className="text-gray-600 group-hover:text-black transition">
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </form>
      </aside>

      {/* Main Courses Section */}
      <main className="w-full py-[100px] px-4 md:pl-[300px]">
        <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-2xl font-bold text-gray-800">
            All Courses
          </h1>
          <span className="text-gray-500">
            {filterCourses?.length} results found
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterCourses?.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <Card
                thumbnail={item.thumbnail}
                title={item.title}
                price={item.price}
                category={item.category}
                id={item._id}
                reviews={item.reviews}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default AllCourses;
