"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const TheScience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%", // Pin for 1.5 screen heights
          pin: true,
          scrub: 1,
        },
      });

      // Animate Line 1: "SCENT LINGERS"
      tl.fromTo(line1Ref.current, 
        { opacity: 0, scale: 0.8, filter: "blur(20px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1 }
      );

      // Animate Line 2: "WHERE MOMENTS FADE"
      tl.fromTo(line2Ref.current,
        { opacity: 0, y: 50, filter: "blur(20px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 },
        "-=0.5"
      );

      // Exit animation: Blur out as we scroll away
      tl.to([line1Ref.current, line2Ref.current], {
        opacity: 0,
        filter: "blur(30px)",
        scale: 1.1,
        duration: 1,
        delay: 0.5
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center bg-black text-off-white overflow-hidden"
    >
      <div ref={textRef} className="flex flex-col items-center text-center z-10 px-4 mix-blend-difference">
        <h2 ref={line1Ref} className="font-serif text-[8vw] md:text-[6vw] leading-none tracking-tight opacity-0">
          SCENT LINGERS
        </h2>
        <h2 ref={line2Ref} className="font-serif text-[8vw] md:text-[6vw] leading-none tracking-tight italic text-gray-400 opacity-0">
          WHERE MOMENTS FADE
        </h2>
      </div>

      {/* Subtle Background Element */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-900/20 to-black z-0 pointer-events-none" />
    </section>
  );
};

export default TheScience;