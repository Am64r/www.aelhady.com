"use client";

import { useRef } from "react";
import Header from "./components/Header.js";
import ChatSection from "./components/chat-section";
import Typewriter from './components/TypeWriter';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import LinkedInLogo from './components/LinkedInLogo.js';
import GitHubLogo from './components/GitHubLogo.js';
import Email from './components/Email.js';
import Footer from './components/Footer.js';
import Calendly from './components/Calendly.js';
import { PopupButton } from "react-calendly";

export default function Home() {
  const ref = useRef<IParallax>(null);

  return (
    <main className="h-screen w-screen flex flex-col justify-center items-center background-gradient">
      <Header parallaxRef={ref} />
      <Parallax pages={2} ref={ref}>
        
        {/* Typewriter Section */}
        <ParallaxLayer
          offset={0.2}
          speed={1}
          factor={2}
          style={{
            backgroundSize: 'cover',
          }}
        >
          <div className="w-full flex justify-center items-center">
            <div className="w-full text-center">
              <Typewriter text="amr elhady" speed={200} fontSize="220px" showCaret={true} />
            </div>
          </div>
        </ParallaxLayer>

        {/* ChatSection Section */}
        <ParallaxLayer offset={0.3} speed={0.8}>
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-[90%] lg:w-[60rem] h-[65vh] flex justify-center items-center">
              <ChatSection />
            </div>
          </div>
        </ParallaxLayer>

        {/* Social Media Section */}
        <ParallaxLayer offset={1.75} speed={0.8}>
          <div id="socials"></div>
          <div className="flex justify-center items-center gap-[15px] pb-5">
            <LinkedInLogo />
            <GitHubLogo />
            <Email />
          </div>
          
          <Footer />
        </ParallaxLayer>
      </Parallax>
    </main>
  );
}
