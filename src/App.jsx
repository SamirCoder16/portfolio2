import ReactLenis from "lenis/react";
import Hero from "./sections/Hero";
import Navbar from "./sections/Navbar";
import Services from "./sections/Services";
import ServiceSummary from "./sections/ServiceSummary";
import About from "./sections/About";
import Works from "./sections/Works";

import { useEffect, useRef, useState } from "react";
import Shayeri from "./sections/Shayeri";
import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";
import { useProgress } from "@react-three/drei";

const App = () => {
  const cursorRef = useRef(null);
  const { progress } = useProgress();
  const [isReady, setisReady] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      setisReady(true);
    }
  }, [progress]);

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };
    document.addEventListener("mousemove", moveCursor);
    return () => document.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <ReactLenis root className="relative w-screen min-h-screen overflow-x-auto">
      {!isReady && (
        <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black  text-white/80  transition-opacity duration-700 font-light">
          <p className="mb-4 text-xl tracking-widest animate-pulse">
            Loading {Math.floor(progress)}%
          </p>
          <div className="relative h-1 overflow-hidden rounded w-60 bg-white/20">
            <div
              className="absolute top-0 left-0 h-full transition-all duration-300 bg-white"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      <div
        className={`${
          isReady ? "opacity-100" : "opacity-0"
        } transition-opacity duration-1000`}
      >
        <div
          ref={cursorRef}
          className="custom-cursor"
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "2px solid #222",
            pointerEvents: "none",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
        ></div>

        <Navbar />
        <Hero />
        <ServiceSummary />
        <Services />
        <About />
        <Works />
        <Shayeri />
        <ContactSummary />
        <Contact />
      </div>
    </ReactLenis>
  );
};

export default App;
