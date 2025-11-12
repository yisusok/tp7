import { NetworkNode, NetworkEvent } from "./types";

let subscribers: ((event: NetworkEvent) => void)[] = [];

export function subscribe(callback: (event: NetworkEvent) => void) {
  subscribers.push(callback);
}

export function startKafkaSimulation(nodes: NetworkNode[]) {
  setInterval(() => {
    const node = nodes[Math.floor(Math.random() * nodes.length)];
    const typeOptions = ["NODE_STATUS_CHANGE", "LATENCY_UPDATE", "CONNECTION_CHANGE"];
    const type = typeOptions[Math.floor(Math.random() * typeOptions.length)];

    let data: any = {};

    if (type === "NODE_STATUS_CHANGE") {
      const states = ["online", "degraded", "offline"];
      node.state = states[Math.floor(Math.random() * states.length)] as any;
      data = { newState: node.state };
    } else if (type === "LATENCY_UPDATE") {
      node.latency = Math.floor(Math.random() * 450) + 50;
      data = { latency: node.latency };
    } else if (type === "CONNECTION_CHANGE") {
      node.connections = Math.floor(Math.random() * 200);
      data = { connections: node.connections };
    }

    node.lastUpdate = Date.now();

    const event: NetworkEvent = {
      type,
      timestamp: Date.now(),
      nodeId: node.id,
      data,
    };

    subscribers.forEach((cb) => cb(event));
  }, Math.random() * 2000 + 1000);
}
