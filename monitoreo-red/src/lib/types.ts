export type NodeState = "online" | "offline" | "degraded";

export interface NetworkNode {
  id: string;
  name: string;
  state: NodeState;
  latency: number;
  connections: number;
  lastUpdate: number;
}

export type EventType =
  | "NODE_STATUS_CHANGE"
  | "LATENCY_UPDATE"
  | "CONNECTION_CHANGE"
  | "ALARM";

export interface NetworkEvent {
  type: EventType;
  timestamp: number;
  nodeId: string;
  data: any;
}
