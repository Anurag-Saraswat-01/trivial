import { Link } from "react-router-dom";
const Header = () => {
  return (
    <nav>
      <Link to="/">
        <h1>Trivial</h1>
      </Link>
    </nav>
  );
};

export default Header;
