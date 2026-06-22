import React, { useState } from 'react';
import { Play, Settings2, Code2, Terminal, Activity } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { cn } from '../lib/utils';

const Demo: React.FC = () => {
  const [language, setLanguage] = useState<'python' | 'cpp' | 'java'>('python');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string>('>>');
  const [processLog, setProcessLog] = useState<string>('Awaiting execution request...');
  
  const [code, setCode] = useState(
    `def calculate_sum(a, b): # Add two numbers\n    return a + b\n\nresult = calculate_sum(5, 7)\nprint(f"The sum is: {result}")\n\ndef main():\n    print("Running sandbox...")\n    print(f"Result: {result}")\n\nif __name__ == "__main__":\n    main()`
  );

  const handleRun = () => {
    if (isRunning) return;
    setIsRunning(true);
    setOutput('>>');
    
    // Simulate execution flow
    setProcessLog('> Connecting to Docker daemon...\n> Allocating isolated container [psa-runner-1a2b]...');
    
    setTimeout(() => {
      setProcessLog(prev => prev + '\n> Container ready. Injecting payload...\n> Executing...');
    }, 800);

    setTimeout(() => {
      setProcessLog(prev => prev + '\n> Execution finished.\n> Extracting stdout/stderr...\n> Tearing down container...');
      setOutput('>> Running sandbox...\n>> Result: 12\n>> The sum is: 12');
    }, 1800);

    setTimeout(() => {
      setProcessLog(prev => prev + '\n> Container destroyed. Lifecycle complete.');
      setIsRunning(false);
    }, 2400);
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)] w-full bg-slate-50 dark:bg-[#0b0f19]">
      
      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col p-4 md:p-6 space-y-4 overflow-y-auto">
        
        {/* Editor Block */}
        <div className="flex-1 flex flex-col rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm min-h-[300px]">
          <div className="flex items-center px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <Code2 size={16} className="text-slate-500 mr-2" />
            <span className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">Sandbox Editor</span>
            <span className="ml-3 px-2 py-0.5 rounded text-[10px] font-mono bg-primary/10 text-primary-dark dark:text-primary border border-primary/20">
              {language === 'python' ? 'Python' : language === 'cpp' ? 'C++' : 'Java'}
            </span>
          </div>
          <div className="flex-1 p-4 relative">
            <textarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="w-full h-full resize-none outline-none font-mono text-sm leading-relaxed text-slate-800 dark:text-slate-300 bg-transparent placeholder-slate-400"
            />
          </div>
        </div>

        {/* Output & Logs Row */}
        <div className="h-64 flex flex-col lg:flex-row gap-4">
          <div className="flex-1 flex flex-col rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
            <div className="flex items-center px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <Terminal size={14} className="text-slate-500 mr-2" />
              <span className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">Execution Output</span>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <pre className="font-mono text-xs md:text-sm text-primary-dark dark:text-primary whitespace-pre-wrap">
                {output}
              </pre>
            </div>
            <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800/50 text-[10px] font-mono text-slate-400 flex space-x-4">
              <span>Status: {isRunning ? <span className="text-amber-500">RUNNING</span> : <span className="text-green-500">READY</span>}</span>
              <span>Time: {isRunning ? '-' : '142ms'}</span>
              <span>Memory: {isRunning ? '-' : '12MB'}</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
            <div className="flex items-center px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <Activity size={14} className="text-slate-500 mr-2" />
              <span className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">Backend Process Log</span>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <pre className="font-mono text-xs text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                {processLog}
              </pre>
            </div>
          </div>
        </div>

      </div>

      {/* Sidebar Controls */}
      <div className="w-full md:w-64 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 flex flex-col">
        <div className="flex items-center mb-6">
          <Settings2 size={16} className="text-slate-500 mr-2" />
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Language Settings</h3>
        </div>

        <div className="space-y-2 mb-auto">
          {['python', 'cpp', 'java'].map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang as any)}
              className={cn(
                "w-full flex items-center px-3 py-2.5 rounded-md text-sm transition-colors",
                language === lang 
                  ? 'bg-primary/10 text-primary-dark dark:text-primary font-medium border border-primary/20' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent'
              )}
            >
              <span className="capitalize">{lang === 'cpp' ? 'C++' : lang}</span>
            </button>
          ))}
        </div>

        <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-4">
          <Button 
            onClick={handleRun} 
            disabled={isRunning}
            className="w-full space-x-2 shadow-md"
          >
            <Play size={16} fill="currentColor" />
            <span>{isRunning ? 'Executing...' : 'Run Code'}</span>
          </Button>

          <div className="p-3 rounded-md bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 text-amber-800 dark:text-amber-500/80 text-xs text-center flex items-center justify-center space-x-2">
            <span>Demo mode — simulated execution</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Demo;
