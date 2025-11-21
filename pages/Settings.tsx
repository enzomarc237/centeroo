import React, { useState } from 'react';
import { Monitor, Moon, Bell, FileText, Shield, RotateCcw, Save } from 'lucide-react';

export const Settings: React.FC = () => {
  const [isDirty, setIsDirty] = useState(true); // Simulating unsaved changes for the demo

  return (
    <div className="p-2 md:p-8 relative min-h-full animate-in fade-in duration-300">
      <div className="max-w-3xl mx-auto space-y-8 pb-20">
         <header>
            <h1 className="text-3xl font-bold text-white">General Settings</h1>
            <p className="text-gray-400 mt-2">Configure application appearance, behavior, and system preferences.</p>
         </header>

         <section>
            <h2 className="text-xl font-semibold text-white mb-4 px-1">Appearance</h2>
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden divide-y divide-gray-800">
               <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="p-2 bg-gray-800 rounded-lg text-gray-400">
                        <Monitor size={24} />
                     </div>
                     <span className="text-gray-200 font-medium">Theme</span>
                  </div>
                  <select className="bg-gray-950 border border-gray-700 text-gray-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5">
                     <option>System</option>
                     <option>Dark</option>
                     <option>Light</option>
                  </select>
               </div>
            </div>
         </section>

         <section>
            <h2 className="text-xl font-semibold text-white mb-4 px-1">Behavior</h2>
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden divide-y divide-gray-800">
               <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="p-2 bg-gray-800 rounded-lg text-gray-400">
                        <RotateCcw size={24} />
                     </div>
                     <div>
                        <span className="block text-gray-200 font-medium">Launch on Startup</span>
                        <span className="block text-sm text-gray-500">Automatically start Command Center when you log in.</span>
                     </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                     <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                     <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
               </div>

               <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="p-2 bg-gray-800 rounded-lg text-gray-400">
                        <Bell size={24} />
                     </div>
                     <div>
                        <span className="block text-gray-200 font-medium">Enable Notifications</span>
                        <span className="block text-sm text-gray-500">Receive system notifications for important events.</span>
                     </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                     <input type="checkbox" value="" className="sr-only peer" />
                     <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
               </div>

               <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="p-2 bg-gray-800 rounded-lg text-gray-400">
                        <FileText size={24} />
                     </div>
                     <span className="text-gray-200 font-medium">Log Level</span>
                  </div>
                  <select className="bg-gray-950 border border-gray-700 text-gray-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 w-32">
                     <option>Info</option>
                     <option>Debug</option>
                     <option>Warn</option>
                     <option>Error</option>
                  </select>
               </div>
            </div>
         </section>
         
         <section>
            <h2 className="text-xl font-semibold text-white mb-4 px-1">Security</h2>
             <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden divide-y divide-gray-800">
               <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="p-2 bg-gray-800 rounded-lg text-gray-400">
                        <Shield size={24} />
                     </div>
                     <div>
                        <span className="block text-gray-200 font-medium">Require Admin Approval</span>
                        <span className="block text-sm text-gray-500">All new devices must be manually approved.</span>
                     </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                     <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                     <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
               </div>
             </div>
         </section>
      </div>

      {/* Sticky Footer for Unsaved Changes */}
      {isDirty && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4 z-50">
          <div className="bg-gray-800/90 backdrop-blur-md border border-gray-700 shadow-2xl rounded-xl p-4 flex items-center justify-between animate-in slide-in-from-bottom-5 fade-in">
            <p className="text-gray-300 text-sm font-medium">You have unsaved changes.</p>
            <div className="flex gap-3">
               <button 
                 onClick={() => setIsDirty(false)}
                 className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
               >
                 Reset
               </button>
               <button 
                 onClick={() => setIsDirty(false)}
                 className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-500 rounded-lg shadow-lg shadow-primary-900/20 transition-colors"
               >
                 <Save size={16} />
                 Save Changes
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
