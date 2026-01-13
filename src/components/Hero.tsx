import React from 'react';

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-off-white">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        src="/video/landing_page.mp4"
      />

      {/* Overlay/Mask */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center text-center px-4">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-light tracking-wide mb-6 animate-fade-in-up">
          Transform any venue <br className="hidden md:block" /> into a feeling.
        </h1>
        <p className="font-sans text-lg md:text-xl font-light tracking-widest uppercase opacity-90 animate-fade-in-up delay-200">
          Scent is the memory that lingers.
        </p>
        
        <p className="font-mono text-xs mt-12 opacity-60 animate-pulse">
          SCROLL TO EXPLORE
        </p>
      </div>

      {/* Grain Overlay */}
      <div className="grainy" />
    </section>
  );
};

export default Hero;
