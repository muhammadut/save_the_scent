"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const TheScience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      });

      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      ).fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1 },
        "<"
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black text-off-white py-24 px-4 overflow-hidden"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div ref={textRef} className="opacity-0">
          <h2 className="font-serif text-4xl md:text-6xl mb-8">
            The Science
          </h2>
          <p className="font-sans text-xl md:text-2xl font-light leading-relaxed mb-6">
            Scent lingers where moments fade.
          </p>
          <p className="font-sans text-lg md:text-xl font-light text-gray-400">
            Your guests won’t remember every detail — <br />
            they’ll remember how it felt.
          </p>
        </div>

        {/* Visual Content */}
        <div ref={imageRef} className="relative aspect-[4/5] w-full max-w-md mx-auto opacity-0">
          <Image
            src="/images/dream_weaver_2-topaz-sharpen-upscale-2x-denoise-denoise-color.webp"
            alt="Abstract representation of memory and scent"
            fill
            className="object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
        </div>
      </div>
    </section>
  );
};

export default TheScience;
