import React, { useState, useEffect } from 'react';
import './PageTransition.css';

const TEXTS = [
  "Surya",
  "सूर्या",
  "সূর্য",
  "スーリヤ",
  "Сурья",
  "수리야",
  "苏里亚",
  "سوریا",
  "Σούρια",
  "Surya"
];

const PageTransition = () => {
  const [phase, setPhase] = useState('text-cycle');
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    if (phase !== 'done') {
      document.body.style.overflow = 'hidden';
    }
    
    let cycleInterval;

    if (phase === 'text-cycle') {
      cycleInterval = setInterval(() => {
        setTextIndex((prev) => {
          if (prev === TEXTS.length - 1) {
            clearInterval(cycleInterval);
            setTimeout(() => setPhase('text-zoom'), 400);
            return prev;
          }
          return prev + 1;
        });
      }, 120);
    }

    if (phase === 'text-zoom') {
      const wipeTimer = setTimeout(() => {
        setPhase('wipe');
      }, 350);
      return () => clearTimeout(wipeTimer);
    }

    if (phase === 'wipe') {
      const finishTimer = setTimeout(() => {
        setPhase('done');
        document.body.style.overflow = '';
      }, 1200);
      return () => clearTimeout(finishTimer);
    }

    return () => {
      if (cycleInterval) clearInterval(cycleInterval);
      document.body.style.overflow = '';
    };
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div className="curtain-wrapper">
      <div className={`door left-door bg-accent ${phase === 'wipe' ? 'open' : ''}`} style={{ transitionDelay: '0.15s' }}></div>
      <div className={`door right-door bg-accent ${phase === 'wipe' ? 'open' : ''}`} style={{ transitionDelay: '0.15s' }}></div>

      <div className={`door left-door main-door bg-bg-primary ${phase === 'wipe' ? 'open' : ''}`}></div>
      <div className={`door right-door main-door bg-bg-primary ${phase === 'wipe' ? 'open' : ''}`}></div>
      
      <div className={`logo-wrapper ${phase === 'text-zoom' || phase === 'wipe' ? 'zoom-out' : ''}`}>
        <h1 
          key={textIndex} 
          className="text-5xl md:text-7xl font-display font-bold tracking-widest uppercase text-text-primary"
        >
          {TEXTS[textIndex]}
        </h1>
      </div>
    </div>
  );
};

export default PageTransition;
