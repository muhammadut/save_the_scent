import { useRef, useEffect } from "react";
import gsap from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import smoke from "../../assets/smoke_final.mp4";
import heroVideo from "/assets/video/landing_page.mp4";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import { BsArrowUpRight } from "react-icons/bs";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const reserveBtnRef = useRef(null);
  const turbulenceRef = useRef(null);

  const isMobHero = useMediaQuery({
    query: "(max-width:768px)",
  });

  // Animate smoke turbulence for living, breathing effect
  useEffect(() => {
    let animationId;
    let frames = 0;
    const rad = Math.PI / 180;

    function animateSmoke() {
      frames += 0.35;
      const bfx = 0.008 + 0.003 * Math.cos(frames * rad);
      const bfy = 0.012 + 0.004 * Math.sin(frames * rad * 1.5);

      if (turbulenceRef.current) {
        turbulenceRef.current.setAttribute('baseFrequency', `${bfx} ${bfy}`);
      }
      animationId = requestAnimationFrame(animateSmoke);
    }

    animateSmoke();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Magnetic button effect
  const handleMouseMove = (e, btnRef) => {
    if (!btnRef.current) return;
    const btn = btnRef.current;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (btnRef) => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)"
    });
  };

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(".hero-title-word", {
        yPercent: 100,
        opacity: 0,
        rotateX: -90
      });
      gsap.set(".hero-subtitle-line", {
        yPercent: 100,
        opacity: 0
      });
      gsap.set(".hero-description", {
        opacity: 0,
        y: 20
      });
      gsap.set(".hero-btn", {
        opacity: 0,
        scale: 0.8
      });
      gsap.set(".scroll-line", {
        scaleY: 0,
        transformOrigin: "top"
      });

      // Main timeline
      const tl = gsap.timeline({
        delay: 0.5,
        defaults: { ease: "power3.out" }
      });

      // Title words staggered reveal
      tl.to(".hero-title-word", {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out"
      })
      // Subtitle lines
      .to(".hero-subtitle-line", {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1
      }, "-=0.6")
      // Description
      .to(".hero-description", {
        opacity: 1,
        y: 0,
        duration: 0.8
      }, "-=0.4")
      // Buttons
      .to(".hero-btn", {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.4")
      // Scroll line reveal
      .to(".scroll-line", {
        scaleY: 1,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.2");

      // Scroll line pulse animation
      gsap.to(".scroll-line-inner", {
        y: 24,
        duration: 1.5,
        repeat: -1,
        ease: "power1.inOut",
      });

      // Parallax on scroll
      if (!isMobHero) {
        gsap.to(".hero-bg", {
          yPercent: -10,
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        // Title parallax
        gsap.to(".hero-title-container", {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [isMobHero]);

  // Text shadow style for better readability
  const textShadow = "0 2px 4px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.1)";
  // Enhanced shadow for "Scent" to lift it off smoke/bright frames
  const scentShadow = "0 2px 20px rgba(0,0,0,0.35), 0 4px 8px rgba(0,0,0,0.2)";

  return (
    <section
      ref={heroRef}
      className="hero-section w-full h-[100dvh] relative overflow-hidden bg-[#181717] p-3 md:p-5"
    >
      {/* SVG Filters for Smoke Effect */}
      <svg className="absolute w-0 h-0">
        <defs>
          {/* Animated Smoke Distortion Filter */}
          <filter id="smoke-distort" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.008 0.012"
              numOctaves="3"
              result="noise"
              seed="15"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="20"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Main Container - Rounded Corners with Inner Border */}
      <div className="relative w-full h-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden ring-1 ring-inset ring-[#faf8f5]/10">

        {/* Background Video */}
        <div className="hero-bg absolute inset-0 w-full h-full z-0">
          <video
            src={heroVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          ></video>
        </div>

        {/* Radial Vignette Overlay - darkens edges especially bottom corners */}
        <div
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, rgba(0,0,0,0.15) 100%),
              linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%),
              linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 30%),
              linear-gradient(135deg, rgba(0,0,0,0.3) 0%, transparent 50%),
              linear-gradient(225deg, rgba(0,0,0,0.3) 0%, transparent 50%)
            `
          }}
        ></div>

        {/* Smoke Video Overlay */}
        <video
          src={smoke}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none mix-blend-soft-light opacity-40 z-10"
        ></video>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none p-5 md:p-10 flex flex-col">

          {/* TOP ROW - Reserve Button Only */}
          <div className="flex justify-end items-start">
            {/* Reserve Button */}
            <div
              ref={reserveBtnRef}
              className="hero-btn pointer-events-auto hidden md:block"
              onMouseMove={(e) => handleMouseMove(e, reserveBtnRef)}
              onMouseLeave={() => handleMouseLeave(reserveBtnRef)}
            >
              <button className="group flex items-center gap-3 bg-[#faf8f5]/95 backdrop-blur-sm text-[#181717] pl-6 pr-2.5 py-2.5 rounded-full font-medium transition-all duration-500 hover:bg-[#D4896A] hover:pl-7 hover:gap-4">
                <span className="text-sm tracking-wide transition-all duration-300 group-hover:tracking-wider">Reserve</span>
                <div className="bg-[#181717] text-white rounded-full w-9 h-9 flex items-center justify-center transition-all duration-500 group-hover:rotate-45">
                  <BsArrowUpRight size={14} />
                </div>
              </button>
            </div>
          </div>

          {/* CENTER - Main Title */}
          <div className="flex-1 flex items-center justify-center">
            <div className="hero-title-container pointer-events-auto text-center">
              <h1
                className="text-[#faf8f5] font-semibold tracking-[-0.02em] leading-[0.92] text-[14vw] md:text-[6.5rem] lg:text-[8rem] select-none"
                style={{ textShadow }}
              >
                <span className="flex flex-wrap justify-center gap-x-[0.2em]">
                  {["Save", "The"].map((word, i) => (
                    <span key={i} className="overflow-hidden inline-block">
                      <span className="hero-title-word inline-block text-[#faf8f5]">
                        {word}
                      </span>
                    </span>
                  ))}
                  {/* Scent with animated smoke filter + ® */}
                  <span className="overflow-hidden inline-block">
                    <span
                      className="hero-title-word inline-block text-[#D4896A] relative"
                      style={{ filter: 'url(#smoke-distort)', textShadow: scentShadow }}
                    >
                      Scent
                      <sup className="absolute -top-[0.05em] -right-[0.35em] text-[0.18em] text-[#faf8f5]/60 font-normal tracking-normal">®</sup>
                    </span>
                  </span>
                </span>
              </h1>
            </div>
          </div>

          {/* BOTTOM ROW */}
          <div className="flex justify-between items-end px-2 md:px-6 lg:px-10 pb-2 md:pb-4">
            {/* Headline with line-by-line animation */}
            <div className="pointer-events-auto max-w-[420px]">
              <h2
                className="text-[#faf8f5] text-xl md:text-[2rem] lg:text-[2.5rem] font-semibold leading-[1.1] tracking-[-0.02em]"
                style={{ textShadow }}
              >
                <span className="overflow-hidden block">
                  <span className="hero-subtitle-line block">Transform Any Venue</span>
                </span>
                <span className="overflow-hidden block">
                  <span className="hero-subtitle-line block">
                    Into A <em className="text-[#D4896A] font-bold not-italic">Feeling</em>.
                  </span>
                </span>
              </h2>
            </div>

            {/* Center - Animated Scroll Line */}
            <div className="absolute bottom-5 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="scroll-line hidden md:block w-[1px] h-12 bg-[#faf8f5]/20 relative overflow-hidden">
                {/* Animated pulse line */}
                <div className="scroll-line-inner absolute top-0 left-0 w-full h-3 bg-gradient-to-b from-[#faf8f5]/60 via-[#faf8f5]/40 to-transparent"></div>
              </div>
            </div>

            {/* Description with vertical separator */}
            <div className="hero-description pointer-events-auto text-right max-w-[280px] md:max-w-sm flex items-center gap-4 md:gap-6">
              {/* Thin vertical separator line */}
              <div className="hidden md:block w-[1px] h-12 bg-[#faf8f5]/20 self-stretch"></div>
              <p
                className="text-[#faf8f5]/80 text-xs md:text-[0.85rem] font-light leading-relaxed tracking-[0.04em]"
                style={{ textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
              >
                Luxury scent diffuser rentals for weddings
                <br className="hidden md:block" />
                <span className="md:hidden"> </span>
                and events that leave lasting impressions.
              </p>
            </div>
          </div>
        </div>

        {/* Decorative corner accents */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-[#faf8f5]/15 rounded-tl-2xl z-20 pointer-events-none hidden md:block"></div>
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-[#faf8f5]/15 rounded-br-2xl z-20 pointer-events-none hidden md:block"></div>
      </div>
    </section>
  );
};

export default Hero;
