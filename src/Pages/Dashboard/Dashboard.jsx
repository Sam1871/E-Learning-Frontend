import React, { useEffect } from "react";
import "./dashboard.css"
import {useCourseData} from "../../Context/CourseContext"
import Course_card from "../../Components/CourseCard/Course_card";

const Dashboard = () => {
    const {mycourse, fetchMyCourse} = useCourseData();
    const token = localStorage.getItem("token")
    useEffect(()=>{
      fetchMyCourse(token)
    },[])

  return (
    <div className="student_dashboard">
        <h2>All Enrolled Courses</h2>
        <div className="dashboard_content">
          {
            mycourse && mycourse.length > 0 ? 
              (
                mycourse.map((e) =>(
                  <Course_card key={e._id} data={e} />
                ))
              )
            : (<p>No Course Enrolled Yet</p> )
          }
        </div>

    </div>
  );
};

export default Dashboard;
