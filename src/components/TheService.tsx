"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const TheService = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const conclusionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const steps = [step1Ref.current, step2Ref.current, step3Ref.current];
      
      steps.forEach((step, index) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 50, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      });

      gsap.fromTo(
        conclusionRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: conclusionRef.current,
            start: "top 75%",
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
      className="relative min-h-screen w-full flex flex-col justify-center bg-gradient-to-b from-black to-zinc-900 text-off-white py-32 px-6 overflow-hidden"
    >
      <div className="container mx-auto max-w-4xl space-y-32">
        {/* Step 1 */}
        <div ref={step1Ref} className="flex flex-col items-start opacity-0">
          <span className="font-mono text-xs text-gray-500 mb-4 tracking-widest uppercase">01. Arrival</span>
          <h3 className="font-serif text-5xl md:text-7xl font-light">
            We arrive before <br /> your guests do.
          </h3>
        </div>

        {/* Step 2 */}
        <div ref={step2Ref} className="flex flex-col items-end text-right opacity-0 w-full">
          <span className="font-mono text-xs text-gray-500 mb-4 tracking-widest uppercase">02. Activation</span>
          <h3 className="font-serif text-5xl md:text-7xl font-light">
            Set up. Awaken the air. <br /> Disappear.
          </h3>
        </div>

        {/* Step 3 */}
        <div ref={step3Ref} className="flex flex-col items-start opacity-0">
          <span className="font-mono text-xs text-gray-500 mb-4 tracking-widest uppercase">03. Transformation</span>
          <h3 className="font-serif text-5xl md:text-7xl font-light">
            The space is <br /> transformed.
          </h3>
        </div>

        {/* Conclusion */}
        <div ref={conclusionRef} className="text-center mt-32 opacity-0">
          <p className="font-sans text-xl md:text-3xl font-light tracking-wide text-gray-300">
            What remains is <span className="text-white font-normal">atmosphere</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TheService;
