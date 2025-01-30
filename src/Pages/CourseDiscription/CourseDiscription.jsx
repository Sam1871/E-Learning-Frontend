import React, { useEffect } from "react";
import "./CourseDiscription.css"
import { useNavigate, useParams } from "react-router";
import {useCourseData} from "../../Context/CourseContext"
import { server } from "../../main";
import "./CourseDiscription.css"


const CourseDiscription = ({user}) => {
    const params = useParams();
    const {fetchSingleCourse, course, } = useCourseData();
    const token = localStorage.getItem("token")
    const navigate = useNavigate();
    
    const checkoutHandler = ()=>{
        
        navigate(`/payment-page/${params.id}`)
    }

    useEffect(()=>{
        fetchSingleCourse(params.id, token)
        
    },[])

    const getImageUrl = () => {
        if (course && course.image) {
          const lastSlashIndex = course.image.lastIndexOf("\\");
          const imageFilename = course.image.substring(lastSlashIndex + 1);
          return `${server}/tmp/my-uploada/${imageFilename}`;
        }
        return ""; // Return empty string if no image is available
      };

      const imageurl = getImageUrl();

  return (
    <>
    {course && (
        <div className="course-discription">
            <div className="course-header">
                <img src={imageurl} alt="" className="course-image" />
            </div>
            <div className="course-info">
                <h1>{course.title}</h1>
                <p>Instructor: {course.createdBy}</p>
                <p>Duration: {course.duration} Weeks</p>
            </div>
            <p>{course.description}</p>
            <p>Let's get Started with course At ₹{course.price}</p>
            {user && user.subscription?.includes(course._id) ? (
          <button
            className="comman-btn"
            onClick={() => navigate(`/Course/study/${course._id}`)}
            style={{ backgroundColor: "red", color: "#fff" }}
          >
            Study
          </button>
        ) : (
          <button
            className="comman-btn"
            onClick={checkoutHandler}
            style={{ backgroundColor: "red", color: "#fff" }}
            
          >
            Buy Now
          </button>
        )}
            
        </div>

    )}
    </>
  );
};

export default CourseDiscription;
