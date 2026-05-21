import axios from "axios";



const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
    || (import.meta.env.DEV
      ? "http://localhost:5002/api"
      : "https://threaddesk.onrender.com/api"),
});

console.log("API BASE URL:", API.defaults.baseURL);

API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  console.log("TOKEN:", token);

  if (token) {

    req.headers.Authorization = `Bearer ${token}`;

    console.log(
      "AUTH HEADER:",
      req.headers.Authorization
    );

  }

  return req;

});

export default API;
