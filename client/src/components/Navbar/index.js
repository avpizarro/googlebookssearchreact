import { Link
  } from "react-router-dom";



function Navbar() {
  return (
    <nav
      className="navbar is-transparent"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="navbar-brand" style={{marginLeft: "40px"}}>
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
