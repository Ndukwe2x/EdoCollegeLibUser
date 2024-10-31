import api from '../api/axiosConfig';
import {redirect} from 'react-router-dom';

export const authenticateUser=async(loginPath)=>{
    const loggedInCred= JSON.parse(localStorage.getItem("userCredentials"));  
  
    let loginStatus=undefined;
      
    try{
      
        loginStatus= await api.get("/loginAuth",
          {headers:{"Content-Type": "application/json","Authorization":`Bearer ${loggedInCred.token}`}
       })
       const {data:authResponse}=loginStatus; 
                 
       if(loginStatus.statusText!=="OK")       
          throw redirect(loginPath);

       return authResponse;

    }catch(error){
      throw redirect(loginPath);
    }
    

}
export const userLogin=async({studentId,token})=>{
   try {
      const response= await api.post('/login/student',{studentId,token});
      return response;
   } catch (err) {
    throw err;
   }

}

export async function createLibraryUser({firstName,lastName,studentID,entryYear,classOfAdmission}){
    
    try {
        const response= await api.post('/adduser',{firstName,lastName,studentID,entryYear,classOfAdmission});
        return response;
    } catch (error) {
        throw error;
    }
}