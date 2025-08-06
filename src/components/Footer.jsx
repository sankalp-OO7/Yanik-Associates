'use client'; // This component uses Framer Motion, so it needs to be a client component

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image'; // Import the Image component
import Logo from '../../public/logo.png'; // Import your logo image

// --- Framer Motion Variants ---

// Variants for the overall footer section
const footerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

// Variants for the sun-like semicircle animation
const semicircleVariants = {
  hidden: { scale: 0, opacity: 0, rotate: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 360, // Full rotation
    transition: {
      duration: 25, // Long duration for subtle continuous animation
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

// Variants for the copyright text animation
const copyrightVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
};

// Variants for the logo/icon animation
const logoVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring", // Bouncy effect
      stiffness: 120,
      damping: 15,
    },
  },
  pulse: {
    scale: [1, 1.05, 1], // Subtle pulse effect
    opacity: [1, 0.9, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1.5, // Start pulsing after initial animation
    },
  },
};


// --- Footer Component ---
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      // Changed background to a consistent light theme with subtle gradient
      className="relative w-full py-8 md:py-12 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 text-gray-800 shadow-xl mt-0 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={footerVariants}
    >
      {/* Sun-like Semicircle Effect - Adjusted for a more subtle glow on this lighter background */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[180vw] h-[90vw] md:w-[140vw] md:h-[70vw]
                   rounded-t-full bg-gradient-to-t from-green-300/30 to-blue-300/0
                   filter blur-3xl opacity-40 z-0
                   animate-pulse-slow"
        variants={semicircleVariants}
        initial="hidden"
        animate="visible"
        style={{
          borderTopLeftRadius: '50% 100%',
          borderTopRightRadius: '50% 100%',
          transformOrigin: 'bottom center',
        }}
      />

      {/* Subtle Background Grid Pattern - Adjusted opacity and color for light background */}
      <div
        className="absolute inset-0 z-0 opacity-2"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          backgroundBlendMode: 'overlay',
        }}
      />

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center">
        {/* Logo/Icon Section - Changed background to a lighter blue gradient for contrast */}
        <motion.div
          className="p-3 rounded-full bg-gradient-to-br from-green-100 to-blue-300 shadow-lg flex items-center justify-center mb-4"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          whileInView="pulse"
          viewport={{ once: true, amount: 0.5 }}
        >
          {/* Use the Image component for the logo */}
          <Image src={Logo} alt="Yanik Associates Logo" width={60} height={60} priority />
        </motion.div>

        {/* Copyright Text - Changed to dark gray for high contrast */}
        <motion.span
          className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 via-green-500 to-blue-500 text-lg md:text-xl font-bold tracking-wide"
          variants={copyrightVariants}
        >
          © {currentYear} Yanik Associates. All rights reserved.
        </motion.span>

        {/* Subtle Separator Line - Changed to a distinct blue for effect */}
        <motion.div
          className="w-32 h-1.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mt-6 mb-4 shadow-md"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
        />
      </div>
    </motion.footer>
  );
};