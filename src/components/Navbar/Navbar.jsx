import { HiOutlineMenuAlt4 } from "react-icons/hi";

const Navbar = () => {
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-fit h-12 px-2 py-1 flex items-center justify-between gap-4 bg-white rounded-full z-50 cursor-pointer group transition-all duration-300 shadow-xl hover:scale-105 pointer-events-auto">
      <div className="pl-4">
        <p className="text-[14px] font-medium tracking-wide text-black uppercase">Menu</p>
      </div>
      <div className="bg-black rounded-full w-10 h-10 flex items-center justify-center">
        <HiOutlineMenuAlt4 className="text-white text-xl transition-transform duration-500 group-hover:rotate-180" />
      </div>
    </div>
  );
};

export default Navbar;
