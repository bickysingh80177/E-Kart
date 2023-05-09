import React from "react";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
} from "react-icons/ai";

import "./Footer.css";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";

const Footer = () => {
  return (
    <footer>
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download our app from Android and IOS app store</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="appstore" />
      </div>
      <div className="midFooter">
        <h1>ECOMMERCE</h1>
        <p>High Quality is our First Priority</p>
        <p>Copyrights 2023 &copy; BickySingh</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="www.instagram.com">
          <AiOutlineInstagram size={50} />
        </a>
        <a href="www.facebook.com">
          <AiOutlineFacebook size={50} />
        </a>
        <a href="www.instagram.com">
          <AiOutlineLinkedin size={50} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
