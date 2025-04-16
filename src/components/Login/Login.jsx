import { Tooltip } from "react-tooltip";
import {useNavigate} from 'react-router-dom';
import PromptModal from "../ModalDialogs/PromptModal";
import {useEffect, useState} from 'react';
import PasswordInput from '../PasswordInput/PasswordInput';
import {Formik} from 'formik';
import * as Yup from 'yup';

import { userLogin } from "../../auth/authHandler";
import {useAuth} from '../../auth/AuthContext';
import {useAvatar} from '../../showAvatar/ShowAvatarContext';

import './style-login.css';



const Login=()=>{
    const tooltipStyle={backgroundColor:'#343658'}; 

    const [submitStatus, setSubmitStatus] = useState("idle"); 
    const [loginError, setLoginError] = useState(false);  
    const [promptBody,setPromptBody]=useState("");
    const [promptHeader,setPromptHeader]=useState("");
    const [promptMode,setPromptMode]=useState("");
    const [showModal,setShowModal]=useState(false);
    const [startAuthentication, setStartAuthentication]=useState(false);
    const [loginCredentials,setLoginCredentials]=useState(null)
    const [formikvalues,setFormikValues]=useState(null);
    
    const navigate= useNavigate();
    const {setAuthUser}= useAuth();
    const {setShowAvatar}= useAvatar();

        useEffect(()=>{
        if(startAuthentication){
            setLoginError(false);
            const  authenticateLibraryUser=async()=>{
            try {
                
                const loginResponse= await userLogin(loginCredentials);        
                if(loginResponse?.status===200){
                    setLoginError(false)
                    
                    const {data:{user,token}}=loginResponse;
                   
                    setAuthUser(user);
                    setShowAvatar(true); //show avatar on top bar

                    localStorage.setItem("userCredentials",JSON.stringify(loginResponse.data));
                    formikvalues.token=''; formikvalues.studentId='';//clear form after submit
                    navigate('landing')
                   
                   
                }
            } catch (err) {
                if (err.response && (err.response.status == 401 || err.response.status == 404))
                    setLoginError(true);
                else if (err.code === "ERR_NETWORK"){
                    setPromptHeader("Network Error");
                    setPromptBody(" Please check your internet connection");
                    setPromptMode("warning");
                    setShowModal(true);       
                  }
                  else
                   {
                    setPromptHeader("Internal Server Error!");
                    setPromptBody("Please try again later.");
                    setPromptMode("error");
                    setShowModal(true); 
                   }
                  
                
            }
            finally {
                setSubmitStatus("idle");
            }
            }
            authenticateLibraryUser();  
            setStartAuthentication(false);

        }
        },[startAuthentication]);   


 const loginSubmit=async(values)=>{
  const {studentId,token}=values;
  setFormikValues(values);
  setLoginCredentials({studentId,token});
  setStartAuthentication(true);
  setSubmitStatus("submitting");   
 }   

  return(<div>
           <h2 className='login-hdr'>User Sign in</h2>
            <div className='frmlogin center'>
            <Formik initialValues={
                {
                studentId: '',
                token: ''
                }
            }
        validationSchema={Yup.object({
         
          studentId:Yup.string().required('* required'),
          token: Yup.string().required('* required')
            .min(8, "must not be less than 8 characters")

        })}
        onSubmit={loginSubmit}
      >
              { formik=>(<form onSubmit={formik.handleSubmit}>
                    {loginError && <p className='errTxt'>Invalid StudentId or invalid token</p>}
                    <label htmlFor='studentid'>Student Id</label>
                    <input className='form-control' id='studentid' name="studentId" maxLength={25} 
                    disabled={submitStatus=="submitting"} type='text' placeholder='Enter your student Id'
                    {...formik.getFieldProps('studentId')}  />
                    {formik.touched && formik.errors.studentId ? (<p className='errTxt'>{formik.errors.studentId}</p>) : null}
                 
                    <PasswordInput  controller={formik} />
                    <button type='submit' className='btn  submitBtn clearfix' 
                    disabled={submitStatus=="submitting"}  data-tooltip-id="tooltipsubmit">
                        Login
                        {submitStatus=="submitting" && (
                            <div className="spinner-border text-light float-end " role="status">
                            </div>
                        )}

                    </button>
            
                </form>)}
                </Formik>     
            </div>
  <Tooltip id="tooltipsubmit" style={tooltipStyle} place="bottom" content="login to edo college library" />
  <PromptModal show={showModal} bodyText={promptBody} mode={promptMode}
   headerText={promptHeader} onHide={()=>setShowModal(false)} />
  </div>)
}

export default Login