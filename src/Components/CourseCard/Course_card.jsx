import React from "react";
import { server } from "../../main";
import "./Course_Card.css"
import {UserData} from "../../Context/UserContext"
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import {useCourseData} from "../../Context/CourseContext"
import axios from "axios";

const Course_card = ({data}) => {

    const {user, isAuth } = UserData();
    const navigate = useNavigate();

    const {fetchCourseData} = useCourseData()

    const deletehandler= async(id) => {
      if(confirm("Are you sure you want to delete this course")){
        const token = localStorage.getItem("token")
      try {
        const {data} = await axios.delete(`${server}/api/v1/course/${id}` , {
          headers:{
            Authorization: `Bearer ${token}`,
          }
        })
        toast.success(data.message);
        
        fetchCourseData()
        
      } catch (error) {
        toast.error(error.responce.data.message)
        
      }

      }
    }

    const imageurl = `${server}/tmp/my-uploada/${data.image.split("\\").pop()}`;
    
  return (
    
    <div className="card_container">
      <img src={imageurl} alt="Course_Image"  />
      <h3>{data.title}</h3>
      <p>{data.description}</p>
      <p>Price: ₹{data.price}</p>
      <p>Duration: {data.duration} Weeks</p>
      <p>Created By: {data.createdBy}</p>
      {
        isAuth ? (

          <>
          {
            user.role !== "admin" ? (
              <>
                {
                user.subscription.includes(data._id) ? (
                  <>
                  <button 
                  className="comman-btn" 
                  onClick = {() => navigate(`/Course/study/${data._id}`)}
                  style={{backgroundColor: "#8a4baf", color: "#fff"}
                }>Study</button>
                  </>
                ) : (
                  <>
                  <button 
                  className="comman-btn" 
                  onClick = {() => navigate(`/Course/${data._id}`)}
                  style={{backgroundColor: "#8a4baf", color: "#fff"}
                }>Get Started</button>
                  </>
                )
              }
              </>
            ) : (
              <>
              <button 
              className="comman-btn" 
              onClick = {() => navigate(`/Course/study/${data._id}`)}
              style={{backgroundColor: "#8a4baf", color: "#fff"}
            }>Study</button>
              </>
            
            )
          }
          
          </>
          
        ) : (
          <button className="comman-btn" 
              onClick = {() => navigate("/login")}
              style={{backgroundColor: "#8a4baf", color: "#fff"}
              
            }>Get Started</button>
        )
      }
        <br/>
      {
        user && user.role === "admin" && (
          <>
            <button className="comman-btn" 
              onClick = {() => deletehandler(data._id)}
              style={{backgroundColor: "red", color: "#fff"}
                }>Delete</button>
        </>
          
        )
          
      }

      
    </div>

  );
};

export default Course_card;
