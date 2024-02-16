import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useAppDispatch } from "./AppRedux";
import { login, logout } from "../rtk/slices/auth.slice";
import { useNavigate } from "react-router-dom";

export type User = {
  email: string;
  token: string;
};

const useAuth = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const auth = async (
    email: string,
    password: string,
    action: "login" | "signup"
  ) => {
    setIsPending(true);
    setError("");
    try {
      const res = await axios.post<User>(
        import.meta.env.VITE_APP_API + action,
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify({ token: res.data.token, email: res.data.email })
      );
      dispatch(login({ token: res.data.token, email: res.data.email }));
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || error.message);
      }
    }
    setIsPending(false);
  };

  const removeUser = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };

  return { auth, logout: removeUser, isPending, error };
};

export default useAuth;
