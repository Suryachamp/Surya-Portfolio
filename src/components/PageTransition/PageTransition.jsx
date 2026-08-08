import React, { useState, useEffect } from 'react';
import './PageTransition.css';

const GREETINGS = [
  "Hello", 
  "नमस्ते", 
  "こんにちは", 
  "Hola", 
  "Bonjour", 
  "Ciao", 
  "Привет", 
  "Surya"
];

const BOOT_LOGS = [
  "Initializing SuryaOS v2.0 kernel...",
  "Mounting core UI components... [OK]",
  "Establishing secure API connections... [OK]",
  "Fetching project repositories... [OK]",
  "Access Granted."
];

const PageTransition = () => {
  // Phases: greeting -> greeting-zoom -> booting -> fade-out -> done
  const [phase, setPhase] = useState('greeting'); 
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    if (phase !== 'done') document.body.style.overflow = 'hidden';
    
    let intervalId;

    if (phase === 'greeting') {
      intervalId = setInterval(() => {
        setGreetingIndex((prev) => {
          if (prev === GREETINGS.length - 1) {
            clearInterval(intervalId);
            setTimeout(() => setPhase('greeting-zoom'), 500);
            return prev;
          }
          return prev + 1;
        });
      }, 140);
    }

    if (phase === 'greeting-zoom') {
      const timer = setTimeout(() => {
        setPhase('booting');
      }, 400); 
      return () => clearTimeout(timer);
    }

    if (phase === 'booting') {
      intervalId = setInterval(() => {
        setLogIndex((prev) => {
          if (prev === BOOT_LOGS.length - 1) {
            clearInterval(intervalId);
            setTimeout(() => setPhase('fade-out'), 700);
            return prev;
          }
          return prev + 1;
        });
      }, 180);
    }

    if (phase === 'fade-out') {
      const timer = setTimeout(() => {
        setPhase('done');
        document.body.style.overflow = '';
      }, 800); 
      return () => clearTimeout(timer);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div className={`transition-wrapper ${phase === 'fade-out' ? 'fade' : ''}`}>
      
      {/* PHASE 1: Welcoming Greeting Cycle */}
      {(phase === 'greeting' || phase === 'greeting-zoom') && (
        <div className={`greeting-container ${phase === 'greeting-zoom' ? 'zoom-out' : ''}`}>
          <h1 
            key={greetingIndex} 
            className={`text-5xl md:text-7xl font-display font-bold tracking-widest uppercase ${greetingIndex === GREETINGS.length - 1 ? 'final-greeting' : 'text-text-primary'}`}
          >
            {GREETINGS[greetingIndex]}
          </h1>
        </div>
      )}

      {/* PHASE 2: Developer Terminal Boot Sequence */}
      {(phase === 'booting' || phase === 'fade-out') && (
        <div className={`terminal-window ${phase === 'fade-out' ? 'zoom-in' : 'pop-in'}`}>
          <div className="terminal-header">
            <div className="dot close"></div>
            <div className="dot min"></div>
            <div className="dot max"></div>
            <span className="terminal-title">surya@portfolio:~</span>
          </div>
          
          <div className="terminal-body">
            {BOOT_LOGS.slice(0, logIndex + 1).map((log, i) => (
              <div key={i} className="terminal-line">
                <span className="terminal-prompt">$</span> {log}
              </div>
            ))}
            
            {/* Active blinking cursor line */}
            {phase === 'booting' && logIndex < BOOT_LOGS.length - 1 && (
              <div className="terminal-line">
                <span className="terminal-prompt">$</span> <span className="blinking-cursor"></span>
              </div>
            )}
            
            {/* Final success message */}
            {logIndex === BOOT_LOGS.length - 1 && (
              <div className="terminal-success">
                System ready. Launching portfolio... <span className="blinking-cursor"></span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PageTransition;
