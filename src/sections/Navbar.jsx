import { useEffect, useRef, useState } from "react";
import { socials } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-scroll";

const navbarObj = ["home", "services", "about", "work", "shayeri", "contact"];

const Navbar = () => {
  const navRef = useRef(null);
  const linkRef = useRef([]);
  const contactRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const tl = useRef(null);
  const iconTL = useRef(null);

  const [isOpen, setisOpen] = useState(false);
  const [showBurger, setshowBurger] = useState(true);

  useGSAP(() => {
    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set([linkRef.current, contactRef.current], {
      autoAlpha: 0,
      x: -20,
    });
    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        xPercent: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        linkRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        contactRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<+0.2"
      );

      iconTL.current =gsap.timeline({ paused: true }).to(topLineRef.current, {
        rotate: 45,
        y: 3.3,
        duration: 0.5,
        ease: "power2.inOut"
      }).to(bottomLineRef.current, {
        rotate: -45,
        y: -3.3,
        duration: 0.9,
        ease: "power2.inOut"
      }, "<")
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () =>{
        const currentScrollY = window.scrollY;

        setshowBurger(currentScrollY <= lastScrollY || currentScrollY < 100);
        lastScrollY = currentScrollY;
    }
    window.addEventListener('scroll', handleScroll, {
        passive: true
    })
    return () => window.removeEventListener('scroll', handleScroll)
  },[])

  const toggleMenu = () => {
    if (isOpen) {
      tl.current.reverse();
      iconTL.current.reverse();
    } else {
      tl.current.play();
      iconTL.current.play();
    }
    setisOpen(!isOpen);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed z-50 flex flex-col justify-between w-full h-full px-10 uppercase bg-black text-white/70 py-28 gap-y-10 md:w-1/2 md:left-1/2"
      >
        <div className="flex flex-col text-5xl gap-y-2 md:text-6xl lg:text-8xl">
          {navbarObj.map((section, idx) => (
              <div key={idx} ref={(el) => (linkRef.current[idx] = el)}>
              <Link
                className="transition-all duration-300 cursor-pointer hover:text-white"
                to={`${section}`}
                smooth={true}
                offset={0}
                duration={1500}
              >
                {section}
              </Link>
            </div>
          ))}
        </div>

        <div
          ref={contactRef}
          className="flex flex-col flex-wrap justify-between gap-8 md:flex-row"
        >
          <div className="font-light">
            <p className="tracking-wider text-white/50">Email</p>
            <p className="text-xl tracking-widest lowercase text-pretty">
              samirparvez48@gmail.com
            </p>
          </div>
          <div className="font-light">
            <p className="tracking-wider text-white/50">Social Media</p>
            <div className="flex flex-col flex-wrap md:flex-row gap-x-2">
              {socials.map((social, idx) => (
                <a
                  className="text-sm leading-loose tracking-widest uppercase hover:text-white transition-all duration-300"
                  key={idx}
                  href={social.href}
                >
                  {"{"}
                  {social.name}
                  {"}"}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <div
          className="fixed z-50 flex flex-col items-center justify-center gap-1 
        transition-all duration-300 bg-black rounded-full cursor-pointer w-14 
        h-14 md:w-20 md:h-20 top-4 right-10"
        onClick={toggleMenu}
        style={isOpen || showBurger ? { clipPath: "circle(50% at 50% 50%)"} : { clipPath: "circle(0% at 50% 50%)"}}
        >
        <span
          ref={topLineRef}
          className="block w-8 h-0.5 bg-white rounded-full origin-center"
        ></span>
        <span
          ref={bottomLineRef}
          className="block w-8 h-0.5 bg-white rounded-full origin-center"
        ></span>
      </div>
    </>
  );
};

export default Navbar;
