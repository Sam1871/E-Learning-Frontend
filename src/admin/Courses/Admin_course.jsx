import React, { useState } from "react";
import "./adminCourse.css"
import Layout from "../Utils/Layout"
import { useNavigate } from "react-router";
import {useCourseData} from "../../Context/CourseContext"
import Course_card from "../../Components/CourseCard/Course_card";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";

const categories = [
    "Web Development",
    "App Development",
    "Game Development",
    "Data Science",
    "Artificial Intelligence"
]

const Admin_course = ({user}) => {
    const navigate = useNavigate()
    if(user.role !== "admin") return navigate("/")
    
     const {fetchCourseData,courseData} = useCourseData()
    
    const [title , setTitle] = useState("");
    const [description, setDescription] =useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [createdBy, setCreatedBy] = useState("");
    const [duretion, setDuretion] = useState("");
    const [image, setImage] = useState("");
    const [imagePrev, setImagePrev] = useState("");
    const [btnLoading, setBtnLoading] = useState(false);

    const changeImageHandler = (e)=>{
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = () =>{
          setImagePrev(reader.result);
          setImage(file);
        };
    };

    const submitHandler = async(e) =>{
        e.preventDefault();
        setBtnLoading(true)

        const myForm = new FormData()

        myForm.append("title",title);
        myForm.append("description",description);
        myForm.append("price",price);
        myForm.append("duration",duretion);
        myForm.append("category", category);
        myForm.append("createdBy",createdBy);
        myForm.append("files",image);

        

        const token = localStorage.getItem("token")

        try {
            const {data} = await axios.post(`${server}/api/v1/course/new`, myForm, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(data)

            toast.success(data.message);
            setBtnLoading(false);
            await fetchCourseData();
            setTitle("");
            setCategory("");
            setCreatedBy("");
            setDescription("");
            setPrice("");
            setImage("");
            setDuretion("")

        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }

    }
 

  return <Layout childern={
    <div className="admin-course">
        <div className="left">
            <h1>All Courses</h1>
            <div className="dashboard-content">
                {
                    courseData ?  
                    (
                        courseData.map((e)=>{
                            return <Course_card key={e._id} data={e}/> 
                         
     
                         })
                    )
                    : (<p>No course yet</p>)
                }
            </div>
        </div>
        <div className="right">
            <div className="add-course">
                <div className="course-form">
                    <h2>ADD Course</h2>
                    <form onSubmit={submitHandler} >
                        <label htmlFor="text">Title</label>
                        <input type="text" required 
                            value={title}
                            onChange={(e)=>setTitle(e.target.value)}
                        /> 

                        <label htmlFor="text">Description</label>
                        <input type="text" required 
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                        /> 

                        <select value={category} onChange={(e)=> setCategory(e.target.value)}>
                            <option value={''}>Select Options</option>
                            {
                                categories.map((e) =>(
                                    <option value={e} key={e}>{e}</option>
                                ))
                            }
                        </select>

                        <label htmlFor="text">Price</label>
                        <input type="text" required 
                            value={price}
                            onChange={(e)=>setPrice(e.target.value)}
                        /> 

                        <label htmlFor="text">CreatedBy</label>
                        <input type="text" required 
                            value={createdBy}
                            onChange={(e)=>setCreatedBy(e.target.value)}
                        /> 

                        <label htmlFor="text">Duretion</label>
                        <input type="number" required 
                            value={duretion}
                            onChange={(e)=>setDuretion(e.target.value)}
                        /> 

                            <input type="file" required 
                            onChange={changeImageHandler}/>
                            {
                                imagePrev && <img src={imagePrev} alt="" width={300}/>
                            } 

                        <button type="submit"
                            disabled={btnLoading}
                            className="comman-btn"
                            style={{backgroundColor: "#8a4baf", color: "#fff"}}
                        >{btnLoading ? "Please Wait...." : "ADD"}
                        </button>
                    </form>
                </div>

            </div>
        </div>
        
    </div>
  }
  > </Layout>;
};

export default Admin_course;
