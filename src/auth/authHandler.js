/* eslint-disable no-useless-catch */
import {redirect} from  'react-router-dom';
import api, { authApi, loginApi, signupApi } from "../api/axiosConfig"


export const authenticateUser= async (loginPath)=>{
   
    const loggedInCred= JSON.parse(localStorage.getItem("credentials"));  
  
    let loginStatus=undefined;

    try{
      
        loginStatus= await authApi.get("/loginAuth",
        {headers:{"Content-Type": "application/json",
        "Authorization":`Bearer ${loggedInCred.token}`}
       })
       const {data:authResponse} = loginStatus; 
            
       if(loginStatus.statusText!=="OK")       
          throw redirect(loginPath);

       return authResponse;

    }catch(error){
      throw redirect(loginPath);
    }
    
   
     
}
export const createUser= async(user)=>{

    try {
      return await signupApi.post("/",{user})
    } catch (error) {
        throw error;
    }
}


export const loginUser= async(studentId, token)=>{
    try {
      const response = await loginApi.post("/",{studentId, token})
      return response;
    } catch (error) {
      console.log("Failed to login", error);
        throw error;
    }
}
