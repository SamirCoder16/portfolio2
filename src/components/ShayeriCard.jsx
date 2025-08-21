import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ShayeriCard = ({ title, text, style = {}, constraintsRef }) => {
  const cardRef = useRef(null);
  const audioRef = useRef(null);

  useGSAP(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { boxShadow: "0 0 0px 0px #fff", borderColor: "#222" },
        {
          boxShadow: "0 0 24px 4px #fff",
          borderColor: "#fff",
          duration: 1.2,
          ease: "power2.out"
        }
      );
    }
  }, []);

  const  handleDragStart = () => {
    if(audioRef.current){
      audioRef.current.play().catch((err) => console.log("Play error:", err));
    }
  }
  const handleDragEnd = () => {
    if(audioRef.current){
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset audio to start
    }
  }

  return (
    <motion.div
      ref={cardRef}
      drag
      dragMomentum={false}
      dragConstraints={constraintsRef}
      className="absolute w-[250px] h-auto bg-black rounded-2xl shadow-lg p-5 cursor-grab active:cursor-grabbing border-2 border-[#222]"
      style={{
        top: style?.top ?? 0,
        left: style?.left ?? 0,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <h2 className="text-lg font-semibold text-white text-center mb-2">
        {title}
      </h2>
      <p className="text-white italic text-center leading-relaxed whitespace-pre-line">
        {text}
      </p>
      {/* hidden audio tag */}
       <audio ref={audioRef} src="/music/saiyara.mp3" preload="auto" />
    </motion.div>
  );
};

export default ShayeriCard;
