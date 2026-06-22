import React from 'react';
import { cn } from '../../lib/utils';
import { Terminal } from 'lucide-react';

interface TerminalViewProps {
  title?: string;
  language?: string;
  content: string | React.ReactNode;
  className?: string;
}

export const TerminalView: React.FC<TerminalViewProps> = ({ 
  title, 
  language, 
  content, 
  className 
}) => {
  return (
    <div className={cn("rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1117] shadow-sm", className)}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
        <div className="flex items-center space-x-2">
          <Terminal size={14} className="text-slate-500" />
          <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
            {title || 'Terminal'}
          </span>
        </div>
        {language && (
          <span className="text-xs font-mono text-slate-500 dark:text-slate-500">
            {language}
          </span>
        )}
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-sm leading-relaxed text-slate-800 dark:text-slate-300">
          <code>{content}</code>
        </pre>
      </div>
    </div>
  );
};
