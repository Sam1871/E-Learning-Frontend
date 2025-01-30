import React,{useState }from "react";
import "./auth.css"
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../Context/UserContext";

const Register = () => {
  const {registerUser, btnLoading} = UserData()
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const submitHandler = async (e) =>{
      e.preventDefault()
      await registerUser(name, email, password, navigate);
      // console.table(email,password,name)
  }
  return (   
     <div className="auth_page">
        <img src="https://static.vecteezy.com/system/resources/thumbnails/004/896/100/small_2x/a-man-did-online-registration-from-pc-successfully-concept-illustration-flat-design-eps10-free-vector.jpg" alt="" width="650px" />

        <div className="auth_form">

          <h2>Registration Form</h2>
          
          <form onSubmit={submitHandler}>

          <label htmlFor="name">Name</label>
          <input type="name" 
            value={name} 
            onChange={e=> setName(e.target.value)} required placeholder="Please Enter Your Name "/>

          <label htmlFor="email">Email</label>
          <input type="email" 
            value={email} 
            onChange={e=> setEmail(e.target.value)}
          required placeholder="Please Enter Your Email"/>

          <label htmlFor="password">Password</label>
          <input type="password" 
            value={password} 
            onChange={e=> setPassword(e.target.value)}
          required placeholder="Please Enter Your Name"/>

          <button type="submit" disabled={btnLoading} className="comman-btn">
            {btnLoading ? "Please Wait ....": "Register"}
            </button>

          </form>

          <p>Have an account <Link to={"/login"}>Login</Link></p>
        </div>
      
     </div>
  )
};

export default Register;
