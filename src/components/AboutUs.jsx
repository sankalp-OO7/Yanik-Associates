"use client";
import { useEffect, useRef ,useState} from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { 
  Building, 
  MapPin, 
  Handshake, 
  File, 
  Rocket, 
  GraduationCap, 
  Users,
  Star
} from "lucide-react";

// Floating particles component (copied from HeroSection)
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

const AboutUsSection = () => {
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
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      }
    }
  };

  const textItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      }
    }
  };

  const bulletVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
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
      id="about"
      ref={ref}
      className="relative py-16 sm:py-24 min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 via-blue-50 to-purple-50 overflow-hidden"
    >
      {/* Dynamic Gradient Orbs (copied from HeroSection) */}
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

      {/* Animated Grid Background (copied from HeroSection) */}
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

      {/* Floating Particles (copied from HeroSection) */}
      <FloatingParticles />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Section Header */}
          <motion.div variants={textItemVariants} className="mb-4">
            <span className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-emerald-600 bg-emerald-100 py-2 px-4 rounded-full">
              <Users className="w-4 h-4" />
              About Us
            </span>
          </motion.div>
          
          <motion.h2 
            variants={textItemVariants} 
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight"
          >
            We are more than just a consultancy.
          </motion.h2>

          {/* Slogan */}
          <motion.p
            variants={textItemVariants}
            className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 mb-8"
          >
            “A firm proudly operated by the Chinchansure brothers”
          </motion.p>

          {/* Main Description */}
          <motion.p
            variants={textItemVariants}
            className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Established in 2017 and headquartered in Pune, Yanik Associates is a multi-sector 
            consultancy firm delivering exceptional services across Maharashtra. Our commitment 
            is built on trust, efficiency, and professionalism — ensuring every project we handle 
            exceeds expectations.
          </motion.p>
        </motion.div>

        {/* Core Values & Specialties Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Value 1: Commitment */}
          <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-xl border border-white/50 group">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mb-4 transition-all group-hover:scale-110">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Our Commitment</h3>
            <p className="text-gray-600">
              Built on trust, efficiency, and professionalism, we ensure every project exceeds expectations.
            </p>
          </motion.div>
          
          {/* Value 2: Headquartered in Pune */}
          <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-xl border border-white/50 group">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 mb-4 transition-all group-hover:scale-110">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Local Expertise</h3>
            <p className="text-gray-600">
              Proudly headquartered in Pune and delivering exceptional services throughout Maharashtra since 2017.
            </p>
          </motion.div>
          
          {/* Value 3: Diverse Services */}
          <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-xl border border-white/50 group">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-50 text-purple-600 mb-4 transition-all group-hover:scale-110">
              <Handshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Multi-Sector Focus</h3>
            <p className="text-gray-600">
              A multi-sector consultancy offering services from land records to cutting-edge IT solutions.
            </p>
          </motion.div>
        </motion.div>

        {/* Specialties Section */}
        <motion.div
          className="mt-16 text-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h3 
            variants={textItemVariants} 
            className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6"
          >
            Our Areas of Expertise
          </motion.h3>
          <motion.div 
            className="flex flex-wrap justify-center gap-3 md:gap-4"
            variants={containerVariants}
          >
            {[
              { text: 'Land Record Management', icon: File, color: 'text-emerald-600', bg: 'bg-emerald-100' },
              { text: 'Infrastructure', icon: Building, color: 'text-blue-600', bg: 'bg-blue-100' },
              { text: 'Liaisoning', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
              { text: 'Real Estate', icon: MapPin, color: 'text-teal-600', bg: 'bg-teal-100' },
              { text: 'Education Sector Consulting', icon: GraduationCap, color: 'text-yellow-600', bg: 'bg-yellow-100' },
              { text: 'IT Services', icon: Rocket, color: 'text-pink-600', bg: 'bg-pink-100' },
            ].map((specialty, index) => (
              <motion.div
                key={index}
                variants={bulletVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`flex items-center gap-2 ${specialty.bg} py-2 px-4 rounded-full font-medium text-sm sm:text-base`}
              >
                <specialty.icon className={`w-4 h-4 ${specialty.color}`} />
                <span className={specialty.color}>{specialty.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutUsSection;