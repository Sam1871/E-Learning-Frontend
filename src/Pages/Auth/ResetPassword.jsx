import React, { useState } from "react";
import "./auth.css";
import {useNavigate, useParams} from "react-router-dom"
import axios from "axios"
import {server} from "../../main"
import toast from "react-hot-toast";

const ResetPassword = () => {
    const [password, setPassword ] = useState("")
    const [btnLoading, setBtnLoading] = useState(false)
  const navigate = useNavigate()
  const params = useParams()
  

  const handleSubmit = async(e)=>{
      e.preventDefault();
      
      try {
          setBtnLoading(true)
        const {data} = await axios.post(`${server}/api/v1/user/reset?token=${params.token}`,{password})
        toast.success(data.message)
        navigate("/login")
        setBtnLoading(false)
        
      } catch (error) {
        toast.error(error.response.data.message)
        setBtnLoading(false)
      }
  }
  return <div className="auth_page">
  <div className="auth_form">
    <h2>Rese Password</h2>
    <form  onSubmit={handleSubmit}>
        <label htmlFor="text">Password</label>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Please Enter your Password" required/>
        <button disabled={btnLoading} className="comman-btn">
          {
            btnLoading ? "Please Wait...." : "Reset Password"
          }
        </button>
    </form>

  </div>
</div>;
};

export default ResetPassword;
