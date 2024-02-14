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
  const [tripCount, setTripCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const { data: session, status } = useSession();
  useEffect(() => {
    Promise.all([
      fetch(process.env.NEXT_PUBLIC_APP_URL + "driver", {
        next: { revalidate: 0 },
      }),
      fetch(process.env.NEXT_PUBLIC_APP_URL + "vehicle", {
        next: { revalidate: 0 },
      }),
      fetch(process.env.NEXT_PUBLIC_APP_URL + "customer", {
        next: { revalidate: 0 },
      }),
      fetch(process.env.NEXT_PUBLIC_APP_URL + "trip", {
        next: { revalidate: 0 },
      }),
      fetch(process.env.NEXT_PUBLIC_APP_URL + "booking", {
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
      backgroundColor: ["#212f45", "#1d2a3e", "#1a2537", "#172030", "#131c29"],
    });
  }, [driverCount, vehicleCount, customerCount, tripCount, bookCount]);

  useEffect(() => {
    setInterval(() => setDate(new Date()), 30000);
  }, []);

  return (
    <>
      <div className="grid md:grid-cols-3 gap-y-10 grid-cols-1 md:py-4 md:px-0 md:m-0 md:mt-1  rounded-bl-3xl rounded-br-3xl md:w-full rounded-xl border-double border-secondary border-2 backdrop-blur-lg shadow-md shadow-secondary mt-20">
        <div className=" flex flex-col md:items-start items-center p-16 md:p-auto gap-5 justify-center h-[300px]">
          <h4 className="md:text-lg text-sm font-bold font-rock tracking-widest flex items-center gap-2 text-primary px-1">
            <ImClock />
            {date.toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
            })}
          </h4>
          <h1 className="md:text-[39px] text-5xl drop-shadow-primary font-extrabold font-rock tracking-widest uppercase bg-secondary text-primary bg-clip-text break-words md:break-all keep-all ">
            Dashboard
          </h1>
          <h1 className="text-xl font-light font-rock tracking-widest pt-1 capitalize text-primary break-words md:break-all keep-all ">
            Welcome Back, {session?.user?.firstName}
          </h1>
        </div>
        <div className="md:col-span-2">
          <DashMap />
        </div>
      </div>
      <div className="relative flex flex-wrap justify-between md:my-6 my-10 w-full items-start content-start transition-all duration-500">
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
        <h1 className="md:text-4xl text-4xl  font-bold font-rock tracking-widest p-5 uppercase text-primary break-words break-all ">
          Analytics
        </h1>
        <div className=" md:h-full grid md:grid-cols-2 md:grid-rows-2 grid-cols-1 w-full m-3">
          {waffleChartData && (
            <>
              <LineCharter />
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
