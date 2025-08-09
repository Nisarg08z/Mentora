import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setLectureData } from '../redux/lectureSlice'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import {editLecture, removeLecture} from '../utils/api'


const EditLecturePage = () => {

    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const { courseId, lectureId } = useParams()
    const { lectureData } = useSelector(state => state.lecture)
    const dispatch = useDispatch()
    const selectedLecture = lectureData.find(lecture => lecture._id === lectureId)
    const [videoUrl, setVideoUrl] = useState(null)
    const [lectureTitle, setLectureTitle] = useState(selectedLecture.lectureTitle)
    const [isPreviewFree, setIsPreviewFree] = useState(false)

    const formData = new FormData()
    formData.append("lectureTitle", lectureTitle)
    formData.append("videoUrl", videoUrl)
    formData.append("isPreviewFree", isPreviewFree)

    const handleEditLecture = async () => {
        setLoading(true);
        try {
            const updatedLecture = await editLecture(lectureId, formData);
            dispatch(setLectureData([...lectureData, updatedLecture]));
            toast.success("Lecture Updated");
            navigate("/courses");
        } catch (error) {
            toast.error(error?.message || "Failed to update lecture");
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveLecture = async () => {
        setLoading1(true);
        try {
            await removeLecture(lectureId);
            toast.success("Lecture Removed");
            navigate(`/createlecture/${courseId}`);
        } catch (error) {
            toast.error(error?.message || "Lecture remove error");
        } finally {
            setLoading1(false);
        }
    };

    const navigate = useNavigate()
    
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-6">

                {/* Header Inside Box */}
                <div className="flex items-center gap-2 mb-2">
                    <FaArrowLeft className="text-gray-600 cursor-pointer" onClick={() => navigate(`/createlecture/${courseId}`)} />
                    <h2 className="text-xl font-semibold text-gray-800">Update Your Lecture</h2>
                </div>

                {/* Instruction */}
                <div>

                    <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all text-sm" disabled={loading1} onClick={handleRemoveLecture}>
                        {loading1 ? <ClipLoader size={30} color='white' /> : "Remove Lecture"}
                    </button>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[black]focus:outline-none"
                            placeholder={selectedLecture.lectureTitle}
                            onChange={(e) => setLectureTitle(e.target.value)}
                            value={lectureTitle}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Video *</label>
                        <input
                            type="file"
                            required
                            accept='video/*'
                            className="w-full border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-700 file:text-[white] hover:file:bg-gray-500"
                            onChange={(e) => setVideoUrl(e.target.files[0])}
                        />
                    </div>

                    {/* Toggle */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"

                            className="accent-[black] h-4 w-4"

                            onChange={() => setIsPreviewFree(prev => !prev)}
                        />
                        <label htmlFor="isFree" className="text-sm text-gray-700">Is this video FREE</label>
                    </div>
                </div>
                <div>
                    {loading ? <p>Uploading video... Please wait.</p> : ""}
                </div>
                {/* Submit Button */}
                <div className="pt-4">
                    <button className="w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-700 transition" disabled={loading} onClick={handleEditLecture}>
                        {loading ? <ClipLoader size={30} color='white' /> : "Update Lecture"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditLecturePage
