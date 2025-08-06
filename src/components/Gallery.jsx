"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { 
  Code, 
  Sparkles, 
  Cloud, 
  Key, 
  Cpu, 
  Database, 
  TrendingUp,
  ArrowRight
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

const ITServicesSection = () => {
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
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
  
  const itServices = [
    { icon: Code, name: "Custom Software Development" },
    { icon: Cpu, name: "Artificial Intelligence Solutions" },
    { icon: Key, name: "Blockchain Integration" },
    { icon: Cloud, name: "Cloud Infrastructure Services" },
    { icon: Database, name: "Virtual Reality Experiences" },
  ];

  return (
    <motion.section
      id="it-services"
      ref={ref}
      className="relative py-24 sm:py-36 min-h-[70vh] flex items-center bg-gradient-to-br from-emerald-50 via-teal-50 via-blue-50 to-purple-50 overflow-hidden"
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
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left side: Content */}
          <motion.div 
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="text-center lg:text-left mb-12 lg:mb-0"
          >
            <motion.div variants={itemVariants} className="mb-4">
              <span className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-teal-600 bg-teal-100 py-2 px-4 rounded-full">
                <Sparkles className="w-4 h-4" />
                IT Services
              </span>
            </motion.div>
            
            <motion.h2 
              variants={itemVariants} 
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight"
            >
              Update software. <br /> Upgrade vision.
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-700 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Our IT wing leverages modern technologies to design and implement secure, scalable, and impactful solutions for the digital era, specializing in finance, banking, supply chain, and healthcare.
            </motion.p>
            
            <motion.button
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)"
              }}
              className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg flex items-center gap-3 mx-auto lg:mx-0"
            >
              <span className="relative z-10">Explore IT Solutions</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative z-10"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Right side: IT Services list */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/50"
          >
            <ul className="space-y-6">
              {itServices.map((service, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.03, 
                    x: 10,
                    backgroundColor: "rgba(16, 185, 129, 0.05)"
                  }}
                  className="flex items-start gap-4 p-4 rounded-xl transition-all duration-200 cursor-pointer"
                >
                  <motion.div
                    className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: index * 0.2 }}
                  >
                    <service.icon className="w-5 h-5" />
                  </motion.div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">{service.name}</h4>
                    <p className="text-sm text-gray-600">Secure, scalable, and impactful solutions tailored for your business needs.</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ITServicesSection;