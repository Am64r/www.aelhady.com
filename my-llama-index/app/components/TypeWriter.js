"use client";

import React, { useState, useEffect } from 'react';
import '../css/Typewriter.css';

const Typewriter = ({ text, speed, showCaret }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setIndex((prevIndex) => prevIndex + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [index, text.length, speed]);

  return (
    <div className="typewriter-container">
      <div className="typewriter" style={{ borderRight: showCaret ? '2px solid orange' : 'none' }}>
        {text.substring(0, index)}
      </div>
    </div>
  );
};

export default Typewriter;
