"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const SCENTS = [
  {
    id: "new-york-mystify",
    name: "New York Mystify",
    description: "Metropolitan energy. Midnight secrets.",
    image: "/images/newyork mystify 00-topaz-sharpen-denoise-upscale-2x-lighting.webp",
  },
  {
    id: "dubai-mirage",
    name: "Dubai Mirage",
    description: "Golden sands. Warm embrace.",
    image: "/images/dubai_mirage_2-topaz-sharpen-lighting-upscale-2x-color-denoise.webp",
  },
  {
    id: "miami-serenity",
    name: "Miami Serenity",
    description: "Ocean breeze. Tropical citrus.",
    image: "/images/miami serenity_2-topaz-sharpen-denoise-lighting-upscale-2x-color-text.webp",
  },
  {
    id: "black-tie",
    name: "Black Tie",
    description: "Sharp. Clean. Classic.",
    image: "/images/black tie 2-topaz-sharpen-upscale-2x-denoise-lighting-text-color.webp",
  },
];

const ScentCard = ({ scent, index }: { scent: any, index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]); // Parallax effect
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative h-[80vh] w-full flex items-center justify-center my-12 group overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden rounded-sm mx-4 md:mx-12">
        <motion.div style={{ y }} className="relative w-full h-[120%]">
           <Image
            src={scent.image}
            alt={scent.name}
            fill
            className="object-cover brightness-75 group-hover:brightness-100 transition-all duration-1000 group-hover:scale-105"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
      </div>

      <motion.div 
        style={{ opacity }}
        className="relative z-10 text-center mix-blend-difference px-4"
      >
        <p className="font-mono text-xs mb-4 tracking-[0.5em] uppercase text-white/80">Collection 0{index + 1}</p>
        <h3 className="font-serif text-6xl md:text-9xl text-white mb-6 tracking-tight">{scent.name}</h3>
        <p className="font-sans text-lg md:text-2xl font-light text-white/90 max-w-lg mx-auto">{scent.description}</p>
      </motion.div>
    </div>
  );
};

const ScentGrid = () => {
  return (
    <section className="bg-black py-24 relative z-10">
      <div className="container mx-auto px-6 mb-24">
        <h2 className="font-serif text-5xl md:text-7xl font-light text-off-white mb-8">Selected Fragrances</h2>
        <div className="w-full h-px bg-white/10" />
      </div>
      
      <div className="flex flex-col gap-0">
        {SCENTS.map((scent, index) => (
          <ScentCard key={scent.id} scent={scent} index={index} />
        ))}
      </div>
      
      <div className="container mx-auto px-6 mt-24 text-center">
         <button className="px-8 py-4 border border-white/20 rounded-full text-sm font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            View Full Collection
         </button>
      </div>
    </section>
  );
};

export default ScentGrid;