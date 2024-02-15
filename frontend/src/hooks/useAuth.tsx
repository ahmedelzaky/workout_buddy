import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useAppDispatch } from "./AppRedux";
import { login, logout } from "../rtk/slices/auth.slice";

export type User = {
  email: string;
  token: string;
};

const useAuth = (action?: "login" | "signup") => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const auth = async (email: string, password: string) => {
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
  };

  return { auth, logout: removeUser, isPending, error };
};

export default useAuth;
