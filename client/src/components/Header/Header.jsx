import { Link } from "react-router-dom";
import "./Header.module.scss";

const Hader = () => {
  return (
    <header>
      <Link to="/">Logo</Link>
      <div>
        <Link to="/create-sport">Create sport</Link>
        <Link to="/create-athlete">Create athlete</Link>
      </div>
    </header>
  );
};
export default Hader;
