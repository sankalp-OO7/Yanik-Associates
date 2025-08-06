"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { CheckCircle, Handshake, MessageSquare } from "lucide-react";

// Floating particles component (copied for consistent background)
const FloatingParticles = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mounted, setMounted] = useState(false);
  const particleCount = 15;

  useEffect(() => {
    setMounted(true);
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  if (!mounted || dimensions.width === 0) return null;

  const particles = Array.from({ length: particleCount }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 opacity-30"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            y: [null, -150, null],
            x: [null, Math.random() * 100 - 50, null],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: Math.random() * 10 + 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

const ObjectiveSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 70, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      rotate: [0, 360],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  const objectives = [
    {
      icon: CheckCircle,
      title: "Deliver Transparent Solutions",
      description: "Provide transparent, dependable, and efficient solutions tailored to our clients' unique needs.",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: Handshake,
      title: "Build a Strong Network",
      description: "Build and sustain a strong industry network for smooth liaisoning and timely project execution.",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: MessageSquare,
      title: "Facilitate Seamless Communication",
      description: "Facilitate effective communication between clients and regulatory authorities, ensuring seamless compliance and operational excellence.",
      color: "text-purple-600",
      bg: "bg-purple-50",
    }
  ];

  return (
    <motion.section
      id="objectives"
      ref={ref}
      className="relative py-24 sm:py-36 min-h-screen flex items-center bg-gradient-to-br from-emerald-50 via-teal-50 via-blue-50 to-purple-50 overflow-hidden"
    >
      {/* Dynamic Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full opacity-20 blur-3xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute top-1/3 -right-32 w-80 h-80 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full opacity-25 blur-3xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div
          className="absolute -bottom-32 left-1/3 w-72 h-72 bg-gradient-to-r from-purple-300 to-violet-300 rounded-full opacity-20 blur-3xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
      </div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="h-full w-full bg-gradient-to-r from-emerald-600 to-blue-600"
          style={{
            backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>
      
      {/* Floating Particles */}
      <FloatingParticles />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-xl mx-auto text-center"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-blue-600 bg-blue-100 py-2 px-4 rounded-full">
              <CheckCircle className="w-4 h-4" />
              Our Mission
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-12 leading-tight"
          >
            Our Mission is Clear, Our Vision is Strong
          </motion.h2>
        </motion.div>

        {/* Objectives Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12 max-w-6xl mx-auto"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {objectives.map((objective, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -15,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                rotate: [0, 1, -1, 0]
              }}
              className={`bg-white/80 backdrop-blur-xl p-8 sm:p-12 rounded-3xl shadow-xl border border-white/50 group text-center cursor-pointer`}
            >
              <div className="flex justify-center mb-6">
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${objective.bg} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <objective.icon className={`w-10 h-10 ${objective.color}`} />
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{objective.title}</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                {objective.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ObjectiveSection;