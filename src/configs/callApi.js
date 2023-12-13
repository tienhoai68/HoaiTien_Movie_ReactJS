import axios from "axios";
import { BASE_URL, TOKEN_CYBERSOFT } from "../constants/api";

import { store } from "../store/configRedux"


const requestApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
  }
})

requestApi.interceptors.request.use((config) => {
  const userState = store.getState();
  let accessToken = null;
  
  if (userState.userReducer.userInfo) {
    accessToken = userState.userReducer.userInfo.accessToken;
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config;
})


export { requestApi };
