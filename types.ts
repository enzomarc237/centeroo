export enum DeviceStatus {
  Active = 'Active',
  Pending = 'Pending',
  Revoked = 'Revoked',
  Offline = 'Offline'
}

export interface Device {
  id: string;
  name: string;
  type: 'iPhone' | 'Android' | 'iPad' | 'macOS' | 'Windows' | 'Linux';
  status: DeviceStatus;
  lastSeen: string;
  cpuUsage?: number;
  ramUsage?: number;
  ip: string;
}

export interface Task {
  id: string;
  name: string;
  category: string;
  type: 'Task' | 'Command';
  lastModified: string;
  description?: string;
  script?: string;
  runAsAdmin?: boolean;
  timeout?: number;
}

export interface LogEntry {
  id: string;
  command: string;
  device: string;
  user: string;
  timestamp: string;
  status: 'Success' | 'Failed' | 'In Progress';
}

export enum View {
  Dashboard = 'dashboard',
  Devices = 'devices',
  Tasks = 'tasks',
  History = 'history',
  Settings = 'settings'
}