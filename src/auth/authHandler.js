import {redirect} from  'react-router-dom';
import api from "../api/axiosConfig"

export const authenticateAdmin= async (loginPath)=>{
   
    const loggedInCred= JSON.parse(localStorage.getItem("credentials"));  
  
    let loginStatus=undefined;

    try{
      
        loginStatus= await api.get("loginAuth",
        {headers:{"Content-Type": "application/json",
        "Authorization":`Bearer ${loggedInCred.token}`}
       })
       const {data:authResponse}=loginStatus; 
            
       if(loginStatus.statusText!=="OK")       
          throw redirect(loginPath);

       return authResponse;

    }catch(error){
      throw redirect(loginPath);
    }
    
   
     
}
export const loginUser= async(userName,tokenPass)=>{

    try {
      return await api.post("login/student",{studentID:userName,token:tokenPass})
    } catch (error) {
        throw error;
    }
}