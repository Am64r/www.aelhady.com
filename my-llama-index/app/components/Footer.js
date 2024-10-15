"use client";

import React from 'react';
import '../css/Footer.css'; // Import the CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Amr Elhady. All rights reserved.</p>
        <p>theamrelhady@gmail.com</p>
      </div>
    </footer>
  );
};

export default Footer;
