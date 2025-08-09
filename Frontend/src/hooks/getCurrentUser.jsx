import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData, setLoading } from "../redux/userSlice";
import { fetchCurrentUser } from "../utils/api";

const getCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setLoading(true));
      try {
        const user = await fetchCurrentUser();
        dispatch(setUserData(user || null));
      } catch (error) {
        console.error("Fetch user failed:", error);
        dispatch(setUserData(null));
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default getCurrentUser;
