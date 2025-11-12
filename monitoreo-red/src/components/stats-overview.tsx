import { NetworkNode } from "@/lib/types";

export default function StatsOverview({ nodes }: { nodes: NetworkNode[] }) {
  const activos = nodes.filter((n) => n.state === "online").length;
  const promedioLatencia =
    nodes.reduce((a, b) => a + b.latency, 0) / nodes.length;
  const totalConexiones = nodes.reduce((a, b) => a + b.connections, 0);

  return (
    <div className="p-4 bg-gray-800 rounded-xl">
      <h2 className="text-lg font-bold mb-2">Estadísticas</h2>
      <p>Nodos activos: {activos}</p>
      <p>Promedio de latencia: {promedioLatencia.toFixed(1)} ms</p>
      <p>Total de conexiones: {totalConexiones}</p>
    </div>
  );
}
