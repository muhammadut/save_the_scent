"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SCENTS = [
  {
    id: "new-york-mystify",
    name: "New York Mystify",
    description: "A sophisticated blend of metropolitan energy and midnight secrets.",
    image: "/images/newyork mystify 00-topaz-sharpen-denoise-upscale-2x-lighting.webp",
  },
  {
    id: "dubai-mirage",
    name: "Dubai Mirage",
    description: "Golden sands and desert blooms. An exotic, warm embrace.",
    image: "/images/dubai_mirage_2-topaz-sharpen-lighting-upscale-2x-color-denoise.webp",
  },
  {
    id: "miami-serenity",
    name: "Miami Serenity",
    description: "Ocean breeze meets tropical citrus. Refreshing and vibrant.",
    image: "/images/miami serenity_2-topaz-sharpen-denoise-lighting-upscale-2x-color-text.webp",
  },
  {
    id: "black-tie",
    name: "Black Tie",
    description: "The ultimate formal fragrance. Sharp, clean, and classic.",
    image: "/images/black tie 2-topaz-sharpen-upscale-2x-denoise-lighting-text-color.webp",
  },
  {
    id: "midnight-luxe",
    name: "Midnight Luxe",
    description: "Velvety notes of dark wood and rare resins.",
    image: "/images/midnight luxe venue-topaz-sharpen-upscale-2x-denoise-color-lighting-text.webp",
  },
  {
    id: "blue-water-zest",
    name: "Blue Water Zest",
    description: "Zesty bergamot and crisp sea salt.",
    image: "/images/blue water zest 2-topaz-sharpen-lighting-denoise-color-upscale-2x.webp",
  },
];

const ScentGrid = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="bg-black py-40 px-6">
      <div className="container mx-auto">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="font-serif text-6xl md:text-8xl font-light">
            The Scents
          </h2>
          <p className="font-sans text-lg md:text-xl font-light text-zinc-500 max-w-md">
            Each fragrance evokes its own world. <br />
            Choose the one that embodies yours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SCENTS.map((scent) => (
            <motion.div
              key={scent.id}
              layoutId={`card-${scent.id}`}
              onMouseEnter={() => setHoveredId(scent.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative aspect-[3/4] overflow-hidden group cursor-pointer"
            >
              {/* Background Image */}
              <Image
                src={scent.image}
                alt={scent.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:bg-black/20" />

              {/* Text Info */}
              <div className="absolute inset-x-0 bottom-0 p-8 z-10">
                <motion.div
                  initial={false}
                  animate={{ y: hoveredId === scent.id ? 0 : 20, opacity: hoveredId === scent.id ? 1 : 0.8 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <h4 className="font-serif text-3xl md:text-4xl mb-2">{scent.name}</h4>
                  <AnimatePresence>
                    {hoveredId === scent.id && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="font-sans text-sm tracking-wide text-zinc-300 overflow-hidden"
                      >
                        {scent.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Decorative Border */}
              <div className="absolute inset-0 border border-white/10 group-hover:border-white/30 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScentGrid;
