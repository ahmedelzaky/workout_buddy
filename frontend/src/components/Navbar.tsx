import { Link } from "react-router-dom";
import useAuth, { User } from "../hooks/useAuth";
import { useAppSelector } from "../hooks/AppRedux";

function Navbar() {
  const { logout } = useAuth();
  const user: User = useAppSelector((state) => state.user);

  return (
    <header>
      <div className="container">
        <Link to={"/"}>
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {user ? (
            <div>
              <span>{user.email}</span>
              <button onClick={() => logout()}>Log out</button>
            </div>
          ) : (
            <div>
              <Link to={"/login"}>Login</Link>
              <Link to={"/signup"}>Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
