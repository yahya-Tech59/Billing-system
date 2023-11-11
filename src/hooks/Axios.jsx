import axios from "axios";

const axios = axios.create({
  baseURL: "https://spiky-crater-dep2vxlep8.ploi.online",
});

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    return {
      ...config,
      headers: {
        ...(token !== null && { Authorization: `${token}` }),
        ...config.headers,
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    //const url = response.config.url;

    //setLocalStorageToken(token);
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      //(`unauthorized :)`);
      //localStorage.removeItem("persist:root");
      //removeLocalStorageToken
      //window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axios;
