import axios from "axios";

const BASE_URL = "http://localhost:7000/api/";

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {"Content-type": "application/json; charset=UTF-8"}
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {"Content-type": "application/json; charset=UTF-8"}
});

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {"Content-type": "application/json; charset=UTF-8"}
});

