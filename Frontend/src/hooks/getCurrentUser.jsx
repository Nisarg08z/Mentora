import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { fetchCurrentUser } from "../utils/api";

const useCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await fetchCurrentUser();
        dispatch(setUserData(user));
      } catch (error) {
        console.error("Fetch user failed:", error);
        dispatch(setUserData(null));
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useCurrentUser;
