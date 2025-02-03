import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Header from "./Components/header/Header";
import Footer from "./Components/footer/Footer";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Verify from "./Pages/Auth/Verify";
import About from "./Pages/About/About";
import Profile from "./Pages/Profile/Profile";
import { UserData } from "./Context/UserContext";
import Loading from "./Components/Loder/Loading";
import Allcourses from "./Components/CourseCard/Allcourses";
import CourseDiscription from "./Pages/CourseDiscription/CourseDiscription";
import Paymentsuccess from "./Pages/PaymentSuccess/Paymentsuccess"
import PaymentForm from "./Pages/paymentpage/Paymentpage"
import Dashboard from "./Pages/Dashboard/Dashboard"
import CourseStudy from "./Pages/CourseStudy/CourseStudy"
import Lecture from "./Pages/lectures/Lecture";
import Admin_Dashboard from "./admin/Dashboard/Admin_Dashboard"
import Admin_course from "./admin/Courses/Admin_course"
import Admin_users from "./admin/Users/Admin_users"
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import ResetPassword from "./Pages/Auth/ResetPassword"






const App = () => {

  const {isAuth, user, loading } = UserData()
  return (
    <>
      {loading? <Loading/> : 
        <BrowserRouter>
        <Header isAuth={isAuth}/>
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/about" element={<About />} />
           {/* <Route path="/courses" element={<Courses />} /> */}
           < Route path="/allcourses" element={< Allcourses /> }/>
           < Route path="/account" element={isAuth? < Profile user={user}/>: <Login/>} />
           <Route path="/login" element={isAuth? <Home/> :<Login/>} />
           <Route path="/register" element={isAuth? <Home/> :<Register/>} />
           <Route path="/verify" element={isAuth? <Home/> :<Verify/>} />
           <Route path="/forgotPassword" element={isAuth? <Home/> :<ForgotPassword/>} />
           <Route path="/reset-password/:token" element={isAuth? <Home/> :<ResetPassword/>} />
           <Route path="/Course/:id" element={isAuth? <CourseDiscription user={user}/> :<Login/>} />
           <Route path="/payment-success" element={isAuth? <Paymentsuccess user={user}/>: <Login/>} />
           <Route path="/payment-page/:id" element={isAuth? <PaymentForm user={user}/> : <Login/>} />
           <Route path="/:id/dashboard" element={isAuth? <Dashboard user={user}/>: <Login/>} />
           <Route path="/Course/study/:id" element={isAuth? <CourseStudy user={user}/> : <Login/>} />
           < Route path="lectures/:id" element={isAuth? <Lecture user={user}/> : <Login/> } />
           < Route path="/admin/dashboard" element={isAuth ? <Admin_Dashboard user={user}/> : <Login/>} />
           < Route path="/admin/course" element={isAuth ? <Admin_course user={user}/> : <Login/>} />
           < Route path="/admin/user" element={isAuth ? <Admin_users user={user}/> : <Login/>} />
           
          </Routes>
         < Footer />
       </BrowserRouter>
      }
    </>
  );
};

export default App;
