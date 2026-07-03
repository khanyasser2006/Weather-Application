import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function TextReveal({ 
  text, 
  className = "", 
  delay = 0, 
  stagger = 0.08,
  duration = 0.5 
}) {
  const [played, setPlayed] = useState(true);

  useEffect(() => {
    // Check if intro has already played
    if (!sessionStorage.getItem('skyora-intro-played')) {
      setPlayed(false);
    }
  }, []);

  if (played) {
    return <span className={className}>{text}</span>;
  }

  // Split into words, preserving spaces
  const words = text.split(' ').map((word, i, arr) => (
    i === arr.length - 1 ? word : word + '\u00A0'
  ));

  const containerVariant = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: stagger
      }
    }
  };

  const wordVariant = {
    hidden: { y: "110%", opacity: 0 },
    visible: { 
      y: "0%", 
      opacity: 1, 
      transition: { 
        duration: duration, 
        ease: [0.25, 0.1, 0.25, 1] // Premium ease (Apple-like)
      } 
    }
  };

  return (
    <motion.span 
      className={`inline-flex flex-wrap ${className}`}
      variants={containerVariant}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span 
            className="inline-block" 
            variants={wordVariant}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
