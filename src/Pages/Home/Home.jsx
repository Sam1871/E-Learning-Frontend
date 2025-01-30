import React from "react";
import "./home.css"
import {useNavigate} from  "react-router-dom"
import Testimonials from "../../Components/testimonial/testimonials";
import Context from "../../Components/Context/Context";
import ReverceContext from "../../Components/Context/ReverceContext";




const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="home">
        <div className="home-content">
          <h1>Welcome to our E-Learning Plateform</h1>
          <p>
            <span>Learn</span>
            <span>Grow</span>
            <span>Excel</span>
          </p>
          <button onClick={()=>navigate("/course")} className="btn">Get Started</button>
        </div>
      </div>
      <div className="home-context">
      <Context image="../../../public/1st_Image.png" context="Welcome to E-Learning, where learning meets convenience. We offer a wide range of courses designed to fit your lifestyle and help you achieve your goals. With expert instructors and interactive content, you'll gain the skills you need to succeed." />
      <ReverceContext image="../../../public/2nd_image.webp" context="Our platform is flexible and user-friendly, allowing you to learn at your own pace, anytime, anywhere. Dive into engaging video lessons, take quizzes, and work on real-world projects to apply your new knowledge instantly."/>
      <Context image="../../../public/3rd_image.jpg" context="Join our community of learners today and unlock your potential. With affordable courses and a variety of subjects, [Your eLearning Website Name] is your gateway to a brighter future. Start learning now!" />
      </div>
      <Testimonials/>
      
    

    </>
  );
};

export default Home;
