import { NetworkEvent } from "@/lib/types";

export default function EventLog({ events }: { events: NetworkEvent[] }) {
  return (
    <div className="p-4 bg-gray-800 rounded-xl h-64 overflow-y-auto">
      <h2 className="text-lg font-bold mb-2">Registro de eventos</h2>
      <ul className="space-y-1 text-sm">
        {events.map((e, i) => (
          <li key={i} className="border-b border-gray-700 pb-1">
            [{new Date(e.timestamp).toLocaleTimeString()}]{" "}
            <strong>{e.type}</strong> (Nodo {e.nodeId})
          </li>
        ))}
      </ul>
    </div>
  );
}
