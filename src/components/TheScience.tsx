"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const TheScience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const line3Ref = useRef<HTMLParagraphElement>(null);
  const line4Ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=250%", // Pin for longer to accommodate more text
          pin: true,
          scrub: 1,
        },
      });

      // --- SEQUENCE 1: The Claim ---
      // 1. Reveal "SCENT LINGERS"
      tl.fromTo(line1Ref.current, 
        { opacity: 0, scale: 0.9, filter: "blur(10px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1 }
      );

      // 2. Reveal "WHERE MOMENTS FADE"
      tl.fromTo(line2Ref.current,
        { opacity: 0, y: 30, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 },
        "-=0.5"
      );

      // 3. Fade out Claim
      tl.to([line1Ref.current, line2Ref.current], {
        opacity: 0,
        filter: "blur(20px)",
        y: -50,
        duration: 1,
        delay: 0.5
      });

      // --- SEQUENCE 2: The Feeling ---
      // 4. Reveal "Your guests won't recall..."
      tl.fromTo(line3Ref.current,
        { opacity: 0, y: 50, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 }
      );

      // 5. Reveal "They'll remember..."
      tl.fromTo(line4Ref.current,
        { opacity: 0, scale: 0.95, filter: "blur(10px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1 },
        "-=0.5"
      );

      // 6. Fade out Feeling
      tl.to([line3Ref.current, line4Ref.current], {
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
      <div className="absolute inset-0 atmosphere-bg" />
      <div className="absolute inset-0 atmosphere-mist" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-5xl">
        {/* Sequence 1 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
          <h2 ref={line1Ref} className="font-serif text-[7vw] leading-[0.9] tracking-tight opacity-0 mix-blend-exclusion">
            SCENT LINGERS
          </h2>
          <h2 ref={line2Ref} className="font-serif text-[7vw] leading-[0.9] tracking-tight italic text-zinc-500 opacity-0 mix-blend-exclusion">
            WHERE MOMENTS FADE
          </h2>
        </div>

        {/* Sequence 2 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full space-y-8">
          <p ref={line3Ref} className="font-sans text-xl md:text-3xl font-light tracking-wide text-zinc-400 opacity-0">
            Your guests won’t recall every detail.
          </p>
          <p ref={line4Ref} className="font-serif text-4xl md:text-6xl text-off-white opacity-0">
            They’ll remember the feeling.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TheScience;
