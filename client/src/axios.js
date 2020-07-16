import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://mlhhackshare.herokuapp.com/",
});

export default axiosInstance;
