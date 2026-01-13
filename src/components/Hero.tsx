"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);
  const descriptorRef = useRef<HTMLParagraphElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Video fades in
    tl.fromTo(videoRef.current, 
      { opacity: 0, scale: 1.1 }, 
      { opacity: 0.6, scale: 1, duration: 2, ease: "power2.out" }
    );

    // 2. Main Headline Reveal
    tl.fromTo(textRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" },
      "-=1.5"
    );

    // 3. Subtext Reveal
    tl.fromTo(subTextRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "-=1"
    );

    // 4. Descriptor Reveal
    tl.fromTo(descriptorRef.current,
      { opacity: 0 },
      { opacity: 0.7, duration: 1, ease: "power2.out" },
      "-=0.8"
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black text-off-white flex items-center justify-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
         <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-0"
          src="/video/landing_page.mp4"
        />
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full max-w-5xl">
        <h1 ref={textRef} className="font-serif text-6xl md:text-8xl font-light tracking-tight leading-tight mb-8 opacity-0">
          Transform Any Venue <br /> Into A Feeling.
        </h1>
        
        <p ref={subTextRef} className="font-sans text-lg md:text-xl tracking-widest uppercase opacity-0 mb-4">
          Scent is the memory that lingers.
        </p>

        <p ref={descriptorRef} className="font-sans text-sm text-zinc-400 opacity-0">
          Signature fragrances for weddings & events.
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
