import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSportsAsync } from "../../store/sportsSlice";
import SportItem from "./SportItem";

const SportsList = () => {
  const dispatch = useDispatch();
  const { sports, error, isLoading } = useSelector((state) => state.sports);
  useEffect(() => {
    dispatch(fetchAllSportsAsync());
  }, [dispatch]);

  const showSports = (sport) => <SportItem sport={sport} key={sport._id} />;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section>
      <h2>Sports: </h2>
      <ul>{sports.map(showSports)}</ul>
    </section>
  );
};
export default SportsList;
