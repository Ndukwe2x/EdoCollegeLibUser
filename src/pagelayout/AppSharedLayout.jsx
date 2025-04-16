import TopBar from "../components/TopBar/TopBar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import {useAvatar} from  '../showAvatar/ShowAvatarContext';
import { displayAvatar } from "../code-utility/utilityFunctions";
import { useEffect, useState } from "react";

export default function AppSharedLayout(){
const {showAvatar}=useAvatar();
const [avatarVisible,setAvatarVisible]=useState(false);
const [showHomepgBackDrop,setShowHomepgBackDrop]=useState(false);
useEffect(()=>{
  setAvatarVisible(displayAvatar());
},[avatarVisible])
 return(
    <div className={ !showHomepgBackDrop?"page-enclose":"page-enclose homepg-backdrop"}>
      <TopBar showAvatar={showAvatar}/>
       <div>
         <Outlet context={setShowHomepgBackDrop}  />
       </div>
      <Footer/>
    </div>
 );

}