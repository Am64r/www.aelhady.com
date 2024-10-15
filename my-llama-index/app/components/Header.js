"use client";

import React, {useState} from 'react';
import '../css/Header.css';

const Header = ({ parallaxRef  }) => {
    const [showEmail, setShowEmail] = useState(false);
    
    const scrollToBottom = () => {
        if (parallaxRef.current) {
          
          parallaxRef.current.scrollTo(2);
        }
      };

      const scrollToTop = () => {
        if (parallaxRef.current) {
          
          parallaxRef.current.scrollTo(0);
        }
      };
 

    return (
        <header className="header">
            <button className="header-name" onClick={scrollToTop}>A | E</button>
            <nav>
                {/* <button className="header-link">About</button> */}
                <button className="header-link" onClick={scrollToBottom}>Contact</button>


            </nav>
            {showEmail && (
                <div className="email-box">
                    <p className="email">theamrelhady@gmail.com</p>
                    <button className="x-out" onClick={() => setShowEmail(false)}>X</button>
                </div>
            )}
        </header>
    );
};

export default Header;
