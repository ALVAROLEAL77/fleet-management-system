"use client";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useEffect, useState } from "react";
import Loading from "../loading";
export default function BarCharter() {
  const [vehicle, setVehicle] = useState([]);
  const [vehicleConsumption, setVehicleConsumption] = useState([]);
  const [fueling, setFueling] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch departments and employees data concurrently using Promise.all
    Promise.all([
      fetch(process.env.NEXT_PUBLIC_APP_URL + "fuelingrecord", {
        next: { revalidate: 0 },
      }),
      fetch(process.env.NEXT_PUBLIC_APP_URL + "vehicle", {
        next: { revalidate: 0 },
      }),
    ])
      .then(([fuelingResponse, vehicleResponse]) => {
        return Promise.all([fuelingResponse.json(), vehicleResponse.json()]);
      })
      .then(([fuelingData, vehicleData]) => {
        setFueling(fuelingData);
        setVehicle(vehicleData);
        const fuel = vehicleData.map(
          (vehicle) =>
            fuelingData.filter((fuel) => fuel.vehicleId === vehicle.id).length
        );

        setVehicleConsumption(fuel);
      });
  }, []);

  useEffect(() => {
    const data = vehicle.map((vehicle, index) => {
      return {
        name: vehicle.vehicleType,
        total: vehicleConsumption[index],
      };
    });
    setData(data);
  }, [vehicleConsumption]);
  console.log(data);
  return (
    <>
      {data ? (
        <div className="relative flex flex-col break-words mb-6 py-4 m-3 md:flex-1 rounded-2xl border-double border-secondary border-2 backdrop-blur-3xl shadow-md shadow-secondary">
          <h1 className="font-rock font-extralight uppercase text-primary px-2 text-center pb-4 text-lg">
            Fuel Consumptions
          </h1>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <XAxis
                dataKey="name"
                stroke="#526d82"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#526d82"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <CartesianGrid
                stroke="#526d82"
                vertical={false}
                horizontal={false}
              />
              <Bar dataKey="total" fill="#526d82" radius={[2, 2, 0, 0]} />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
