import { useRef } from "react";
import Marquee from "../components/Marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ContactSummary = () => {
  const items = [
    "Innovation",
    "Precision",
    "Trust",
    "Collaboration",
    "Excellence",
  ];
  const items2 = ["contact us","contact us","contact us","contact us","contact us"]
  const containerRef = useRef(null);

  useGSAP(()=>{
    gsap.to(containerRef.current, {
        scrollTrigger:{
            trigger: containerRef.current,
            start: "center center",
            end: "+=800 center",
            scrub: 0.5,
            pinSpacing: true
        }
    })
  },[]);

  return (
    <section
      ref={containerRef}
      className="flex flex-col min-h-screen items-center justify-between gap-12 mt-16"
    >
      {/* Marquee */}
      <Marquee items={items}/>
      <div>
        <p className="overflow-hidden font-light text-center contact-text-responsive">
          " Let's build a <br />
          <span className="font-normal">memorable</span> &{" "}
          <span className="italic">inspiring</span> <br />
          web Application <span className="text-gold">together</span>
        </p>
      </div>
      {/* Marquee */}
      <Marquee
        items={items2}
        reverse={true}
        className="text-black bg-transparent border-y-2"
        iconclassName="stroke-gold strok-2 text-primary"
        icon="material-symbols-light:square"

      />
    </section>
  );
};

export default ContactSummary;
