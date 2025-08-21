import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { socials } from "../constants";
import gsap from "gsap";


const Contact = () => {

    useGSAP(() => {
        gsap.from(".social-link", {
            y: 100,
            opacity: 0,
            delay: 0.5,
            duration: 1,
            stagger: 0.3,
            ease: "back.out",
            scrollTrigger:{
                trigger: ".social-link"
            }
        })
    },[])
  const text = `Got a question, now or project Idea ?
  WE'D love to hear from you and discus furthur!`;
  return (
    <section
      id="contact"
      className="flex flex-col justify-between min-h-screen bg-black relative"
    >
      <div className="">
        <AnimatedHeaderSection
          subTitle={"You Dream It, I code it"}
          title={"contact"}
          text={text}
          textColor={"text-white/80"}
        />
        <div className="flex px-10 font-light text-white/80 uppercase lg:text-[32px] text-[26px] leading-none mb-10">
          <div className="flex flex-col w-full gap-10">
            <div className="social-link">
              <h2>E-mail</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <p className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl">
                samirparvez48@gmail.com
              </p>
            </div>
            <div className="social-link">
              <h2>Phone</h2>
              <div className="w-full my-2 h-px bg-white/30" />
              <p className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl">
                <span className="text-gold uppercase">I</span>
                <span className="text-white uppercase">N</span>
                <span className="text-green-600 uppercase">D</span> (+91){" "}
                <span className="text-white">8100634254</span>
              </p>
            </div>
            <div className="social-link">
              <h2>Social-Media</h2>
              <div className="w-full my-2 h-px bg-white/30" />
              <div className="flex flex-wrap gap-2">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-xs leading-loose tracking-widest uppercase md:text-sm hover:text-white/80 hover:scale-110 transition-all duration-200"
                  >
                    {"{ "} {social.name} {" }"}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  <div className="social-link hidden sm:flex absolute bottom-10 right-10 p-4 flex-row items-center gap-6">
        <img src={'/images/heart.png'} alt="heart" className="w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28 animate-none transition-all duration-300"/>
        <h1 className="uppercase banner-text-responsive text-white/30 text-center sm:text-left mt-2 sm:mt-0">from kolkata</h1>
      </div>
    </section>
  );
};

export default Contact;
