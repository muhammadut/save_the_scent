import { useRef, useEffect } from "react";
import smoke from "../../assets/smoke_final.mp4";

const SmokeCanvas = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      // More intentional energy
      videoRef.current.playbackRate = 1.8;
    }
  }, []);

  return (
    <video
      ref={videoRef}
      src={smoke}
      autoPlay
      loop
      muted
      playsInline
      className="fixed inset-0 w-full h-full object-cover pointer-events-none mix-blend-soft-light"
      style={{
        zIndex: 1,
        opacity: 0.55,
        filter: "saturate(1.45) brightness(1.22)",
      }}
    />
  );
};

export default SmokeCanvas;
