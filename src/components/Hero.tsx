"use client";

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import useMousePosition from '@/hooks/useMousePosition';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoFrameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headline1Ref = useRef<HTMLHeadingElement>(null);
  const headline2Ref = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [isVideoReady, setIsVideoReady] = useState(false);

  const mousePos = useMousePosition(0.04);

  // Scroll-based transforms
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.3]);

  // Mouse parallax - subtle depth effect
  const videoParallaxX = mousePos.x * -8;
  const videoParallaxY = mousePos.y * -5;
  const textParallaxX = mousePos.x * 10;
  const textParallaxY = mousePos.y * 6;

  // Video setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setIsVideoReady(true);
    video.addEventListener('canplay', handleCanPlay);
    video.play().catch(() => setIsVideoReady(true));

    return () => video.removeEventListener('canplay', handleCanPlay);
  }, []);

  // GSAP entrance animation timeline
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Video frame reveal
    tl.fromTo(videoFrameRef.current,
      { opacity: 0, scale: 1.03, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 2 }
    );

    // 2. Headline line 1
    tl.fromTo(headline1Ref.current,
      { opacity: 0, y: 50, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.4 },
      "-=1.2"
    );

    // 3. Headline line 2 (italic)
    tl.fromTo(headline2Ref.current,
      { opacity: 0, y: 40, filter: "blur(8px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2 },
      "-=0.9"
    );

    // 4. Subtext
    tl.fromTo(subtextRef.current,
      { opacity: 0, y: 20 },
      { opacity: 0.45, y: 0, duration: 1 },
      "-=0.6"
    );

    // 5. CTA Button
    tl.fromTo(ctaRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.9 },
      "-=0.5"
    );

    // 6. Scroll indicator
    tl.fromTo(scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      "-=0.3"
    );

  }, { scope: containerRef });

  return (
    <motion.section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
      style={{ opacity: heroOpacity }}
    >
      {/* Layer 1: Framed Video Container */}
      <motion.div
        ref={videoFrameRef}
        className="absolute opacity-0"
        style={{
          top: 'clamp(32px, 5vh, 70px)',
          left: 'clamp(20px, 6vw, 100px)',
          right: 'clamp(20px, 6vw, 100px)',
          bottom: 'clamp(160px, 24vh, 280px)',
          borderRadius: 'clamp(12px, 1.5vw, 20px)',
          x: videoParallaxX,
          y: videoParallaxY,
          scale: videoScale,
        }}
      >
        {/* Video frame with subtle border */}
        <div
          className="relative w-full h-full overflow-hidden"
          style={{
            borderRadius: 'inherit',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: `
              0 40px 80px -20px rgba(0, 0, 0, 0.7),
              0 0 0 1px rgba(255, 255, 255, 0.03)
            `,
          }}
        >
          {/* Inner vignette */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              borderRadius: 'inherit',
              boxShadow: 'inset 0 0 80px 30px rgba(0, 0, 0, 0.25)',
            }}
          />

          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            src="/video/landing_page.mp4"
          />
        </div>
      </motion.div>

      {/* Layer 2: Editorial Text Block (Bottom-Left) */}
      <motion.div
        className="absolute z-20"
        style={{
          bottom: 'clamp(50px, 7vh, 100px)',
          left: 'clamp(20px, 6vw, 100px)',
          maxWidth: 'clamp(280px, 55vw, 650px)',
          x: textParallaxX,
          y: textY,
        }}
      >
        {/* Headline Line 1 */}
        <h1
          ref={headline1Ref}
          className="font-serif text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.0] tracking-[-0.02em] text-off-white opacity-0"
        >
          Transform Any Venue
        </h1>

        {/* Headline Line 2 - Italic */}
        <h1
          ref={headline2Ref}
          className="font-serif italic text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.0] tracking-[-0.02em] text-off-white opacity-0 -mt-1"
        >
          Into A Feeling.
        </h1>

        {/* Subtext */}
        <p
          ref={subtextRef}
          className="mt-[clamp(12px,2.5vh,28px)] font-sans text-[clamp(9px,1vw,12px)] tracking-[0.25em] uppercase text-white/40 opacity-0"
        >
          Scent is the memory that lingers.
        </p>

        {/* CTA Button */}
        <button
          ref={ctaRef}
          className="mt-[clamp(16px,3vh,36px)] px-7 py-3.5 rounded-full border border-white/15
            font-mono text-[clamp(8px,0.75vw,10px)] tracking-[0.3em] uppercase text-off-white
            transition-all duration-500 ease-out opacity-0
            hover:bg-off-white hover:text-black hover:border-off-white hover:tracking-[0.35em]"
        >
          Begin Your Journey
        </button>
      </motion.div>

      {/* Layer 3: Scroll Indicator (Bottom-Right) */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-[clamp(50px,7vh,100px)] right-[clamp(20px,6vw,100px)] z-20 opacity-0"
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-white/25">
            Scroll
          </span>
          <div className="w-12 h-[1px] bg-white/10 overflow-hidden">
            <motion.div
              className="w-full h-full bg-white/40"
              animate={{ x: ['-100%', '100%'] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </div>
      </div>

      {/* Layer 4: Grain Overlay */}
      <div className="grainy" />
    </motion.section>
  );
};

export default Hero;
