import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CONSTANTS from "../../constants";
import { fetchSportByIdAsync } from "../../store/sportsSlice";
import AthletesList from "../AthletesList/AthletesList";
import FormUpdateSport from "../forms/FormUpdateSport";
import styles from "./sport.module.scss";


const Sport = () => {
  const dispatch = useDispatch();
  const { sportId } = useParams();

  const [isShowForm, setIsShowForm] = useState(false);
  const handleShowForm = () => setIsShowForm(!isShowForm);

  const [isShowAthletes, setIsShowAthletes] = useState(false);
  const handleShowAthletes = () => setIsShowAthletes(!isShowAthletes);

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
    <div className={styles.sport}>
      <h1>{selectedSport?.name}</h1>
      <p>{selectedSport?.isOlimpic ? "olimpic" : "no olimpic"}</p>

      <img
        src={`${CONSTANTS.API_BAZE_URL}${selectedSport?.image}`}
        alt={selectedSport?.name}
      />
      <div>
        <div>
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
        <div>
          <button onClick={handleShowAthletes}>
            {isShowAthletes ? "hide" : "show"} list athletes
          </button>
          {isShowAthletes && <AthletesList athletes={selectedSport.athletes} />}
        </div>
      </div>
    </div>
  );
};
export default Sport;
