import React, {useState} from "react";
import "./auth.css"
import {Link, useNavigate} from "react-router-dom";
import { UserData } from "../../Context/UserContext";
import {useCourseData} from "../../Context/CourseContext"
 
const Login = () => {
  const {loginUser, btnLoading} = UserData()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const {fetchMyCourse} = useCourseData();
  
  const submitHandler = async(e)=>{
    e.preventDefault();
     await loginUser(email, password, navigate,fetchMyCourse);
     setEmail("");
     setPassword("");

  }
  return (
    
    <div className="auth_page">
        <img src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg" alt="" />
        
        <div className="auth_form">
            
            <h2>Sign in</h2>

            <form onSubmit={submitHandler}>
                
                <label htmlFor="email">Email</label>
                <input type="email" 
                placeholder="Please Enter Your Email"
                value={email} 
                onChange={e=> setEmail(e.target.value)}  required/>

                <label htmlFor="password">Password</label>
                <input type="password" 
                value={password} 
                placeholder="Please Enter your Password"
                onChange={e=> setPassword(e.target.value)}
                required/>

                <button disabled={btnLoading} type="submit" className="comman-btn">
                  {btnLoading?"Please Wait..." : "Login"}
                  </button>
            </form>
            <p> Don't have an Account? <br></br><Link to={"/register"}> Click on Register</Link></p>
            <p><Link to={"/forgotPassword"}>Forgot Password</Link></p>
        </div>
    </div>
  );
};

export default Login;
