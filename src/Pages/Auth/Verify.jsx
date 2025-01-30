import React ,{useState}from "react";
import {Link, useNavigate} from "react-router-dom"
import "./verify.css";
import {UserData} from "../../Context/UserContext"

const Verify = () => {

  const [otp, setOtp] = useState("");
  const {btnLoading, verifyOtp} = UserData();
  const navigate = useNavigate();

  const submitHandler = async(e) => {
      e.preventDefault();
      await verifyOtp(Number(otp), navigate);
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

        <button disabled={btnLoading} type="submit" className="comman-btn">
          {btnLoading? "Please Wait..." : "Verify"}
          </button>
        </form>

        <p>Go To <Link to={"/login"}>Login</Link> Page</p>
      </div>
    </div>
  )
};

export default Verify;
