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
