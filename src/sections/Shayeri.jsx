import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import ShayeriCard from "../components/ShayeriCard";
import { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import shayeri from "../constants/shayeri";

const CARD_WIDTH = 250;
const CARD_HEIGHT = 150;

const Shayeri = () => {
  const text = `Where emotions find rhythm, 
  and verses breathe timeless beauty
  "kuch baatein ho jaye"`;
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  useGSAP(() => {
    if (cardRefs.current.length) {
      gsap.from(cardRefs.current, {
        autoAlpha: 0,
        y: 40,
        stagger: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger:{
          trigger: containerRef.current,
        }
      });
    }
  }, []);

  const positions = useMemo(() => {
    const containerWidth = window.innerWidth - CARD_WIDTH - 40; // padding ke liye margin
    const containerHeight = window.innerHeight * 0.7 - CARD_HEIGHT - 40;

    const pos = [];
    for (let i = 0; i < shayeri.length; i++) {
      let top, left, safe = false;

      while (!safe) {
        top = Math.floor(Math.random() * containerHeight) + 20;
        left = Math.floor(Math.random() * containerWidth) + 20;

        // ✅ overlap check
        safe = !pos.some(
          (p) =>
            Math.abs(p.top - top) < CARD_HEIGHT + 20 &&
            Math.abs(p.left - left) < CARD_WIDTH + 20
        );
      }

      pos.push({ top, left });
    }
    return pos;
  }, []);

  return (
    <section id="shayeri" className="flex flex-col min-h-screen relative">
      <AnimatedHeaderSection
        subTitle={"Whispers of the Heart, Framed in Words"}
        title="Shayeri"
        text={text}
        textColor={"text-black/80"}
        withScrollTrigger={true}
      />

      <div
        ref={containerRef}
        className="relative w-full h-[80vh] overflow-hidden bg-[#E5E5E0]"
      >
        {shayeri.map((item, index) => (
          <div ref={el => cardRefs.current[index] = el} key={index} style={positions[index]} className="absolute">
            <ShayeriCard
              title={`${item.title} — ${item.author}`}
              text={item.content}
              constraintsRef={containerRef}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Shayeri;
