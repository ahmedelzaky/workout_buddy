import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

const useAxios = <T,>(url: string, time?: number) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(true);

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
        setError((error as AxiosError).message);
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
  }, [url, time]);

  return {
    data,
    isPending,
    error,
  };
};

export default useAxios;
