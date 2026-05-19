import axios from "axios";

const API = axios.create({
  baseURL: "https://threaddesk.onrender.com/api"
});

export default API;