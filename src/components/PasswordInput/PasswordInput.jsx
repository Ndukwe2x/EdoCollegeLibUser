import { useState } from "react";


const PasswordInput=({controller,disabled})=>{

const [showText,setShowText]=useState(false);
const controlHeightStyle={height:'40px'};
const buttonStyle={backgroundColor:'#0e5fc9', height:'41px',color:'#f8fbfd' }

const toggleShowPassword=()=>{
  setShowText(preValue=>!preValue);
}

return(
    <div className="mt-2">
        <label htmlFor='token'>Token</label>
        <div className="input-group">
            <input id="token" name="token" style={controlHeightStyle} className="form-control"
             disabled={disabled} placeholder="Token" maxLength={15}
               type={showText?"text":"password"} {...controller.getFieldProps('token')}   /> 

            <button onClick={toggleShowPassword} className="btn" title={showText?"hide token":"show token"}
            style={buttonStyle}  type="button" disabled={disabled}>
               {showText ? <i className="bi bi-eye-slash-fill"></i>:<i className="bi bi-eye-fill"></i>}
            </button>
        </div>
        {controller.touched && controller.errors.token ? (<p className='errTxt'>{controller.errors.token}</p>) : null}
    </div>
)

}
export default PasswordInput;