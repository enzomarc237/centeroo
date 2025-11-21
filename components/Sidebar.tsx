import React from 'react';
import { View } from '../types';
import { LayoutDashboard, Smartphone, Terminal, FileClock, Settings, HelpCircle, LogOut } from 'lucide-react';

interface SidebarProps {
  currentView: View;
  onChangeView: (view: View) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  
  const navItems = [
    { id: View.Dashboard, label: 'Dashboard', icon: LayoutDashboard },
    { id: View.Devices, label: 'Authorized Devices', icon: Smartphone },
    { id: View.Tasks, label: 'Automation Tasks', icon: Terminal },
    { id: View.History, label: 'Command History', icon: FileClock },
    { id: View.Settings, label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-950 border-r border-gray-800 flex flex-col flex-shrink-0 transition-all duration-300 sticky top-0">
      
      {/* Logo Area */}
      <div className="p-6 flex items-center gap-3 border-b border-gray-900">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-blue-700 flex items-center justify-center shadow-lg shadow-primary-900/20">
          <Terminal className="text-white" size={20} />
        </div>
        <div>
          <h1 className="text-sm font-bold text-white tracking-wide">Command Center</h1>
          <p className="text-xs text-gray-500 font-medium">Admin Control</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
           const isActive = currentView === item.id;
           const Icon = item.icon;
           return (
             <button
               key={item.id}
               onClick={() => onChangeView(item.id)}
               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                 isActive 
                   ? 'bg-primary-600/10 text-primary-400 shadow-inner shadow-primary-900/10' 
                   : 'text-gray-400 hover:bg-gray-900 hover:text-gray-200'
               }`}
             >
               <Icon size={20} className={`transition-colors ${isActive ? 'text-primary-400' : 'text-gray-500 group-hover:text-gray-300'}`} />
               {item.label}
             </button>
           );
        })}
      </nav>

      {/* User Profile / Footer */}
      <div className="p-4 border-t border-gray-900">
         <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-900/50 hover:bg-gray-900 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
               <span className="text-sm font-bold text-white">JD</span>
            </div>
            <div className="flex-1 min-w-0">
               <p className="text-sm font-medium text-white truncate">John Doe</p>
               <p className="text-xs text-gray-500 truncate">SysAdmin</p>
            </div>
            <LogOut size={16} className="text-gray-500 group-hover:text-red-400 transition-colors" />
         </div>
      </div>
    </aside>
  );
};
