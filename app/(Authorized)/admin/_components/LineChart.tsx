import { format } from "date-fns";
import colors from "tailwindcss/colors";
import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Loading from "../loading";

export default function LineCharter() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_APP_URL + "expense")
      .then((res) => res.json())
      .then((res) => {
        setData(
          res.toReversed().map((expense) => ({
            ...expense,
            createdAt: format(new Date(expense.createdAt), "yy-MM-dd HH:mm"),
          }))
        );
      });
  }, []);

  return (
    <div className="relative flex flex-col break-words mb-6 py-4 m-3 md:col-span-2 rounded-2xl border-double border-secondary border-2 backdrop-blur-3xl shadow-md shadow-secondary">
      <h1 className="font-rock font-extralight uppercase text-primary px-2 text-center pb-4 text-lg">
        Expenses Tracker
      </h1>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart width={730} height={250} data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              style={{ stroke: "var(--primary)" }}
              vertical={false}
              fontSize={12}
              horizontal={false}
            />
            <XAxis
              dataKey="createdAt"
              style={{ stroke: "var(--primary)" }}
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              style={{ stroke: "var(--primary)" }}
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />
            <Tooltip/>
            <Line
              type="monotone"
              dataKey="amount"
              style={{ stroke: "var(--primary)" }}
              dot={{ strokeWidth: 2 }}
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Loading />
      )}
    </div>
  );
}
