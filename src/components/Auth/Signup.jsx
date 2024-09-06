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

const Signup = () => {
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [signupError, setSignupError] = useState(false);
  const { signUp } = useAuth(); // get global Auth context for setting user credentials
  const navigate = useNavigate();

  const tooltipStyle = { backgroundColor: '#20134488' };

  

  const signupSubmit = async (values) => {

    
  
    setSubmitStatus("submitting");   
      try {
           
        const response = await signUp(values);
  
        if (response.data.status === "success") {
          navigate('/dashboard');  // Redirect on successful login
          values.username = ''; values.token = ''; //clear form after submit
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

  return (
    <div style={{paddingTop:100}}>

      <TopBar />
    <div className="login-container">
      <div className="login-card">
        <img src={logo} alt="Logo" />
        <div className='formSignup center'>
        <div style={{padding: 20}}>

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
            {formik => (
              <form onSubmit={formik.handleSubmit} className="signup-grid">
                {signupError && <p className='errTxt'>Sign-up failed. Please check your details.</p>}

                <div className="form-grid" style={{ justifyContent: 'space-between', gap: 20}}>

                
                <div className="form-group">
                  {/* <label htmlFor='firstName'>First Name</label> */}
                  <input
                    className='form-control'
                    id='firstName'
                    name="firstName"
                    maxLength={60}
                    disabled={submitStatus === "submitting"}
                    type='text'
                    placeholder='Enter your first name'
                    {...formik.getFieldProps('firstName')}
                    />
                  {formik.touched.firstName && formik.errors.firstName ? (<p className='errTxt'>{formik.errors.firstName}</p>) : null}
                </div>

                <div className="form-group">
                  {/* <label htmlFor='lastName'>Last Name</label> */}
                  <input
                    className='form-control'
                    id='lastName'
                    name="lastName"
                    maxLength={60}
                    disabled={submitStatus === "submitting"}
                    type='text'
                    placeholder='Enter your last name'
                    {...formik.getFieldProps('lastName')}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (<p className='errTxt'>{formik.errors.lastName}</p>) : null}
                </div>
                </div>
                <div className="form-grid" style={{ justifyContent: 'space-between', gap: 20}}>
                <div className="form-group">
                  {/* <label htmlFor='studentID'>Student ID</label> */}
                  <input
                    className='form-control'
                    id='studentID'
                    name="studentID"
                    maxLength={60}
                    disabled={submitStatus === "submitting"}
                    type='text'
                    placeholder='Enter your student ID'
                    {...formik.getFieldProps('studentID')}
                    />
                  {formik.touched.studentID && formik.errors.studentID ? (<p className='errTxt'>{formik.errors.studentID}</p>) : null}
                </div>

                <div className="form-group">
                  {/* <label htmlFor='entryYear'>Entry Year</label> */}
                  <input
                    className='form-control'
                    id='entryYear'
                    name="entryYear"
                    maxLength={4}
                    disabled={submitStatus === "submitting"}
                    type='number'
                    placeholder='Enter your entry year'
                    {...formik.getFieldProps('entryYear')}
                    />
                  {formik.touched.entryYear && formik.errors.entryYear ? (<p className='errTxt'>{formik.errors.entryYear}</p>) : null}
                </div>
                </div>
                <div className="form-grid" style={{ justifyContent: 'space-between', gap: 20}}>
                <div className="form-group">
                  {/* <label htmlFor='classOfAdmission'>Class of Admission</label> */}
                  <input
                    className='form-control'
                    id='classOfAdmission'
                    name="classOfAdmission"
                    maxLength={60}
                    disabled={submitStatus === "submitting"}
                    type='text'
                    placeholder='Enter your class of admission'
                    {...formik.getFieldProps('classOfAdmission')}
                    />
                  {formik.touched.classOfAdmission && formik.errors.classOfAdmission ? (<p className='errTxt'>{formik.errors.classOfAdmission}</p>) : null}
                </div>
                </div>
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
      </div>
    </div>
      <Footer />
  </div>
  );
};

export default Signup;
