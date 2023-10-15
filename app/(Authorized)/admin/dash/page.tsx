"use client";
import { useEffect, useState } from "react";
// import BarCharter from "@/admin/_components/Charts/BarChart";
import { ImClock } from "react-icons/im";
// import { useSession } from "next-auth/react";
// import Card from "@/app/admin/_components/Layouts/Card";
import { IoIosPeople } from "react-icons/io";
import { BiSolidBuildingHouse, BiSolidIdCard } from "react-icons/bi";
import { MdWork } from "react-icons/md";
import DashMap from "./DashMap";
// import getDepartments from "@/app/admin/_components/Fetchers/getDepartments";
// // import getEmployees from "@/app/admin/_components/Fetchers/getEmployees";
// import getJobs from "@/app/admin/_components/Fetchers/getJobs";
// import WaffleChart from "@/app/admin/_components/Charts/WaffleChart";
const DashBody = () => {
  const [date, setDate] = useState(new Date());
  const [waffleChartData, setWaffleChartData] = useState({});
  const [employeeCount, setEmployeeCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [data, setdata] = useState({});
  const [roleCount, setRoleCount] = useState(0);
  const [jobCount, setJobCount] = useState(0);
  // const { data: session, status } = useSession();
  // useEffect(() => {
  //   // Fetch departments and employees data concurrently using Promise.all
  //   // Promise.all([getDepartments(), getEmployees(""), getJobs()])
  //   //   .then(([departmentsResponse, employeesResponse, jobsResponse]) => {
  //   //     return Promise.all([
  //   //       departmentsResponse.json(),
  //   //       employeesResponse.json(),
  //   //       jobsResponse.json(),
  //   //     ]);
  //   //   })
  //   //   .then(([departmentsData, employeesData, jobsData]) => {
  //   //     setDepartmentCount(departmentsData.length);
  //   //     setEmployeeCount(employeesData.length - 1);
  //   //     setJobCount(jobsData.length);
  //   //   });
  // }, []);
  // useEffect(() => {
  //   setWaffleChartData({
  //     labels: ["departments", "employees", "jobs"],
  //     data: [departmentCount, employeeCount, jobCount],
  //     backgroundColor: ["#527BAD", "#00308F", "#002D62"],
  //   });
  // }, [departmentCount, employeeCount, jobCount]);

  useEffect(() => {
    setInterval(() => setDate(new Date()), 30000);
  }, []);

  return (
    <div className="w-full rounded-2xl border-double border-secondary border-2 backdrop-blur-3xl shadow-md shadow-secondary">
      <div className="grid md:grid-cols-3 gap-x-3 gap-y-10 grid-cols-1 p-10  rounded-bl-3xl rounded-br-3xl">
        <div className=" flex flex-col md:items-start items-center gap-5 justify-center ">
          <h4 className="md:text-lg text-xl font-bold font-rock tracking-widest drop-shadow-lg drop-shadow-primary flex items-center gap-2 text-secondary px-1">
            <ImClock />
            {date.toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
            })}
          </h4>
          <h1 className="md:text-5xl text-6xl drop-shadow-lg drop-shadow-primary font-extrabold font-rock tracking-widest uppercase bg-secondary text-transparent bg-clip-text break-words">
            Dashboard
          </h1>
          <h1 className="md:text-2xl text-3xl font-bold font-rock tracking-wide pt-1 capitalize text-primary d">
            Welcome Back,
            {/* {session?.user?.name} */}
          </h1>
        </div>
        <div className="col-span-2">
          <DashMap />
        </div>
        {/* <div className="flex flex-wrap justify-center col-span-2 gap-3 md:m-0 mt-10 items-start content-start transition-all duration-500">
          <Card
            Icon={IoIosPeople}
            count={employeeCount}
            name={"employees"}
            path={"/p/employee"}
          />
          <Card
            Icon={BiSolidBuildingHouse}
            count={departmentCount}
            name={"departments"}
            path={"/p/department"}
          />
          <Card Icon={MdWork} count={jobCount} name={"jobs"} path={"/p/job"} />
          <Card
            Icon={BiSolidIdCard}
            count={roleCount}
            name={"roles"}
            path={"/p/roles"}
          />
          <Card
            Icon={IoIosPeople}
            count={employeeCount}
            name={"employees"}
            path={"/p/employee"}
          />
          <Card
            Icon={BiSolidBuildingHouse}
            count={departmentCount}
            name={"departments"}
            path={"/p/department"}
          />
        </div> */}
      </div>
      {/* <div className="col-span-3 w-full flex flex-col justify-center items-center rounded-md shadow-sm shadow-primary backdrop-blur-2xl border-1 border-primary ">
        <h1 className="md:text-4xl text-3xl m-5 mt-6 drop-shadow-xl shadow-tertiary font-poppins font-medium tracking-widest uppercase bg-primary text-transparent bg-clip-text break-words w-full text-center">
          Analytics
        </h1>
        <div className="flex justify-between items-start flex-wrap gap-2 w-full m-3">
          {waffleChartData && (
            <>
              <BarCharter />
              <WaffleChart data={waffleChartData} />
            </>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default DashBody;
