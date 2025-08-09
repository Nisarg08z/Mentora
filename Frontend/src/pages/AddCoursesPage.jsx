import React, { useEffect, useRef, useState } from 'react'
import img from "../assets/empty.jpg"
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { setCourseData } from '../redux/courseSlice';
import { fetchCourseByID, handleDelete, editCourse} from '../utils/api'

const AddCoursesPage = () => {

    const navigate = useNavigate()
    const { courseId } = useParams()

    const [selectedCourse, setSelectedCourse] = useState(null)
    const [title, setTitle] = useState("")
    const [subTitle, setSubTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [level, setLevel] = useState("")
    const [price, setPrice] = useState("")
    const [isPublished, setIsPublished] = useState(false)
    const thumb = useRef()
    const [frontendImage, setFrontendImage] = useState(null)
    const [backendImage, setBackendImage] = useState(null)
    let [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { courseData } = useSelector(state => state.course)

    const getCourseById = async () => {
        try {
            const course = await fetchCourseByID(courseId);
            setSelectedCourse(course);
        } catch (error) {
            console.error(error);
            toast.error(error?.message || "Failed to load course");
        }
    };

    useEffect(() => {
        if (selectedCourse) {
            setTitle(selectedCourse.title || "")
            setSubTitle(selectedCourse.subTitle || "")
            setDescription(selectedCourse.description || "")
            setCategory(selectedCourse.category || "")
            setLevel(selectedCourse.level || "")
            setPrice(selectedCourse.price || "")
            setFrontendImage(selectedCourse.thumbnail || img)
            setIsPublished(selectedCourse?.isPublished)
        }
    }, [selectedCourse])

    useEffect(() => {
        getCourseById()

    }, [])
    const handleThumbnail = (e) => {
        const file = e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }

    const editCourseHandler = async () => {
        setLoading(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("subTitle", subTitle);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("level", level);
        formData.append("price", price);
        formData.append("thumbnail", backendImage);
        formData.append("isPublished", isPublished);

        try {
            const updatedCourse = await editCourse(courseId, formData);

            if (updatedCourse.isPublished) {
                const updatedCourses = courseData.map(c =>
                    c._id === courseId ? updatedCourse : c
                );

                if (!courseData.some(c => c._id === courseId)) {
                    updatedCourses.push(updatedCourse);
                }

                dispatch(setCourseData(updatedCourses));
            } else {
                const filteredCourses = courseData.filter(c => c._id !== courseId);
                dispatch(setCourseData(filteredCourses));
            }

            navigate("/courses");
            toast.success("Course Updated");
        } catch (error) {
            toast.error(error?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const removeCourse = async () => {
        setLoading(true);
        try {
            await handleDelete(courseId);
            toast.success("Course Deleted");
            dispatch(setCourseData(courseData.filter(c => c._id !== courseId)));
            navigate("/courses");
        } catch (error) {
            toast.error(error?.message || "Failed to delete course");
        } finally {
            setLoading(false);
        }
    };

    return (
  <div className="max-w-5xl mx-auto p-4 sm:p-6 mt-6 sm:mt-10 bg-white rounded-lg shadow-md">

    {/* Top Bar */}
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <FaArrowLeftLong
          className="w-6 h-6 cursor-pointer text-gray-700 hover:text-black"
          onClick={() => navigate("/courses")}
        />
        <h2 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">
          Add detail information regarding course
        </h2>
      </div>
      <button
        className="bg-black text-white px-4 py-2 rounded-md w-full sm:w-auto"
        onClick={() => navigate(`/createlecture/${selectedCourse?._id}`)}
      >
        Go to lectures page
      </button>
    </div>

    {/* Form Box */}
    <div className="bg-gray-50 p-4 sm:p-6 rounded-md">
      <h3 className="text-lg font-medium mb-4">Basic Course Information</h3>

      {/* Publish / Remove */}
      <div className="flex flex-wrap gap-3 mb-6">
        {!isPublished ? (
          <button
            className="bg-green-100 text-green-700 px-4 py-2 rounded-md border"
            onClick={() => setIsPublished(prev => !prev)}
          >
            Click to Publish
          </button>
        ) : (
          <button
            className="bg-red-100 text-red-700 px-4 py-2 rounded-md border"
            onClick={() => setIsPublished(prev => !prev)}
          >
            Click to UnPublish
          </button>
        )}
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
          disabled={loading}
          onClick={removeCourse}
        >
          {loading ? <ClipLoader size={24} color="white" /> : "Remove Course"}
        </button>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            placeholder="Course Title"
            className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-black outline-none"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
          <input
            type="text"
            placeholder="Subtitle"
            className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-black outline-none"
            onChange={(e) => setSubTitle(e.target.value)}
            value={subTitle}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            placeholder="Course description"
            className="w-full border px-4 py-2 rounded-md h-24 resize-none focus:ring-2 focus:ring-black outline-none"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>

        {/* Category, Level, Price */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              className="w-full border px-4 py-2 rounded-md bg-white focus:ring-2 focus:ring-black outline-none"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="">Select Category</option>
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

          {/* Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Level</label>
            <select
              className="w-full border px-4 py-2 rounded-md bg-white focus:ring-2 focus:ring-black outline-none"
              onChange={(e) => setLevel(e.target.value)}
              value={level}
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (INR)</label>
            <input
              type="number"
              placeholder="₹"
              className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-black outline-none"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course Thumbnail</label>
          <input
            type="file"
            ref={thumb}
            hidden
            onChange={handleThumbnail}
            accept="image/*"
          />
          <div
            className="relative w-[300px] h-[170px] cursor-pointer border rounded-md overflow-hidden hover:opacity-90"
            onClick={() => thumb.current.click()}
          >
            <img
              src={frontendImage}
              alt="Course Thumbnail"
              className="w-full h-full object-cover"
            />
            <MdEdit className="absolute top-2 right-2 w-5 h-5 text-gray-700 bg-white rounded-full p-1" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            className="bg-gray-200 hover:bg-red-200 text-black px-4 py-2 rounded-md border"
            onClick={() => navigate("/courses")}
          >
            Cancel
          </button>
          <button
            className="bg-black text-white px-7 py-2 rounded-md hover:bg-gray-600 disabled:opacity-50"
            disabled={loading}
            onClick={editCourseHandler}
          >
            {loading ? <ClipLoader size={24} color="white" /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  </div>
);

}

export default AddCoursesPage
