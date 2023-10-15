"use client";
import { usePathname } from "next/navigation";
import DataTable from "../_components/DataTable";
import { useEffect, useState } from "react";

const Vehicle = () => {
  const path = usePathname();
  const [vehicleData, setVehicleData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [vehicleColumns, setVehicleCols] = useState([
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "vehicleType",
      header: "Vehicle Type",
    },
    {
      accessorKey: "vehicleMake",
      header: "Made By",
    },
    {
      accessorKey: "vehicleModel",
      header: "Model",
    },
    {
      accessorKey: "vehicleLicensePlate",
      header: "License Plate",
    },
    {
      accessorKey: "currentLocation",
      header: "Location",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "actions",
      header: "Actions",
    },
  ]);
  const [typeColumns, setTypeCols] = useState([
    {
      accessorKey: "vehicleType",
      header: "Type",
    },
    {
      accessorKey: "actions",
      header: "Actions",
    },
  ]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_APP_URL + "api/vehicle")
      .then((res) => res.json())
      .then((res) => {
        setVehicleData(res);
        setTypeData(res.map((vh) => ({ vehicleType: vh.vehicleType })));
      });
  }, []);
  return (
    <div className="w-full rounded-2xl border-double border-secondary border-2 backdrop-blur-3xl shadow-md shadow-secondary p-7 pt-3">
      <h1 className="font-rock text-secondary tracking-widest space-x-10 uppercase m-3">
        {path.split("/").join(" > ").substring(2)}
      </h1>
      <div className="w-full flex justify-between gap-4">
        <DataTable
          data={vehicleData}
          columns={vehicleColumns}
          cns={
            "w-3/4 shadow-lg !border-double border-secondary border-2 p-4 rounded-lg shadow-secondary"
          }
          name={"Vehicles"}
        />
        <DataTable
          data={typeData}
          columns={typeColumns}
          cns={
            "w-2/4 shadow-md !border-double border-secondary border-2 p-4 rounded-lg shadow-secondary"
          }
          name="Vehicle Types"
        />
      </div>
    </div>
  );
};

export default Vehicle;
