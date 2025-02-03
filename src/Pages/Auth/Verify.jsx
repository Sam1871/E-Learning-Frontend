import React ,{useState}from "react";
import {Link, useNavigate} from "react-router-dom"
import "./verify.css";
import {UserData} from "../../Context/UserContext"
import ReCAPTCHA from "react-google-recaptcha";


const Verify = () => {

  const [otp, setOtp] = useState("");
  const {btnLoading, verifyOtp} = UserData();
  const navigate = useNavigate();
  const [show, setShow] = useState(false)

  const submitHandler = async(e) => {
      e.preventDefault();
      await verifyOtp(Number(otp), navigate);
  }

  function onChange(value) {
    console.log("Captcha value:", value);
    setShow(true)
  }
  
  return (
    <div className="auth_page">
      
      <div className="auth_form">
        <h2>Verify Account</h2>

        <form onSubmit={submitHandler} >

        <label htmlFor="Number">One Time Code</label>
        <input type="number" 
        value={otp}
        onChange={(e)=> setOtp(e.target.value)}
        required/>

        <ReCAPTCHA
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={onChange}
            />

        {
          show && <button disabled={btnLoading} type="submit" className="comman-btn">
          {btnLoading? "Please Wait..." : "Verify"}
          </button>
        }
        </form>

        <p>Go To <Link to={"/login"}>Login</Link> Page</p>
      </div>
    </div>
  )
};

export default Verify;
