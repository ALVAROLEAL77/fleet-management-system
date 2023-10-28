"use client";
import React, { useState } from "react";
import {
  BiSolidBookContent,
  BiSolidCarMechanic,
  BiSolidDashboard,
} from "react-icons/bi";
import { PiCarFill, PiPersonDuotone, PiPersonFill } from "react-icons/pi";
import {
  FaMoneyBills,
  FaPersonBiking,
  FaUserShield,
  FaUserTie,
} from "react-icons/fa6";
import { RiGpsFill } from "react-icons/ri";
import Link from "next/link";
import { ImUserTie } from "react-icons/im";
import { AiFillCarryOut } from "react-icons/ai";
import { BsFillFuelPumpFill } from "react-icons/bs";
// @ts-ignore
const SideBar = ({}) => {
  const [drops, setDrops] = useState({ employee: false, job: false });
  const [hover, setHover] = useState({});
  return (
    <div
      className={`md:h-screen flex flex-col justify-center font-poppins tracking-widest uppercase ml-3 bg-transparent z-50 w-16`}
    >
      <ul
        className={`flex fixed flex-col w-fit h-fit items-start border-[2px] border-double border-secondary rounded-2xl py-3 shadow-md shadow-secondary bg-tertiary bg-opacity-30 backdrop-blur-2xl`}
      >
        <li
          className="w-full py-1"
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
          className="w-full py-1"
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
            <PiPersonFill
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
          className="w-full py-1"
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
          className="w-full py-1"
          onMouseOver={() =>
            setHover((prev) => {
              return { ...prev, cs: true };
            })
          }
          onMouseOut={() =>
            setHover((prev) => {
              return { ...prev, cs: false };
            })
          }
        >
          <Link
            href={"/admin/customer"}
            className={` flex items-center justify-start w-full p-3 px-4  ${
              hover.cs ? "text-primary" : "text-secondary"
            }`}
          >
            <ImUserTie
              className={`text-2xl drop-shadow-3xl duration-500 ${
                hover.cs && "scale-125"
              }`}
            />

            <p
              className={`font-thin tracking-widest whitespace-nowrap font-rock text-sm duration-500 fixed z-50 overflow-hidden ${
                hover.cs ? " translate-x-14 w-fit" : "translate-x-10 w-0"
              }`}
            >
              Customers
            </p>
          </Link>
        </li>
        <li
          className="w-full py-1"
          onMouseOver={() =>
            setHover((prev) => {
              return { ...prev, trip: true };
            })
          }
          onMouseOut={() =>
            setHover((prev) => {
              return { ...prev, trip: false };
            })
          }
        >
          <Link
            href={"/admin/trip"}
            className={` flex items-center justify-start w-full p-3 px-4  ${
              hover.trip ? "text-primary" : "text-secondary"
            }`}
          >
            <AiFillCarryOut
              className={`text-2xl drop-shadow-3xl duration-500 ${
                hover.trip && "scale-125"
              }`}
            />

            <p
              className={`font-thin tracking-widest whitespace-nowrap font-rock text-sm duration-500 fixed z-50 overflow-hidden ${
                hover.trip ? " translate-x-14 w-fit" : "translate-x-10 w-0"
              }`}
            >
              Trips
            </p>
          </Link>
        </li>
        <li
          className="w-full py-1"
          onMouseOver={() =>
            setHover((prev) => {
              return { ...prev, book: true };
            })
          }
          onMouseOut={() =>
            setHover((prev) => {
              return { ...prev, book: false };
            })
          }
        >
          <Link
            href={"/admin/booking"}
            className={` flex items-center justify-start w-full p-3 px-4  ${
              hover.book ? "text-primary" : "text-secondary"
            }`}
          >
            <BiSolidBookContent
              className={`text-2xl drop-shadow-3xl duration-500 ${
                hover.book && "scale-125"
              }`}
            />

            <p
              className={`font-thin tracking-widest whitespace-nowrap font-rock text-sm duration-500 fixed z-50 overflow-hidden ${
                hover.book ? " translate-x-14 w-fit" : "translate-x-10 w-0"
              }`}
            >
              Booking
            </p>
          </Link>
        </li>
        <li
          className="w-full py-1"
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
        <li
          className="w-full py-1"
          onMouseOver={() =>
            setHover((prev) => {
              return { ...prev, fe: true };
            })
          }
          onMouseOut={() =>
            setHover((prev) => {
              return { ...prev, fe: false };
            })
          }
        >
          <Link
            href={"/admin/fuel"}
            className={` flex items-center justify-start w-full p-3 px-4  ${
              hover.fe ? "text-primary" : "text-secondary"
            }`}
          >
            <BsFillFuelPumpFill
              className={`text-2xl drop-shadow-3xl duration-500 ${
                hover.fe && "scale-125"
              }`}
            />

            <p
              className={`font-thin tracking-widest whitespace-nowrap font-rock text-sm duration-500 fixed z-50 overflow-hidden ${
                hover.fe ? " translate-x-14 w-fit" : "translate-x-10 w-0"
              }`}
            >
              Fuel Records
            </p>
          </Link>
        </li>
        <li
          className="w-full py-1"
          onMouseOver={() =>
            setHover((prev) => {
              return { ...prev, mn: true };
            })
          }
          onMouseOut={() =>
            setHover((prev) => {
              return { ...prev, mn: false };
            })
          }
        >
          <Link
            href={"/admin/maintenance"}
            className={` flex items-center justify-start w-full p-3 px-4  ${
              hover.mn ? "text-primary" : "text-secondary"
            }`}
          >
            <BiSolidCarMechanic
              className={`text-2xl drop-shadow-3xl duration-500 ${
                hover.mn && "scale-125"
              }`}
            />

            <p
              className={`font-thin tracking-widest whitespace-nowrap font-rock text-sm duration-500 fixed z-50 overflow-hidden ${
                hover.mn ? " translate-x-14 w-fit" : "translate-x-10 w-0"
              }`}
            >
              Maintenances
            </p>
          </Link>
        </li>
        <li
          className="w-full py-1"
          onMouseOver={() =>
            setHover((prev) => {
              return { ...prev, ex: true };
            })
          }
          onMouseOut={() =>
            setHover((prev) => {
              return { ...prev, ex: false };
            })
          }
        >
          <Link
            href={"/admin/expense"}
            className={` flex items-center justify-start w-full p-3 px-4  ${
              hover.ex ? "text-primary" : "text-secondary"
            }`}
          >
            <FaMoneyBills
              className={`text-2xl drop-shadow-3xl duration-500 ${
                hover.ex && "scale-125"
              }`}
            />

            <p
              className={`font-thin tracking-widest whitespace-nowrap font-rock text-sm duration-500 fixed z-50 overflow-hidden ${
                hover.ex ? " translate-x-14 w-fit" : "translate-x-10 w-0"
              }`}
            >
              Expenses
            </p>
          </Link>
        </li>
        <li
          className="w-full py-1"
          onMouseOver={() =>
            setHover((prev) => {
              return { ...prev, us: true };
            })
          }
          onMouseOut={() =>
            setHover((prev) => {
              return { ...prev, us: false };
            })
          }
        >
          <Link
            href={"/admin/user"}
            className={` flex items-center justify-start w-full p-3 px-4  ${
              hover.us ? "text-primary" : "text-secondary"
            }`}
          >
            <FaUserShield
              className={`text-2xl drop-shadow-3xl duration-500 ${
                hover.us && "scale-125"
              }`}
            />

            <p
              className={`font-thin tracking-widest whitespace-nowrap font-rock text-sm duration-500 fixed z-50 overflow-hidden ${
                hover.us ? " translate-x-14 w-fit" : "translate-x-10 w-0"
              }`}
            >
              Users
            </p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
