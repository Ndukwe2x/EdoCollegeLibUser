import Footer from "../components/Footer/Footer";
import TopBar from "../components/TopBar/TopBar";
import { useAvatar } from "../showAvatar/ShowAvatarContext";



const NotFound404=()=>{
    //if user is authenticated show avatar profile
   const {showAvatar}= useAvatar();
   return (<div className="page-enclose ">
            <TopBar showAvatar={showAvatar} />
               <div className="notfoundpg">
                   <button className="btn btn-light">
                      <i className="bi bi-chevron-left"></i> Back
                   </button>
                   <h3>Page Not Found Error!</h3>
               </div>
            <Footer/>

       </div>);

}

export default NotFound404;
