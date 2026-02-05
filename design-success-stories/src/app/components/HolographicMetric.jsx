import { motion } from "motion/react";



export function HolographicMetric({ value, label }) {
  return (
    <div className="relative group cursor-default perspective-1000">
      <motion.div
        className="relative z-10"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{
          scale: 1.1,
          rotateX: 10,
          rotateY: -10,
          transition: { duration: 0.4 }
        }}
      >
        {/* Main Number with 3D Shadow Layers */}
        <div className="relative font-bold text-7xl md:text-8xl tracking-tighter" style={{ fontFamily: "Inter, sans-serif" }}>
          {/* Back Shadow Layer (Depth) */}
          <span className="absolute top-1 left-1 bg-clip-text text-transparent bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-[2px] select-none" aria-hidden="true">
            {value}
          </span>

          {/* Middle Glow Layer */}
          <span className="absolute top-0 left-0 bg-clip-text text-transparent bg-gradient-to-br from-indigo-400/30 to-purple-400/30 blur-[8px] select-none" aria-hidden="true">
            {value}
          </span>

          {/* Front Layer - Metallic/Holographic Gradient */}
          <span
            className="relative bg-clip-text text-transparent bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500 select-none"
            style={{
              filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))"
            }}
          >
            {value}
          </span>

          {/* Shining Highlight Animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full h-full -skew-x-12"
            initial={{ x: "-150%" }}
            animate={{ x: "150%" }}
            transition={{
              repeat,
              repeatType: "loop",
              duration: 5,
              ease: "linear",
              delay: 1
            }}
            style={{ mixBlendMode: "overlay" }}
          />
        </div>

        {/* Label with Swiss Typography */}
        <motion.p
          className="mt-2 text-lg font-medium tracking-widest uppercase text-gray-500/80"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {label}
        </motion.p>
      </motion.div>

      {/* Ambient Floor Reflection/Glow */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-indigo-500/20 blur-[40px] rounded-full opacity-60 pointer-events-none" />
    </div>
  );
}
