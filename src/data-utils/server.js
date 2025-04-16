import api from '../api/axiosConfig';

export const addToStudyPlan=async (studyPlanTitles=[])=>{

   const loggedInCred= JSON.parse(localStorage.getItem("userCredentials"));
   
   const {userId}=loggedInCred.user;
    
    const addToStudyPlanPromises=[]
    let addedCount=0;
    try {
       for(let studyTitle of studyPlanTitles){
         const studyPlan={title:studyTitle};
         const addStudyPlanPromise= api.post(`student/studyplan/${userId}`,studyPlan)
         .then((response)=>{
             response.status ==201 ? addedCount++ : null;
         })
         addToStudyPlanPromises.push(addStudyPlanPromise);   //prepare upload     
        }
       await Promise.all(addToStudyPlanPromises);
      
       return {"successCount":addedCount};

    } 
    catch (err) {
       throw err;
    }
}
export const deleteTitleFromStudyPlan=async(titleId)=>{
    try{
       const deleteResponse= await api.delete(`student/studyplan/${titleId}`);
       return deleteResponse;
       
    }catch(error){
      throw error;
    }
}