import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseData } from '../redux/courseSlice.js';
import { useEffect } from 'react';
import React from 'react'
import { getPublishedCourses } from "../utils/api.js";

const getCouseData = () => {

  const dispatch = useDispatch()
  const {userData} = useSelector((state)=>state.user)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getPublishedCourses();
        dispatch(setCourseData(data));
      } catch (error) {
        console.log("Could not fetch courses");
      }
    };

    fetchCourses();
  }, [dispatch]);

}

export default getCouseData


