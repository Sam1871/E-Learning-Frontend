import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import "./profile.css"
import { FaPowerOff } from "react-icons/fa";
import { UserData } from "../../Context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";


const Profile = ({user}) => {

  const {setUser, setIsAuth } = UserData()
  const naviagte = useNavigate()

  const logoutHandler = () =>{
      setIsAuth(false);
      setUser("")
      localStorage.clear()
      toast.success("Logged Out")
  }


  return (
    <div>
      {user && (
        <div className="profile">
        <h2>My Profile</h2>
        <div className="profile-info">
          <p><strong>Name - {user.username}</strong></p>
          <p><strong>Email - {user.email}</strong></p>
          <button onClick={()=> naviagte(`/${user._id}/dashboard`)} className="comman-btn" style={{backgroundColor:"#8a4baf", color:"white"}}><MdSpaceDashboard />
            Dashboard</button>
            <br />
            {
              user.role === "admin" && (
                <button onClick={()=> naviagte(`/admin/dashboard`)} className="comman-btn" style={{backgroundColor:"#8a4baf", color:"white"}}><MdSpaceDashboard />
             Admin Dashboard</button>
            
              )
            }
            <br/>

            <button onClick={logoutHandler} className="comman-btn" style={{backgroundColor:"red", color:"white"}}><FaPowerOff />
            Logout</button>
        </div>
      </div>
      )}
    </div>
    
  );
};

export default Profile;
