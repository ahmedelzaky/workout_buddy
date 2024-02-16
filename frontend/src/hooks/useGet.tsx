import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import useAxios from "./useAxios";

const useGet = <T,>(url: string, time?: number) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(true);
  const { axios } = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<T>(import.meta.env.VITE_APP_API + url);
        if (response.status !== 200) {
          throw new Error("could not fetch data");
        }
        setData(response.data);
        setIsPending(false);
        setError("");
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data?.message || error.message);
        }
        setIsPending(false);
        console.log(error);
      }
    };
    fetchData();

    if (time) {
      const interval = setInterval(() => {
        fetchData();
      }, time);
      return () => clearInterval(interval);
    }
  }, [url, time, axios]);

  return {
    data,
    isPending,
    error,
  };
};

export default useGet;
