import React from 'react';

const Docs: React.FC = () => {
  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'architecture', title: 'Architecture Learnings' },
    { id: 'docker', title: 'Docker Concepts' },
    { id: 'security', title: 'Sandbox Security' },
    { id: 'orchestration', title: 'Container Orchestration' },
    { id: 'lifecycle', title: 'Execution Lifecycle' },
    { id: 'filesystem', title: 'Filesystem & Bind Mounts' },
    { id: 'streams', title: 'Stdout/Stderr Capture' },
  ];

  return (
    <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row min-h-screen">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 flex-shrink-0 md:border-r border-slate-200 dark:border-slate-800 p-6 md:sticky md:top-16 md:h-[calc(100vh-4rem)] overflow-y-auto">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Documentation</h3>
        <nav className="flex flex-col space-y-1">
          {sections.map(section => (
            <a 
              key={section.id} 
              href={`#${section.id}`}
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 px-3 py-1.5 rounded transition-colors"
            >
              {section.title}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-12 xl:p-16 overflow-y-auto">
        <div className="max-w-3xl space-y-16 text-slate-700 dark:text-slate-300 leading-relaxed">
          
          <div className="border-b border-slate-200 dark:border-slate-800 pb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Polyglot Sandbox Automator</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              The Polyglot Sandbox Automator (PSA) is a backend-centric platform for executing arbitrary code across multiple programming languages inside isolated Docker containers. It is designed for use cases such as online judges, code playgrounds, and automated testing pipelines.
            </p>
            <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-md text-primary-dark dark:text-primary text-sm">
              <strong>Note:</strong> This documentation is actively being maintained as the project develops. API contracts may change before stable release.
            </div>
          </div>

          <section id="architecture">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Architecture Learnings</h2>
            <p className="mb-4">
              Building a robust code execution engine requires fundamentally different architectural decisions compared to a standard CRUD API. The primary constraint is not database I/O, but rather compute capacity and host system stability.
            </p>
            <p>
              We learned that exposing synchronous execution endpoints leads to immediate thread pool exhaustion. A queue-based asynchronous model using Redis is mandatory to buffer execution bursts.
            </p>
          </section>

          <section id="docker">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Docker Concepts</h2>
            <p className="mb-4">
              PSA bypasses the Docker CLI entirely, interacting directly with the Docker Engine API via the Docker Unix socket (`/var/run/docker.sock`). This allows programmatic, low-latency control over container lifecycles from the Node.js backend.
            </p>
          </section>

          <section id="security">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Sandbox Security</h2>
            <p className="mb-4">Security is implemented in layers:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Namespaces:</strong> Containers are isolated from the host PID, NET, and IPC namespaces. Network access is disabled by default (`--network none`).</li>
              <li><strong>Cgroups:</strong> Memory is strictly capped (e.g., 256MB), and CPU scheduling is throttled to prevent resource monopolization.</li>
              <li><strong>Non-root Users:</strong> Code executes under a restricted `sandbox` user within the container, preventing privilege escalation if a container escape vulnerability exists.</li>
            </ul>
          </section>

          <section id="lifecycle">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Execution Lifecycle & Timeouts</h2>
            <p className="mb-4">
              Handling infinite loops requires aggressive timeout management. The Node.js orchestrator sets a hard timer when a container starts. If the container does not exit before the timer fires, the orchestrator issues a `SIGKILL` directly to the container via the Docker API.
            </p>
          </section>

          <section id="streams">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Stdout/Stderr Capture</h2>
            <p className="mb-4">
              When attaching to a container without a TTY, Docker multiplexes stdout and stderr over a single TCP stream. The backend implements a demultiplexer that reads the 8-byte Docker stream header (determining stream type and frame length) to cleanly separate standard output from error logs.
            </p>
          </section>

        </div>
      </div>

    </div>
  );
};

export default Docs;
