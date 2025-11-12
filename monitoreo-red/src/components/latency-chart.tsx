"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { NetworkNode, NetworkEvent } from "@/lib/types";
import { subscribe } from "@/lib/kafka-simulator";

interface LatencyPoint {
  timestamp: string;
  [nodeId: string]: number | string;
}

export default function LatencyChart({ nodes }: { nodes: NetworkNode[] }) {
  const [data, setData] = useState<LatencyPoint[]>([]);
  const [lastLatencies, setLastLatencies] = useState<Record<string, number>>({});

  useEffect(() => {

    subscribe((event: NetworkEvent) => {
      if (event.type === "LATENCY_UPDATE") {
        setData((prevData) => {
          const timestamp = new Date(event.timestamp).toLocaleTimeString();
          const updatedLatencies = { ...lastLatencies, [event.nodeId]: event.data.latency };

          const newPoint: LatencyPoint = { timestamp };
          nodes.forEach((n) => {
            newPoint[n.id] = updatedLatencies[n.id] ?? n.latency;
          });

          const updatedData = [...prevData, newPoint].slice(-20);

          setLastLatencies(updatedLatencies);
          return updatedData;
        });
      }
    });
  }, [nodes, lastLatencies]);


  const colors = ["#22c55e", "#eab308", "#ef4444", "#3b82f6", "#a855f7"];

  return (
    <div className="p-4 bg-gray-800 rounded-xl">
      <h2 className="text-lg font-bold mb-3">Gráfico de Latencia (últimos 20 puntos)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="timestamp" tick={{ fill: "#ccc", fontSize: 12 }} />
          <YAxis
            tick={{ fill: "#ccc" }}
            label={{
              value: "Latencia (ms)",
              angle: -90,
              position: "insideLeft",
              fill: "#ccc",
            }}
            domain={[0, 600]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "8px",
            }}
          />
          <Legend />
          {nodes.map((node, i) => (
            <Line
              key={node.id}
              type="monotone"
              dataKey={node.id}
              name={node.name}
              stroke={colors[i % colors.length]}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
