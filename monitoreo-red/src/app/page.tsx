"use client";
import { useEffect, useState } from "react";
import { NetworkNode, NetworkEvent } from "@/lib/types";
import { startKafkaSimulation, subscribe } from "@/lib/kafka-simulator";
import NodeCard from "@/components/node-card";
import StatsOverview from "@/components/stats-overview";
import EventLog from "@/components/event-log";
import LatencyChart from "@/components/latency-chart";

export default function Page() {
  const [nodes, setNodes] = useState<NetworkNode[]>([]);
  const [events, setEvents] = useState<NetworkEvent[]>([]);

  useEffect(() => {
    const initialNodes: NetworkNode[] = Array.from({ length: 5 }).map((_, i) => ({
      id: `node-${i + 1}`,
      name: `Nodo ${i + 1}`,
      state: "online" as const,
      latency: 100,
      connections: 100,
      lastUpdate: Date.now(),
    }));

    setNodes(initialNodes);
    startKafkaSimulation(initialNodes);

    subscribe((event) => {
      setEvents((prev) => [event, ...prev].slice(0, 50));
      setNodes((prev) =>
        prev.map((n) =>
          n.id === event.nodeId ? { ...n, ...event.data } : n
        )
      );
    });
  }, []);

  return (
    <main className="p-6 space-y-6">
      <StatsOverview nodes={nodes} />
      <LatencyChart nodes={nodes} /> 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {nodes.map((n) => (
          <NodeCard key={n.id} node={n} />
        ))}
      </div>
      <EventLog events={events} />
    </main>
  );
}
