"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const TheService = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const conclusionRef = useRef<HTMLDivElement>(null);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !stepsRef.current.includes(el)) {
      stepsRef.current.push(el);
    }
  };

  useGSAP(
    () => {
      // Animate Header
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            end: "top 60%",
            scrub: 1,
          },
        }
      );

      // Animate Steps with horizontal movement and parallax
      stepsRef.current.forEach((step, index) => {
        const direction = index % 2 === 0 ? -50 : 50; // Alternating direction
        
        gsap.fromTo(
          step,
          { opacity: 0, x: direction, y: 100 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      });

      // Conclusion Animation
      gsap.fromTo(
        conclusionRef.current,
        { opacity: 0, scale: 0.9, filter: "blur(10px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 2,
          scrollTrigger: {
            trigger: conclusionRef.current,
            start: "top 80%",
            end: "bottom 90%",
            scrub: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full flex flex-col justify-center bg-black text-off-white py-40 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 atmosphere-bg" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mb-32 text-center opacity-0">
          <h2 className="font-serif text-6xl md:text-8xl font-light tracking-tight">The Process</h2>
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-zinc-500 to-transparent mx-auto mt-8" />
        </div>

        <div className="space-y-48">
          {/* Step 1 */}
          <div ref={addToRefs} className="flex flex-col md:flex-row items-center gap-12 opacity-0">
            <div className="md:w-1/2 flex justify-end">
               <span className="font-serif text-[10rem] leading-none text-zinc-800 opacity-20 select-none">01</span>
            </div>
            <div className="md:w-1/2 flex flex-col items-start border-l border-zinc-800 pl-8 py-4">
              <span className="font-mono text-xs text-zinc-500 mb-2 tracking-widest uppercase">Arrival</span>
              <h3 className="font-serif text-4xl md:text-6xl font-light leading-tight">
                We arrive before <br /> your guests do.
              </h3>
            </div>
          </div>

          {/* Step 2 */}
          <div ref={addToRefs} className="flex flex-col md:flex-row-reverse items-center gap-12 opacity-0">
            <div className="md:w-1/2 flex justify-start">
               <span className="font-serif text-[10rem] leading-none text-zinc-800 opacity-20 select-none">02</span>
            </div>
            <div className="md:w-1/2 flex flex-col items-end text-right border-r border-zinc-800 pr-8 py-4">
              <span className="font-mono text-xs text-zinc-500 mb-2 tracking-widest uppercase">Activation</span>
              <h3 className="font-serif text-4xl md:text-6xl font-light leading-tight">
                Set up. Awaken the air. <br /> Disappear.
              </h3>
            </div>
          </div>

          {/* Step 3 */}
          <div ref={addToRefs} className="flex flex-col md:flex-row items-center gap-12 opacity-0">
            <div className="md:w-1/2 flex justify-end">
               <span className="font-serif text-[10rem] leading-none text-zinc-800 opacity-20 select-none">03</span>
            </div>
            <div className="md:w-1/2 flex flex-col items-start border-l border-zinc-800 pl-8 py-4">
              <span className="font-mono text-xs text-zinc-500 mb-2 tracking-widest uppercase">Transformation</span>
              <h3 className="font-serif text-4xl md:text-6xl font-light leading-tight">
                The space is <br /> transformed.
              </h3>
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <div ref={conclusionRef} className="text-center mt-48 opacity-0">
          <p className="font-serif text-4xl md:text-7xl italic tracking-tight text-zinc-500">
            What remains is <br />
            <span className="text-white not-italic font-normal">atmosphere</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TheService;