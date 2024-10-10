import React, { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../../auth/authHandler'; // Assuming a separate function for user creation
import { useAuth } from '../../auth/AuthContext';
import logo from '../../assets/edocollegelogo.png';
import TopBar from '../TopBar/TopBar';
import Footer from '../Footer/Footer';
import PromptModal from '../ModalDialogs/PromptModal';

const Signup = () => {
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [signupError, setSignupError] = useState(false);
  const { signUp } = useAuth(); // get global Auth context for setting user credentials
  const navigate = useNavigate();
  const [promptBody,setPromptBody]=useState("");
  const [promptHeader,setPromptHeader]=useState("");
  const [promptMode,setPromptMode]=useState("");
  const [showModal,setShowModal]=useState(false);
  const [signupSuccess,setSignUpSuccess]=useState(false); 
  const [signUpId,setSignupId]=useState("");

  const tooltipStyle = { backgroundColor: '#20134488' };

 
  const signupSubmit = async (values) => {
 
    setSubmitStatus("submitting");   
      try {
           
       
        const response = await createUser(values);
        if (response.data.status === "success") {
          setSignupId(values.studentID);
          //clear form after submit
          values.firstName= ''; values.lastName= ''; values.studentID= '';
          values.entryYear= ''; values.classOfAdmission= ''; values.studentID=''; 
          setSignUpSuccess(true);          
        }      
           
      } 
      catch (error)
      {
         console.log(error);
        if (error.response && (error.response.status == 401 || error.response.status == 404))
          setSignupError(true);
        else if (error.code === "ERR_NETWORK")
          alert("Please check your internet connection");
        else
          alert("Internal Server Error. Please try again later");
        
      }
      finally {
         setSubmitStatus("idle");   
           
      }
  
    }
  useEffect(()=>{
    if(signupSuccess){
      setPromptHeader("Successful SignUp!");
      setPromptBody(` Student user created successfully. Student Id: "${signUpId}".
      Please take note of your student Id for subsequent login access. Contact Admin for login token.`);
      setPromptMode("info");
      setShowModal(true);
      //navigate('/login');  
    }
  },[signupSuccess])
  return (
    <div>
    <TopBar showSideMenu={false} showAvatar={false}/>
    <div className="signup-container">
      <div className="login-card">
        <img src={logo} alt="Logo" />
        <div className='formSignup center'>
        <div style={{padding:10}}>
        <h4>Student Sign Up</h4>
        </div>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              studentID: '',
              entryYear: '',
              classOfAdmission: '',
            }}
            validationSchema={Yup.object({
              firstName: Yup.string().required('* required'),
              lastName: Yup.string().required('* required'),
              studentID: Yup.string().required('* required'),
              entryYear: Yup.number().required('* required'),
              classOfAdmission: Yup.string().required('* required'),
            })}
            onSubmit={signupSubmit}
          >
            {formik => (<form onSubmit={formik.handleSubmit} >
                {signupError && <p className='errTxt'>Sign-up failed. Please check your details.</p>}                              
                
                  {/* <label htmlFor='firstName'>First Name</label> */}
                  <input
                    className='form-control'
                    id='firstName'
                    name="firstName"
                    maxLength={60}
                    disabled={submitStatus === "submitting"}
                    type='text'
                    placeholder='First name'
                    {...formik.getFieldProps('firstName')}
                    />
                  {formik.touched.firstName && formik.errors.firstName ? (<p className='errTxt'>{formik.errors.firstName}</p>) : null}
                
                
                  {/* <label htmlFor='lastName'>Last Name</label> */}
                  <input
                    className='form-control'
                    id='lastName'
                    name="lastName"
                    maxLength={60}
                    disabled={submitStatus === "submitting"}
                    type='text'
                    placeholder='Last name'
                    {...formik.getFieldProps('lastName')}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (<p className='errTxt'>{formik.errors.lastName}</p>) : null}
                                                
                  {/* <label htmlFor='studentID'>Student ID</label> */}
                  <input
                    className='form-control'
                    id='studentID'
                    name="studentID"
                    maxLength={60}
                    disabled={submitStatus === "submitting"}
                    type='text'
                    placeholder='Student ID'
                    {...formik.getFieldProps('studentID')}
                    />
                  {formik.touched.studentID && formik.errors.studentID ? (<p className='errTxt'>{formik.errors.studentID}</p>) : null}
           
                  {/* <label htmlFor='entryYear'>Entry Year</label> */}
                  <input
                    className='form-control'
                    id='entryYear'
                    name="entryYear"
                    maxLength={4}
                    disabled={submitStatus === "submitting"}
                    type='number'
                    placeholder='Entry year'
                    {...formik.getFieldProps('entryYear')}
                    />
                  {formik.touched.entryYear && formik.errors.entryYear ? (<p className='errTxt'>{formik.errors.entryYear}</p>) : null}
                
                
                  {/* <label htmlFor='classOfAdmission'>Class of Admission</label> */}
                  <input
                    className='form-control'
                    id='classOfAdmission'
                    name="classOfAdmission"
                    maxLength={60}
                    disabled={submitStatus === "submitting"}
                    type='text'
                    placeholder='Admission class'
                    {...formik.getFieldProps('classOfAdmission')}
                    />
                  {formik.touched.classOfAdmission && formik.errors.classOfAdmission ? (<p className='errTxt'>{formik.errors.classOfAdmission}</p>) : null}
                             
                <div className="form-group full-width">
                  <button
                    type='submit'
                    className='btn btn-primary submitBtn clearfix'
                    disabled={submitStatus === "submitting"}
                    data-tooltip-id="tooltipsubmit"
                  >
                    Submit
                    {submitStatus === "submitting" && (
                      <div className="spinner-border text-light float-end" role="status"></div>
                    )}
                  </button>
                  <Tooltip id="tooltipsubmit" style={tooltipStyle} place="bottom" content="Signup to library" />
                </div>
              </form>
            )}
          </Formik>
          <p data-tooltip-id="tooltipresetpassword"><Link  to="/login" style={{color: "white"}}>Already have an account? Login</Link></p>
          <Tooltip id="tooltipresetpassword" style={tooltipStyle} place="bottom" content="login to your account" />
        </div>
        <PromptModal onHide={()=>setShowModal(false)} headerText={promptHeader}
            show={showModal} bodyText={promptBody} mode={promptMode} />
      </div>
    </div>
  <Footer />
  </div>
  );
};

export default Signup;
