import axios from "axios";

const axiosIns = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:9107/"
      : "https://sheet1218.herokuapp.com",
});

export { axiosIns };
