import api from '../api/axiosConfig';
import { combineBooksAndVideoResources } from '../code-utility/utilityFunctions';


export const libraryResources =async()=>{
  
    const  resources={};
    try {
     
     const libraryBooks= await libraryResourcesBooks();
      if(libraryBooks)
      { const {data:{data:{books:books}}}=libraryBooks;
        resources.books=books;  
      }
 
     const libraryVideos= await libraryResourcesVideos();
     if(libraryVideos)
      { 
       const {data:{data:{videos:videos}}}=libraryVideos;
       resources.videos=videos;
      }
     const libraryCatalogue= await catalogueDataLoader();     
     
     if(libraryCatalogue){
       const {data:{data:{catalogue:catalogue}}}=libraryCatalogue;
       resources.catalogue=catalogue;
     }
    
     return resources;
 
    } catch (err) {
      const{response}=err;
      console.log(err);
      throw response;
    }
 
   
 }
 export const libraryResourcesBooks=async()=>{
   const loggedInCred= JSON.parse(localStorage.getItem("userCredentials"));
   const  authHeader={headers:{"Content-Type": "application/json",
           "Authorization":`Bearer ${loggedInCred.token}`}};
       try{
           const response= await api.get("/student/books",authHeader);
           
         return response;          
        }
        catch(err){
          throw err;
        }
 }
 export const libraryResourcesVideos=async()=>{
   const loggedInCred= JSON.parse(localStorage.getItem("userCredentials"));
   const  authHeader={headers:{"Content-Type": "application/json",
           "Authorization":`Bearer ${loggedInCred.token}`}};
       try{
           const response= await api.get("/student/videos",authHeader);
           return response;          
        }
        catch(err){
          throw err;
        }
 }
 export const catalogueDataLoader=async()=>{
  
    const loggedInCred= JSON.parse(localStorage.getItem("userCredentials"));
    const  authHeader={headers:{"Content-Type": "application/json",
            "Authorization":`Bearer ${loggedInCred.token}`}};
        try{
            const response= await api.get("/student/catalogue",authHeader);
           return response;          
         }
         catch(err){
           throw err;
         }
       
  }

export const combinedAcademicResources=async()=>{

  try {
      const  resources={};
      const libraryBooks= await libraryResourcesBooks();
      if(libraryBooks)
      { const {data:{data:{books:books}}}=libraryBooks;
        resources.books=books;  
      }

    const libraryVideos= await libraryResourcesVideos();
    if(libraryVideos)
      { 
      const {data:{data:{videos:videos}}}=libraryVideos;
      resources.videos=videos;
      }
     resources.combined= combineBooksAndVideoResources(resources.books,resources.videos);
     return resources;
  } catch (error) {
    throw error
  }
}
  
  
 