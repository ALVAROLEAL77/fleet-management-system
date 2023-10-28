"use client";
import { useEffect, useState } from "react";
// import BarCharter from "@/admin/_components/Charts/BarChart";
import { ImClock, ImUserTie } from "react-icons/im";
import { useSession } from "next-auth/react";
import Card from "../_components/Card";
import { IoIosPeople } from "react-icons/io";
import {
  BiSolidBookContent,
  BiSolidBuildingHouse,
  BiSolidIdCard,
} from "react-icons/bi";
import { MdWork } from "react-icons/md";
import DashMap from "./DashMap";
import { PiCarFill, PiPersonFill } from "react-icons/pi";
import { AiFillCarryOut } from "react-icons/ai";
import WaffleChart from "../_components/WaffleChart";
import BarCharter from "../_components/BarChart";
import { useLoadScript } from "@react-google-maps/api";
import LineCharter from "../_components/LineChart";

const DashBody = () => {
  const [date, setDate] = useState(new Date());
  const [waffleChartData, setWaffleChartData] = useState({});
  const [vehicleCount, setVehicleCount] = useState(0);
  const [driverCount, setDriverCount] = useState(0);
  const [data, setdata] = useState({});
  const [tripCount, setTripCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const { data: session, status } = useSession();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GMAPS_API,
  });
  useEffect(() => {
    Promise.all([
      fetch(process.env.NEXT_PUBLIC_APP_URL + "api/driver", {
        next: { revalidate: 0 },
      }),
      fetch(process.env.NEXT_PUBLIC_APP_URL + "api/vehicle", {
        next: { revalidate: 0 },
      }),
      fetch(process.env.NEXT_PUBLIC_APP_URL + "api/customer", {
        next: { revalidate: 0 },
      }),
      fetch(process.env.NEXT_PUBLIC_APP_URL + "api/trip", {
        next: { revalidate: 0 },
      }),
      fetch(process.env.NEXT_PUBLIC_APP_URL + "api/booking", {
        next: { revalidate: 0 },
      }),
    ])
      .then(([driverRes, vehicleResponse, customerRes, tripRes, bookRes]) => {
        return Promise.all([
          driverRes.json(),
          vehicleResponse.json(),
          customerRes.json(),
          tripRes.json(),
          bookRes.json(),
        ]);
      })
      .then(([driverRes, vehicleResponse, customerRes, tripRes, bookRes]) => {
        setDriverCount(driverRes.length);
        setVehicleCount(vehicleResponse.length);
        setCustomerCount(customerRes.length);
        setTripCount(tripRes.length);
        setBookCount(bookRes.length);
        console.log(driverCount, vehicleCount);
      });
  }, []);
  useEffect(() => {
    setWaffleChartData({
      labels: ["books", "vehicles", "customers", "trips", "drivers"],
      data: [bookCount, vehicleCount, customerCount, tripCount, driverCount],
      backgroundColor: ["#293641", "#31414e", "#394c5b", "#415768", "#182027"],
    });
  }, [driverCount, vehicleCount, customerCount, tripCount, bookCount]);

  useEffect(() => {
    setInterval(() => setDate(new Date()), 30000);
  }, []);

  return (
    <>
      <div className="grid md:grid-cols-3 gap-y-10 grid-cols-1 md:py-4 md:px-0 m-6 md:m-0 md:mt-1  rounded-bl-3xl rounded-br-3xl md:w-full rounded-xl border-double border-secondary border-2 backdrop-blur-lg shadow-md shadow-secondary">
        <div className=" flex flex-col md:items-start items-center p-16 md:p-auto gap-5 justify-center h-[300px]">
          <h4 className="md:text-lg text-sm font-bold font-rock tracking-widest flex items-center gap-2 text-secondary px-1">
            <ImClock />
            {date.toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
            })}
          </h4>
          <h1 className="md:text-[39px] text-5xl drop-shadow-primary font-extrabold font-rock tracking-widest uppercase bg-secondary text-transparent bg-clip-text break-words md:break-all keep-all drop-shadow-[0px_3px_10px_rgba(82,109,130,1)]">
            Dashboard
          </h1>
          <h1 className="text-xl font-bold font-neon tracking-widest pt-1 capitalize text-primary drop-shadow-[0px_3px_3px_rgba(255,255,255,1)] break-words md:break-all keep-all ">
            Welcome Back, {session?.user?.firstName}
          </h1>
        </div>
        <div className="md:col-span-2 mr-2">
          <DashMap isLoaded={isLoaded} />
        </div>
      </div>
      <div className="relative flex flex-wrap justify-center col-span-5 md:my-6 my-10 gap-3 items-start content-start transition-all duration-500">
        <Card
          Icon={PiPersonFill}
          count={driverCount}
          name={"drivers"}
          path={"/admin/driver"}
        />
        <Card
          Icon={PiCarFill}
          count={vehicleCount}
          name={"vehicles"}
          path={"/admin/vehicle"}
        />
        <Card
          Icon={ImUserTie}
          count={customerCount}
          name={"customers"}
          path={"/admin/customer"}
        />
        <Card
          Icon={AiFillCarryOut}
          count={tripCount}
          name={"trips"}
          path={"/admin/trip"}
        />
        <Card
          Icon={BiSolidBookContent}
          count={bookCount}
          name={"booking"}
          path={"/admin/booking"}
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center rounded-bl-3xl rounded-br-3xl rounded-2xl border-double border-secondary border-2 backdrop-blur-3xl shadow-md shadow-secondary">
        <h1 className="md:text-4xl text-4xl  font-bold font-rock tracking-widest p-5 uppercase text-secondary break-words break-all drop-shadow-[0px_3px_10px_rgba(82,109,130,1)]">
          Analytics
        </h1>
        <div className=" md:h-full grid grid-cols-2 grid-rows-2 w-[100px] md:w-full m-3">
          {waffleChartData && (
            <>
              <BarCharter />
              <WaffleChart data={waffleChartData} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DashBody;
