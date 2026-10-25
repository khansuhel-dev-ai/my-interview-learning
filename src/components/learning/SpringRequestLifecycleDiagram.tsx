import React, { useState } from 'react';
import {
  Server,
  Globe,
  Shield,
  Layers,
  Cpu,
  Database,
  Code,
  FileJson,
} from 'lucide-react';

export const SpringRequestLifecycleDiagram: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(6); // Default to DispatcherServlet step

  const steps = [
    {
      step: 1,
      title: 'User / Frontend Request',
      component: 'Client Browser / SPA',
      desc: 'User navigates to a URL or client-side JavaScript (e.g. fetch / Axios) dispatches an HTTP request to the backend.',
      icon: Globe,
      color: 'text-blue-500 bg-blue-500/10',
    },
    {
      step: 2,
      title: 'DNS Resolution',
      component: 'DNS Infrastructure',
      desc: 'Public hostname is resolved to an IP address (localhost requests bypass public DNS lookup).',
      icon: Globe,
      color: 'text-indigo-500 bg-indigo-500/10',
    },
    {
      step: 3,
      title: 'TCP Connection & TLS Handshake',
      component: 'Network Layer',
      desc: 'TCP 3-way handshake and TLS/SSL cryptographic negotiation occur to establish an encrypted HTTPS session.',
      icon: Shield,
      color: 'text-emerald-500 bg-emerald-500/10',
    },
    {
      step: 4,
      title: 'HTTP Request Payload Assembly',
      component: 'HTTP Wire Protocol',
      desc: 'HTTP request arrives with HTTP method (GET, POST), URI path (/api/orders), headers, cookies, and optional JSON body.',
      icon: Code,
      color: 'text-zinc-500 bg-zinc-500/10',
    },
    {
      step: 5,
      title: 'Embedded Servlet Container (Tomcat)',
      component: 'Embedded Tomcat / Jetty',
      desc: 'The embedded server receives raw socket bytes, parses them into HttpServletRequest and HttpServletResponse objects.',
      icon: Server,
      color: 'text-amber-500 bg-amber-500/10',
    },
    {
      step: 6,
      title: 'Servlet Filter Chain',
      component: 'OncePerRequestFilter / Security',
      desc: 'Custom filters intercept the request for cross-cutting concerns: CORS, authentication (Spring Security), rate limiting, and request tracing.',
      icon: Shield,
      color: 'text-purple-500 bg-purple-500/10',
    },
    {
      step: 7,
      title: 'DispatcherServlet (Front Controller)',
      component: 'Spring MVC Core',
      desc: 'The central engine of Spring Web. Coordinates request routing, argument binding, model processing, and view/message resolution.',
      icon: Layers,
      color: 'text-rose-500 bg-rose-500/10',
    },
    {
      step: 8,
      title: 'HandlerMapping Lookup',
      component: 'RequestMappingHandlerMapping',
      desc: 'Scans the application routing registry to match the request URI and HTTP verb to the target controller method.',
      icon: Cpu,
      color: 'text-indigo-500 bg-indigo-500/10',
    },
    {
      step: 9,
      title: 'HandlerAdapter & Argument Resolution',
      component: 'HandlerMethodArgumentResolver',
      desc: 'Deserializes inputs and binds @PathVariable, @RequestParam, @RequestHeader, and Jackson JSON @RequestBody into typed Java objects.',
      icon: Code,
      color: 'text-amber-500 bg-amber-500/10',
    },
    {
      step: 10,
      title: 'Controller Invocation',
      component: '@RestController',
      desc: 'The target controller method executes, validates request DTOs, and delegates business processing to the service layer.',
      icon: Cpu,
      color: 'text-blue-500 bg-blue-500/10',
    },
    {
      step: 11,
      title: 'Service & Repository Persistence',
      component: '@Service & @Repository (JPA)',
      desc: 'Business logic executes inside transactions (@Transactional). Queries database via Spring Data JPA or communicates with external microservices.',
      icon: Database,
      color: 'text-emerald-500 bg-emerald-500/10',
    },
    {
      step: 12,
      title: 'Response Serialization (Jackson JSON)',
      component: 'HttpMessageConverter (Jackson)',
      desc: 'For @RestController, the return DTO is converted into JSON wire format. For traditional MVC, view names are resolved into templates.',
      icon: FileJson,
      color: 'text-cyan-500 bg-cyan-500/10',
    },
    {
      step: 13,
      title: 'HTTP Response Delivery to Client',
      component: 'Filter Chain & Container Exit',
      desc: 'HTTP status (e.g. 200 OK, 201 Created), headers, and serialized body travel back through the filter chain and network to the browser.',
      icon: Globe,
      color: 'text-indigo-500 bg-indigo-500/10',
    },
  ];

  const current = steps[activeStep];
  const StepIcon = current.icon;

  return (
    <div className="my-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#12131d] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-[#0f1017] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-xs">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white">
              Spring Boot Browser Request-to-Response Lifecycle
            </h3>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Interactive 13-Step Walkthrough from Browser Click to Jackson JSON Serializer
            </p>
          </div>
        </div>
      </div>

      {/* Step Pills Navigation */}
      <div className="p-6 border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/30 dark:bg-[#101119]">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {steps.map((s, idx) => {
            const isSelected = idx === activeStep;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-700'
                }`}
              >
                <span className="font-mono text-[10px] opacity-75">{s.step}.</span>
                <span>{s.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Step Visual Card */}
      <div className="p-6 space-y-6">
        <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-[#0f1017] border border-zinc-200 dark:border-zinc-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl ${current.color} shrink-0`}>
                <StepIcon className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60">
                    Step {current.step} of 13
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    Layer: {current.component}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-zinc-900 dark:text-white mt-1">
                  {current.title}
                </h4>
              </div>
            </div>

            {/* Prev / Next controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                disabled={activeStep === 0}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 disabled:opacity-30 disabled:pointer-events-none hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer"
              >
                Previous Step
              </button>
              <button
                onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
                disabled={activeStep === steps.length - 1}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-indigo-700 cursor-pointer"
              >
                Next Step
              </button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {current.desc}
          </p>
        </div>

        {/* High-Level Architecture Flow Diagram */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#11121a] border border-zinc-200 dark:border-zinc-800 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
            End-to-End Pipeline Visualization
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40">
              <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 block">Client</span>
              <span className="font-bold text-zinc-900 dark:text-white">Browser / App</span>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/40">
              <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 block">Container</span>
              <span className="font-bold text-zinc-900 dark:text-white">Tomcat + Filters</span>
            </div>
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40">
              <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 block">Front Controller</span>
              <span className="font-bold text-zinc-900 dark:text-white">DispatcherServlet</span>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40">
              <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 block">Routing & DTO</span>
              <span className="font-bold text-zinc-900 dark:text-white">@RestController</span>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40">
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 block">Domain</span>
              <span className="font-bold text-zinc-900 dark:text-white">Service + DB</span>
            </div>
            <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900/40">
              <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 block">Serializer</span>
              <span className="font-bold text-zinc-900 dark:text-white">Jackson JSON</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
