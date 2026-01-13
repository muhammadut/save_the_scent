"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Video fades in slightly
    tl.fromTo(videoRef.current, 
      { opacity: 0, scale: 1.1 }, 
      { opacity: 0.8, scale: 1, duration: 2, ease: "power2.out" }
    );

    // 2. Main Headline Stagger
    // Split text logic simulated here for simplicity, or just animating the block
    tl.fromTo(textRef.current,
      { y: 100, opacity: 0, rotateX: -20 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.5, ease: "power3.out" },
      "-=1.5"
    );

    // 3. Subtext Reveal
    tl.fromTo(subTextRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "-=1"
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black text-off-white flex items-center justify-center">
      {/* Background Video - Brightened */}
      <div className="absolute inset-0 z-0">
         <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-0" // Start opacity 0 for GSAP control
          src="/video/landing_page.mp4"
        />
        {/* Lighter Gradient Overlay instead of flat black */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full max-w-6xl mix-blend-difference">
        <h1 ref={textRef} className="font-serif text-[12vw] leading-[0.85] tracking-tighter mix-blend-exclusion text-white opacity-0 transform-gpu">
          TRANSFORM <br />
          <span className="italic font-light">THE FEELING</span>
        </h1>
        
        <p ref={subTextRef} className="font-sans text-sm md:text-base tracking-[0.3em] uppercase mt-12 opacity-0">
          Scent is the memory that lingers.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
         <div className="w-[1px] h-16 bg-white/20 overflow-hidden">
            <div className="w-full h-full bg-white animate-waft"></div>
         </div>
      </div>

      {/* Grain Overlay */}
      <div className="grainy" />
    </section>
  );
};

export default Hero;