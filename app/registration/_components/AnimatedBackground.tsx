"use client"
import React, {  } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div 
      className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 8, repeat: Infinity }}
    />
    <motion.div 
      className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
      animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
      transition={{ duration: 10, repeat: Infinity }}
    />
    <motion.div 
      className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"
      animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.6, 0.4] }}
      transition={{ duration: 12, repeat: Infinity }}
    />
  </div>
);

export default AnimatedBackground;