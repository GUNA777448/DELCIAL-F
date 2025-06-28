import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api", // use your backend port
});

export default instance;
