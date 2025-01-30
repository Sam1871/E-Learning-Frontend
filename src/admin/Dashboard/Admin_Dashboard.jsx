import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import Layout from "../Utils/Layout"
import axios from "axios"
import {server} from "../../main"
import "./adminDashboard.css"


const Admin_Dashboard = ({user}) => {
    const navigate = useNavigate();

if(user.role !== "admin") return navigate("/")
    
    const [stats,setStats] = useState([])

    async function fetchStats() {
        const token = localStorage.getItem("token")
        try {
            const {data} = await axios.get(`${server}/api/v1/stats`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            setStats(data.stats)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchStats()
    },[])

    console.log(stats)

  return <div>
    <Layout childern={<div className="main-content">
            <div className="box">
                <p>Total Courses</p>
                <p>{stats.totalCourse}</p>
            </div>
            <div className="box">
                <p>Total Lectures</p>
                <p>{stats.totallecture}</p>
            </div>
            <div className="box">
                <p>Total Users</p>
                <p>{stats.totalUsers}</p>
            </div>
        </div>}>
        
    </Layout>
    
  </div>;
};

export default Admin_Dashboard;
