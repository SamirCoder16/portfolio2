import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useGSAP } from "@gsap/react";
import AnimatedTextlines from "../components/AnimatedTextlines";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

const About = () => {
    const isDeskttpMode = useMediaQuery({ minWidth: "48rem" }); //  768px desktop view ke liye

  const text = `Passionate about clean architecture 
    I Built scalable, high-performance solutions
     from prototype to production`;

  const DeskTopAboutText = `I am a BCA student at Maulana Abul Kalam Azad University of Technology (WBUT)
  with a strong foundation in full-stack development using the MERN stack. 
  I’ve built projects including a Doctor Appointment Booking App, a MERN stack Authentication System, 
  and an Streamify Real-Time and video-calling Application. 
  Proficient in DSA, JavaScript, Node.js, NginX, Express, MongoDB, rabbitMQ, kafka, Docker, and SEO, 
  I’m eager to apply my skills in a professional environment and 
  contribute to impactful software solutions.`;

  const mobileOrOthersAboutText = `BCA student at MAKAUT with strong MERN stack foundation. 
  Built projects like Doctor Appointment App, Auth System & Streamify (real-time + video calling). 
  Skilled in DSA, JS, Node.js, Express, MongoDB, NGINX, RabbitMQ, Kafka & Docker. 
  Passionate about building impactful software solutions.`

  const myImageRef = useRef(null);

  useGSAP(() => {
    gsap.to('#about', {
        scale: 0.95,
        scrollTrigger: {
            trigger: '#about',
            start: "bottom 80%",
            end: "bottom 20%",
            scrub: true,
        },
        ease: "power1.inOut"
    });
    gsap.set(myImageRef.current, {
        clipPath: "polygon(0, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(myImageRef.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 2,
        ease: "power4.out",
        scrollTrigger: { trigger: myImageRef.current },
    })
  },[]);

  return (
    <section
      id="about"
      className="min-h-screen bg-black rounded-b-4xl text-white/70"
    >
      <AnimatedHeaderSection
        subTitle={"Code with purpose, Built to scale"}
        title={"about"}
        text={text}
        textColor={"text-white/70"}
        withScrollTrigger={true}
      />
      <div
        className="flex flex-col items-center justify-between gap-16 px-10 pb-16
      text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl
       text-white/60"
      >
        <img
          ref={myImageRef}
          src="images/man.jpg"
          alt="My-photo"
          className="w-md rounded-3xl"
        />
        <AnimatedTextlines text={isDeskttpMode ? DeskTopAboutText : mobileOrOthersAboutText} className={"w-full"}/>
      </div>
    </section>
  );
};

export default About;
