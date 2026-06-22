import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Code2, Sun, Moon, Menu, X, Box } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Initial check for theme
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme);
    localStorage.setItem('theme', nextTheme ? 'dark' : 'light');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Demo', path: '/demo' },
    { name: 'Working', path: '/working' },
    { name: 'Docs / Learnings', path: '/docs' },
    { name: 'About Project', path: '/about' },
  ];

  return (
    <nav className="fixed top-0 w-full h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-primary text-white p-1.5 rounded-md flex items-center justify-center group-hover:bg-primary-dark transition-colors">
              <Box size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white leading-none">
                PSA
              </span>
              <span className="text-[0.65rem] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider leading-none mt-1 hidden sm:block">
                Polyglot Sandbox Automator
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "text-primary dark:text-primary bg-slate-50 dark:bg-slate-900" 
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900/50"
                )
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <Button variant="outline" size="sm" className="space-x-2 hidden lg:flex">
            <Code2 size={16} />
            <span>Source</span>
          </Button>
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    isActive 
                      ? "text-primary dark:text-primary bg-slate-50 dark:bg-slate-900" 
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900/50"
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="flex items-center justify-between px-3 py-4 border-t border-slate-100 dark:border-slate-800 mt-2">
              <Button variant="outline" size="sm" className="space-x-2 w-full justify-center">
                <Code2 size={16} />
                <span>Source</span>
              </Button>
              <button 
                onClick={toggleTheme}
                className="p-2 ml-4 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
