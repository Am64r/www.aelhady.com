// page.tsx

"use client";

import { useRef, useEffect, useState } from "react";
import Header from "./components/Header.js";
import ChatSection from "./components/chat-section";
import Typewriter from './components/TypeWriter';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import LinkedInLogo from './components/LinkedInLogo.js';
import GitHubLogo from './components/GitHubLogo.js';
import Email from './components/Email.js';
import Footer from './components/Footer.js';
import AboutMe from "./components/AboutMe";
import { PopupButton } from "react-calendly";
import RepoCard from "react-repo-card";
import { InstagramEmbed } from 'react-social-media-embed';
import ThreeParticleVisualizer from "./components/ThreeParticleVisualizer";

export default function Home() {
  const ref = useRef<IParallax>(null);
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRootElement(document.body);
  }, []);

  return (
    <main className="h-screen w-screen flex flex-col justify-between background-gradient">
      
      <Header parallaxRef={ref} />
      <Parallax pages={2} ref={ref}>
      
        {/* Typewriter Section */}
        <ParallaxLayer
          offset={0}
          speed={0.5}
          factor={0.5}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className="w-full text-center">
            <Typewriter text="amr elhady" speed={200} showCaret={true} />
          </div>
        </ParallaxLayer>

        {/* ChatSection Section */}
        <ParallaxLayer 
          offset={0.4} 
          speed={0.8}
          factor={0.8}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <div className="w-[90%] lg:w-[60rem] h-[50vh]">
            <ChatSection />
          </div>
        </ParallaxLayer>

        {/* About Me Section */}
        <ParallaxLayer
          offset={0.9}  // Adjust this for exact positioning
          speed={0.8}
          factor={0.8}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AboutMe />
        </ParallaxLayer>

        {/* Social Media Section, RepoCard, Calendly, and Footer */}
        <ParallaxLayer 
          offset={1.4}  // Slightly below AboutMe for a natural flow
          speed={0.5}
          factor={0.4}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >

          <ParallaxLayer >
            {/* <RepoCard username="Am64r" repository="www.aelhady.com" />
            
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <InstagramEmbed url="https://www.instagram.com/reel/C7c3EOTOCme/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" width={328} />
            </div> */}

          </ParallaxLayer>
          <div id="socials" className="flex justify-center items-center gap-[15px] mb-4">
            <LinkedInLogo />
            <GitHubLogo />
            <Email />
          </div>
          <div className="mb-4">
            {rootElement && (
              <PopupButton
                url="https://calendly.com/amrelhady/tech-internship-chat"
                rootElement={rootElement}
                text="Calendly"
                className="bg-[#855ecf] hover:bg-[#6f4eac] text-white font-bold py-2 px-4 rounded transition duration-300"
              />
            )}
          </div>
          
          <Footer />
        </ParallaxLayer>
      </Parallax>
    </main>
  );
}
