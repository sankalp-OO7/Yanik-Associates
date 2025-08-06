"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  Sparkles, 
  Building, 
  GraduationCap, 
  Server, 
  Users, 
  ArrowRight,
  Star,
  Zap,
  Shield,
  Award,
  TrendingUp,
  Heart,
  Code,
  Database,
  Cloud,
  Cpu,
  Lock,
  Layers,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Rocket
} from "lucide-react";

// Animated text component for letter-by-letter animation
const AnimatedText = ({ text, className, delay = 0 }) => {
  const letters = text.split("");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay }
    })
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          variants={child}
          key={index}
          className="inline-block"
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// 3D Card component with hover effects
const Card3D = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    setMousePosition({ x: rotateY, y: rotateX });
  };

  return (
    <motion.div
      ref={ref}
      className={`transform-gpu ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      animate={{
        rotateX: isHovered ? mousePosition.y : 0,
        rotateY: isHovered ? mousePosition.x : 0,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="relative"
        animate={{
          z: isHovered ? 30 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Floating particles component
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

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentWord, setCurrentWord] = useState(0);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const isInView = useInView(heroRef, { once: true });
  
  const y = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  const words = ["Innovative", "Revolutionary", "Advanced", "Cutting-edge"];
  
  const services = [
    { 
      icon: Building, 
      title: "Infrastructure", 
      desc: "Complete project solutions & smart city development", 
      gradient: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700"
    },
    { 
      icon: GraduationCap, 
      title: "Education", 
      desc: "Digital learning platforms & institutional consulting", 
      gradient: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700"
    },
    { 
      icon: Server, 
      title: "IT Services", 
      desc: "Cloud, AI, blockchain & digital transformation", 
      gradient: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700"
    },
    { 
      icon: Users, 
      title: "Partnerships", 
      desc: "Government relations & strategic liaisoning", 
      gradient: "from-teal-500 to-cyan-600",
      bgColor: "bg-teal-50",
      textColor: "text-teal-700"
    }
  ];

  const features = [
    { icon: Zap, text: "Lightning Fast", color: "text-emerald-600", bg: "bg-emerald-100" },
    { icon: Shield, text: "100% Secure", color: "text-blue-600", bg: "bg-blue-100" },
    { icon: Award, text: "Award Winning", color: "text-purple-600", bg: "bg-purple-100" },
    { icon: TrendingUp, text: "Growth Focused", color: "text-teal-600", bg: "bg-teal-100" }
  ];

  const techStack = [
    { icon: Code, name: "Custom Development", color: "text-emerald-600", bg: "bg-emerald-50" },
    { icon: Database, name: "Big Data Solutions", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: Cloud, name: "Cloud Infrastructure", color: "text-cyan-600", bg: "bg-cyan-50" },
    { icon: Cpu, name: "AI & Machine Learning", color: "text-purple-600", bg: "bg-purple-50" },
    { icon: Lock, name: "Cybersecurity", color: "text-teal-600", bg: "bg-teal-50" },
    { icon: Layers, name: "System Integration", color: "text-violet-600", bg: "bg-violet-50" }
  ];

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mounted]);


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
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
    <div 
      ref={heroRef}
      className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 via-blue-50 to-purple-50 mt-13 overflow-hidden"
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
        <motion.div
          className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-r from-teal-300 to-emerald-300 rounded-full opacity-15 blur-3xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 3 }}
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

      {/* Mouse Follower */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full pointer-events-none z-50 mix-blend-multiply"
        animate={{
          x: mounted ? mousePosition.x - 12 : -100,
          y: mounted ? mousePosition.y - 12 : -100,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200
        }}
      />

      {/* Floating Particles */}
      <FloatingParticles />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20"
      >
        {/* Top Badge */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex justify-center mb-8 lg:mb-12"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-xl px-6 py-3 rounded-full shadow-xl border border-white/50"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-emerald-600" />
            </motion.div>
            <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              Trusted Excellence Since 2017
            </span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto text-center">
          {/* Dynamic Headline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-6 lg:mb-8"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black leading-tight text-gray-900"
            >
              <div className="mb-2 lg:mb-4">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWord}
                    initial={{ opacity: 0, y: 20, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -20, rotateX: 90 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600"
                  >
                    {words[currentWord]}
                  </motion.span>
                </AnimatePresence>
                <span className="text-gray-800 ml-4">Solutions.</span>
              </div>
              
              <div className="mb-2 lg:mb-4">
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Seamless Services.
                </motion.span>
              </div>
              
              <div>
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-purple-600"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Trusted Partnerships.
                </motion.span>
              </div>
            </motion.h1>
          </motion.div>

          {/* Enhanced Subheading */}
          <motion.div
            variants={itemVariants}
            className="mb-8 lg:mb-12"
          >
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 font-medium max-w-4xl mx-auto leading-relaxed">
              Empowering progress across{" "}
              <motion.span 
                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600"
                whileHover={{ scale: 1.1 }}
              >
                infrastructure
              </motion.span>
              ,{" "}
              <motion.span 
                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600"
                whileHover={{ scale: 1.1 }}
              >
                education
              </motion.span>
              ,{" "}
              <motion.span 
                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-600"
                whileHover={{ scale: 1.1 }}
              >
                real estate
              </motion.span>
              , and{" "}
              <motion.span 
                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600"
                whileHover={{ scale: 1.1 }}
              >
                technology
              </motion.span>
              {" "}— with speed, clarity, and integrity.
            </p>
          </motion.div>

        
          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center mb-12 lg:mb-16"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.5)" 
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl flex items-center gap-3"
            >
              <span className="relative z-10">Get in Touch</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative z-10"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderColor: "rgba(16, 185, 129, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/80 backdrop-blur-xl text-gray-700 px-8 py-4 rounded-full font-bold text-lg shadow-xl border border-white/50 flex items-center gap-3 hover:text-emerald-600 transition-colors"
            >
              Explore Services
              <motion.div
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Services Grid */}
      
          {/* Tech Stack */}
         
        </div>
      </motion.div>
    </div>
  );
};
export default HeroSection;