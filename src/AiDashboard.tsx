import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, FileText, Briefcase, Cpu, X, CheckCircle, AlertCircle, Copy, ChevronRight, Loader2, Sparkles, Terminal, Code, Network, Server, Github, ExternalLink } from 'lucide-react';
import { PROJECTS } from './data';
import { analyzeJobMatch, generateCoverLetter, explainProject, generateInterviewPrep, JobMatchResult, InterviewQ } from './AiService';

// --- Types ---

type ToolType = 'match' | 'letter' | 'explainer' | 'prep' | null;

// --- Helper Components ---

const LoadingScan = () => (
  <div className="flex flex-col items-center justify-center py-12 space-y-4">
    <div className="relative">
       <Loader2 className="animate-spin text-primary w-10 h-10" />
       <div className="absolute inset-0 blur-lg bg-primary/20 rounded-full"></div>
    </div>
    <div className="font-mono text-xs text-primary animate-pulse uppercase tracking-widest">
      Parsing Neural Vectors...
    </div>
  </div>
);

// --- Modal Component ---

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children?: React.ReactNode }) => {
  const modalVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.9, 
      y: 20, 
      filter: 'blur(10px)' 
    },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.85, 
      y: 20, 
      filter: 'blur(12px)',
      transition: { 
        duration: 0.2, 
        ease: "easeIn" 
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            transition={{ duration: 0.2 }}
          />
          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative w-full max-w-4xl bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(34,197,94,0.15)] flex flex-col max-h-[85vh] overflow-hidden rounded-sm ring-1 ring-white/5"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5 backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-sm border border-primary/20">
                   <Bot className="text-primary" size={20} />
                </div>
                <div>
                    <h3 className="text-white font-mono font-bold uppercase tracking-wider text-sm md:text-base flex items-center gap-2">
                      {title} <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-400 font-normal">v3.0.1</span>
                    </h3>
                    <div className="flex gap-1.5 mt-1.5 opacity-50">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    </div>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-white/10 rounded-sm transition-colors text-gray-400 hover:text-white group"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>
            
            {/* Body */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 relative">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- Tool Components ---

const JobMatcherTool = () => {
  const [jd, setJd] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<JobMatchResult | null>(null);

  const handleAnalyze = async () => {
    if (!jd.trim()) return;
    setLoading(true);
    try {
      const data = await analyzeJobMatch(jd);
      setResult(data);
    } catch (e) {
      alert("Error analyzing job. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 font-mono relative">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div 
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
             {loading ? <LoadingScan /> : (
               <>
                <div className="bg-white/5 p-4 border-l-2 border-primary/50 text-sm text-gray-400 mb-4">
                   <Terminal size={14} className="inline mr-2 text-primary" />
                   System ready. Paste a Technical Job Description (JD) to compute embedding similarity.
                </div>
                <textarea 
                  className="retro-input w-full h-48 p-4 text-sm bg-black/50 border border-white/20 text-white resize-none focus:border-primary transition-all rounded-sm placeholder:text-gray-600 focus:ring-1 focus:ring-primary/50"
                  placeholder={`Example:\n"We are looking for an ML Engineer to build scalable RAG pipelines using LangChain and Pinecone..."`}
                  value={jd}
                  onChange={(e) => setJd(e.target.value)}
                />
                <button 
                  onClick={handleAnalyze} 
                  disabled={loading || !jd.trim()}
                  className="retro-button w-full py-4 flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-sm hover:bg-primary/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <Cpu size={16} className="group-hover:animate-pulse" /> Run Compatibility Analysis
                </button>
               </>
             )}
          </motion.div>
        ) : (
          <motion.div 
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header Score */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div>
                 <h4 className="text-lg text-white font-bold uppercase tracking-wider">Technical Fit Score</h4>
                 <p className="text-gray-500 text-xs mt-1">Based on stack overlap & experience</p>
              </div>
              <div className="flex items-end gap-2">
                 <span className={`text-6xl font-bold leading-none ${result.matchScore > 75 ? 'text-primary drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]' : result.matchScore > 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                   {result.matchScore}
                 </span>
                 <span className="text-xl text-gray-500 mb-1">/100</span>
              </div>
            </div>
            
            <div className="bg-white/5 p-5 rounded-sm border-l-4 border-primary relative overflow-hidden">
               <div className="absolute top-0 right-0 p-2 opacity-10">
                 <Bot size={40} />
               </div>
               <h5 className="text-xs text-primary font-bold uppercase mb-2">Analysis Log</h5>
              <p className="text-gray-300 text-sm leading-relaxed">"{result.justification}"</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-black/40 border border-white/10 p-5 rounded-sm hover:border-primary/30 transition-colors">
                 <h5 className="text-xs text-green-400 font-bold uppercase mb-4 flex items-center gap-2">
                    <CheckCircle size={14}/> Stack Match
                 </h5>
                 <div className="flex flex-wrap gap-2">
                   {result.atsKeywords.map(k => (
                     <span key={k} className="text-[11px] bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-1 rounded-sm uppercase tracking-wide">
                        {k}
                     </span>
                   ))}
                 </div>
               </div>
               <div className="bg-black/40 border border-white/10 p-5 rounded-sm hover:border-yellow-500/30 transition-colors">
                 <h5 className="text-xs text-yellow-500 font-bold uppercase mb-4 flex items-center gap-2">
                    <AlertCircle size={14}/> Critical Gaps
                 </h5>
                 <div className="flex flex-wrap gap-2">
                   {result.missingSkills.length > 0 ? result.missingSkills.map(k => (
                     <span key={k} className="text-[11px] bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-2 py-1 rounded-sm uppercase tracking-wide">
                        {k}
                     </span>
                   )) : <span className="text-gray-500 text-xs">No critical gaps detected.</span>}
                 </div>
               </div>
            </div>

            <div>
              <h5 className="text-white font-bold mb-4 text-xs uppercase tracking-widest flex items-center gap-2">
                 <Sparkles size={14} className="text-primary" /> Engineering Highlights to Add
              </h5>
              <ul className="space-y-3">
                {result.recommendedBulletPoints.map((bp, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-gray-300 text-sm flex items-start gap-3 bg-white/[0.02] p-3 border border-white/5 rounded-sm"
                  >
                    <span className="text-primary mt-1 min-w-[10px]">{'>'}</span> {bp}
                  </motion.li>
                ))}
              </ul>
            </div>

            <button onClick={() => setResult(null)} className="w-full py-3 text-xs text-gray-500 hover:text-white border border-transparent hover:border-white/10 transition-all uppercase tracking-widest">
              {'<'} Analyze Another Job
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CoverLetterTool = () => {
  const [jd, setJd] = useState('');
  const [loading, setLoading] = useState(false);
  const [letter, setLetter] = useState('');

  const handleGenerate = async () => {
    if (!jd.trim()) return;
    setLoading(true);
    try {
      const text = await generateCoverLetter(jd);
      setLetter(text);
    } catch (e) {
      alert("Error generating letter.");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 font-mono h-full flex flex-col">
       <AnimatePresence mode="wait">
       {!letter ? (
         <motion.div key="input" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="space-y-6">
          {loading ? <LoadingScan /> : (
            <>
              <p className="text-gray-400 text-sm border-l-2 border-green-500 pl-3">
                  Generate an engineering-focused cover letter that connects my specific projects (KwixLab, Nexus.ai) to your technical stack.
              </p>
              <textarea 
                className="retro-input w-full h-48 p-4 text-sm bg-black/50 border border-white/20 text-white resize-none focus:border-green-400 transition-colors rounded-sm"
                placeholder="// Paste Job Description..."
                value={jd}
                onChange={(e) => setJd(e.target.value)}
              />
              <button 
                onClick={handleGenerate} 
                disabled={loading || !jd.trim()}
                className="retro-button w-full py-4 flex items-center justify-center gap-2 font-bold uppercase tracking-widest disabled:opacity-50"
              >
                <FileText size={18} /> Generate Document
              </button>
            </>
          )}
         </motion.div>
       ) : (
         <motion.div key="result" initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}} className="flex-1 flex flex-col">
           <div className="flex justify-between items-center mb-4 bg-white/5 p-2 rounded-sm border border-white/10">
             <span className="text-xs text-green-400 font-bold px-2">GENERATION_COMPLETE</span>
             <button 
                onClick={() => navigator.clipboard.writeText(letter)}
                className="flex items-center gap-2 text-xs text-gray-400 hover:text-white bg-black/50 px-3 py-1.5 rounded-sm border border-white/10 hover:border-white/30 transition-all"
             >
               <Copy size={12} /> Copy Text
             </button>
           </div>
           
           <div className="bg-[#050505] p-6 text-sm text-gray-300 leading-7 whitespace-pre-wrap border border-white/10 font-sans shadow-inner flex-1 overflow-y-auto">
             {letter}
           </div>
           
           <button onClick={() => setLetter('')} className="mt-6 w-full py-3 text-xs text-gray-500 hover:text-white uppercase tracking-widest border border-dashed border-white/10 hover:border-white/30">
            Reset Generator
          </button>
         </motion.div>
       )}
       </AnimatePresence>
    </div>
  );
};

const ExplainerTool = () => {
  const [selectedProject, setSelectedProject] = useState(PROJECTS[0].title);
  const [mode, setMode] = useState<'simple' | 'tech' | 'interview'>('simple');
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState('');

  const currentProject = PROJECTS.find(p => p.title === selectedProject);

  const handleExplain = async () => {
    setLoading(true);
    try {
      const text = await explainProject(selectedProject, mode);
      setExplanation(text);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8 font-mono">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 block font-bold">Target Project</label>
          <div className="relative">
            <select 
              className="retro-input w-full p-3 bg-black/50 border border-white/20 text-white appearance-none cursor-pointer hover:border-white/40"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              {PROJECTS.map(p => <option key={p.id} value={p.title}>{p.title}</option>)}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
               <ChevronRight className="rotate-90" size={14} />
            </div>
          </div>
        </div>
        <div>
          <label className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 block font-bold">Explanation Depth</label>
          <div className="flex gap-2">
            {[
              { id: 'simple', label: 'Overview' },
              { id: 'tech', label: 'Architecture & Stack' },
              { id: 'interview', label: 'Interview Deep Dive' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id as any)}
                className={`flex-1 py-3 text-[9px] md:text-[10px] uppercase font-bold border transition-all ${
                  mode === m.id
                  ? 'bg-primary text-black border-primary shadow-[0_0_10px_rgba(34,197,94,0.3)]' 
                  : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-gray-300'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button 
        onClick={handleExplain} 
        disabled={loading}
        className="retro-button w-full py-4 flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-sm"
      >
        {loading ? <Loader2 className="animate-spin" size={16} /> : 'Execute Explanation'}
      </button>

      {explanation && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 p-6 border border-white/10 rounded-sm relative overflow-hidden group"
        >
           <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
           <h4 className="text-primary text-xs uppercase mb-3 font-bold flex items-center gap-2">
             <Terminal size={12} /> Output Stream
           </h4>
           <p className="text-gray-300 text-sm leading-7 whitespace-pre-wrap font-sans">{explanation}</p>

            {currentProject && (currentProject.links.github || currentProject.links.live) && (
               <div className="pt-4 border-t border-white/10 flex flex-wrap gap-4 mt-6">
                   {currentProject.links.github && (
                       <a 
                         href={currentProject.links.github} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-primary transition-colors uppercase tracking-wider"
                       >
                           <Github size={14} /> View Repository
                       </a>
                   )}
                   {currentProject.links.live && (
                       <a 
                         href={currentProject.links.live} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-primary transition-colors uppercase tracking-wider"
                       >
                           <ExternalLink size={14} /> Open Live Demo
                       </a>
                   )}
               </div>
           )}
        </motion.div>
      )}
    </div>
  );
};

const InterviewPrepTool = () => {
  const [role, setRole] = useState('Large Language Model (LLM) Engineer');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<InterviewQ[]>([]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await generateInterviewPrep(role);
      setQuestions(data);
    } catch(e) {}
    setLoading(false);
  };

  return (
    <div className="space-y-6 font-mono">
      <div className="flex gap-4 items-end">
        <div className="flex-1">
            <label className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 block font-bold">Target Role</label>
            <div className="relative">
                <select 
                className="retro-input w-full p-3 bg-black/50 border border-white/20 text-white appearance-none cursor-pointer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                >
                <option>Large Language Model (LLM) Engineer</option>
                <option>Machine Learning Engineer (General)</option>
                <option>MLOps & Infrastructure Engineer</option>
                <option>Computer Vision Engineer</option>
                <option>AI Product Engineer</option>
                </select>
                <ChevronRight className="rotate-90 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" size={14} />
            </div>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="retro-button px-8 py-3 h-[46px] font-bold uppercase tracking-widest text-xs flex items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={14} /> : 'Generate Questions'}
        </button>
      </div>

      <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
        {loading && <LoadingScan />}
        {questions.map((q, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="border border-white/10 bg-white/[0.02] p-5 rounded-sm hover:bg-white/[0.04] transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <span className={`text-[10px] px-2 py-1 rounded-sm uppercase tracking-wide border ${
                  q.type.includes('System Design') ? 'border-purple-500/30 text-purple-400 bg-purple-500/10' :
                  q.type.includes('Technical') ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' :
                  'border-orange-500/30 text-orange-400 bg-orange-500/10'
              }`}>
                  {q.type}
              </span>
            </div>
            <p className="text-white font-bold mb-4 text-sm md:text-base">Q: {q.question}</p>
            <div className="pl-4 border-l-2 border-white/10 ml-1">
              <p className="text-gray-400 text-sm leading-relaxed italic">" {q.answer} "</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- Main Dashboard ---

export const AiDashboard = () => {
  const [activeTool, setActiveTool] = useState<ToolType>(null);

  const tools = [
    {
      id: 'match',
      title: 'Job Match Analysis',
      desc: 'Evaluate fit for ML & AI Engineering roles.',
      icon: Briefcase,
      color: 'text-blue-400',
      border: 'group-hover:border-blue-500/50'
    },
    {
      id: 'letter',
      title: 'Auto-Cover Letter',
      desc: 'Generate tailored engineering docs.',
      icon: FileText,
      color: 'text-green-400',
      border: 'group-hover:border-green-500/50'
    },
    {
      id: 'explainer',
      title: 'Project Architecture',
      desc: 'Deep dive into stack, trade-offs & scale.',
      icon: Network,
      color: 'text-purple-400',
      border: 'group-hover:border-purple-500/50'
    },
    {
      id: 'prep',
      title: 'Interview Simulator',
      desc: 'System design & ML theory Q&A.',
      icon: Server,
      color: 'text-amber-400',
      border: 'group-hover:border-amber-500/50'
    }
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto font-mono relative">
       {/* Ambient Background Glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0" />

       <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative z-10 mb-16 border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
                <span className="inline-block w-2 h-2 bg-primary animate-pulse rounded-full"></span>
                <span className="text-xs font-bold text-primary tracking-widest uppercase">AI Agent Active</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white flex items-center gap-4">
              RECRUITER_DASHBOARD
            </h2>
            <p className="text-gray-400 mt-4 text-base max-w-xl leading-relaxed">
              Interact with my digital twin. Use these LLM-powered tools to evaluate my fit for specific AI/ML Engineering roles.
            </p>
          </div>
          <div className="text-[10px] text-gray-600 font-mono text-right bg-white/5 p-3 border border-white/5 rounded-sm backdrop-blur-sm">
             <div>SYSTEM_STATUS: <span className="text-green-500">ONLINE</span></div>
             <div>CONTEXT_WINDOW: <span className="text-white">1M TOKENS</span></div>
             <div>MODEL: <span className="text-white">GEMINI-2.5-FLASH</span></div>
          </div>
       </motion.div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
         {tools.map((tool, idx) => (
           <motion.div
             key={tool.id}
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: idx * 0.1, type: "spring", stiffness: 50 }}
             viewport={{ once: true }}
             onClick={() => setActiveTool(tool.id as ToolType)}
             className={`group relative h-full bg-[#080808]/80 backdrop-blur-sm border border-white/10 p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] ${tool.border}`}
           >
             <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             
             <div className={`mb-6 ${tool.color} bg-white/[0.03] inline-flex items-center justify-center w-12 h-12 rounded-sm border border-white/5 group-hover:bg-white/[0.08] transition-colors`}>
               <tool.icon size={24} />
             </div>
             
             <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors flex items-center gap-2">
               {tool.title}
             </h3>
             <p className="text-xs text-gray-500 mb-8 leading-relaxed font-sans">
               {tool.desc}
             </p>

             <div className="absolute bottom-6 right-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-600 group-hover:text-primary transition-colors">
                <span>Open Tool</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
             </div>
           </motion.div>
         ))}
       </div>

       {/* Modals */}
       <Modal isOpen={activeTool === 'match'} onClose={() => setActiveTool(null)} title="Job Matcher v1.0">
          <JobMatcherTool />
       </Modal>

       <Modal isOpen={activeTool === 'letter'} onClose={() => setActiveTool(null)} title="Auto-Letter Generator">
          <CoverLetterTool />
       </Modal>

       <Modal isOpen={activeTool === 'explainer'} onClose={() => setActiveTool(null)} title="Deep Dive Engine">
          <ExplainerTool />
       </Modal>

       <Modal isOpen={activeTool === 'prep'} onClose={() => setActiveTool(null)} title="Interview Simulator">
          <InterviewPrepTool />
       </Modal>
    </section>
  );
};
