import {Link, useNavigate} from "react-router-dom";
import "./Navbar.css";
import {useAuth} from "../AuthContext.jsx";

function Navbar() {
  const navigate = useNavigate();
  const {setCurrentUser} = useAuth();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setCurrentUser(null);
    navigate ("/auth");
  }

  return ( 
    <nav id="navbar">
      <Link to="/">
        <div>
          <img src={"assets/github-mark-white.svg"} alt="Logo" />
          <h3>GitHub</h3>
        </div>
      </Link>
      <div>
        <Link to="/create">
          <p>Create a repository</p>
        </Link>
        <Link to="/profile">
          <p>Profile</p>
        </Link>
        <span style={{cursor: "pointer"}}
          onClick={logout}
        >
          <p>Logout</p>
        </span>
      </div>
    </nav>
  );
}

export default Navbar;