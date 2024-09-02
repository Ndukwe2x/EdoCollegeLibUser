
import { useAuth } from "../../auth/AuthContext"; 
import { useNavigate } from "react-router-dom";

import './avatar-style.css';
const profileImg = "";

const AvatarProfile = () => {
  const loggedInCred= JSON.parse(localStorage.getItem("credentials"));
  const{user:{userName:userName,userEmail:userEmail,userStatus:userStatus}}=loggedInCred;
  //const{authenticatedUser,setAuthenticatedUser}=useAuth();  
  const navigate= useNavigate();
 
   
    const handleSignOut=(event=null)=>{
     if(event!=null)
         event.preventDefault();
     //setAuthenticatedUser(null);
     localStorage.removeItem("credentials");
     navigate("/")//logout user;
     
   }

    if(userName==null)
        handleSignOut();    
  
    
    return (
       <div className="profile">
        <ul>
            <li className="nav-item dropdown pe-3">
                <a className="nav-link nav-profile d-flex align-items-center pe-0"
                    href='#'
                    data-bs-toggle="dropdown">
                    {/* <img src={profileImg} alt='Profile' className="rounded-circle" /> */}
                    <i className='bi bi bi-person-circle icon-color'></i>
                    <span className="d-none d-md-block dropdown-toggle ps-2">
                        {userName}
                    </span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end drop-down-menu-arrow profile">
                    <li className='dropdown-header'>
                        <h6>{userName}</h6>
                        <span>{`Admin[${userStatus}]`}</span>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li>
                        <a className="dropdown-item d-flex align-items-center"
                            href='#'>
                            <i className='bi bi-person'></i>
                            <span>My Profile</span>
                        </a>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li>
                        <a className="dropdown-item d-flex align-items-center"
                            href='#'>
                            <i className="bi bi-gear"></i>
                            <span>Account Settings</span>

                        </a>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    
                    <li>
                       <a className="dropdown-item d-flex align-items-center"
                        href="/" onClick={handleSignOut}>
                            <i className="bi bi-box-arrow-right"></i>
                            <span className="ms-2"> Sign Out</span>

                        </a>
                    </li>
                </ul>
            </li>
        </ul>
     </div>
    )



}
export default AvatarProfile