import React, { useState } from "react";
import "./auth.css";
import {useNavigate} from "react-router-dom"
import toast from "react-hot-toast"
import axios from "axios"
import {server} from "../../main"


const ForgotPassword = () => {

  const [email, setEmail] = useState("")
  const [btnLoading, setBtnLoading] = useState(false)
  const navigate = useNavigate()
  

  const handleSubmit = async(e)=>{
      e.preventDefault();
      
      try {
          setBtnLoading(true)
        const {data} = await axios.post(`${server}/api/v1/user/forgot`,{email})
        toast.success(data.message)
        navigate("/login")
        setBtnLoading(false)
        console.log(email)
      } catch (error) {
        toast.error(error.responce.data.message)
        setBtnLoading(false)
      }
  }
  return <div className="auth_page">
    <div className="auth_form">
      <h2>Forgot Password</h2>
      <form  onSubmit={handleSubmit}>
          <label htmlFor="text">Email</label>
          <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Please Enter your email" required/>
          <button disabled={btnLoading} className="comman-btn">
            {
              btnLoading ? "Please Wait...." : "Forgot Password"
            }
          </button>
      </form>

    </div>
  </div>;
};

export default ForgotPassword;
