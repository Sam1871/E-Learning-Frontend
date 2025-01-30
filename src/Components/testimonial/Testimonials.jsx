import React from "react";
import "./testimonials.css"

const Testimonials = () => {

    const testimonialsData = [
        {
          id: 1,
          name: "John Doe",
          position: "Student",
          message:
            "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
          image:
            "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
        },
        {
          id: 2,
          name: "Jane Smith",
          position: "Student",
          message:
            "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
          image:
            "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        },
        {
          id: 3,
          name: "Ana Smith",
          position: "Student",
          message:
            "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
          image:
            "https://storage.googleapis.com/wzukusers/user-500011/images/55f959194cdb8mcbn2pE/people__0006_Layer-17.jpg",
        },
        {
          id: 4,
          name: "Kat Geroge",
          position: "Student",
          message:
            "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
          image:
            "https://image.cnbcfm.com/api/v1/image/107112871-1662061829791-PXL_20201225_201858452PORTRAIT.jpg?v=1662062352&w=1920&h=1080",
        },
      ];

  return (
    <section className="testimonial">
        <h2>What our Students Say</h2>
        <div className="testimonials-cards">
            { 
                testimonialsData.map((e)=>(
                    <div className="testimonial-card" key={e.id}>
                        <div className="student-image">
                            <img src={e.image} alt="" />
                        </div>
                        <p className="message">{e.message}</p>
                        <div className="info">
                            <p className="User-name">{e.name}</p>
                            <p className="position">{e.position}</p>
                        </div>
                    </div>
                ))
            }
        </div>    
    </section>
  );
};

export default Testimonials;
