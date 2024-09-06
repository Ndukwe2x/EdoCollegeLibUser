// axiosConfig.js
import axios from 'axios';

const serverBaseUrl = 'https://edocollegelibraryapp-b13a4881c9f9.herokuapp.com/api/v1/student';
const authUrl = 'https://edocollegelibraryapp-b13a4881c9f9.herokuapp.com/api/v1';
const loginUrl = 'https://edocollegelibraryapp-b13a4881c9f9.herokuapp.com/api/v1/login/student';
const registerUrl = 'https://edocollegelibraryapp-b13a4881c9f9.herokuapp.com/api/v1/adduser';
// const baseUrl = 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL: serverBaseUrl,
  timeout: 20000, 
  timeoutErrorMessage: "Process timed out, try again later",
});

export const uploadApi = axios.create({
  baseURL: serverBaseUrl,
  timeout: 7200000, // 2 hours
  timeoutErrorMessage: "Process timed out, try again later",
});

export const loginApi = axios.create({
  baseURL: loginUrl,
  timeout: 720000, 
  timeoutErrorMessage: "Process timed out, try again later",
});
export const signupApi = axios.create({
  baseURL: registerUrl,
  timeout: 720000, 
  timeoutErrorMessage: "Process timed out, try again later",
});
export const authApi = axios.create({
  baseURL: authUrl,
  timeout: 720000, 
  timeoutErrorMessage: "Process timed out, try again later",
});

export default api;
