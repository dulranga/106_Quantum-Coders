"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

import electionData from "backend/src/win_predictor.json";

// Transform data for Recharts
const data = Object.keys(electionData.candidates).map((candidate) => ({
  name: candidate,
  vote_percentage: electionData.candidates?.[candidate]?.vote_percentage,
  vote_count: electionData.candidates?.[candidate]?.vote_count,
}));

const ElectionGraph: React.FC = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-8">
        Presidential Election - Win Predictions
      </h1>
      <ResponsiveContainer width="90%" height={500}>
        <BarChart
          data={data}
          margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="vote_percentage"
            fill="#82ca9d"
            name="Vote Percentage (%)"
          />
          <Bar dataKey="vote_count" fill="#8884d8" name="Vote Count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ElectionGraph;
