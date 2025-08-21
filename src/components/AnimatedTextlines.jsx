import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTextlines = ({ text, className }) => {

  const lines = text.split("\n").filter((line) => line.trim() !== "");
  const containerRef = useRef(null);
  const lineRef = useRef([]);

  useGSAP(() => {
    if(lineRef.current.length > 0){
        gsap.from(lineRef.current, {
          
            opacity: 0,  y: 100,
            duration: 1,
            stagger: 0.3,
            ease: "back.out",
            scrollTrigger:{
                trigger: containerRef.current,
            }
        })
    }
  })

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, idx) => (
        <span className="block leading-relaxed tracking-wide text-pretty" key={idx}
        ref={(el) => (lineRef.current[idx] = el)}>{line}</span>
      ))}
    </div>
  );
};

export default AnimatedTextlines;
