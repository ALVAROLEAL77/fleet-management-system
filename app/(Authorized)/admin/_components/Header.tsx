import React, { useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import Link from "next/link";
import { MdOutlinePersonOutline } from "react-icons/md";
import { LucideMenuSquare } from "lucide-react";
//@ts-ignore
const Header = ({ setdrop, drop, setMSlider }) => {
  return (
    <div className="flex justify-between w-full mb-2 z-20 md:relative fixed">
      <div
        className={`flex justify-between p-4 w-full bg-transparent items-center shadow-md shadow-secondary transition-all duration-100 rounded-xl border-[2px] border-double border-secondary md:my-4 mr-2 md:mr-0 cursor-pointer`}
      >
        <Link
          href={"/admin/dash"}
          className="uppercase font-bold tracking-widest z-40 drop-shadow-[0px_3px_10px_rgba(82,109,130,1)] text-secondary bg-clip-text text-center font-rock flex items-center md:text-4xl"
        >
          Fleet management system
        </Link>

        <div
          className={`md:hidden  gap-1 hover:bg-opacity-40  p-1 px-2 rounded-xl bg-opacity-0 `}
          onClick={() => setMSlider((prev: boolean) => !prev)}
        >
          <LucideMenuSquare className="text-primary text-2xl" />
        </div>
        <div
          className={`md:flex hidden items-center gap-1 hover:bg-opacity-40  p-1 px-2 rounded-xl bg-opacity-0 `}
          onClick={() => setdrop((prev: boolean) => !prev)}
          onBlur={() => setdrop(false)}
        >
          <MdOutlinePersonOutline className="text-primary text-2xl" />
          <BsFillCaretDownFill
            className={`text-primary text-xs duration-500 ${
              drop ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
