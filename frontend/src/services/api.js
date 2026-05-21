import axios from "axios";



const API = axios.create({
  baseURL: "https://threaddesk.onrender.com/api",
});

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