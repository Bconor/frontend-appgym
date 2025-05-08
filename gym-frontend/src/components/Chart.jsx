import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { date: "Lun", weight: 50 },
  { date: "Mar", weight: 52 },
  { date: "Mié", weight: 54 },
  { date: "Jue", weight: 55 },
  { date: "Vie", weight: 57 },
  { date: "Sáb", weight: 58 },
  { date: "Dom", weight: 60 },
];

const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="weight" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
