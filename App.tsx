import React, { useState } from 'react';
import { View } from './types';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Devices } from './pages/Devices';
import { Tasks } from './pages/Tasks';
import { History } from './pages/History';
import { Settings } from './pages/Settings';
import { Menu } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<View>(View.Dashboard);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case View.Dashboard: return <Dashboard />;
      case View.Devices: return <Devices />;
      case View.Tasks: return <Tasks />;
      case View.History: return <History />;
      case View.Settings: return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-950 text-gray-100 overflow-hidden font-sans">
      
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static z-50 h-full transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <Sidebar currentView={currentView} onChangeView={(view) => {
          setCurrentView(view);
          setIsMobileMenuOpen(false);
        }} />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-gray-950 relative">
         {/* Mobile Header */}
         <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-900 bg-gray-950/80 backdrop-blur-md sticky top-0 z-30">
            <div className="flex items-center gap-3">
               <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 rounded-lg bg-gray-900 text-gray-400">
                  <Menu size={20} />
               </button>
               <span className="font-bold text-white">Command Center</span>
            </div>
         </div>

         <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
           <div className="p-4 lg:p-0 max-w-[1600px] mx-auto h-full">
             {renderContent()}
           </div>
         </div>
      </main>
    </div>
  );
}
