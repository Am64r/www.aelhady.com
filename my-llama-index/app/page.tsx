import React, { useState, useRef } from 'react';

import Header from "@/app/components/header";
import ChatSection from "./components/chat-section";
import Typewriter from './components/TypeWriter.js';

export default function Home() {
  return (
    <main className="h-screen w-screen flex justify-center items-center background-gradient">
      <div className="space-y-2 lg:space-y-10 w-[90%] lg:w-[60rem]">
        {/* <Header /> */}
        <div className="h-[65vh] flex">
        <div className="flex justify-center items-center gap-[95px]">
          <Typewriter text="amr elhady" speed={200} fontSize="240px" showCaret={true} />
        </div>
          
          <ChatSection />
        </div>
      </div>
    </main>
  );
}
