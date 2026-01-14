import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { welcomeText } from "../../constants/welcome";
import w1 from "../../assets/welcome-1.png"
import w2 from "../../assets/welcome-2.png"

const Welcome = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const [animationKey, setAnimationKey] = useState(0);

    // Split text into words
    const words = welcomeText.split(" ");

    // Handle resize - force re-calculation of lines
    useEffect(() => {
        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                setAnimationKey(prev => prev + 1);
                ScrollTrigger.refresh();
            }, 150);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(resizeTimeout);
        };
    }, []);

    useGSAP(() => {
        // Small delay to ensure layout is complete
        const initAnimation = () => {
            // Reset all word overlays
            gsap.set(".word-overlay", { clipPath: "inset(0 100% 0 0)" });

            const wordWrappers = gsap.utils.toArray(".word-wrapper");
            const wordOverlays = gsap.utils.toArray(".word-overlay");

            if (wordWrappers.length === 0) return;

            // Get line height for tolerance calculation (use larger of computed or 20% of font size)
            const computedStyle = window.getComputedStyle(wordWrappers[0]);
            const fontSize = parseFloat(computedStyle.fontSize);
            const tolerance = Math.max(fontSize * 0.5, 20); // 50% of font size or 20px minimum

            // Group words by line (same Y position within tolerance)
            const lines = [];
            let currentLine = [];
            let currentY = wordWrappers[0].getBoundingClientRect().top;

            wordWrappers.forEach((wrapper, index) => {
                const rect = wrapper.getBoundingClientRect();
                if (Math.abs(rect.top - currentY) > tolerance) {
                    // New line detected
                    if (currentLine.length > 0) {
                        lines.push(currentLine);
                    }
                    currentLine = [wordOverlays[index]];
                    currentY = rect.top;
                } else {
                    currentLine.push(wordOverlays[index]);
                }
            });
            // Push last line
            if (currentLine.length > 0) {
                lines.push(currentLine);
            }

            // Create timeline with ScrollTrigger
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".welcome-text",
                    start: "top 80%",
                    end: "bottom 70%",
                    scrub: 0.3,
                    invalidateOnRefresh: true,
                    // markers: true
                },
            });

            // Animate line by line - all words on a line animate together instantly
            lines.forEach((lineWords, lineIndex) => {
                tl.to(lineWords, {
                    clipPath: "inset(0 0% 0 0)",
                    duration: 0.5,
                    ease: "power2.out",
                }, lineIndex * 0.5);
            });

            return tl;
        };

        // Use requestAnimationFrame to ensure DOM is ready
        let tl;
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                tl = initAnimation();
            });
        });

        return () => {
            if (tl) tl.kill();
        };
    }, { scope: containerRef, dependencies: [animationKey] });

    return (
        <div ref={containerRef} className='welcome-section w-full min-h-[120vh] text-[#2A2725] md:px-7 px-6'>
            <div className='flex flex-col gap-2'>
                <div className="w-full md:w-[86%] md:text-[64px] text-[34px] md:pt-20 pt-10">
                    <p ref={textRef} className="welcome-text md:leading-[1.05] leading-[1.1] md:tracking-[-0.020em] tracking-[-0.010em]">
                        {words.map((word, index) => (
                            <span key={index}>
                                <span className="word-wrapper">
                                    <span className="word-base">{word}</span>
                                    <span className="word-overlay">{word}</span>
                                </span>
                                {index < words.length - 1 && " "}
                            </span>
                        ))}
                    </p>
                </div>
            </div>
            <div className="md:mt-16 mt-10 flex md:flex-row flex-col md:items-center items-start justify-between gap-6">
                <div className="flex flex-row gap-2 flex-shrink-0">
                    <img src={w1} alt="welcome image" className="rounded-full md:w-40 md:h-40 w-28 h-28 object-cover" />
                    <img src={w2} alt="welcome image" className="rounded-full md:w-40 md:h-40 w-28 h-28 object-cover" />
                </div>
                <p className="md:text-[1.4rem] text-[1rem] text-[#b1a696] leading-[1.35] font-normal tracking-[-0.01em] md:text-right text-left italic">
                    <span className="block">Scent lingers where moments fade.</span>
                    <span className="block">Your guests won't remember every detail.</span>
                    <span className="block">They'll remember the feeling.</span>
                </p>
            </div>
        </div>
    );
};

export default Welcome;
