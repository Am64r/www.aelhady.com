"use client";

import React from 'react';
import { IoMail } from 'react-icons/io5';

const Email = () => {
  return (
    <a href="mailto:theamrelhady@gmail.com" target="_blank" rel="noopener noreferrer">
      <IoMail size={40} color="#855ecf" /> 
      {/* 0077B5 */}
    </a>
  );
};

export default Email;
