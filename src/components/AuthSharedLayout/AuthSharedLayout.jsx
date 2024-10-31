import logo from "../../assets/edocollegelogo.png";
import './style-authlayout.css';



const AuthSharedLayout=({children})=>{
  return (
      <div className="authlayoutcntr">
            <div className="logospot">
                <img src={logo} alt="logo" />
            </div>
            {children}
            
       </div>
  );

}
export default AuthSharedLayout;