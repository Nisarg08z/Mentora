// src/utils/api.js
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}api/`;

// Auth APIs
export const signUpUser = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}auth/signup`, formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Signup Error:", error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

export const signUpWithGoogle = async ({ name, email, role }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}auth/googlesignup`,
      { name, email, role },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Google Signup Error:", error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}auth/login`,
      { email, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

export const googleAuth = async ({ name, email, role }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}auth/googlesignup`,
      { name, email, role },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Google Auth Error:", error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}auth/logout`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Logout Error:", error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

export const fetchCurrentUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}user/currentuser`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Current User API Error:", error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

export const getPublishedCourses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}course/getpublishedcoures`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching published courses:", error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

export const getAllReviewsApi = async () => {
  try {
    const response = await axios.get(`${BASE_URL}review/allReview`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Fetching reviews failed:", error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

export const fetchCreatorCourses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}course/getcreatorcourses`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Creator Course API Error:", error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

export const sendOtp = async (email) => {
  try {
    const response = await axios.post(
      `${BASE_URL}auth/sendotp`,
      { email },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Send OTP Error:", error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

export const verifyOtp = async ({ email, otp }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}auth/verifyotp`,
      { email, otp },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Verify OTP Error:", error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

export const resetPassword = async ({ email, password }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}auth/resetpassword`,
      { email, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Reset Password Error:", error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

export const updateUserProfile = async (formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}user/updateprofile`,
      formData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Update Profile Error:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data || error;
  }
};

export const getCreatorCourses = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}course/getcreatorcourses`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Get Creator Courses API Error:", error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

export const createCourse = async (title, category) => {
  try {
    const response = await axios.post(
      `${BASE_URL}course/create`,
      { title, category },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Create Course API Error:", error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

export const handleDelete = async (courseId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}course/removecourse/${courseId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Remove Course API Error:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data || error;
  }
};

export const editCourse = async (courseId, formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}course/editcourse/${courseId}`,
      formData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Edit Course API Error:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data || error;
  }
};

export const fetchCourseByID = async (courseId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}course/getcourse/${courseId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Get Course By ID API Error:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data || error;
  }
};

export const createLecture = async (courseId, lectureTitle) => {
  try {
    const response = await axios.post(
      `${BASE_URL}course/createlecture/${courseId}`,
      { lectureTitle },
      { withCredentials: true }
    );
    return response.data; 
  } catch (error) {
    console.error(
      "Create Lecture API Error:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data || error;
  }
};

export const getCourseLectures = async (courseId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}course/getcourselecture/${courseId}`,
      { withCredentials: true }
    );
    return response.data; 
  } catch (error) {
    console.error(
      "Get Lectures API Error:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data || error;
  }
};

export const editLecture = async (lectureId, formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}course/editlecture/${lectureId}`,
      formData,
      { withCredentials: true }
    );
    return response.data; 
  } catch (error) {
    console.error(
      "Edit Lecture API Error:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data || error;
  }
};

export const removeLecture = async (lectureId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}course/removelecture/${lectureId}`,
      { withCredentials: true }
    );
    return response.data; 
  } catch (error) {
    console.error(
      "Remove Lecture API Error:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data || error;
  }
};

export const giveReview = async (rating, comment, courseId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}review/givereview`,
      { rating, comment, courseId },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Give Review API Error:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data || error;
  }
};

export const getCreator = async (userId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}course/getcreator`,
      { userId },
      { withCredentials: true }
    );
    return response.data; 
  } catch (error) {
    console.error(
      "Get Creator API Error:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data || error;
  }
};

export const createOrder = async (courseId, userId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}payment/create-order`,
      { courseId, userId },
      { withCredentials: true }
    );
    return response.data; 
  } catch (error) {
    console.error(
      "Create Order API Error:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data || error;
  }
};

export const verifyPayment = async (paymentResponse, courseId, userId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}payment/verify-payment`,
      { ...paymentResponse, courseId, userId },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Verify Payment API Error:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data || error;
  }
};

export const getCourseReviews = async (courseId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}review/getCourseReviews/${courseId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Get Course Reviews API Error:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data || error;
  }
};

export const getRecommendations = async (query) => {
  try {
    const response = await axios.post(
      `${BASE_URL}ai/search`,
      { input: query },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Get Recommendations API Error:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data || error;
  }
};
