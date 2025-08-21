import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { servicesData } from "../constants";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Services = () => {
  const text = `I build secure , high-performance full-stack apps
  with smoothUX to drive growth not headaches`;

  const serviceRefs = useRef([]);
  const isDesktopMode = useMediaQuery({ minWidth: '48rem' }) // 768px desktop view ke liye

  useGSAP(() => {
    serviceRefs.current.forEach((el) => {
      if(!el) return;

      gsap.from(el, {
        y: 200,
        scrollTrigger:{
          trigger: el,
          top: "0 80%",
        },
        duration: 1,
        ease: "circ.out"
      })
    })
  },[])

  return (
    <section id="services" className="min-h-screen bg-black rounded-t-4xl">
      <AnimatedHeaderSection
        subTitle={"Behind the scene, Beyond the screen"}
        title={"service"}
        text={text}
        textColor={"text-white/70"}
        withScrollTrigger={true}
      />
      {
        servicesData.map((services, index) => (
        <div key={index} ref={(el) => serviceRefs.current[index] = el} className="sticky px-10 pt-6 pb-12 text-white/70 bg-black border-t-2 border-white/30"
        style={isDesktopMode ? { top:`calc(10vh + ${index * 5}em)`, marginBottom: `${(servicesData.length - index - 1)*5}rem`}: {top: 0}}
        >
          <div className="flex items-center justify-between gap-4 font-light">
            <div className="flex flex-col gap-6">
              <h2 className="text-4xl lg:text-5xl">{services.title}</h2>
              <p className="text-xl leading-relaxed tracking-widest lg:text-2xl text-white/60 text-pretty">{services.description}</p>
              <div className="flex flex-col gap-2 text-2xl sm:gap-4 lg:text-3xl text-white/80">
                {
                  services.items.map((items,itemIndex) => (
                  <div key={`item-${index}-${itemIndex}`} className="">
                    <h3 className="flex">
                      <span className="mr-12 tet-lg text-white/30 ">0{itemIndex + 1}</span>
                      {items.title}
                    </h3>
                    {itemIndex < services.items.length - 1 && (
                      <div className="w-full h-px my-2 bg-white/30"/>
                      )}
                  </div>
                ))
                }
              </div>
            </div>
          </div>
        </div>
        ))
      }
    </section>
  );
};

export default Services;
