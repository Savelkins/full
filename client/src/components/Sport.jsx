import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSportByIdAsync } from "../store/sportsSlice";

const Sport = () => {
  const dispatch = useDispatch();
  const { sportId } = useParams();

  const { selectedSport, isLoading, error } = useSelector(
    (state) => state.sports
  );
  useEffect(() => {
    dispatch(fetchSportByIdAsync(sportId));
  }, [dispatch, sportId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return <div>{selectedSport?.name}</div>;
};
export default Sport;
