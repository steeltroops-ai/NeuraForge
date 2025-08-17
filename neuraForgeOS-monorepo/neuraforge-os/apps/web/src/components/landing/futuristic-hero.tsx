'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { 
  Cpu, 
  ArrowRight, 
  Zap, 
  Orbit, 
  Workflow, 
  Stars,
  Play,
  ChevronDown
} from 'lucide-react'
import { FuturisticButton } from '@/components/ui/futuristic-button'
import { NeuralCard, CardContent } from '@/components/ui/neural-card'

// Floating Particle Component
const FloatingParticle = ({ delay = 0, duration = 20 }) => {
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <motion.div
      className="absolute w-1 h-1 bg-neural-400 rounded-full opacity-60"
      initial={{ 
        x: Math.random() * windowSize.width,
        y: windowSize.height + 100,
        opacity: 0 
      }}
      animate={{
        y: -100,
        opacity: [0, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

// Neural Network Background
const NeuralNetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Neural network nodes
    const nodes: Array<{ x: number; y: number; vx: number; vy: number }> = [];
    const nodeCount = 50;

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Draw connections
        nodes.forEach((otherNode, j) => {
          if (i !== j) {
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
              const opacity = (150 - distance) / 150 * 0.1;
              ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(otherNode.x, otherNode.y);
              ctx.stroke();
            }
          }
        });

        // Draw node
        ctx.fillStyle = 'rgba(99, 102, 241, 0.3)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-30"
    />
  );
};

// Stats Counter Component
const StatsCounter = ({ end, label, suffix = "" }: { end: number; label: string; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="text-4xl font-bold text-white mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-neutral-400 text-sm uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
};

// Main Hero Component
export const FuturisticHero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const ySpring = useSpring(y, springConfig);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-surface-background via-surface-primary to-surface-secondary">
      {/* Neural Network Background */}
      <NeuralNetworkBackground />
      
      {/* Floating Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <FloatingParticle 
          key={i} 
          delay={i * 2} 
          duration={15 + Math.random() * 10} 
        />
      ))}

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-neural-500/10 via-transparent to-quantum-500/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface-background/80" />

      {/* Main Content */}
      <motion.div
        style={{ y: ySpring, opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center"
      >
        {/* Announcement Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-neural-500 to-quantum-500 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-300" />
            <div className="relative flex items-center space-x-3 rounded-full bg-surface-glass backdrop-blur-xl px-6 py-3 text-sm font-medium text-white border border-white/10">
              <Stars className="h-4 w-4 text-neural-400" />
              <span>Introducing the Future of AI-Native Research</span>
              <ArrowRight className="h-4 w-4 text-neural-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-tight tracking-tight">
            <span className="block text-white">Neural</span>
            <span className="block bg-gradient-to-r from-neural-400 via-quantum-400 to-processing-400 bg-clip-text text-transparent">
              Research
            </span>
            <span className="block text-white">Ecosystem</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-4xl mx-auto text-xl md:text-2xl text-neutral-300 leading-relaxed mb-12"
        >
          Transform scientific discovery with{' '}
          <span className="text-neural-400 font-semibold">AI-powered insights</span>,{' '}
          <span className="text-quantum-400 font-semibold">quantum-speed collaboration</span>, and{' '}
          <span className="text-processing-400 font-semibold">neural research trees</span>.
          <br />
          <span className="text-white font-semibold">Join 50,000+ researchers</span> accelerating breakthrough discoveries.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
        >
          <Link href="/auth/register">
            <FuturisticButton
              variant="neural"
              size="xl"
              rightIcon={<ArrowRight className="h-6 w-6" />}
              glowEffect
              className="min-w-[200px]"
            >
              Start Research Journey
            </FuturisticButton>
          </Link>
          
          <Link href="#demo">
            <FuturisticButton
              variant="glass"
              size="xl"
              leftIcon={<Play className="h-6 w-6" />}
              className="min-w-[200px]"
            >
              Watch Neural Demo
            </FuturisticButton>
          </Link>
        </motion.div>

        {/* Feature Showcase Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {/* AI Processing Card */}
          <NeuralCard variant="neural" interactive glowEffect>
            <CardContent>
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-neural-500 to-neural-600 rounded-2xl shadow-glow">
                <Cpu className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Neural AI Processing
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                Advanced AI models generate hypotheses, discover patterns, and accelerate research with quantum-speed processing.
              </p>
            </CardContent>
          </NeuralCard>

          {/* Quantum Collaboration Card */}
          <NeuralCard variant="quantum" interactive>
            <CardContent>
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-quantum-500 to-quantum-600 rounded-2xl shadow-quantum">
                <Orbit className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Quantum Collaboration
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                Real-time synchronized workspaces connecting researchers globally with quantum-entangled data sharing.
              </p>
            </CardContent>
          </NeuralCard>

          {/* Neural Research Trees Card */}
          <NeuralCard variant="glass" interactive>
            <CardContent>
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-processing-500 to-processing-600 rounded-2xl shadow-processing">
                <Workflow className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Neural Research Trees
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                Version-controlled discovery workflows that preserve every hypothesis and experiment in neural networks.
              </p>
            </CardContent>
          </NeuralCard>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          <StatsCounter end={50000} label="Active Researchers" suffix="+" />
          <StatsCounter end={250000} label="Research Projects" suffix="+" />
          <StatsCounter end={1200} label="Institutions" suffix="+" />
          <StatsCounter end={99.9} label="Uptime" suffix="%" />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex flex-col items-center"
        >
          <span className="text-neutral-400 text-sm mb-4 uppercase tracking-wider">
            Discover More
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-6 w-6 text-neural-400" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-background to-transparent" />
    </section>
  );
};

export default FuturisticHero;