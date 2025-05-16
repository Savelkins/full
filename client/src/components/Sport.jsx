import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CONSTANTS from "../constants";
import { fetchSportByIdAsync } from "../store/sportsSlice";
import FormUpdateSport from "./forms/FormUpdateSport";
const Sport = () => {
  const dispatch = useDispatch();
  const { sportId } = useParams();

  const [isShowForm, setIsShowForm] = useState(false);

  const handleShowForm = () => setIsShowForm(!isShowForm);

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

  return (
    <div>
      <h1>{selectedSport?.name}</h1>
      <p>{selectedSport?.isOlimpic ? "olimpic" : "no olimpic"}</p>

      <img
        src={`${CONSTANTS.API_BAZE_URL}${selectedSport?.image}`}
        alt={selectedSport?.name}
      />
      <button onClick={handleShowForm}>
        {isShowForm ? "hide" : "show"} form update sport
      </button>
      {isShowForm && (
        <FormUpdateSport
          sport={selectedSport}
          handleShowForm={handleShowForm}
        />
      )}
    </div>
  );
};
export default Sport;
