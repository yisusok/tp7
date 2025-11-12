"use client";
import { NetworkNode } from "@/lib/types";

export default function NodeCard({ node }: { node: NetworkNode }) {
  const color =
    node.state === "online"
      ? "bg-green-500"
      : node.state === "degraded"
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="p-4 rounded-xl bg-gray-800 shadow-md">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{node.name}</h3>
        <span className={`w-3 h-3 rounded-full ${color}`}></span>
      </div>
      <p>Latencia: {node.latency} ms</p>
      <p>Conexiones: {node.connections}</p>
      <p className="text-xs text-gray-400">
        Última actualización: {new Date(node.lastUpdate).toLocaleTimeString()}
      </p>
    </div>
  );
}
