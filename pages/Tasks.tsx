import React, { useState, useEffect, useRef } from 'react';
import { MOCK_TASKS } from '../constants';
import { Task } from '../types';
import { 
  Search, Plus, Terminal, Play, Save, 
  Trash2, Clock, Shield, Folder, 
  Settings as SettingsIcon, Code, 
  CheckCircle2, AlertCircle, Loader2, 
  XCircle, ChevronRight, ChevronDown,
  Maximize2, Minimize2
} from 'lucide-react';

export const Tasks: React.FC = () => {
  // Task Library State
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(MOCK_TASKS[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Editor State
  const [activeTask, setActiveTask] = useState<Task | null>(MOCK_TASKS[0] ? { ...MOCK_TASKS[0] } : null);
  const [isDirty, setIsDirty] = useState(false);
  const [activeTab, setActiveTab] = useState<'script' | 'settings'>('script');

  // Execution State
  const [executionStatus, setExecutionStatus] = useState<'idle' | 'running' | 'success' | 'failed'>('idle');
  const [outputLogs, setOutputLogs] = useState<string[]>([]);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Sync selection to editor
  useEffect(() => {
    const found = tasks.find(t => t.id === selectedTaskId);
    if (found) {
      setActiveTask({ ...found });
      setIsDirty(false);
      setExecutionStatus('idle');
      setOutputLogs([]);
    }
  }, [selectedTaskId]);

  // Scroll to bottom of terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [outputLogs, isTerminalOpen]);

  const filteredTasks = tasks.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = () => {
    if (!activeTask) return;
    
    setTasks(prev => {
      const exists = prev.find(t => t.id === activeTask.id);
      if (exists) {
        return prev.map(t => t.id === activeTask.id ? { ...activeTask, lastModified: new Date().toISOString().split('T')[0] } : t);
      }
      return [...prev, { ...activeTask, lastModified: new Date().toISOString().split('T')[0] }];
    });
    setIsDirty(false);
  };

  const handleCreate = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      name: 'Untitled Task',
      category: 'General',
      type: 'Task',
      lastModified: new Date().toISOString().split('T')[0],
      description: '',
      script: '#!/bin/bash\n# Enter your script here\n',
      runAsAdmin: false,
      timeout: 60
    };
    setTasks(prev => [...prev, newTask]);
    setSelectedTaskId(newTask.id);
    setActiveTab('settings'); // Focus settings for new task
  };

  const handleDelete = () => {
    if (!activeTask) return;
    const confirm = window.confirm(`Are you sure you want to delete "${activeTask.name}"?`);
    if (confirm) {
      const newTasks = tasks.filter(t => t.id !== activeTask.id);
      setTasks(newTasks);
      if (newTasks.length > 0) {
        setSelectedTaskId(newTasks[0].id);
      } else {
        setSelectedTaskId(null);
        setActiveTask(null);
      }
    }
  };

  const handleRun = () => {
    if (!activeTask) return;
    
    setExecutionStatus('running');
    setIsTerminalOpen(true);
    setOutputLogs([
      `[${new Date().toLocaleTimeString()}] Starting execution of "${activeTask.name}"...`,
      `[${new Date().toLocaleTimeString()}] Environment: macOS (x86_64)`,
      `[${new Date().toLocaleTimeString()}] User: admin`,
      `> Initializing secure shell...`
    ]);

    // Simulate execution process
    let steps = 0;
    const maxSteps = 4;
    const interval = setInterval(() => {
      steps++;
      
      if (steps === 1) {
        setOutputLogs(prev => [...prev, `> Checking permissions... OK`, `> Allocating resources...`]);
      } else if (steps === 2) {
        if (activeTask.runAsAdmin) {
           setOutputLogs(prev => [...prev, `> Sudo access granted.`, `> Executing payload...`]);
        } else {
           setOutputLogs(prev => [...prev, `> Executing payload...`]);
        }
      } else if (steps === 3) {
        // Simulate some script output
        const lines = activeTask.script?.split('\n').filter(l => l.trim().length > 0 && !l.startsWith('#')).slice(0, 3) || ['Running...'];
        const logs = lines.map(l => `STDOUT: ${l}`);
        setOutputLogs(prev => [...prev, ...logs]);
      } else if (steps === maxSteps) {
        clearInterval(interval);
        const isSuccess = Math.random() > 0.2; // 80% success rate for simulation
        
        if (isSuccess) {
          setExecutionStatus('success');
          setOutputLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Process exited with code 0`, `> Task completed successfully.`]);
        } else {
          setExecutionStatus('failed');
          setOutputLogs(prev => [...prev, `STDERR: Command failed with error: timeout`, `[${new Date().toLocaleTimeString()}] Process exited with code 1`]);
        }
      }
    }, 800);
  };

  const getStatusColor = () => {
    switch(executionStatus) {
      case 'running': return 'text-primary-400';
      case 'success': return 'text-green-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = () => {
    switch(executionStatus) {
      case 'running': return <Loader2 size={16} className="animate-spin" />;
      case 'success': return <CheckCircle2 size={16} />;
      case 'failed': return <XCircle size={16} />;
      default: return <Terminal size={16} />;
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex overflow-hidden animate-in fade-in duration-300">
      
      {/* Left Panel: Task List Library */}
      <div className="w-full md:w-80 border-r border-gray-800 flex flex-col bg-gray-950/50">
        <div className="p-4 border-b border-gray-800 flex flex-col gap-4">
          <div className="flex items-center justify-between">
             <h2 className="text-lg font-bold text-white flex items-center gap-2">
               <Folder size={18} className="text-primary-500" />
               Library
             </h2>
             <button 
               onClick={handleCreate}
               className="p-1.5 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
               title="Create New Task"
             >
               <Plus size={20} />
             </button>
          </div>
          <div className="relative">
             <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
             <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 text-sm rounded-lg pl-9 pr-4 py-2 text-gray-300 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none placeholder-gray-600" 
                placeholder="Search tasks..." 
             />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredTasks.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">
              No tasks found. Create one to get started.
            </div>
          ) : (
            filteredTasks.map(task => (
              <div 
                key={task.id}
                onClick={() => setSelectedTaskId(task.id)}
                className={`p-4 border-b border-gray-800/50 cursor-pointer hover:bg-gray-900/80 transition-all ${selectedTaskId === task.id ? 'bg-gray-900 border-l-2 border-l-primary-500 pl-[14px]' : 'border-l-2 border-l-transparent'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-medium truncate pr-2 ${selectedTaskId === task.id ? 'text-white' : 'text-gray-300'}`}>{task.name}</h3>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-500 whitespace-nowrap">{task.type}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center text-[10px] text-gray-400 bg-gray-800/50 px-2 py-0.5 rounded-full truncate max-w-[120px]">
                    {task.category}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Panel: Editor & Execution */}
      {activeTask ? (
        <div className="flex-1 flex flex-col bg-gray-950 relative min-w-0">
          
          {/* Header */}
          <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-gray-900/20 shrink-0">
            <div className="flex items-center gap-4 flex-1 min-w-0">
               <div className={`p-2 rounded-lg transition-colors ${executionStatus === 'running' ? 'bg-primary-500/10 text-primary-400' : 'bg-gray-800 text-gray-400'}`}>
                 {getStatusIcon()}
               </div>
               <div className="flex-1 min-w-0">
                 <input 
                    value={activeTask.name}
                    onChange={(e) => {
                      setActiveTask({...activeTask, name: e.target.value});
                      setIsDirty(true);
                    }}
                    className="bg-transparent text-sm font-bold text-white focus:outline-none focus:border-b border-gray-700 w-full"
                    placeholder="Task Name"
                 />
                 <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                    <span>Last edited: {activeTask.lastModified}</span>
                    {isDirty && <span className="text-yellow-500 font-medium">• Unsaved changes</span>}
                 </div>
               </div>
            </div>
            <div className="flex items-center gap-3 pl-4">
              {executionStatus === 'running' ? (
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-md bg-gray-900 border border-gray-700 text-primary-400 text-xs font-medium animate-pulse">
                   Running...
                </div>
              ) : (
                <button 
                  onClick={handleRun}
                  disabled={isDirty}
                  title={isDirty ? "Save changes before running" : "Run Task"}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-white text-xs font-bold transition-all shadow-lg ${isDirty ? 'bg-gray-800 cursor-not-allowed opacity-50' : 'bg-green-600 hover:bg-green-500 shadow-green-900/20'}`}
                >
                  <Play size={14} fill="currentColor" /> Run
                </button>
              )}
              
              <button 
                onClick={handleSave}
                disabled={!isDirty}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${isDirty ? 'bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-900/20' : 'bg-gray-800 text-gray-500'}`}
              >
                <Save size={14} /> Save
              </button>
              
              <div className="w-px h-6 bg-gray-800 mx-1"></div>
              
              <button 
                onClick={handleDelete}
                className="p-2 rounded-md hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors"
                title="Delete Task"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </header>

          {/* Tabs */}
          <div className="flex items-center px-6 border-b border-gray-800 bg-gray-900/10 shrink-0">
             <button 
               onClick={() => setActiveTab('script')}
               className={`px-4 py-3 text-xs font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'script' ? 'border-primary-500 text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
             >
               <Code size={14} /> Script
             </button>
             <button 
               onClick={() => setActiveTab('settings')}
               className={`px-4 py-3 text-xs font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'settings' ? 'border-primary-500 text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
             >
               <SettingsIcon size={14} /> Settings
             </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-hidden flex flex-col relative">
            {activeTab === 'script' ? (
              <div className="flex-1 bg-gray-900/30 p-1 relative overflow-hidden flex flex-col">
                 <textarea 
                    value={activeTask.script}
                    onChange={(e) => {
                      setActiveTask({...activeTask, script: e.target.value});
                      setIsDirty(true);
                    }}
                    className="flex-1 w-full bg-transparent p-6 text-sm font-mono text-gray-300 outline-none resize-none leading-relaxed selection:bg-primary-500/30"
                    spellCheck={false}
                 />
                 
                 {/* Terminal Panel (Collapsible) */}
                 <div className={`border-t border-gray-800 bg-gray-950 flex flex-col transition-all duration-300 ease-in-out ${isTerminalOpen ? 'h-64' : 'h-10'}`}>
                    <div 
                      className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800 cursor-pointer hover:bg-gray-800/80"
                      onClick={() => setIsTerminalOpen(!isTerminalOpen)}
                    >
                       <div className="flex items-center gap-2">
                          <Terminal size={14} className={getStatusColor()} />
                          <span className={`text-xs font-bold uppercase tracking-wider ${getStatusColor()}`}>
                             Console Output {executionStatus !== 'idle' && `• ${executionStatus}`}
                          </span>
                       </div>
                       <div className="flex items-center gap-2 text-gray-500">
                          {isTerminalOpen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                       </div>
                    </div>
                    
                    {isTerminalOpen && (
                      <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-1 bg-[#0B0F19]">
                         {outputLogs.length === 0 ? (
                           <span className="text-gray-600 italic">Ready to execute. Click Run to start.</span>
                         ) : (
                           outputLogs.map((log, i) => (
                             <div key={i} className={`${log.includes('STDERR') ? 'text-red-400' : log.includes('>') ? 'text-gray-300' : 'text-gray-500'} break-all`}>
                               {log}
                             </div>
                           ))
                         )}
                         <div ref={terminalEndRef} />
                      </div>
                    )}
                 </div>
              </div>
            ) : (
              <div className="flex-1 p-8 overflow-y-auto bg-gray-950">
                 <div className="max-w-2xl mx-auto space-y-8">
                    {/* Settings Form */}
                    <div className="space-y-6">
                        <div>
                           <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                           <textarea 
                              value={activeTask.description}
                              onChange={(e) => {
                                setActiveTask({...activeTask, description: e.target.value});
                                setIsDirty(true);
                              }}
                              className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-sm text-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none h-24 resize-none"
                              placeholder="Describe what this task does..."
                           />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                           <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                              <input 
                                 value={activeTask.category}
                                 onChange={(e) => {
                                   setActiveTask({...activeTask, category: e.target.value});
                                   setIsDirty(true);
                                 }}
                                 className="w-full bg-gray-900 border border-gray-800 rounded-lg p-2.5 text-sm text-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
                                 placeholder="e.g. Maintenance"
                              />
                           </div>
                           <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">Timeout (seconds)</label>
                              <div className="relative">
                                 <Clock size={16} className="absolute left-3 top-3 text-gray-500" />
                                 <input 
                                    type="number"
                                    value={activeTask.timeout}
                                    onChange={(e) => {
                                      setActiveTask({...activeTask, timeout: parseInt(e.target.value)});
                                      setIsDirty(true);
                                    }}
                                    className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-9 p-2.5 text-sm text-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
                                 />
                              </div>
                           </div>
                        </div>

                        <div className="pt-4 border-t border-gray-800">
                           <label className="flex items-start gap-3 p-4 rounded-lg bg-gray-900/50 border border-gray-800 cursor-pointer hover:bg-gray-900 transition-colors">
                              <input 
                                type="checkbox" 
                                checked={activeTask.runAsAdmin}
                                onChange={(e) => {
                                  setActiveTask({...activeTask, runAsAdmin: e.target.checked});
                                  setIsDirty(true);
                                }}
                                className="mt-1 rounded border-gray-700 bg-gray-800 text-primary-500 focus:ring-offset-gray-900" 
                              />
                              <div>
                                 <div className="flex items-center gap-2 text-sm font-medium text-gray-200">
                                    <Shield size={14} className="text-primary-500" />
                                    Run as Administrator
                                 </div>
                                 <p className="text-xs text-gray-500 mt-1">Executes with elevated privileges. Requires admin authentication before running.</p>
                              </div>
                           </label>
                        </div>
                    </div>
                 </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-500 bg-gray-950">
           <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center mb-4">
              <Terminal size={32} className="opacity-20" />
           </div>
           <h3 className="text-lg font-medium text-gray-300">No Task Selected</h3>
           <p className="max-w-xs text-center mt-2">Select a task from the library or create a new one to get started.</p>
           <button 
             onClick={handleCreate}
             className="mt-6 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg text-sm font-medium transition-colors"
           >
             Create New Task
           </button>
        </div>
      )}
    </div>
  );
};