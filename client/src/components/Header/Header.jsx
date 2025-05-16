import { Link } from "react-router-dom";
import "./Header.module.scss";

const Hader = () => {
  return (
    <header>
      <Link to="/">Logo</Link>
      <Link to="/create-sport">Create sport</Link>
    </header>
  );
};
export default Hader;
