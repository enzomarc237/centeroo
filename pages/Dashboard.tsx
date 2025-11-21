import React from 'react';
import { MOCK_DEVICES, DEVICE_ICONS } from '../constants';
import { DeviceStatus } from '../types';
import { StatBar } from '../components/StatBar';
import { Activity, Wifi, WifiOff, Play, Lock, Trash2, RefreshCw, ShieldCheck } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const connectedDevices = MOCK_DEVICES.slice(0, 2); // Just showing top 2 for the cards

  return (
    <div className="space-y-8 p-2 md:p-4 animate-in fade-in duration-500">
      {/* Welcome / Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
        <p className="text-gray-400">Overview of connected devices and system health.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Connected Devices Cards */}
          <section>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Wifi className="w-5 h-5 text-primary-500" />
              Connected Devices
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {connectedDevices.map((device) => {
                const Icon = DEVICE_ICONS[device.type];
                const isOnline = device.status === DeviceStatus.Active;
                
                return (
                  <div key={device.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col gap-5 shadow-lg hover:border-gray-700 transition-colors group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isOnline ? 'bg-primary-500/20 text-primary-400' : 'bg-gray-800 text-gray-500'}`}>
                          <Icon size={20} />
                        </div>
                        <h3 className="font-medium text-white truncate max-w-[120px] sm:max-w-[160px]">{device.name}</h3>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                         <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`} />
                         <span className={isOnline ? 'text-green-400' : 'text-gray-500'}>{isOnline ? 'Online' : 'Offline'}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <StatBar label="CPU" value={device.cpuUsage} colorClass="bg-primary-500" />
                      <StatBar label="RAM" value={device.ramUsage} colorClass="bg-yellow-500" />
                    </div>

                    <button className="w-full mt-auto py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm font-medium text-gray-300 transition-colors border border-transparent hover:border-gray-600">
                      Manage Device
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Activity Feed */}
          <section>
             <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary-500" />
              Recent Activity
            </h2>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-1 overflow-hidden">
              {[
                { msg: "'Run Cleanup Script' executed on MacBook-Pro-John", time: "2 min ago", status: "success", icon: ShieldCheck },
                { msg: "iMac-Design-Team disconnected", time: "15 min ago", status: "error", icon: WifiOff },
                { msg: "New device 'iPad Pro' connected", time: "1 hour ago", status: "info", icon: Wifi },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 hover:bg-gray-800/50 transition-colors rounded-lg group">
                   <div className={`p-2 rounded-full shrink-0 ${
                     item.status === 'success' ? 'bg-green-500/10 text-green-400' : 
                     item.status === 'error' ? 'bg-red-500/10 text-red-400' : 
                     'bg-blue-500/10 text-blue-400'
                   }`}>
                     <item.icon size={18} />
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-sm text-gray-200 font-medium truncate">{item.msg}</p>
                     <p className="text-xs text-gray-500">{item.time}</p>
                   </div>
                   <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-gray-400 hover:text-white"><span className="sr-only">Details</span>→</button>
                   </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Side Column - Quick Actions */}
        <div className="space-y-8">
           <section>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Play className="w-5 h-5 text-primary-500" />
              Quick Commands
            </h2>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-2 space-y-1">
              {[
                { name: "Check for Updates", icon: RefreshCw },
                { name: "Lock All Screens", icon: Lock },
                { name: "Clear System Cache", icon: Trash2 },
                { name: "Restart Services", icon: Activity },
              ].map((cmd, idx) => (
                <button key={idx} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors text-left group">
                  <span className="text-gray-500 group-hover:text-primary-400 transition-colors">
                    <cmd.icon size={20} />
                  </span>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white">{cmd.name}</span>
                </button>
              ))}
            </div>
          </section>
          
          {/* Mini Status */}
          <div className="bg-gradient-to-br from-primary-900/50 to-gray-900 border border-primary-900/30 rounded-xl p-6">
            <h3 className="text-primary-100 font-semibold mb-2">System Status</h3>
            <div className="flex items-end gap-2 mb-1">
              <span className="text-4xl font-bold text-white">98%</span>
              <span className="text-primary-300 mb-1">Uptime</span>
            </div>
            <p className="text-xs text-primary-200/60">Last reboot: 14 days ago</p>
          </div>
        </div>

      </div>
    </div>
  );
};
