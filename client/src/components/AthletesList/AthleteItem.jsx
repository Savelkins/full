import { mdiDeleteOutline } from "@mdi/js";
import { Icon } from "@mdi/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAthleteByIdAsync } from "../../store/athletesSlice";

const AthleteItem = ({ athlete }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToAthlete = () => {
    navigate(`/athletes/${athlete._id}`);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    dispatch(deleteAthleteByIdAsync(athlete._id));
    
  };
  return (
    <li onClick={navigateToAthlete}>
      {athlete.name}{" "}
      <Icon onClick={handleDelete} path={mdiDeleteOutline} size={1} />
    </li>
  );
};
export default AthleteItem;
