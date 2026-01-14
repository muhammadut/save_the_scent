import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect, useState } from "react";
import { welcomeText } from "../../constants/welcome";
import oval1 from "/images/oval_1.jpg";
import oval2 from "/images/oval_2.jpg";

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
            }, 200);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(resizeTimeout);
        };
    }, []);

    useGSAP(() => {
        // Wait for fonts and layout to be ready
        const initAnimation = () => {
            const wordElements = gsap.utils.toArray(".word");
            if (wordElements.length === 0) return;

            // Get computed line height for accurate tolerance
            const computedStyle = window.getComputedStyle(textRef.current);
            const lineHeight = parseFloat(computedStyle.lineHeight) || parseFloat(computedStyle.fontSize) * 1.2;
            const tolerance = lineHeight * 0.8; // 80% of line height

            // Group words by line using baseline comparison
            const lines = [];
            let currentLine = [];
            let lineBaseY = null;

            wordElements.forEach((word) => {
                const rect = word.getBoundingClientRect();
                const wordCenterY = rect.top + rect.height / 2;

                if (lineBaseY === null) {
                    lineBaseY = wordCenterY;
                    currentLine.push(word);
                } else if (Math.abs(wordCenterY - lineBaseY) > tolerance) {
                    // New line detected
                    if (currentLine.length > 0) {
                        lines.push(currentLine);
                    }
                    currentLine = [word];
                    lineBaseY = wordCenterY;
                } else {
                    currentLine.push(word);
                    // Update baseline to average for more accuracy
                    lineBaseY = (lineBaseY + wordCenterY) / 2;
                }
            });
            if (currentLine.length > 0) {
                lines.push(currentLine);
            }

            // Set initial state - all words dark
            gsap.set(".word", { color: "#2A2725" });

            // Create master timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 80%",
                    end: "bottom 50%",
                    scrub: true, // Direct 1:1 scroll mapping
                    invalidateOnRefresh: true,
                },
            });

            // Calculate total progress points
            const totalLines = lines.length;

            // Animate each line - color transition from dark to light
            lines.forEach((lineWords, lineIndex) => {
                const startProgress = lineIndex / totalLines;
                const endProgress = (lineIndex + 1) / totalLines;

                tl.to(lineWords, {
                    color: "#f4efe7",
                    duration: endProgress - startProgress,
                    ease: "none",
                    force3D: true,
                }, startProgress);
            });

            return tl;
        };

        // Small delay to ensure layout is complete
        const timeoutId = setTimeout(() => {
            initAnimation();
        }, 50);

        return () => {
            clearTimeout(timeoutId);
        };
    }, { scope: containerRef, dependencies: [animationKey] });

    return (
        <div ref={containerRef} className='welcome-section w-full min-h-[120vh] text-[#2A2725] md:px-7 px-6'>
            <div className='flex flex-col gap-2'>
                <div className="w-full md:w-[86%] md:text-[64px] text-[34px] md:pt-20 pt-10">
                    <p ref={textRef} className="welcome-text md:leading-[1.05] leading-[1.1] md:tracking-[-0.020em] tracking-[-0.010em]">
                        {words.map((word, index) => (
                            <span key={index}>
                                <span className="word" style={{ color: "#2A2725" }}>{word}</span>
                                {index < words.length - 1 && " "}
                            </span>
                        ))}
                    </p>
                </div>
            </div>
            <div className="md:mt-20 mt-12 flex md:flex-row flex-col md:items-center items-start justify-between gap-8">
                {/* Images side by side, edges touching */}
                <div className="flex flex-shrink-0 items-center">
                    <img
                        src={oval1}
                        alt="welcome image"
                        className="object-cover z-10"
                        style={{
                            width: 'clamp(200px, 22vw, 340px)',
                            height: 'clamp(130px, 14vw, 220px)',
                            borderRadius: '9999px',
                            marginRight: '3px',
                        }}
                    />
                    <img
                        src={oval2}
                        alt="welcome image"
                        className="object-cover"
                        style={{
                            width: 'clamp(200px, 22vw, 340px)',
                            height: 'clamp(130px, 14vw, 220px)',
                            borderRadius: '9999px',
                        }}
                    />
                </div>
                <p className="md:text-[1.7rem] text-[1.2rem] text-[#D4896A] leading-[1.35] font-normal tracking-[-0.01em] md:mr-12 mt-8 md:mt-0 self-center" style={{ fontStyle: 'normal' }}>
                    <span className="block">Scent lingers where moments fade.</span>
                    <span className="block">Your guests won't remember every detail.</span>
                    <span className="block">They'll remember the feeling.</span>
                </p>
            </div>
        </div>
    );
};

export default Welcome;
