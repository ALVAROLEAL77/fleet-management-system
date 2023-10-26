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
import Header from "./Header";
import Drop from "./Drop";
// @ts-ignore
const SideBar = ({ setdrop, drop }) => {
  const [hover, setHover] = useState({});
  return (
    <div
      className={`md:h-screen w-[90%] md:relative fixed md:w-auto md:ml-4 flex flex-col justify-center items-center drop-shadow-[0px_3px_10px_rgba(82,109,130,1)]`}
    >
      <ul
        className={`flex md:flex-col flex-row w-fit md:m-0 mt-3 md:h-fit h-20 overflow-x-scroll md:overflow-x-hidden overflow-y-hidden items-start border-[2px] border-double border-secondary rounded-xl py-3 shadow-md shadow-secondary bg-transparent backdrop-blur-2xl`}
      >
        <li
          className="w-full overflow-visible"
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
            className={` flex md:flex-row flex-col items-center justify-start w-full p-3 px-4  ${
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
                hover.dash
                  ? " md:translate-x-14 md:translate-y-0 translate-y-14 w-fit"
                  : "md:translate-x-10 md:translate-y-0 translate-y-10 w-0"
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
            className={` flex md:flex-row flex-col items-center justify-start w-full p-3 px-4  ${
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
                hover.driver
                  ? " md:translate-x-14 md:translate-y-0 translate-y-14 w-fit"
                  : "md:translate-x-10 md:translate-y-0 translate-y-10 w-0"
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
            className={` flex md:flex-row flex-col items-center justify-start w-full p-3 px-4  ${
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
                hover.veh
                  ? " md:translate-x-14 md:translate-y-0 translate-y-14 w-fit"
                  : "md:translate-x-10 md:translate-y-0 translate-y-10 w-0"
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
            className={` flex md:flex-row flex-col items-center justify-start w-full p-3 px-4  ${
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
                hover.cs
                  ? " md:translate-x-14 md:translate-y-0 translate-y-14 w-fit"
                  : "md:translate-x-10 md:translate-y-0 translate-y-10 w-0"
              }`}
            >
              Customers
            </p>
          </Link>
        </li>

        <li
          className="w-full"
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
            className={` flex md:flex-row flex-col items-center justify-start w-full p-3 px-4  ${
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
                hover.book
                  ? " md:translate-x-14 md:translate-y-0 translate-y-14 w-fit"
                  : "md:translate-x-10 md:translate-y-0 translate-y-10 w-0"
              }`}
            >
              Booking
            </p>
          </Link>
        </li>
        <li
          className="w-full"
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
            className={` flex md:flex-row flex-col items-center justify-start w-full p-3 px-4  ${
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
                hover.trip
                  ? " md:translate-x-14 md:translate-y-0 translate-y-14 w-fit"
                  : "md:translate-x-10 md:translate-y-0 translate-y-10 w-0"
              }`}
            >
              Trips
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
            className={` flex md:flex-row flex-col items-center justify-start w-full p-3 px-4  ${
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
                hover.lt
                  ? " md:translate-x-14 md:translate-y-0 translate-y-14 w-fit"
                  : "md:translate-x-10 md:translate-y-0 translate-y-10 w-0"
              }`}
            >
              Live Tracking
            </p>
          </Link>
        </li>
        <li
          className="w-full"
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
            className={` flex md:flex-row flex-col items-center justify-start w-full p-3 px-4  ${
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
                hover.fe
                  ? " md:translate-x-14 md:translate-y-0 translate-y-14 w-fit"
                  : "md:translate-x-10 md:translate-y-0 translate-y-10 w-0"
              }`}
            >
              Fuel Records
            </p>
          </Link>
        </li>
        <li
          className="w-full"
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
            className={` flex md:flex-row flex-col items-center justify-start w-full p-3 px-4  ${
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
                hover.mn
                  ? " md:translate-x-14 md:translate-y-0 translate-y-14 w-fit"
                  : "md:translate-x-10 md:translate-y-0 translate-y-10 w-0"
              }`}
            >
              Maintenances
            </p>
          </Link>
        </li>
        <li
          className="w-full"
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
            className={` flex md:flex-row flex-col items-center justify-start w-full p-3 px-4  ${
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
                hover.ex
                  ? " md:translate-x-14 md:translate-y-0 translate-y-14 w-fit"
                  : "md:translate-x-10 md:translate-y-0 translate-y-10 w-0"
              }`}
            >
              Expenses
            </p>
          </Link>
        </li>
        <li
          className="w-full"
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
            className={` flex md:flex-row flex-col items-center justify-start w-full p-3 px-4  ${
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
                hover.us
                  ? " md:translate-x-14 md:translate-y-0 translate-y-14 w-fit"
                  : "md:translate-x-10 md:translate-y-0 translate-y-10 w-0"
              }`}
            >
              Users
            </p>
          </Link>
        </li>
        <li
          className="w-full md:hidden block z-50"
          onMouseOver={() =>
            setHover((prev) => {
              return { ...prev, log: true };
            })
          }
          onMouseOut={() =>
            setHover((prev) => {
              return { ...prev, log: false };
            })
          }
        >
          <div
            className={` flex md:flex-row flex-col items-center justify-start w-full p-3 px-4 z-50 ${
              hover.log ? "text-primary" : "text-secondary"
            }`}
          >
            <Header setdrop={setdrop} drop={drop} />
            <p
              className={`font-thin tracking-widest whitespace-nowrap font-rock text-sm duration-500 fixed z-50 overflow-hidden ${
                hover.log
                  ? " md:translate-x-14 md:translate-y-0 translate-y-14 w-fit"
                  : "md:translate-x-10 md:translate-y-0 translate-y-10 w-0"
              }`}
            >
              User info
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
