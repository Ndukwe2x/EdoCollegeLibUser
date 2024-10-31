
import { useEffect, useState } from 'react';
import  './style-signup.css';
import PromptModal from '../ModalDialogs/PromptModal';
import   {Tooltip} from 'react-tooltip';
import {Formik} from 'formik';
import * as Yup from 'yup';

import { createLibraryUser } from "../../auth/authHandler";

const SignUp=()=>{
    const tooltipStyle={backgroundColor:'#343658'}; 
   
    const [signupError, setSignupError] = useState(false);
    const [submitStatus, setSubmitStatus] = useState("idle");   
    const [promptBody,setPromptBody]=useState("");
    const [promptHeader,setPromptHeader]=useState("");
    const [promptMode,setPromptMode]=useState("");
    const [showModal,setShowModal]=useState(false);
    const [startSubmit,setStartSubmit]=useState(false);
    const [libUserDetails,setLibUserDetails]=useState(null);
    const [formikvalues,setFormikValues]=useState(null);


    useEffect(()=>{
      if(startSubmit){
        const addLibraryUser=async()=>{

            try {
                setSignupError(false);
                const addUserResponse =await createLibraryUser(libUserDetails);
                if(addUserResponse?.status===201){
                    clearFormValues(); //clear form
                    setPromptHeader("Successful SignUp!");
                    setPromptBody(` Student/User created successfully. Student Id: "${libUserDetails.studentID}".
                    Please take note of your student Id for subsequent login access. Contact Admin for login token.`);
                    setPromptMode("info");
                    setShowModal(true);
                }
            
            } catch (error) {
                

                if (error.response && (error.response?.status == 401 || error.response?.status == 404))
                    setSignupError(true);
                else if (error.code === "ERR_NETWORK")
                {
                    setPromptHeader("Network Error!");
                    setPromptBody(" Please check your internet connection");
                    setPromptMode("warning");
                    setShowModal(true);
                }
                else
                {
                    setPromptHeader("Internal Server Error!");
                    setPromptBody(" Please try again later");
                    setPromptMode("error");
                    setShowModal(true);
                
                }
               console.log(error);
            }
            finally{
                setSubmitStatus("idle");
                
            }
           
        }  
        addLibraryUser();
        setStartSubmit(false);           
      }

    },[startSubmit]);
   const clearFormValues=()=>{
    //clear form
     formikvalues.lastName="";
     formikvalues.firstName="";
     formikvalues.studentID="";
     formikvalues.entryYear="";
     formikvalues.classOfAdmission="";

   }
   const createUserSubmit=(values)=>{
     setLibUserDetails({...values});
     setFormikValues(values);
     setStartSubmit(true);
     setSubmitStatus("submitting");

   }
    return (
        <div>
            <h2 className='signup-hdr'>Sign Up</h2>
            <div className='frmsignup center'>
            <Formik initialValues={
                    {
                     firstName: '' ,lastName: '',studentID: '',entryYear: '',classOfAdmission: ''
                     }
                }
                validationSchema={Yup.object({
                
                firstName:Yup.string().required('* required'),
                lastName: Yup.string().required('* required'),
                studentID:Yup.string().required('* required'),
                entryYear:Yup.number().required('* required').
                 min(1965,"Year of entry cannot preceed year ${min}")
                 .max(new Date().getFullYear(),"year of entry cannot surpass current year:${max}"),
                classOfAdmission:Yup.string().required('* required').max(25,"entry is too long")
                
                })}
                onSubmit={createUserSubmit}
            >
            { formik=>(<form onSubmit={formik.handleSubmit}>
                {signupError && <p className='errTxt'>Sign-up failed. Please check your details.</p>}
                <input className='form-control' id='firstname' name="firstName" maxLength={60} 
                disabled={submitStatus=="submitting"}
                type='text' placeholder='First Name'    {...formik.getFieldProps('firstName')}  />
                {formik.touched && formik.errors.firstName ? (<p className='errTxt'>{formik.errors.firstName}</p>) : null}

                <input className='form-control' id='lastname' name="lastName" maxLength={50} 
                disabled={submitStatus=="submitting"}
                type='text' placeholder='Last Name'  {...formik.getFieldProps('lastName')} />
                {formik.touched && formik.errors.lastName ? (<p className='errTxt'>{formik.errors.lastName}</p>) : null}
                

                <input className='form-control' id='studentid' name="studentID" maxLength={25} 
                disabled={submitStatus=="submitting"}
                type='text' placeholder='Student Id'  {...formik.getFieldProps('studentID')} />
                {formik.touched && formik.errors.studentID ? (<p className='errTxt'>{formik.errors.studentID}</p>) : null}
                
                <input className='form-control' id='entryyear' name="entryYear" maxLength={4} 
                disabled={submitStatus=="submitting"}
                type='text' placeholder='Year of Entry'  {...formik.getFieldProps('entryYear')}  />
                {formik.touched && formik.errors.entryYear ? (<p className='errTxt'>{formik.errors.entryYear}</p>) : null}
                
                <input className='form-control' id='admissionclass' name="classOfAdmission" maxLength={10} 
                disabled={submitStatus=="submitting"}
                type='text' placeholder='Admission Class'  {...formik.getFieldProps('classOfAdmission')}   />
                {formik.touched && formik.errors.classOfAdmission ?
                 (<p className='errTxt'>{formik.errors.classOfAdmission}</p>) : null}

                 <button type='submit' className='btn  submitBtn clearfix' disabled={submitStatus=="submitting"}
                    data-tooltip-id="tooltipsubmit">
                        Submit
                        {submitStatus=="submitting" && (
                            <div className="spinner-border text-light float-end " role="status">
                            </div>
                        )}
                    </button>
            
               </form>)}
             </Formik>
            </div>
            <Tooltip id="tooltipsubmit" style={tooltipStyle} place="bottom" 
            content="sign up to edocollege library" />
            <PromptModal onHide={()=>setShowModal(false)} show={showModal} mode={promptMode} 
             bodyText={promptBody} headerText={promptHeader} />
        </div>
    );

}

export default SignUp;


