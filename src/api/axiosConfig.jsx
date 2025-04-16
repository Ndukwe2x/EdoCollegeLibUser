import axios from 'axios';

const serverBaseUrl= 'https://edocollegelibraryapp-133b08aec735.herokuapp.com/api/v1';
const baseUrl='http://localhost:3000/api/v1';

export default axios.create({
    baseURL:serverBaseUrl, //change before upload
    timeout:1200000,//timeout:20 mins,
    timeoutErrorMessage:"process timed out, try again later"
   });

export const uploadApi= axios.create({
    baseURL:serverBaseUrl, 
    timeout:7200000,//timeout: 2hrs
    timeoutErrorMessage:"process timed out, try again later"
});
