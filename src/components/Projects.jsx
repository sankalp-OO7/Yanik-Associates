"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { 
  FileText, 
  HardHat, 
  GraduationCap, 
  Handshake, 
  Building,
} from "lucide-react";

// --- Service Data Refactored into a Constant ---
const SERVICES_DATA = [
  {
    icon: FileText,
    title: "Land Records Management",
    description: "Regularization, mutation, digitization, and consulting for land ownership and use.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: HardHat,
    title: "Infrastructure Projects",
    description: "Government and private infra-project consulting, clearances, and liaisoning.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: GraduationCap,
    title: "Educational Institutions",
    description: "Guidance and compliance support for starting or upgrading schools, colleges, and universities.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Handshake,
    title: "Liaisoning & Legal Consultation",
    description: "Fast-tracking approvals, permissions, and communication with government agencies.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: Building,
    title: "Real Estate & Industrial Projects",
    description: "Clearances, documentation, and compliance consulting for land, buildings, and industrial zones.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  }
];

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

const ServicesSection = () => {
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
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
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

  return (
    <motion.section
      id="services"
      ref={ref}
      className="relative py-24 sm:py-36 min-h-screen flex items-center bg-gradient-to-br from-emerald-50 via-teal-50 via-blue-50 to-purple-50 overflow-hidden"
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
            <span className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-purple-600 bg-purple-100 py-2 px-4 rounded-full">
              <HardHat className="w-4 h-4" />
              Our Services
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight"
          >
            End-to-End Solutions for Your Projects
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-700 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            We offer end-to-end consultation, documentation, and project execution across a diverse range of sectors to ensure success.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12 max-w-6xl mx-auto"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {SERVICES_DATA.map((service, index) => (
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
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${service.bg} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <service.icon className={`w-10 h-10 ${service.color}`} />
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{service.title}</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ServicesSection;