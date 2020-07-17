import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://mlhhackshare.herokuapp.com/",
  baseURL: "http://localhost:8080/",
});

export default axiosInstance;
