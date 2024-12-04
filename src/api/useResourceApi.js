import useResourceQueryString from "../composables/useResourceQueryString";
import axios from "axios";
import { useResourceNotification } from "@/index"; 

const useResourceApi = (baseURL, applyQueryString = false) => {
  let api = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    withXSRFToken:true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Accept": "application/json"
    }
  });
  const queryString = useResourceQueryString();
  
   
  api.interceptors.request.use((config) => {
    if (applyQueryString) { 
      config.params = {
        ...config.params,
        ...queryString.getParams(),
      };
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      if (response.status >= 200 && response?.data?.message) {
        useResourceNotification.success(response.data.message);
      }
      return response;
    },
    (error) => {
      if (error.response?.data?.message) {
        useResourceNotification.error(error.response.data.message);
      }
      return Promise.reject(error);
    }
  );
  return api;
};

export default useResourceApi;
