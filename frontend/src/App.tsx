import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAppSelector } from "./hooks/AppRedux";

function App() {
  const user = useAppSelector((state) => state.user);
  return (
    <>
      <div className="App">
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path={"/"}
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path={"/login"}
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path={"/signup"}
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
