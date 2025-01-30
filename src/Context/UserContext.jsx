import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import toast, { Toaster } from "react-hot-toast";


const UserContext = createContext();


export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);  // Initialize with null or empty object
    const [isAuth, setIsAuth] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    

    async function loginUser(email, password, navigate,fetchMyCourse) {
        setBtnLoading(true);

        try {

            const { data } = await axios.post(`${server}/api/v1/user/loginUser`, { email, password });

            toast.success(data.message);
            localStorage.setItem("token", data.token);
            setUser(data.user);
            setIsAuth(true);
            setBtnLoading(false);
            navigate("/");
            fetchMyCourse()

        } catch (error) {
            setBtnLoading(false);
            setIsAuth(false);
            toast.error(error?.response?.data?.message );
        }
    }



    async function fetchUser() {
        try {
            const token = localStorage.getItem("token"); // Ensure the token is retrieved correctly
    
            if (!token) {
                throw new Error("No token found");
            }
    
            const { data } = await axios.get(`${server}/api/v1/user/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,  // Fixed the closing quotation mark here
                },
            });
    
            setIsAuth(true);
            setUser(data.user);
            setLoading(false);
    
        } catch (error) {
            console.error(error);
            setIsAuth(false); // Optionally handle unauthenticated state
            setLoading(false);
        }
    }

    async function registerUser (username, email, password, navigate) {
        setBtnLoading(true)
        try {
            const {data} = await axios.post(`${server}/api/v1/user/register`, {
                username, email, password
            });

            localStorage.setItem("activation_token", data.activation_token)
            setBtnLoading(false)
            toast.success(data.message)
            navigate("/verify")



        } catch (error) {
            setBtnLoading(false)
            toast.success(error.response.data.message);
        }
    }

    async function verifyOtp (Otp, navigate) {
        
        setBtnLoading(true);
        const activation_token = localStorage.getItem("activation_token");
        //  if(!activation_token){
        //     toast.error("activation Token is Missing ");
        //     setBtnLoading(false);
        //     return
        //  }

        try {

            
            
            const {data} = await axios.post(`${server}/api/v1/user/verify`, {activation_token, Otp} )

            toast.success(data.message)
            setBtnLoading(false);
            navigate("/login")
            localStorage.clear();
            
            
        } catch (error) {
            
            setBtnLoading(false);
            toast.error(error?.response?.data?.message);
        }

    };
    
    useEffect(()=>{
        fetchUser()
    },[])
    return (
        <UserContext.Provider value={{ fetchUser,user, setUser, isAuth, setIsAuth, loginUser, btnLoading, loading ,registerUser,verifyOtp}}>
            {children}
            <Toaster />
        </UserContext.Provider>
    );
}

export const UserData = () => useContext(UserContext); // Corrected hook name and context
