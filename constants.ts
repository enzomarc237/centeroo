import { Device, DeviceStatus, Task, LogEntry } from './types';
import { Laptop, Smartphone, Tablet, Monitor, Server } from 'lucide-react';

export const MOCK_DEVICES: Device[] = [
  { id: '1', name: "John's MacBook Pro", type: 'macOS', status: DeviceStatus.Active, lastSeen: 'Now', cpuUsage: 45, ramUsage: 70, ip: '192.168.1.105' },
  { id: '2', name: "Design Team iMac", type: 'macOS', status: DeviceStatus.Offline, lastSeen: '15 mins ago', ip: '192.168.1.112' },
  { id: '3', name: "Jane's Pixel 8", type: 'Android', status: DeviceStatus.Active, lastSeen: '2 hours ago', ip: '192.168.1.140' },
  { id: '4', name: "Work iPad Pro", type: 'iPad', status: DeviceStatus.Pending, lastSeen: '1 day ago', ip: '192.168.1.155' },
  { id: '5', name: "Admin Linux Server", type: 'Linux', status: DeviceStatus.Active, lastSeen: 'Now', cpuUsage: 12, ramUsage: 34, ip: '10.0.0.5' },
];

export const MOCK_TASKS: Task[] = [
  { 
    id: '1', 
    name: 'Update Homebrew Packages', 
    category: 'System Maintenance', 
    type: 'Task', 
    lastModified: '2024-07-22',
    description: 'Updates all homebrew packages and cleans up old versions.',
    script: `#!/bin/bash\necho "Updating Homebrew..."\nbrew update && brew upgrade\necho "Cleanup..."\nbrew cleanup\necho "Done."`,
    runAsAdmin: false,
    timeout: 300
  },
  { 
    id: '2', 
    name: 'Clear System Cache', 
    category: 'System Maintenance', 
    type: 'Command', 
    lastModified: '2024-07-21',
    description: 'Clears system and user caches to free up space.',
    script: `sudo rm -rf /Library/Caches/*\nsudo rm -rf ~/Library/Caches/*`,
    runAsAdmin: true,
    timeout: 60
  },
  { 
    id: '3', 
    name: 'Restart Nginx Service', 
    category: 'Deployments', 
    type: 'Task', 
    lastModified: '2024-07-20',
    description: 'Restarts the web server gracefully.',
    script: `sudo systemctl reload nginx`,
    runAsAdmin: true,
    timeout: 30
  },
];

export const MOCK_LOGS: LogEntry[] = [
  { id: '1', command: 'sudo restart-service nginx', device: 'MacBook-Pro-Admin', user: 'john.doe@company.com', timestamp: '2023-10-27 14:32:05', status: 'Success' },
  { id: '2', command: 'run-cleanup-script.sh', device: 'iMac-Dev', user: 'jane.doe@company.com', timestamp: '2023-10-27 14:31:50', status: 'Failed' },
  { id: '3', command: 'update-software --all', device: 'Mac-Mini-Server', user: 'john.doe@company.com', timestamp: '2023-10-27 14:29:11', status: 'Success' },
  { id: '4', command: 'deploy-app-staging', device: 'MacBook-Pro-Admin', user: 'admin.user@company.com', timestamp: '2023-10-27 14:25:03', status: 'In Progress' },
];

export const DEVICE_ICONS: Record<string, any> = {
  'iPhone': Smartphone,
  'Android': Smartphone,
  'iPad': Tablet,
  'macOS': Laptop,
  'Windows': Monitor,
  'Linux': Server,
};
