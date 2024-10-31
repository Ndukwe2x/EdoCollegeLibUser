import TopBar from "../components/TopBar/TopBar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import {useAvatar} from  '../showAvatar/ShowAvatarContext';
import { showAvatar } from "../code-utility/utilityFunctions";

export default function AppSharedLayout(){
// const {showAvatar}=useAvatar();
 return(
    <div className="page-enclose ">
      <TopBar showAvatar={showAvatar()}/>
       <div>
         <Outlet />
       </div>
      <Footer/>
    </div>
 );

}