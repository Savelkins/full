import AthleteItem from "./AthleteItem";

const AthletesList = ({ athletes }) => {
  if (!athletes || athletes.length === 0) {
    return <p>No athletes</p>;
  }
  const showAthletes = (athlete) => (
    <AthleteItem key={athlete._id} athlete={athlete} />
  );
  return (
    <div>
      <p>Athletes list</p>
      <ul>{athletes.map(showAthletes)}</ul>
    </div>
  );
};
export default AthletesList;
