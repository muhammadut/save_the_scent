"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SCENTS = [
  {
    id: "new-york-mystify",
    name: "New York Mystify",
    description: "A sophisticated blend of metropolitan energy and midnight secrets. Notes of concrete rain, amber, and jazz club leather.",
    image: "/images/newyork mystify 00-topaz-sharpen-denoise-upscale-2x-lighting.webp",
  },
  {
    id: "dubai-mirage",
    name: "Dubai Mirage",
    description: "Golden sands and desert blooms. An exotic, warm embrace with oud, saffron, and sun-baked terracotta.",
    image: "/images/dubai_mirage_2-topaz-sharpen-lighting-upscale-2x-color-denoise.webp",
  },
  {
    id: "miami-serenity",
    name: "Miami Serenity",
    description: "Ocean breeze meets tropical citrus. Refreshing and vibrant with lime, sea salt, and white linen.",
    image: "/images/miami serenity_2-topaz-sharpen-denoise-lighting-upscale-2x-color-text.webp",
  },
  {
    id: "black-tie",
    name: "Black Tie",
    description: "The ultimate formal fragrance. Sharp, clean, and classic. Crisp shirt collar, gin martini, and cedarwood.",
    image: "/images/black tie 2-topaz-sharpen-upscale-2x-denoise-lighting-text-color.webp",
  },
  {
    id: "midnight-luxe",
    name: "Midnight Luxe",
    description: "Velvety notes of dark wood and rare resins. For events that only truly begin after dark.",
    image: "/images/midnight luxe venue-topaz-sharpen-upscale-2x-denoise-color-lighting-text.webp",
  },
  {
    id: "blue-water-zest",
    name: "Blue Water Zest",
    description: "Zesty bergamot and crisp sea salt. The feeling of a yacht party at sunset.",
    image: "/images/blue water zest 2-topaz-sharpen-lighting-denoise-color-upscale-2x.webp",
  },
];

const ScentGrid = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedScent = SCENTS.find((s) => s.id === selectedId);

  return (
    <section className="bg-black py-40 px-6 relative z-10">
      <div className="container mx-auto">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="font-serif text-6xl md:text-8xl font-light text-off-white">
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
              layoutId={`card-container-${scent.id}`}
              onClick={() => setSelectedId(scent.id)}
              onMouseEnter={() => setHoveredId(scent.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative aspect-[3/4] overflow-hidden group cursor-pointer"
            >
              {/* Background Image */}
              <motion.div layoutId={`card-image-${scent.id}`} className="relative w-full h-full">
                <Image
                  src={scent.image}
                  alt={scent.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:bg-black/20" />

              {/* Text Info */}
              <div className="absolute inset-x-0 bottom-0 p-8 z-10">
                <motion.div
                  layoutId={`card-content-${scent.id}`}
                  initial={false}
                  animate={{ y: hoveredId === scent.id ? 0 : 20, opacity: hoveredId === scent.id ? 1 : 0.8 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <h4 className="font-serif text-3xl md:text-4xl mb-2 text-off-white">{scent.name}</h4>
                  <AnimatePresence>
                    {hoveredId === scent.id && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="font-sans text-sm tracking-wide text-zinc-300 overflow-hidden"
                      >
                        Click to explore
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

      <AnimatePresence>
        {selectedId && selectedScent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm pointer-events-auto"
            />

            {/* Modal Card */}
            <motion.div
              layoutId={`card-container-${selectedId}`}
              className="relative w-full max-w-4xl bg-zinc-900 overflow-hidden shadow-2xl pointer-events-auto flex flex-col md:flex-row h-[80vh]"
            >
              {/* Close Button */}
              <motion.button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-black transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.2 } }}
                exit={{ opacity: 0 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                <span className="sr-only">Close</span>
              </motion.button>

              {/* Image Side */}
              <motion.div layoutId={`card-image-${selectedId}`} className="relative w-full md:w-1/2 h-1/2 md:h-full">
                 <Image
                  src={selectedScent.image}
                  alt={selectedScent.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 md:hidden" />
              </motion.div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-zinc-900">
                <motion.div layoutId={`card-content-${selectedId}`}>
                  <motion.h2 
                    className="font-serif text-5xl md:text-7xl mb-6 text-off-white"
                  >
                    {selectedScent.name}
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-sans text-lg md:text-xl font-light leading-relaxed text-zinc-300 mb-8"
                  >
                    {selectedScent.description}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <button className="px-8 py-3 border border-white/20 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                      Inquire about this scent
                    </button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ScentGrid;
