import axios from "axios";

const instance = axios.create({
  baseURL: "https://delicial-b-01fq.onrender.com/api", // deployed backend URL
});

export default instance;
