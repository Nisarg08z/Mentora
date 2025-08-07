import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAllReview } from '../redux/reviewSlice'
import { getAllReviewsApi } from "../utils/api";


const getAllReviews = () => {

  const dispatch = useDispatch()


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await getAllReviewsApi();
        dispatch(setAllReview(reviews));
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, [dispatch]);

}

export default getAllReviews
