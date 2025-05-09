import { useNavigate } from "react-router-dom";

const SportItem = ({ sport }) => {
  const navigate = useNavigate();

  const navigateToSport = () => {
    navigate(`/sports/${sport._id}`);
  };
  return (
    <li onClick={navigateToSport} key={sport._id}>
      {sport.name}
    </li>
  );
};
export default SportItem;
