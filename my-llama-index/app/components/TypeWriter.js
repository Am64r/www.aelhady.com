import React, { useState, useEffect } from 'react';
import '../css/Typewriter.css';

const Typewriter = ({ text, speed, fontSize, showCaret }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setIndex((prevIndex) => prevIndex + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [index, text.length, speed]);

  const typewriterStyle = {
    fontSize: fontSize,
    borderRight: showCaret ? '2px solid orange' : 'none',
  };

  return (
    <div className="typewriter" style={typewriterStyle}>
      {text.substring(0, index)}
    </div>
  );
};

export default Typewriter;
