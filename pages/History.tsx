import React from 'react';
import { MOCK_LOGS } from '../constants';
import { Badge } from '../components/Badge';
import { Download, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

export const History: React.FC = () => {
  return (
    <div className="p-2 md:p-8 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Command History</h1>
            <p className="text-gray-400 mt-1">Audit log of all remotely triggered commands and system tasks.</p>
          </div>
          <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Download size={18} />
            Export CSV
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
             <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
             <input 
                type="text"
                placeholder="Search by command, user, or device..."
                className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-gray-200 placeholder-gray-600 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none"
             />
          </div>
          <div className="flex gap-3">
            {['Device', 'Status', 'Date Range'].map((filter) => (
              <button key={filter} className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-300 hover:bg-gray-800 transition-colors">
                {filter}
                <Filter size={14} className="text-gray-500" />
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-sm">
           <div className="overflow-x-auto">
             <table className="min-w-full divide-y divide-gray-800">
               <thead className="bg-gray-950/50">
                 <tr>
                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Command</th>
                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Device</th>
                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">User</th>
                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Timestamp</th>
                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-800">
                 {MOCK_LOGS.map((log) => (
                   <tr key={log.id} className="hover:bg-gray-800/30 transition-colors">
                     <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-primary-300">{log.command}</td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{log.device}</td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{log.user}</td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td>
                     <td className="px-6 py-4 whitespace-nowrap">
                       <Badge status={log.status} />
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
           {/* Pagination Footer */}
           <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between">
             <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-white disabled:opacity-50" disabled>
               <ChevronLeft size={16} /> Previous
             </button>
             <span className="text-sm text-gray-500">Page 1 of 10</span>
             <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-white">
               Next <ChevronRight size={16} />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};
