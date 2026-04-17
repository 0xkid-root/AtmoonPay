import { useEffect, useState } from "react";
import httpClient from "../api/httpClient";

export const useBalance = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const res = await httpClient.get("/balance");
      setBalance(res.data);
      console.log("res is here in authbalance side :",res.data)
    } catch (err) {
      console.error("Failed to fetch balance:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return { balance, loading, fetchBalance };
};
