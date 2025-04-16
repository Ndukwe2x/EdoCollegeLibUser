import { useEffect, useState } from "react";
import SignUp from "../components/SignUp/SignUp";
import {Link,useOutletContext} from 'react-router-dom';
import AuthSharedLayout from "../components/AuthSharedLayout/AuthSharedLayout";
import Login from "../components/Login/Login";
import {Tooltip} from 'react-tooltip'


const Home=()=>{
    const [authMode,setAuthMode]=useState('login');
    const tooltipStyle={backgroundColor:'#343658'} ;
    const showBackDropFunction=useOutletContext();
    
    useEffect(()=>{
      showBackDropFunction(true);
    },[]);
      
    const toggleAuthMode=(event)=>{
      event.preventDefault();
      setAuthMode(prevMode=>prevMode==="login"?"signup":"login");
    }
   
    
    return(<div className="homepg">
        <div className="section-auth">
         <AuthSharedLayout>
            { authMode=="login"? <Login/>: <SignUp /> }
             <div className="mode-switch center">
               {authMode==="login"? 
               <Link to="" data-tooltip-id="tooltipauthmode" onClick={toggleAuthMode}>Create user account</Link>:
               <Link to="" data-tooltip-id="tooltipauthmode" 
                onClick={toggleAuthMode}>Already have account? login</Link>}
             </div>
          </AuthSharedLayout>
         </div> 
        <Tooltip  id="tooltipauthmode" style={tooltipStyle} 
         content={authMode=="signup"?"go to login":"go to sign up"} place="bottom" />
    </div>)

}
export default Home;