"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { 
  Clock, 
  Network, 
  Package, 
  ShieldCheck, 
  FileCheck, 
  Globe,
  Star
} from "lucide-react";

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

const WhyUsSection = () => {
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
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -100, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
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

  const whyUsData = [
    { icon: Clock, title: "Time-Efficient Execution", description: "We deliver services with speed and precision, saving you time and effort." },
    { icon: Network, title: "Industry Network", description: "Strong connections ensure faster processing and smoother approvals." },
    { icon: Package, title: "One-Stop Solution", description: "From consulting to documentation to execution—everything under one roof." },
    { icon: ShieldCheck, title: "Trust & Reliability", description: "We’ve built long-standing trust with clients and authorities alike." },
    { icon: FileCheck, title: "Comprehensive Documentation", description: "Every step documented, every detail aligned with compliance." },
    { icon: Globe, title: "Business Expansion Support", description: "Expert guidance to grow your business or project footprint." },
  ];

  return (
    <motion.section
      id="why-us"
      ref={ref}
      className="relative py-24 sm:py-36 min-h-screen flex items-center bg-gradient-to-br from-emerald-50 via-teal-50 via-blue-50 to-purple-50 overflow-hidden text-gray-900"
    >
      {/* Background elements */}
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
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="h-full w-full bg-gradient-to-r from-emerald-600 to-blue-600"
          style={{
            backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
          animate={{ backgroundPosition: ['0px 0px', '50px 50px'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <FloatingParticles />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-xl mx-auto text-center"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-emerald-600 bg-emerald-100 py-2 px-4 rounded-full">
              <Star className="w-4 h-4" />
              Why Choose Us?
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight"
          >
            The Yanik Associates Advantage
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-700 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Our core values and strategic approach set us apart, ensuring a partnership built for success.
          </motion.p>
        </motion.div>

        {/* Horizontal Scrollable Grid */}
        <motion.div 
          className="flex gap-6 lg:gap-8 overflow-x-auto p-4 lg:p-6 no-scrollbar"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {whyUsData.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -15,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              }}
              className="group flex-shrink-0 w-80 lg:w-96 bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/50 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <motion.div
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                >
                  <item.icon className="w-6 h-6" />
                </motion.div>
                <h3 className="ml-4 text-xl font-bold text-gray-800">{item.title}</h3>
              </div>
              <p className="text-gray-600 text-base leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WhyUsSection;