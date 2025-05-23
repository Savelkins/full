import { mdiDeleteOutline } from "@mdi/js";
import { Icon } from "@mdi/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteSportByIdAsync } from "../../store/sportsSlice";

const SportItem = ({ sport }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const navigateToSport = () => {
    navigate(`/sports/${sport._id}`);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    dispatch(deleteSportByIdAsync(sport._id));
  };
  return (
    <li onClick={navigateToSport}>
      {sport.name}
      <Icon
        onClick={handleDelete}
        path={mdiDeleteOutline}
        size={1}
      />
    </li>
  );
};
export default SportItem;
