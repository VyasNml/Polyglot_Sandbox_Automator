import React from 'react';
import { Box, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 p-1.5 rounded-md">
              <Box size={20} />
            </div>
            <div>
              <p className="font-semibold text-sm text-slate-900 dark:text-white">Polyglot Sandbox Automator</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Infrastructure & Execution Engine</p>
            </div>
          </div>

          <div className="flex space-x-6 text-sm font-medium text-slate-500 dark:text-slate-400">
            <Link to="/docs" className="hover:text-slate-900 dark:hover:text-white transition-colors">Documentation</Link>
            <Link to="/about" className="hover:text-slate-900 dark:hover:text-white transition-colors">About Project</Link>
            <a href="#" className="flex items-center hover:text-slate-900 dark:hover:text-white transition-colors">
              <Code2 size={16} className="mr-1.5" />
              Source
            </a>
          </div>
          
        </div>
        
        <div className="mt-8 border-t border-slate-100 dark:border-slate-800/50 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 dark:text-slate-500">
          <p>© {new Date().getFullYear()} Polyglot Sandbox Automator. Open Source.</p>
          <p className="mt-2 md:mt-0">Built with React, Vite, and Tailwind.</p>
        </div>
      </div>
    </footer>
  );
};
