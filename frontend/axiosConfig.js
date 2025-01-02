import axios from "axios";
import queryString from "query-string";

const baseURL = "http://localhost:8800/api/";

const axiosInstance = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
    },
  };
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response && response.data) return response;
    return response;
  },
  (err) => {
    throw err.response.data;
  }
);
export default axiosInstance;
