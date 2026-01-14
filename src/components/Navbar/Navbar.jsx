import { useRef } from "react";
import gsap from "gsap";

const Navbar = () => {
  const btnRef = useRef(null);

  // Magnetic button effect
  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const btn = btnRef.current;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
    >
      <button className="group flex items-center gap-3 bg-[#faf8f5]/95 backdrop-blur-sm text-[#181717] px-6 py-3 rounded-full font-medium transition-all duration-500 hover:bg-[#D4896A] hover:gap-4 shadow-2xl">
        <span className="text-sm tracking-wide uppercase transition-all duration-300 group-hover:tracking-widest">Menu</span>
        <div className="bg-[#181717] text-white rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
          <div className="flex flex-col gap-[4px] transition-all duration-300 group-hover:gap-[6px]">
            <span className="w-3.5 h-[1.5px] bg-white transition-all duration-300 group-hover:w-4"></span>
            <span className="w-3.5 h-[1.5px] bg-white transition-all duration-300 group-hover:w-4"></span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Navbar;
