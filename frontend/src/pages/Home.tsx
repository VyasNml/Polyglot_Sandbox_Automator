import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { FeatureCard } from '../components/ui/FeatureCard';
import { TerminalView } from '../components/ui/TerminalView';
import { Shield, Cpu, Clock, Container, Activity, Server, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full flex flex-col items-start border-b border-slate-200 dark:border-slate-800/50">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
            POLYGLOT SANDBOX AUTOMATOR
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-2xl">
            A production-grade backend infrastructure platform for executing arbitrary code across multiple programming languages inside isolated, ephemeral Docker containers.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => navigate('/demo')} size="lg" className="space-x-2">
              <span>Try Demo</span>
              <ArrowRight size={18} />
            </Button>
            <Button onClick={scrollToFeatures} variant="outline" size="lg">
              Read More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Core Capabilities</h2>
          <p className="text-slate-500 dark:text-slate-400">Engineering-focused features designed for secure and reliable code execution.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            title="Secure Container Isolation" 
            description="Executes untrusted code within isolated Docker containers acting as sandboxes, preventing host system compromise."
            icon={Shield}
          />
          <FeatureCard 
            title="Resource Limiting" 
            description="Strictly enforces CPU and memory limits on active containers to prevent resource exhaustion and noisy-neighbor scenarios."
            icon={Cpu}
          />
          <FeatureCard 
            title="Timeout Protection" 
            description="Automatically terminates execution and cleans up containers if code runs beyond configured time constraints."
            icon={Clock}
          />
          <FeatureCard 
            title="Automated Container Lifecycle" 
            description="Manages the complete lifecycle from ephemeral container creation, code execution, to immediate teardown."
            icon={Container}
          />
          <FeatureCard 
            title="Real-Time Execution Monitoring" 
            description="Captures stdout and stderr streams asynchronously, providing granular visibility into runtime behavior."
            icon={Activity}
          />
          <FeatureCard 
            title="Backend Sandbox Orchestration" 
            description="Robust TypeScript-based scheduling system managing the Docker socket and queuing concurrent execution requests."
            icon={Server}
          />
        </div>
      </section>

      {/* Working CTA Section */}
      <section className="bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Understand the Pipeline</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Explore the step-by-step execution pipeline, from the moment an API request is received to container creation, execution handling, and cleanup lifecycle.
            </p>
            <Button onClick={() => navigate('/working')} variant="secondary">
              Explore Working
            </Button>
          </div>
          <div className="lg:w-1/2 w-full">
            <TerminalView 
              title="Execution Flow Snapshot"
              language="bash"
              content={`> Initializing Request [ID: req_a1b2c3]
> Validating payload (Language: Python)
> Spawning ephemeral container (Image: python:3.9-slim)
> Applying limits: --cpus=0.5 --memory=256m
> Executing...
> Capturing stdout/stderr...
> Execution completed (Exit Code: 0)
> Destroying container...
> Pipeline success.`}
            />
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-10">Technology Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          <TechGroup title="Backend" items={['TypeScript', 'Node.js', 'Express.js']} />
          <TechGroup title="Infrastructure" items={['Docker', 'Docker Compose', 'Redis']} />
          <TechGroup title="Runtimes" items={['Python', 'Node.js']} />
          <TechGroup title="Frontend" items={['React', 'Tailwind CSS', 'Vite']} />
          <TechGroup title="DevOps" items={['Git', 'GitHub', 'Bash']} />
        </div>
      </section>
    </div>
  );
};

const TechGroup: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <div className="flex flex-col">
    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
      {title}
    </h3>
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <li key={idx} className="text-slate-600 dark:text-slate-400 text-sm flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mr-2"></span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default Home;
