import React from 'react';
import { TerminalView } from '../components/ui/TerminalView';
import { Server, ArrowRight, Shield, Database } from 'lucide-react';

const Working: React.FC = () => {
  return (
    <div className="flex flex-col w-full pb-20">
      
      {/* Top Architecture Overview Section */}
      <section className="bg-slate-50 dark:bg-slate-900/30 border-b border-slate-200 dark:border-slate-800 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-12 items-start">
          
          <div className="xl:w-1/3 flex flex-col space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">System Architecture</h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                The Polyglot Sandbox Automator isolates every execution request within an ephemeral Docker container. Requests are queued, rate-limited, and processed asynchronously via a custom orchestration engine built over the Docker socket.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
                <Shield className="text-primary mt-0.5" size={18} />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Security Model</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Containers run as non-root users with strict CPU and memory limits. Network access is disabled by default.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
                <Database className="text-primary mt-0.5" size={18} />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Queueing System</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Incoming execution payloads are pushed to a Redis queue, protecting the Docker daemon from spike overloads.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:w-2/3 w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-6">Request Lifecycle Diagram</h3>
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 text-sm">
              
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                  API
                </div>
                <span className="mt-2 text-slate-600 dark:text-slate-400 font-mono text-xs">POST /execute</span>
              </div>
              
              <ArrowRight className="hidden md:block text-slate-300 dark:text-slate-700" />
              
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-lg border-2 border-primary/50 flex items-center justify-center bg-primary/5 text-primary">
                  <Server size={24} />
                </div>
                <span className="mt-2 text-slate-600 dark:text-slate-400 font-mono text-xs">Node.js Engine</span>
              </div>

              <ArrowRight className="hidden md:block text-slate-300 dark:text-slate-700" />
              
              <div className="flex flex-col space-y-3 w-full md:w-auto">
                <div className="border border-slate-200 dark:border-slate-700 rounded p-3 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
                  <span className="font-mono text-xs text-slate-600 dark:text-slate-300">Container [Py]</span>
                  <span className="text-[10px] bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-1.5 py-0.5 rounded">Alive</span>
                </div>
                <div className="border border-slate-200 dark:border-slate-700 rounded p-3 flex justify-between items-center bg-slate-50 dark:bg-slate-900 opacity-50">
                  <span className="font-mono text-xs text-slate-600 dark:text-slate-300">Container [Node]</span>
                  <span className="text-[10px] bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 px-1.5 py-0.5 rounded">Dead</span>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </section>

      {/* Step-by-Step Execution Pipeline */}
      <section className="px-6 max-w-5xl mx-auto w-full mt-20">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-10">Step-by-Step Execution Pipeline</h2>
        
        <div className="space-y-16">
          <PipelineStep 
            number={1} 
            title="Payload Ingestion & Validation" 
            description="The API gateway receives the raw code and target language. It validates the request against strict schemas, checking for language support and parsing execution limits (timeout, memory)."
            log={`> Request received: { "lang": "python", "code": "print('hello')", "timeout_ms": 3000 }\n> Schema validation passed.`}
          />
          <PipelineStep 
            number={2} 
            title="Container Instantiation" 
            description="The orchestration engine uses the Docker socket to create a detached container from the appropriate language image. Strict cgroup limits are applied at this stage."
            log={`> Calling Docker Engine API: POST /containers/create\n> Image: psa-python-runner:latest\n> Limits: --memory="128m" --cpus="0.5" --network="none"\n> Container ID: 8f9a2b1c4e... created.`}
          />
          <PipelineStep 
            number={3} 
            title="Execution & Stream Multiplexing" 
            description="The container is started. The engine attaches to the container's output streams. Docker multiplexes stdout and stderr into a single binary stream, which the Node.js backend must demultiplex in real-time."
            log={`> Container 8f9a2b1c4e started.\n> Attaching to logs...\n> [STDOUT] hello\n> Container exited with code 0.`}
          />
          <PipelineStep 
            number={4} 
            title="Teardown & Cleanup" 
            description="Regardless of success, failure, or timeout, the container is forcefully killed and removed. This ensures no residual state impacts future executions and host storage is not exhausted."
            log={`> Executing cleanup sequence...\n> Docker API: POST /containers/8f9a2b1c4e/kill\n> Docker API: DELETE /containers/8f9a2b1c4e\n> Cleanup successful.`}
          />
        </div>
      </section>
    </div>
  );
};

const PipelineStep: React.FC<{ number: number, title: string, description: string, log: string }> = ({ number, title, description, log }) => (
  <div className="flex flex-col md:flex-row gap-8">
    <div className="md:w-1/2 flex gap-4">
      <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded bg-primary text-white font-bold text-sm">
        {number}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
    <div className="md:w-1/2">
      <TerminalView content={log} />
    </div>
  </div>
);

export default Working;
