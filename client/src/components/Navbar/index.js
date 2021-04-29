import { Link
  } from "react-router-dom";



function Navbar(props) {
  return (
    <nav
      className="navbar is-transparent"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="navbar-brand ml-6">
          <Link to="/" className="navbar-item">
            Search
          </Link>
          <a className="navbar-item">|</a>
          <Link to="/saved"  className="navbar-item">
            Saved
          </Link>
        </div>
    </nav>
  );
}
export default Navbar;
