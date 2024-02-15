import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { logout } = useAuth();
  return (
    <header>
      <div className="container">
        <Link to={"/"}>
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          <div>
            <button onClick={() => logout()}>Log out</button>
          </div>
          <div>
            <Link to={"/login"}>Login</Link>
            <Link to={"/signup"}>Signup</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
