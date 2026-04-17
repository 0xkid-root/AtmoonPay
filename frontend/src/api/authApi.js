import httpClient from "./httpClient";

export const loginUser = async (data) => {
  const res = await httpClient.post("/auth/login", data);
  console.log(res.data,"hii helo hwo are you ");
  return res.data.token;
};