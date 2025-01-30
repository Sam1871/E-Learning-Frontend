import React, { useEffect } from "react";
import "./courseStudy.css"
import {useCourseData} from "../../Context/CourseContext"
import { useNavigate, useParams } from "react-router";
import { server } from "../../main";


const CourseStudy = ({user}) => {
    const params = useParams()
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const {course, fetchSingleCourse} = useCourseData();
   
    useEffect(()=>{
        fetchSingleCourse(params.id, token)
    },[])

    if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
        return navigate("/");
      }

    const getImageUrl = () => {
            if (course && course.image) {
              const lastSlashIndex = course.image.lastIndexOf("\\");
              const imageFilename = course.image.substring(lastSlashIndex + 1);
              return `${server}/tmp/my-uploada/${imageFilename}`;
            }
            return ""; // Return empty string if no image is available
          };
    
          const imageurl = getImageUrl();
      

  return <>
  {course && (<div className="course-study-page">
          <img src={imageurl} alt="" width={350}/>
          <h2>{course.title}</h2>
          <h4>{course.description}</h4>
          <h5>Create By:- {course.createdBy}</h5>
          <h5>DureTion:- {course.duration} Weeks</h5>
          {/* <Link to={`/lectures/${course._id}`}><h2>Lectures</h2></Link> */}
        <button onClick={()=> navigate(`/lectures/${course._id}`)}
          style={{backgroundColor: "#8a4baf", color: "#fff"}}
          >Lectures</button>

  </div>) }
  </>;
};

export default CourseStudy;
