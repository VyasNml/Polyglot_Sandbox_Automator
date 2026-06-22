import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10 border-b border-slate-200 dark:border-slate-800 pb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">About the Project</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">Engineering context, architecture philosophy, and technical motivations behind PSA.</p>
      </div>

      <div className="space-y-12 text-slate-700 dark:text-slate-300 leading-relaxed">
        
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Project Motivation</h2>
          <p className="mb-4">
            The Polyglot Sandbox Automator (PSA) was conceived out of a need to deeply understand backend systems, specifically in the context of executing untrusted code securely. Rather than relying on third-party SaaS APIs for code execution (like those used in typical competitive programming platforms), the goal was to build the foundational orchestration layer from scratch.
          </p>
          <p>
            It serves as a comprehensive study in operating systems concepts, containerization, asynchronous processing, and robust backend architecture design.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Engineering Goals</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-slate-900 dark:text-slate-100">Security First:</strong> Ensure strict isolation between the host machine and the executing user code using Docker namespaces and cgroups.</li>
            <li><strong className="text-slate-900 dark:text-slate-100">Reliability:</strong> System must predictably handle infinite loops, massive memory allocations, and network abuse from the sandboxed environment.</li>
            <li><strong className="text-slate-900 dark:text-slate-100">Scalability:</strong> Design an architecture capable of queueing and managing concurrent execution requests using message brokers like Redis.</li>
            <li><strong className="text-slate-900 dark:text-slate-100">Developer Experience:</strong> Provide a clean, well-documented API for seamless integration with varied frontend clients.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Architecture Philosophy</h2>
          <p className="mb-4">
            The system embraces an "ephemeral container" strategy. For every distinct execution request, a fresh, completely isolated Docker container is spawned. It lives only as long as the execution requires (subject to timeouts) and is immediately destroyed, leaving no lingering state or cache.
          </p>
          <p>
            Interactions with the Docker daemon are handled programmatically through the Docker socket (via the Docker Engine API), allowing the Node.js backend precise control over lifecycle events, stream multiplexing (stdout/stderr), and resource constraints.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Technical Challenges Solved</h2>
          <ul className="space-y-4">
            <li className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-1">Handling Zombie Processes</h3>
              <p className="text-sm">Properly managing the termination of processes that fork children within the container, preventing orphaned processes that consume host resources.</p>
            </li>
            <li className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-1">Stream Multiplexing</h3>
              <p className="text-sm">Demultiplexing the raw binary streams returned by the Docker API into coherent stdout and stderr text outputs.</p>
            </li>
            <li className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-1">Concurrency and Queuing</h3>
              <p className="text-sm">Preventing the host system from crashing due to too many simultaneous Docker container spawns by introducing a Redis-backed job queue.</p>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Future Improvements</h2>
          <p>
            Future iterations will focus on caching container images more aggressively, supporting WebAssembly (Wasm) runtimes for near-instant execution overhead, and establishing a gRPC communication layer between the API gateway and the sandbox workers for reduced latency.
          </p>
        </section>

      </div>
    </div>
  );
};

export default About;
