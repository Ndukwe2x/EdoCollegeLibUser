import { useState,useContext,createContext } from "react";

const AuthContext=createContext(undefined);

export const AuthUserProvider=({children})=>{
    const [authUser,setAuthUser]=useState(null)
   return(  <AuthContext.Provider value={{authUser,setAuthUser}}>
        {children}
       </AuthContext.Provider>);
}
export const useAuth=()=>useContext(AuthContext);