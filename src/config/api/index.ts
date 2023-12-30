import axios from "axios";
import { BASE_URL, REMOTE_BASE_URL } from "../env";

const API = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

export default API;
