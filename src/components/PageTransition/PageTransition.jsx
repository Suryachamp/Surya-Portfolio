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

const PageTransition = () => {
  const [phase, setPhase] = useState('greeting'); 
  const [greetingIndex, setGreetingIndex] = useState(0);

  useEffect(() => {
    if (phase !== 'done') document.body.style.overflow = 'hidden';
    
    let intervalId;

    if (phase === 'greeting') {
      intervalId = setInterval(() => {
        setGreetingIndex((prev) => {
          if (prev === GREETINGS.length - 1) {
            clearInterval(intervalId);
            // Hold on the final name for 600ms before zooming it out
            setTimeout(() => setPhase('greeting-zoom'), 600);
            return prev;
          }
          return prev + 1;
        });
      }, 140);
    }

    if (phase === 'greeting-zoom') {
      // Wait for the 400ms text zoom-out animation to completely finish 
      // before starting the background fade
      const timer = setTimeout(() => {
        setPhase('fade-out');
      }, 450);
      return () => clearTimeout(timer);
    }

    if (phase === 'fade-out') {
      const timer = setTimeout(() => {
        setPhase('done');
        document.body.style.overflow = '';
      }, 800); // Wait 800ms for CSS transitions to finish before unmounting
      return () => clearTimeout(timer);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div className={`transition-wrapper ${phase === 'fade-out' ? 'fade' : ''}`}>
      <div className={`greeting-container ${(phase === 'greeting-zoom' || phase === 'fade-out') ? 'zoom-out' : ''}`}>
        <h1 
          key={greetingIndex} 
          className={`text-5xl md:text-7xl font-display font-bold tracking-widest uppercase ${greetingIndex === GREETINGS.length - 1 ? 'final-greeting' : 'text-text-primary'}`}
        >
          {GREETINGS[greetingIndex]}
        </h1>
      </div>
    </div>
  );
};

export default PageTransition;
