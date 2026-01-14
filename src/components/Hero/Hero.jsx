import gsap from "gsap/all";
import smoke from "../../assets/smoke_final.mp4";
import mobileHeroBg from "../../assets/hero-mobile.png";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import { BsArrowUpRight } from "react-icons/bs";

const Hero = () => {
  const isMobHero = useMediaQuery({
    query: "(max-width:768px)",
  });

  useGSAP(() => {
    if (!isMobHero) {
      gsap.to(".hero-section .hero-bg", {
        yPercent: "-5",
        scale: 1.1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }
  }, [isMobHero]);

  return (
    <section className="hero-section w-full h-[100dvh] relative overflow-hidden bg-[#181717] p-4 md:p-6">
      {/* Main Container - Rounded Corners */}
      <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">

        {/* Background Layers */}
        <div className="hero-bg absolute inset-0 w-full h-full">
          {/* Desktop Background */}
          <div className="absolute inset-0 bg-[url('./assets/cap1.png')] bg-no-repeat bg-cover bg-center hidden md:block" />

          {/* Mobile Background */}
          <div className="absolute inset-0 md:hidden">
            <img
              src={mobileHeroBg}
              alt="mobile bg"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Smoke Video Overlay - Separate layer */}
        <video
          src={smoke}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none mix-blend-hard-light opacity-50 z-10"
        ></video>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none p-6 md:p-10">

          {/* TOP LEFT - Main Title */}
          {/* TOP LEFT - Main Title - FIXED: Reduced size */}
          <h1 className="absolute top-2 left-4 md:top-3 md:left-6 text-[#f4efe7] font-medium tracking-tighter leading-[0.8] text-[15vw] md:text-[11rem] pointer-events-auto select-none">
            Capsules<span className="text-[4vw] md:text-6xl align-top ml-1 inline-block -translate-y-1">®</span>
          </h1>

          {/* TOP RIGHT - Reserve Button */}
          <div className="absolute top-6 right-6 md:top-8 md:right-8 pointer-events-auto">
            <button className="hidden md:flex items-center gap-3 bg-[#f4efe7] text-black pl-5 pr-2 py-2 rounded-full font-medium hover:scale-105 transition-transform duration-300">
              <span className="text-sm tracking-wide">Reserve</span>
              <div className="bg-[#181717] text-white rounded-full w-8 h-8 flex items-center justify-center">
                <BsArrowUpRight size={14} />
              </div>
            </button>
          </div>

          {/* BOTTOM LEFT - Headline */}
          <div className="absolute bottom-20 left-6 md:bottom-8 md:left-8 text-[#f4efe7] pointer-events-auto">
            <h2 className="text-4xl md:text-[3.8rem] font-medium leading-[1] tracking-tighter">
              Closer to <br />
              Nature—Closer <br />
              to Yourself
            </h2>
          </div>

          {/* BOTTOM CENTER - Menu Button - NEW */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto hidden md:block">
            <button className="flex items-center gap-3 bg-[#f4efe7] text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform duration-300">
              <span className="text-sm tracking-wide uppercase">Menu</span>
              <div className="bg-[#181717] text-white rounded-full w-6 h-6 flex items-center justify-center">
                <div className="flex flex-col gap-[3px]">
                  <span className="w-3 h-[1px] bg-white"></span>
                  <span className="w-3 h-[1px] bg-white"></span>
                </div>
              </div>
            </button>
          </div>

          {/* BOTTOM RIGHT - Description */}
          <div className="absolute bottom-20 right-6 md:bottom-8 md:right-8 text-[#f4efe7] text-right pointer-events-auto">
            <p className="text-sm md:text-[1.1rem] font-normal leading-tight opacity-95 max-w-[300px] md:max-w-md tracking-tight">
              Spend unforgettable and remarkable time <br className="hidden md:block" />
              in the Californian desert with—Capsules.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
