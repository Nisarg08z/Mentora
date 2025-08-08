import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCreatorCourseData } from "../redux/courseSlice";
import { toast } from "react-toastify";
import { fetchCreatorCourses } from "../utils/api";

const useCreatorCourses = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const courses = await fetchCreatorCourses();
        dispatch(setCreatorCourseData(courses));
      } catch (error) {
        toast.error(error?.message || "Failed to fetch creator courses");
      }
    };

    if (userData?._id) getCourses();
  }, [userData, dispatch]);
};

export default useCreatorCourses;
