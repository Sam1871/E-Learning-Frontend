import React from 'react';
import "./about.css"

const About = () => {
  return (
    <div className="about-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>About Us</h1>
          <p>Empowering learners worldwide through quality education.</p>
        </div>
      </section>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide accessible, high-quality education to learners around the world. We believe in the power of knowledge and strive to help individuals achieve their goals through engaging and interactive online courses.
        </p>
      </section>

      <section className="values-section">
        <h2 >Our Values</h2>
        <div className="values-grid">
          <div className="value-item">
            <h3>Innovation</h3>
            <p>We embrace creativity and technology to bring you the best learning experience possible.</p>
          </div>
          <div className="value-item">
            <h3>Quality</h3>
            <p>Our courses are designed and delivered by experts in the field to ensure you receive the best education.</p>
          </div>
          <div className="value-item">
            <h3>Accessibility</h3>
            <p>We are committed to making education accessible to everyone, regardless of their background.</p>
          </div>
          <div className="value-item">
            <h3>Community</h3>
            <p>Join a global community of learners who share your passion for knowledge and self-improvement.</p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src="https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247" alt="Team Member 1" />
            <h3>John Doe</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-member">
            <img src="https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Team Member 2" />
            <h3>Jane Smith</h3>
            <p>Chief Learning Officer</p>
          </div>
          <div className="team-member">
            <img src="https://images.pexels.com/photos/864994/pexels-photo-864994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Team Member 3" />
            <h3>David Johnson</h3>
            <p>Lead Developer</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
