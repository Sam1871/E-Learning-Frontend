import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";

const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {
    const [courseData, setCourseData] = useState([]);
    const [course, setCourse] = useState([]);
    const [mycourse, setMycourse] = useState([])

    async function fetchCourseData() {
        try {
            const { data } = await axios.get(`${server}/api/v1/course/all`);
            setCourseData(data.course);
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchSingleCourse(id, token) {
        try {
            const {data} = await axios.get(`${server}/api/v1/course/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setCourse(data.singleCourse)
        } catch (error) {
            console.log(error);
        }
    };

    async function fetchMyCourse(UserToken ) {
        try {
            const {data} =  await axios.get(`${server}/api/v1/mycourse`, 
                {
                  headers: {
                      'Authorization': `Bearer ${UserToken}`
                  }
                  }
            );

            setMycourse(data);



        } catch (error) {
            console.log(error);
        }
    }

    async function addCourse(userId, courseId, navigate, token) {
        try {
          // Validate inputs
          if (!userId || !courseId) {
            throw new Error("Missing userId or courseId.");
          }
      
          if (!token) {
            throw new Error("Authorization token is missing.");
          }
      
          // API request
          await axios.post(
            `${server}/api/v1/addCourse`,
            { userId, courseId },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Ensure token format is correct
              },
            }
          );
      
          // Navigate to payment success page
          navigate("/payment-success");
      
          console.log("Course added successfully!");
        } catch (error) {
          // Log detailed error for debugging
          console.error("Error adding course:", error.message || error);
      
          // Optional: Provide feedback to the user
          alert("Failed to add course. Please try again.");
        }
      }

      
    useEffect(() => {
        fetchCourseData();
        
    }, []);

    return (
        <CourseContext.Provider value={{ 
          courseData , 
          fetchSingleCourse, 
          course, 
          fetchCourseData, 
          fetchMyCourse, 
          mycourse, 
          addCourse}}>
            {children}
        </CourseContext.Provider>
    );
};

export const useCourseData = () => useContext(CourseContext);
