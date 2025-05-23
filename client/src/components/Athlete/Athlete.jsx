import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CONSTANTS from "../../constants";
import { fetchAthleteByIdAsync } from "../../store/athletesSlice";
import FormUpdateAthlete from "../forms/FormUpdateAthlete";
import styles from "./Athlete.module.scss";

const Athlete = () => {
  const { athleteId } = useParams();
  const dispatch = useDispatch();
  const { selectedAthlete, isLoading, error } = useSelector(
    (state) => state.athletes
  );

  const [isShowForm, setIsShowForm] = useState(false);
  const handleShowForm = () => {
    setIsShowForm(!isShowForm);
  };
  useEffect(() => {
    dispatch(fetchAthleteByIdAsync(athleteId));
  }, [dispatch, athleteId]);
  if (error) {
    return <div>{error}</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <article className={styles.athlete}>
      <div>
        <h2>{selectedAthlete?.name}</h2>
        <img
          src={`${CONSTANTS.API_BAZE_URL}${selectedAthlete?.avatar}`}
          alt={selectedAthlete?.name}
        />
        <h3>
          sport:{" "}
          <Link to={`/sports/${selectedAthlete?.sportId.id}`}>
            {selectedAthlete?.sportId.name}
          </Link>
        </h3>
        <p>year of birth: {selectedAthlete?.birthYear}</p>
        <p>country: {selectedAthlete?.country}</p>
      </div>
      <div>
        <button onClick={handleShowForm}>
          {isShowForm ? "hide" : "show"} update form
        </button>
        {isShowForm && (
          <FormUpdateAthlete
            athlete={selectedAthlete}
            handleShowForm={handleShowForm}
          />
        )}
      </div>
    </article>
  );
};
export default Athlete;
