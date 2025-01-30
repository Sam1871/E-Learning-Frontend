import React, { useEffect, useState } from "react";
import "./admin_user.css";
import {useNavigate} from "react-router-dom"
import axios from "axios"
import {server} from "../../main"
import Layout from "../Utils/Layout"
import toast from "react-hot-toast";



const Admin_users = ({user}) => {
    const navigate = useNavigate();

    if(user.role !=="admin") return navigate("/");
     const [users, setUsers] = useState([]);

async function fetchUsers() {
    const token = localStorage.getItem("token")
    try {
        const {data} = await axios.get(`${server}/api/v1/users`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        setUsers(data.users)
    } catch (error) {
        console.log(error)
    }
}

useEffect(()=>{
    fetchUsers()
},[])

const updateRole = async(id) =>{
    if(confirm("Are you sure you want to the User Roles")){
        try {
            const token = localStorage.getItem("token")
            const {data} = await axios.put(`${server}/api/v1/user/${id}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            
            toast.success(data.message)
            await fetchUsers()
        } catch (error) {
            toast.error(error.respnse.data.message)
        }
    }
}

console.log(users)
  return (
    <Layout childern={
        <div className="users">
            <h1>All Users List</h1>
            <table border={"black"}>
                <thead>
                    <tr>
                        <td><h3>No.</h3></td>
                        <td><h3>Name</h3></td>
                        <td><h3>Email</h3></td>
                        <td><h3>Role</h3></td>
                        <td><h3>Upadte Role</h3></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        users && users.map((e,i)=>(
                            <tr key={e._id}>
                                <td>{i+1}</td>
                                <td>{e.username}</td>
                                <td>{e.email}</td>
                                <td>{e.role}</td>
                                <td>
                                    <button className="comman-btn"
                                        style={{backgroundColor: "#8a4baf", color: "#fff"}}
                                        onClick={()=>updateRole(e._id)}
                                    >Update</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>

        </div>
    }></Layout>
  )
};

export default Admin_users;
