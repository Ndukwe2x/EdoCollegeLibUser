import { useState,useContext,createContext } from "react";

const ShowAvartarContext=createContext(undefined);

export const ShowAvatarProvider=({children})=>{
    const [showAvatar,setShowAvatar]=useState(false)
   return(  <ShowAvartarContext.Provider value={{showAvatar,setShowAvatar}}>
        {children}
       </ShowAvartarContext.Provider>);
}
export const useAvatar=()=>useContext(ShowAvartarContext);