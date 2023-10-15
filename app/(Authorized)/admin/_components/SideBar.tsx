"use client";
import React, { useState } from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { PiCarFill } from "react-icons/pi";
import { FaPersonBiking } from "react-icons/fa6";
import { RiGpsFill } from "react-icons/ri";
import Link from "next/link";

// @ts-ignore
const SideBar = ({ flat, setflat }) => {
  const [drops, setDrops] = useState({ employee: false, job: false });
  const [hover, setHover] = useState({});
  return (
    <div
      className={` transition-all font-poppins tracking-widest duration-300 uppercase ml-3 bg-transparent z-50 ${
        // flat ? "w-60" :
        "w-14"
      }`}
      onMouseOver={() => setflat(true)}
      onMouseOut={() => setflat(false)}
    >
      <div className={`h-screen flex flex-col justify-center items-center`}>
        <ul
          className={` flex flex-col w-full h-fit items-start border-[2px] border-double border-secondary rounded-xl py-3 shadow-md shadow-secondary bg-transparent backdrop-blur-2xl`}
        >
          <li
            className="w-full"
            onMouseOver={() =>
              setHover((prev) => {
                return { ...prev, dash: true };
              })
            }
            onMouseOut={() =>
              setHover((prev) => {
                return { ...prev, dash: false };
              })
            }
          >
            <Link
              href={"/admin/dash"}
              className={` flex items-center justify-start w-full p-3 px-4  ${
                hover.dash ? "text-primary" : "text-secondary"
              }`}
            >
              <BiSolidDashboard
                className={`text-2xl drop-shadow-3xl duration-500 ${
                  hover.dash && "scale-125"
                }`}
              />

              <p
                className={`font-thin tracking-widest whitespace-nowrap font-rock text-sm duration-500 fixed z-50 overflow-hidden ${
                  hover.dash ? " translate-x-14 w-fit" : "translate-x-10 w-0"
                }`}
              >
                Dashboard
              </p>
            </Link>
          </li>
          <li
            className="w-full"
            onMouseOver={() =>
              setHover((prev) => {
                return { ...prev, driver: true };
              })
            }
            onMouseOut={() =>
              setHover((prev) => {
                return { ...prev, driver: false };
              })
            }
          >
            <Link
              href={"/admin/driver"}
              className={` flex items-center justify-start w-full p-3 px-4  ${
                hover.driver ? "text-primary" : "text-secondary"
              }`}
            >
              <FaPersonBiking
                className={`text-2xl drop-shadow-3xl duration-500 ${
                  hover.driver && "scale-125"
                }`}
              />

              <p
                className={`font-thin tracking-widest whitespace-nowrap font-rock text-sm duration-500 fixed z-50 overflow-hidden ${
                  hover.driver ? " translate-x-14 w-fit" : "translate-x-10 w-0"
                }`}
              >
                Drivers
              </p>
            </Link>
          </li>
          <li
            className="w-full"
            onMouseOver={() =>
              setHover((prev) => {
                return { ...prev, veh: true };
              })
            }
            onMouseOut={() =>
              setHover((prev) => {
                return { ...prev, veh: false };
              })
            }
          >
            <Link
              href={"/admin/vehicle"}
              className={` flex items-center justify-start w-full p-3 px-4  ${
                hover.veh ? "text-primary" : "text-secondary"
              }`}
            >
              <PiCarFill
                className={`text-2xl drop-shadow-3xl duration-500 ${
                  hover.veh && "scale-125"
                }`}
              />

              <p
                className={`font-thin tracking-widest whitespace-nowrap font-rock text-sm duration-500 fixed z-50 overflow-hidden ${
                  hover.veh ? " translate-x-14 w-fit" : "translate-x-10 w-0"
                }`}
              >
                Vehicles
              </p>
            </Link>
          </li>
          <li
            className="w-full"
            onMouseOver={() =>
              setHover((prev) => {
                return { ...prev, lt: true };
              })
            }
            onMouseOut={() =>
              setHover((prev) => {
                return { ...prev, lt: false };
              })
            }
          >
            <Link
              href={"/admin/lt"}
              className={` flex items-center justify-start w-full p-3 px-4  ${
                hover.lt ? "text-primary" : "text-secondary"
              }`}
            >
              <RiGpsFill
                className={`text-2xl drop-shadow-3xl duration-500 ${
                  hover.lt && "scale-125"
                }`}
              />

              <p
                className={`font-thin tracking-widest whitespace-nowrap font-rock text-sm duration-500 fixed z-50 overflow-hidden ${
                  hover.lt ? " translate-x-14 w-fit" : "translate-x-10 w-0"
                }`}
              >
                Live Tracking
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
