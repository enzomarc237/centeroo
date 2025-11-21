import React from 'react';
import { MOCK_DEVICES, DEVICE_ICONS } from '../constants';
import { Badge } from '../components/Badge';
import { Search, Plus, MoreVertical, Settings as SettingsIcon, Trash } from 'lucide-react';

export const Devices: React.FC = () => {
  return (
    <div className="p-2 md:p-4 h-full flex flex-col animate-in fade-in duration-300">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Authorized Devices</h1>
          <p className="text-gray-400 text-sm mt-1">Manage mobile devices authorized to send commands.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-primary-900/20">
          <Plus size={18} />
          Add Device
        </button>
      </header>

      {/* Search Toolbar */}
      <div className="mb-6 relative">
         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
         </div>
         <input 
            type="text" 
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-800 rounded-lg leading-5 bg-gray-900 text-gray-300 placeholder-gray-600 focus:outline-none focus:bg-gray-950 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 sm:text-sm transition-colors"
            placeholder="Find a device by name, IP, or type..."
         />
      </div>

      {/* Table Container */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden flex-1 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-gray-950/50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Device Name</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Last Seen</th>
                <th scope="col" className="relative px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 bg-transparent">
              {MOCK_DEVICES.map((device) => {
                const Icon = DEVICE_ICONS[device.type];
                return (
                  <tr key={device.id} className="hover:bg-gray-800/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-gray-800 text-gray-400">
                          <Icon size={20} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{device.name}</div>
                          <div className="text-xs text-gray-500">{device.ip}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{device.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge status={device.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {device.lastSeen}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-primary-400 hover:text-primary-300 transition-colors" title="Configure">
                          <SettingsIcon size={18} />
                        </button>
                        <div className="w-px h-4 bg-gray-700"></div>
                        <button className="text-red-400 hover:text-red-300 transition-colors" title="Remove">
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
