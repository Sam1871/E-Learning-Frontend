import "./allCourses.css"
import {useCourseData} from "../../Context/CourseContext"
import Course_card from "../CourseCard/Course_card"


const Allcourses = () => {

  const {courseData} = useCourseData();
  
  
  return (
    <div className="allCourses">
       <h2> Available Courses</h2>
        <div className="course_container">
           { courseData && courseData.length > 0 ? (
              courseData.map((e) => (
                <Course_card  key={e._id} data={e}/> 
              ))
           ) : (
            "No Courses Available "
           )}
        </div>
    </div>
  );
};

export default Allcourses;
