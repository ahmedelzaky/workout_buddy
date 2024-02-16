import axios from "axios";
import { useAppSelector } from "./AppRedux";
import { User } from "./useAuth";

const useAxios = () => {
  const user: User | null = useAppSelector((state) => state.user);

  if (user) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  }

  axios.create({
    baseURL: import.meta.env.VITE_APP_API,
  });

  return { axios };
};

export default useAxios;
