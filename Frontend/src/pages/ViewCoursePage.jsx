import React, { useEffect, useState, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeftLong, FaLock, FaStar } from "react-icons/fa6";
import { FaPlayCircle } from "react-icons/fa";
import img from "../assets/empty.jpg"
import Card from "../components/Card.jsx"
import ReviewCard from "../components/ReviewCard.jsx"
import { setSelectedCourseData } from '../redux/courseSlice';
import { toast } from 'react-toastify';
import { giveReview, getCourseReviews, getCreator, createOrder, verifyPayment } from "../utils/api.js"


// Memoized ReviewForm component to reduce re-renders & fix scroll jump on typing
const ReviewForm = memo(({ onSubmit, loading }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    onSubmit(rating, comment);
    setRating(0);
    setComment("");
  };

  return (
    <div>
      <div className="flex gap-1 mb-2">
        {[1, 2, 3, 4, 5].map(star => (
          <FaStar
            key={star}
            onClick={() => setRating(star)}
            className={`cursor-pointer ${star <= rating ? "fill-yellow-500" : "fill-gray-300"}`}
          />
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border rounded-lg p-2"
        rows={3}
        placeholder="Share your feedback..."
        style={{ resize: "none" }}
      />
      <button
        className="bg-black text-white px-4 py-2 rounded mt-3 hover:bg-gray-800 transition-all disabled:opacity-50"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  )
});


const ViewCoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { courseData, selectedCourseData } = useSelector(state => state.course);
  const { lectureData } = useSelector(state => state.lecture);
  const { userData } = useSelector(state => state.user);

  const [creatorData, setCreatorData] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [selectedCreatorCourse, setSelectedCreatorCourse] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [loadingReview, setLoadingReview] = useState(false);

  // Calculate average rating
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const avgRating = calculateAverageRating(selectedCourseData?.reviews);

  // Fetch selected course data from redux courseData array
  const fetchCourseData = () => {
    courseData.forEach((item) => {
      if (item._id === courseId) {
        dispatch(setSelectedCourseData(item));
      }
    });
  };

  // Check if user is enrolled in this course
  const checkEnrollment = () => {
    const verify = userData?.enrolledCourses?.some(c => {
      const enrolledId = typeof c === 'string' ? c : c._id;
      return enrolledId?.toString() === courseId?.toString();
    });
    if (verify) setIsEnrolled(true);
  };

  // Fetch reviews for the course
  const fetchReviews = async () => {
    try {
      const data = await getCourseReviews(courseId);
      setReviews(data);
    } catch (error) {
      toast.error(error?.message || "Failed to load reviews");
    }
  };

  useEffect(() => {
    fetchCourseData();
    checkEnrollment();
  }, [courseId, courseData, lectureData]);

  useEffect(() => {
    const fetchCreatorData = async () => {
      if (selectedCourseData?.creator) {
        try {
          const creator = await getCreator(selectedCourseData.creator);
          setCreatorData(creator);
        } catch (error) {
          console.error("Error fetching creator:", error);
        }
      }
    };
    fetchCreatorData();
  }, [selectedCourseData]);

  useEffect(() => {
    if (creatorData?._id && courseData.length > 0) {
      const creatorCourses = courseData.filter(
        (course) =>
          course.creator === creatorData._id && course._id !== courseId
      );
      setSelectedCreatorCourse(creatorCourses);
    }
  }, [creatorData, courseData]);

  useEffect(() => {
    fetchReviews();
  }, [courseId]);

  // Handle review submission from ReviewForm component
  const handleReview = async (rating, comment) => {
    setLoadingReview(true);
    try {
      await giveReview(rating, comment, courseId);
      toast.success("Review Added");
      await fetchReviews(); // refresh reviews
    } catch (error) {
      toast.error(error?.message || "Failed to add review");
    } finally {
      setLoadingReview(false);
    }
  };

  // Enrollment & payment handling
  const handleEnroll = async (courseId, userId) => {
    try {
      const orderData = await createOrder(courseId, userId);
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: "INR",
        name: "Virtual Courses",
        description: "Course Enrollment Payment",
        order_id: orderData.id,
        handler: async (response) => {
          try {
            const verifyRes = await verifyPayment(response, courseId, userId);
            setIsEnrolled(true);
            toast.success(verifyRes.message);
          } catch {
            toast.error("Payment verification failed.");
          }
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Something went wrong while enrolling.");
      console.error("Enroll Error:", err);
    }
  };

  // Section layout component
  const Section = ({ title, children, className = "" }) => (
    <div className={`space-y-4 ${className}`}>
      <h2 className="text-xl font-bold text-gray-900 border-b pb-2">{title}</h2>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-8">

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
        >
          <FaArrowLeftLong /> Back to Courses
        </button>

        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Thumbnail */}
          <div className="w-full lg:w-1/2 overflow-hidden rounded-xl shadow-md hover:scale-[1.02] transition-transform">
            <img
              src={selectedCourseData?.thumbnail || img}
              alt="Course Thumbnail"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Course Info */}
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">{selectedCourseData?.title}</h1>
            <p className="text-gray-600">{selectedCourseData?.subTitle}</p>

            {/* Ratings */}
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-yellow-500">
                ⭐ {avgRating}
              </span>
              <span className="text-gray-500 text-sm">({reviews.length} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-semibold text-black">₹{selectedCourseData?.price}</span>
              <span className="line-through text-gray-400">₹599</span>
            </div>

            {/* Enroll / Watch Button */}
            {!isEnrolled ? (
              <button
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all"
                onClick={() => userData?._id && handleEnroll(courseId, userData._id)}
                disabled={!userData?._id}
                title={!userData?._id ? "Please login to enroll" : ""}
              >
                Enroll Now
              </button>
            ) : (
              <button
                className="bg-green-100 text-green-700 px-6 py-3 rounded-lg hover:bg-green-200 transition-all"
                onClick={() => navigate(`/viewlecture/${courseId}`)}
              >
                Watch Now
              </button>
            )}
          </div>
        </div>

        {/* What You'll Learn Section */}
        <Section title="What You’ll Learn">
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {selectedCourseData?.description
              ?.split(".")
              .map((item, index) => {
                const trimmed = item.trim();
                return trimmed ? <li key={index}>{trimmed}</li> : null;
              })}
          </ul>
        </Section>

        {/* Course Curriculum */}
        <Section title="Course Curriculum" className="flex flex-col">
          <div className="flex flex-col lg:flex-row gap-3">

            {/* Curriculum List */}
            <div className="bg-gray-50 w-full lg:w-2/5 p-5 rounded-xl border space-y-2">
              {selectedCourseData?.lectures?.length > 0 ? (
                selectedCourseData.lectures.map((lecture) => (
                  <button
                    key={lecture._id || lecture.lectureTitle}
                    disabled={!lecture.isPreviewFree}
                    onClick={() => lecture.isPreviewFree && setSelectedLecture(lecture)}
                    className={`flex items-center gap-3 p-3 rounded-lg text-left w-full border transition-all
                    ${lecture.isPreviewFree
                        ? "hover:bg-white cursor-pointer border-gray-300"
                        : "cursor-not-allowed opacity-60 border-gray-200"}
                    ${selectedLecture?.lectureTitle === lecture.lectureTitle ? "bg-white shadow" : ""}`}
                    title={!lecture.isPreviewFree ? "Enroll to unlock this lecture" : ""}
                  >
                    {lecture.isPreviewFree
                      ? <FaPlayCircle className="text-blue-500 text-lg" />
                      : <FaLock className="text-gray-500 text-lg" />}
                    <span className="text-sm font-medium truncate">{lecture.lectureTitle}</span>
                  </button>
                ))
              ) : (
                <p className="text-gray-500 italic text-sm">No lectures added yet.</p>
              )}
            </div>

            {/* Video Preview */}
            <div className="w-full lg:w-3/5">
              <div className="aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
                {selectedLecture?.videoUrl ? (
                  <video
                    src={selectedLecture.videoUrl}
                    controls
                    className="w-full h-full"
                  />
                ) : (
                  <span className="text-white text-sm">Select a free lecture to preview</span>
                )}
              </div>
              <h3 className="mt-3 text-lg font-semibold">
                {selectedLecture?.lectureTitle || "Lecture Title"}
              </h3>
            </div>

          </div>
        </Section>

        {/* Reviews List */}
        <Section title={`Reviews (${reviews.length})`}>
          {reviews.length === 0 ? (
            <p className="text-gray-600 italic">No reviews yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review, idx) => (
                <ReviewCard
                  key={idx}
                  text={review.comment}
                  rating={review.rating}
                  name={review.user?.name || "Anonymous"}
                  image={review.user?.photoUrl || img}
                  role={review.user?.role || ""}
                />
              ))}
            </div>
          )}
        </Section>

        {/* Write a Review */}
        <Section title="Write a Review">
          <ReviewForm onSubmit={handleReview} loading={loadingReview} />
        </Section>

        {/* Instructor */}
        <Section title="Instructor">
          <div className="flex items-center gap-4">
            <img
              src={creatorData?.photoUrl || img}
              alt="Instructor"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold">{creatorData?.name}</h3>
              <p className="text-sm text-gray-600">{creatorData?.description}</p>
              <p className="text-sm text-gray-600">{creatorData?.email}</p>
            </div>
          </div>
        </Section>

        {/* Other Courses */}
        {selectedCreatorCourse.length > 0 && (
          <Section title="More Courses by this Educator">
            <div className="flex flex-wrap gap-6">
              {selectedCreatorCourse.map((item, idx) => (
                <Card key={idx} {...item} />
              ))}
            </div>
          </Section>
        )}

      </div>
    </div>
  )
}

export default ViewCoursePage;
