"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const TheService = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const conclusionRef = useRef<HTMLDivElement>(null);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !stepsRef.current.includes(el)) {
      stepsRef.current.push(el);
    }
  };

  useGSAP(
    () => {
      stepsRef.current.forEach((step, index) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              end: "top 60%",
              scrub: 1,
            },
          }
        );
      });

      gsap.fromTo(
        conclusionRef.current,
        { opacity: 0, filter: "blur(20px)" },
        {
          opacity: 1,
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
      <div className="container mx-auto max-w-5xl space-y-48">
        {/* Step 1 */}
        <div ref={addToRefs} className="group flex flex-col items-start opacity-0">
          <span className="font-mono text-9xl md:text-[12rem] leading-none text-transparent bg-clip-text bg-gradient-to-b from-zinc-700 to-zinc-900 select-none transition-colors duration-700 group-hover:from-zinc-500 group-hover:to-zinc-800">
            01
          </span>
          <h3 className="font-serif text-5xl md:text-7xl font-light -mt-8 md:-mt-16 ml-4 z-10 mix-blend-difference">
            We arrive before <br /> your guests do.
          </h3>
        </div>

        {/* Step 2 */}
        <div ref={addToRefs} className="group flex flex-col items-end text-right opacity-0 w-full">
          <span className="font-mono text-9xl md:text-[12rem] leading-none text-transparent bg-clip-text bg-gradient-to-b from-zinc-700 to-zinc-900 select-none transition-colors duration-700 group-hover:from-zinc-500 group-hover:to-zinc-800">
            02
          </span>
          <h3 className="font-serif text-5xl md:text-7xl font-light -mt-8 md:-mt-16 mr-4 z-10 mix-blend-difference">
            Set up. Awaken the air. <br /> Disappear.
          </h3>
        </div>

        {/* Step 3 */}
        <div ref={addToRefs} className="group flex flex-col items-start opacity-0">
          <span className="font-mono text-9xl md:text-[12rem] leading-none text-transparent bg-clip-text bg-gradient-to-b from-zinc-700 to-zinc-900 select-none transition-colors duration-700 group-hover:from-zinc-500 group-hover:to-zinc-800">
            03
          </span>
          <h3 className="font-serif text-5xl md:text-7xl font-light -mt-8 md:-mt-16 ml-4 z-10 mix-blend-difference">
            The space is <br /> transformed.
          </h3>
        </div>

        {/* Conclusion */}
        <div ref={conclusionRef} className="text-center mt-32 opacity-0">
          <p className="font-serif text-4xl md:text-6xl italic tracking-tight text-zinc-500">
            What remains is <br />
            <span className="text-white not-italic font-normal">atmosphere</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TheService;