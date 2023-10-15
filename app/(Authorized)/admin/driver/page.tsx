"use client";
import { usePathname } from "next/navigation";
import DataTable from "../_components/DataTable";
import { useEffect, useState } from "react";

const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "actions",
    header: "Actions",
  },
];

const Driver = () => {
  const path = usePathname();
  const [data, setData] = useState([]);
  const [columns, setCols] = useState([
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "actions",
      header: "Actions",
    },
  ]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_APP_URL + "api/user")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, []);

  return (
    <div className="w-[90%] rounded-2xl border-double border-secondary border-2 backdrop-blur-3xl shadow-md shadow-secondary p-7 pt-3">
      <h1 className="font-rock text-secondary tracking-widest space-x-10 uppercase m-3">
        {path.split("/").join(" > ").substring(2)}
      </h1>
      <DataTable
        data={data}
        columns={columns}
        cns={
          "w-full !border-double border-secondary border-2 p-4 rounded-lg shadow-md shadow-secondary"
        }
      />
    </div>
  );
};

export default Driver;
