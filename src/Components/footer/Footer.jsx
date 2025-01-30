import React from "react";
import { AiFillFacebook, AiOutlineTwitter, AiFillInstagram} from "react-icons/ai";
import "./footer.css" 

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
      <p>
        &copy; 2024 Your E-Learning Platform. All rights reserved. <br/>
        Made with ❤️ <a href="">Sam Sharma</a>
      </p>
      <div className="social-links">
        <a href=""><AiFillFacebook /></a>
        <a href=""><AiOutlineTwitter /></a>
        <a href=""><AiFillInstagram />
        </a>
      </div>
    </div>
    </footer>
  );
};

export default Footer;
