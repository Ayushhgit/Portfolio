import React, { useState, useEffect, useRef } from "react";
import { createRoot } from 'react-dom/client';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Download, ChevronDown, Send, Menu, X, Terminal, Code, Cpu, Database, Globe, Shield } from 'lucide-react';

import Scene from './ThreeBackground';
import { PROFILE, ABOUT, EXPERIENCE, PROJECTS, SKILLS, EDUCATION, CERTIFICATIONS } from './data';
import { AiDashboard } from './AiDashboard';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: '~/about', href: '#about' },
    { name: '~/experience', href: '#experience' },
    { name: '~/projects', href: '#projects' },
    { name: '~/skills', href: '#skills' },
    { name: '~/contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-background/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-xl font-bold tracking-tighter text-primary font-mono flex items-center gap-2">
          <span className="animate-pulse">_</span>Ayush.sys
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 font-mono text-sm">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-gray-400 hover:text-primary transition-colors hover:underline decoration-primary underline-offset-4">
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-primary">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden border-b border-white/10 bg-background"
        >
          <div className="flex flex-col p-6 space-y-4 font-mono">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-gray-300 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

const Typewriter = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1200);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="text-primary font-mono">
      {words[index].substring(0, subIndex)}
      <span className="animate-pulse ml-1 inline-block w-2 h-4 bg-primary align-middle"></span>
    </span>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="border border-white/20 bg-black/40 p-2 inline-block mb-6 md:mb-8 rounded-sm backdrop-blur-sm">
           <span className="text-xs text-gray-500">System Status: </span>
           <span className="text-xs text-green-500 font-bold">ONLINE</span>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 50 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-4 md:mb-6 tracking-tighter text-white uppercase glitch-hover">
            {PROFILE.name}
          </h1>

          <div className="text-base sm:text-lg md:text-2xl text-gray-400 mb-6 md:mb-8 min-h-[2rem] flex items-center gap-2">
            <span className="text-primary">{'>'}</span>
            <Typewriter words={PROFILE.roles} />
          </div>

          <p className="text-gray-400 max-w-lg mb-8 md:mb-10 text-base md:text-lg leading-relaxed border-l-2 border-primary pl-4">
            {PROFILE.tagline}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a href="#projects" className="retro-button px-6 sm:px-8 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2">
              <Terminal size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:inline">Execute_Projects.exe</span>
              <span className="sm:hidden">Projects</span>
            </a>
          <a
  href="https://drive.google.com/file/d/1zX4qZo34_NLcDqR-c5OxsFkTmO8gqr54/view"
  target="_blank"
  rel="noopener noreferrer"
  className="px-6 sm:px-8 py-3 border border-white/20 text-gray-400 hover:bg-white/5 hover:text-white transition-all text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2"
>
  <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
  <span className="hidden sm:inline">Read_CV.pdf</span>
  <span className="sm:hidden">Resume</span>
</a>


          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 right-6 md:right-10 text-xs text-gray-600 font-mono hidden md:block text-right">
        <p>MEM: 64GB OK</p>
        <p>CPU: NEURAL_ENGINE OK</p>
        <p>NET: CONNECTED</p>
      </div>

      <motion.div
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-primary"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown />
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 relative font-mono">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="border border-white/10 bg-surface p-1 relative">
          {/* Decorative Header */}
          <div className="bg-white/5 p-2 flex justify-between items-center mb-4 md:mb-6 border-b border-white/10">
             <span className="text-[10px] sm:text-xs text-gray-500">user_profile.txt</span>
             <div className="flex gap-1.5 sm:gap-2">
               <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500/20"></div>
               <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-500/20"></div>
               <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500/20"></div>
             </div>
          </div>

          <div className="p-3 sm:p-4 md:p-8">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
               <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 text-white flex items-center gap-2 sm:gap-3">
                    <span className="text-primary">#</span> WHOAMI
                  </h2>
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                    {ABOUT.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 pt-6 md:pt-8 border-t border-dashed border-white/10">
                    <div>
                      <h4 className="text-xs text-primary mb-3 md:mb-4 uppercase">[ Education ]</h4>
                      {EDUCATION.map((edu, idx) => (
                        <div key={idx} className="mb-3 md:mb-4">
                          <p className="text-white font-bold text-sm md:text-base">{edu.institution}</p>
                          <p className="text-gray-400 text-xs sm:text-sm">{edu.degree}</p>
                          <p className="text-gray-500 text-xs mt-1 font-mono">{edu.score}</p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <h4 className="text-xs text-primary mb-3 md:mb-4 uppercase">[ Certifications ]</h4>
                      <ul className="space-y-2 md:space-y-3">
                        {CERTIFICATIONS.map((cert, idx) => (
                          <li key={idx} className="text-gray-400 text-xs sm:text-sm flex items-start gap-2">
                            <span className="text-primary">{'>'}</span>
                            {cert}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: any; index: number }> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <motion.div
        className="retro-card h-full p-4 sm:p-6 flex flex-col"
        whileHover={{
          scale: 1.02,
          borderColor: "#22c55e",
          boxShadow: "0px 0px 20px rgba(34, 197, 94, 0.4)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="flex justify-between items-start mb-4 sm:mb-6 border-b border-white/10 pb-3 sm:pb-4">
          <div className="text-primary">
            <project.icon size={24} className="sm:w-7 sm:h-7" strokeWidth={1.5} />
          </div>
          <div className="flex gap-3 sm:gap-4">
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors p-1">
                <Github size={18} />
              </a>
            )}
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors p-1">
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-bold mb-2 text-white font-mono">{project.title}</h3>
        <p className="text-[10px] sm:text-xs text-primary mb-3 sm:mb-4 font-mono uppercase tracking-wide">
          // {project.subtitle}
        </p>
        <p className="text-gray-400 mb-4 sm:mb-6 text-xs sm:text-sm leading-relaxed line-clamp-3 font-sans">
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5 sm:gap-2">
          {project.tags.map((tag: string) => (
            <span key={tag} className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/5 text-gray-400 border border-white/10 font-mono">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-16 md:py-24 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12 border-l-4 border-primary pl-4 sm:pl-6"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white">TECH_STACK</h2>
          <p className="text-gray-500 text-sm sm:text-base">Modules loaded into memory.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {SKILLS.map((skillGroup, idx) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="border border-white/10 bg-black p-4 sm:p-6 hover:border-white/30 transition-colors"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <skillGroup.icon className="text-secondary" size={18} />
                <h3 className="text-base sm:text-lg font-bold uppercase">{skillGroup.category}</h3>
              </div>
              <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-2">
                {skillGroup.items.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                    <span className="w-1 h-1 bg-primary"></span>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-16 md:py-24 relative font-mono bg-white/[0.02]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-10 md:mb-16 text-white text-center uppercase tracking-wider md:tracking-widest">
          <span className="text-primary">/var/log</span>/experience
        </h2>

        <div className="relative space-y-8 md:space-y-12">
           {/* Center Line - only visible on desktop */}
           <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block" />

           {/* Mobile timeline line */}
           <div className="absolute left-2 top-0 bottom-0 w-px bg-white/10 md:hidden" />

          {EXPERIENCE.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative md:flex items-center justify-between pl-6 md:pl-0"
            >
               {/* Mobile timeline node */}
               <div className="absolute left-0 w-4 h-4 bg-black border-2 border-primary -translate-x-1/2 z-10 md:hidden top-1"></div>

               {/* Date and Title */}
               <div className="md:w-1/2 mb-3 md:mb-0 md:px-12 md:text-right order-1">
                  <div className="inline-block px-2 sm:px-3 py-1 border border-primary text-primary text-[10px] sm:text-xs font-bold mb-2">
                    {exp.period}
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">{exp.role}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm md:text-base">{exp.company} | {exp.type}</p>
               </div>

               {/* Center Node - Desktop only */}
               <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-black border-2 border-primary -translate-x-1/2 md:translate-x-[-50%] z-10 hidden md:block"></div>

               {/* Content */}
               <div className="md:w-1/2 md:px-12 order-2 mt-3 md:mt-0">
                 <ul className="space-y-2 sm:space-y-3 md:space-y-4">
                  {exp.achievements.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 sm:gap-3 text-gray-400 text-xs sm:text-sm">
                      <span className="text-secondary mt-0.5 sm:mt-1 min-w-[8px] sm:min-w-[10px]">{'>'}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-16 md:py-24 font-mono border-t border-white/10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Header */}
          <div className="inline-block p-3 sm:p-4 border border-white/20 bg-black mb-6 md:mb-8 relative">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary"></div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tighter text-white">Initialize_Handshake</h2>
          </div>

          <p className="text-gray-500 mb-8 md:mb-10 text-base md:text-lg">
            Ready to deploy your next AI project?
          </p>

          <div className="flex flex-col gap-3 sm:gap-4 max-w-md mx-auto mb-10 md:mb-12">
             <a href={`mailto:${PROFILE.email}`} className="retro-button py-3 sm:py-4 px-4 sm:px-6 flex justify-between items-center group text-sm sm:text-base">
                <span>EMAIL_PROTOCOL</span>
                <Mail className="group-hover:text-black" size={18} />
             </a>
             <a href={PROFILE.social.linkedin} target="_blank" className="retro-button py-3 sm:py-4 px-4 sm:px-6 flex justify-between items-center group text-sm sm:text-base">
                <span>LINKEDIN_CONNECT</span>
                <Linkedin className="group-hover:text-black" size={18} />
             </a>
             <a href={PROFILE.social.github} target="_blank" className="retro-button py-3 sm:py-4 px-4 sm:px-6 flex justify-between items-center group text-sm sm:text-base">
                <span>GITHUB_REPO</span>
                <Github className="group-hover:text-black" size={18} />
             </a>
          </div>

          <form className="text-left border-2 border-white/10 p-1 bg-black relative shadow-[4px_4px_0px_rgba(34,197,94,0.1)] sm:shadow-[8px_8px_0px_rgba(34,197,94,0.1)] transition-all hover:shadow-[4px_4px_0px_rgba(34,197,94,0.2)] sm:hover:shadow-[8px_8px_0px_rgba(34,197,94,0.2)]" onSubmit={(e) => e.preventDefault()}>
             {/* Terminal Header */}
             <div className="flex items-center justify-between bg-white/10 p-2 mb-4 sm:mb-6 border-b border-white/10">
                 <div className="flex items-center gap-2">
                    <Terminal size={12} className="text-primary sm:w-[14px] sm:h-[14px]" />
                    <span className="text-[10px] sm:text-xs text-gray-400 font-bold tracking-wider">SEND_MESSAGE.exe</span>
                 </div>
                 <div className="flex gap-1">
                     <span className="block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-600"></span>
                     <span className="block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-600"></span>
                     <span className="block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary"></span>
                 </div>
             </div>

             <div className="px-3 sm:px-6 pb-6 sm:pb-8 space-y-4 sm:space-y-6">
                <div>
                    <label className="block text-[10px] sm:text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest flex items-center gap-2">
                    <span className="text-primary">$</span> SET USER_NAME
                    </label>
                    <input type="text" className="retro-input w-full p-2.5 sm:p-3 bg-black text-white text-sm sm:text-base" placeholder="> Enter identifier" />
                </div>

                <div>
                    <label className="block text-[10px] sm:text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest flex items-center gap-2">
                    <span className="text-primary">$</span> SET CONTACT_POINT
                    </label>
                    <input type="email" className="retro-input w-full p-2.5 sm:p-3 bg-black text-white text-sm sm:text-base" placeholder="> Enter frequency (email)" />
                </div>

                <div>
                    <label className="block text-[10px] sm:text-xs font-bold text-gray-500 mb-2 uppercase tracking-widest flex items-center gap-2">
                    <span className="text-primary">$</span> CONFIGURE PAYLOAD
                    </label>
                    <textarea rows={3} className="retro-input w-full p-2.5 sm:p-3 bg-black resize-none text-white text-sm sm:text-base sm:rows-4" placeholder="> Enter transmission data..." />
                </div>

                <button className="retro-button w-full py-3 sm:py-4 mt-2 sm:mt-4 font-bold uppercase text-xs sm:text-sm tracking-widest flex items-center justify-center gap-2 sm:gap-3 group">
                    <span className="animate-pulse">_</span>
                    <span className="hidden sm:inline">EXECUTE_TRANSMISSION</span>
                    <span className="sm:hidden">SEND</span>
                    <Send size={14} className="sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform"/>
                </button>
             </div>
          </form>
        </motion.div>
      </div>

      <footer className="mt-12 md:mt-20 py-6 md:py-8 text-center text-gray-700 text-[10px] sm:text-xs border-t border-white/5 uppercase px-4 safe-area-bottom">
        <p>System.Exit(0) | © {new Date().getFullYear()} Ayush Raj</p>
      </footer>
    </section>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"], // section start to section end
  });

  const total = PROJECTS.length;
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(total - 1) * 100}vw`] // slide left across all slides
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative font-mono"
      style={{ height: `${total * 100}vh` }} // controls how long you scroll
    >
      {/* Sticky viewport */}
      <div className="sticky top-16 md:top-20 h-[calc(100vh-4rem)] flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-6 md:mb-10 flex items-end gap-2 sm:gap-4 border-b border-white/10 pb-4 px-4 sm:px-6 max-w-7xl mx-auto w-full"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            ./PROJECTS
          </h2>
          <span className="text-gray-500 text-xs sm:text-sm sm:mb-1">
            {total} items found
          </span>
        </motion.div>

        {/* Horizontal slider */}
        <div className="flex-1 overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex h-full"
          >
            {PROJECTS.map((project, index) => (
              <div
                key={project.id}
                className="w-screen flex items-center justify-center px-4 sm:px-6"
              >
                <div className="max-w-md sm:max-w-lg md:max-w-xl w-full">
                  <ProjectCard project={project} index={index} />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Main App ---

const App = () => {
  return (
    <div className="text-white relative min-h-screen bg-grid-pattern bg-[size:50px_50px] overflow-x-hidden">
      <Scene />
      <Navbar />
      <main>
        <Hero />
        <About />
        {/* <section id="projects" className="py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto font-mono">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-10 md:mb-16 flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4 border-b border-white/10 pb-4"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">./PROJECTS</h2>
            <span className="text-gray-500 text-xs sm:text-sm sm:mb-2">4 items found</span>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {PROJECTS.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </section> */}
        <Projects />
        <Skills />
        <Experience />
        <AiDashboard />
        <Contact />
      </main>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
