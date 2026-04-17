import { useEffect, useState } from "react";
import httpClient from "../api/httpClient";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const usePayouts = () => {
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPayouts = async () => {
    try {
      setLoading(true);
      const res = await httpClient.get("/payouts");
      console.log("res is here:",res);
      setPayouts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createPayout = async (payload) => {
    try {
      const res = await httpClient.post("/payouts", payload);
      setPayouts((prev) => [res.data, ...prev]);
      console.log("res is here:",res);
      toast.success(`Payout created successfully! ${res.data.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPayouts();
  }, []);

  return { payouts, loading, createPayout };
};