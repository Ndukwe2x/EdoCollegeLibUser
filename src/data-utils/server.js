import api from '../api/axiosConfig';
import { uploadApi } from '../api/axiosConfig';


export const addToCatalogue = async ({ title, parentTitle, description }) => {
    const loggedInCred = JSON.parse(localStorage.getItem("credentials"));
    const authHeader = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${loggedInCred.token}`
        }
    };

    const formSubmitData = {};
    formSubmitData.title = title;   
    if (parentTitle != "--Select--")
        formSubmitData.parentTitle = parentTitle;
   
    try {
        const response = await api.post("admin/catalogue",
            formSubmitData, authHeader);
        return response;
    }
    catch (err) {
        throw err;
    }
}
export const deleteCatalogueItem=async(catalogueId)=>{

    const loggedInCred = JSON.parse(localStorage.getItem("credentials"));
    const authHeader = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${loggedInCred.token}`
        }
    };
    try 
    {
       const deleteResponse= await api.delete(`admin/catalogue/${catalogueId}`,
        authHeader) ;
        return deleteResponse;
    } 
    catch (err) {
        throw err;
    }

}
export const createToken= async(token,expiryDate)=>{
    const loggedInCred = JSON.parse(localStorage.getItem("credentials"));
    const authHeader = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${loggedInCred.token}`
        }
    };
    const tokenSubmitData={token:token,expiresAt:expiryDate}
   
    try {
         const response = await api.post("admin/token",
            tokenSubmitData, authHeader);
        
        return response;
    }
    catch (err) {
        throw err;
    }
}
export const deleteToken= async(token_Id)=>{
    const loggedInCred = JSON.parse(localStorage.getItem("credentials"));
    const authHeader = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${loggedInCred.token}`
        }
    };       
    try {
        
        const response = await api.delete(`admin/token/${token_Id}`,authHeader);
        return response;
    }
    catch (err) {
        throw err;
    }
}

export const editCatalogueEntry= async(catalogueId,{title,parentTitle})=>{
    const loggedInCred = JSON.parse(localStorage.getItem("credentials"));
    const authHeader = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${loggedInCred.token}`
        }
    };
    const formSubmitData = {};
    formSubmitData.title = title; 
    if (parentTitle != "--Select--")
        formSubmitData.parentTitle = parentTitle;
    try 
     {
       const deleteResponse= await api.patch(`admin/catalogue/${catalogueId}`,
                                         formSubmitData, authHeader);
        return deleteResponse;
     } 
    catch (err) {
        throw err;
    }

}
export const AddToBooks= async({catalogueRef,title,author,docType,bookCover,bookFile,
                                edition, yearOfPublication,isbn,bookDescription, downloadable})=>{
    
    const loggedInCred = JSON.parse(localStorage.getItem("credentials"));
    const authHeader = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${loggedInCred.token}`        }
    };
    
     const bookData={};
     bookData.catalogueRef=catalogueRef; bookData.title=title;
     bookData.author=author; bookData.docType=docType; bookData.edition=edition;
     bookData.isbn=isbn; bookData.yearOfPublication=yearOfPublication;
     bookData.bookDescription=bookDescription;
     bookData.fileName=bookFile; 
     bookData.coverImageName=bookCover;
    try 
     {
        const booksAddresponse= await uploadApi.post('admin/books',bookData,authHeader);
        return booksAddresponse;
     } 
    catch (err) {
        console.log(err);
        throw err;
    }

}
export const uploadCoverImageToS3=async(bookCover,progressBarObject)=>{
    const loggedInCred = JSON.parse(localStorage.getItem("credentials"));
    let authHeader = {
        headers: {"Authorization": `Bearer ${loggedInCred.token}` }
     };
     try {
         
          const formData= new FormData();
          formData.append('bookCover',bookCover) ;    
          const  bookUploadResponse= await uploadApi.post('admin/books/bookcover',formData,authHeader);
         
          return bookUploadResponse;
     } catch (error) {
        console.log(error);
        throw error;
     }



}
export const uploadBookSmallFileSize=async(uploadData,progressBarObject)=>{
   
    const loggedInCred = JSON.parse(localStorage.getItem("credentials"));
    let authHeader = {
        headers: {"Authorization": `Bearer ${loggedInCred.token}` }
     };
     try {
        console.log(uploadData)
          const  bookUploadResponse= await api.post('admin/books',uploadData,authHeader);
          console.log("upload response",bookUploadResponse);
          return bookUploadResponse;
     } catch (error) {
        console.log(error);
        throw error;
     }
   
    
}
export const uploadBookToS3 = async(uploadFile,proggresBarObject)=>{

    const loggedInCred = JSON.parse(localStorage.getItem("credentials"));
    let authHeader = {
        headers: {"Authorization": `Bearer ${loggedInCred.token}` }
    };
   
    try{
       //initiate multipart upload
       console.log("Starting upload...");
       if(uploadFile)
        console.log("FIle was received for upload...")
   
       const response = await uploadApi.post("admin/books/fastupload/start/",{filetype:"book"},authHeader);
       console.log(response);
       const {data:{fileName:fileName,uploadId:uploadId}}= response.data;

       const CHUNK_SIZE = 8 * 1024 * 1024;
       const fileSize=uploadFile.size;  
       console.log("FileSize",fileSize);
       const numberOfChunks= Math.ceil(fileSize/CHUNK_SIZE);
       console.log("Number of chunks",numberOfChunks)
    
       const uploadPromises = [];
       let uploadedChunks = 0;
       let start = 0, end;
       authHeader={
        headers: {           
            "Authorization":`Bearer ${loggedInCred.token}`,
             }};

        for(let i=0; i< numberOfChunks;i++){
          
        end =start + CHUNK_SIZE;
        const filechunk= uploadFile.slice(start,end);
        const formData= new FormData();
        formData.append('index',i);
        formData.append('totalChunks',numberOfChunks);
        formData.append('bookFile',filechunk);
        formData.append("fileName",fileName);
        formData.append('uploadId',uploadId);

  
        const uploadPromise= uploadApi.post("admin/books/fastupload/push",formData,authHeader)
        uploadPromises.push(uploadPromise);
        start=end;
      }
      await Promise.all(uploadPromises);
      
      // Complete multipart upload
      const uploadCompleteResp= await uploadApi.post('admin/books/fastupload/end',
        {"fileName":fileName,"uploadId":uploadId,"filetype":"book"},authHeader);
    
       
       if (!uploadCompleteResp) {
          throw new Error('Error completing upload');
        }
        const {data:{fileData:{Key:filename}}}=uploadCompleteResp;
        if(uploadCompleteResp.status==201)
             return {message:"successful",status:201,filename:filename};

        return {message:"unsuccessful",filename:null};

    }catch(error){
       
        console.log(error);
        alert('Error uploading file');
        throw error;
    }  

}