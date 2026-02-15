import React from 'react';
import { motion } from 'framer-motion';

const CrossSpinner: React.FC<{ size?: number; color?: string }> = ({ size = 40, color = 'currentColor' }) => {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Vertical Bar */}
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute rounded-full"
        style={{ width: size * 0.1, height: size, backgroundColor: color }}
      />
      {/* Horizontal Bar */}
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        className="absolute rounded-full"
        style={{ width: size, height: size * 0.1, top: size * 0.35, backgroundColor: color }}
      />
      
      {/* Outer Glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute rounded-full blur-xl"
        style={{ width: size * 1.5, height: size * 1.5, backgroundColor: color }}
      />
    </div>
  );
};

export default CrossSpinner;
