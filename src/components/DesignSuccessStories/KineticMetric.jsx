import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";



export function KineticMetric({ value, label, color }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [-200, 200]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);

  return (
    <div ref={ref} className="relative h-64 overflow-hidden flex items-center justify-center">
      {/* Animated Background Lines */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-white"
            style={{
              top: `${i * 5}%`,
              left: 0,
              right: 0
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 3,
              repeat,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Metric Display */}
      <motion.div
        style={{ x, rotate, scale }}
        className="relative"
      >
        {/* Shadow layers for depth */}
        <motion.div
          className="absolute inset-0 blur-xl"
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat,
            ease: "easeInOut"
          }}
        >
          <div className={`text-[12rem] md:text-[18rem] font-black ${color} opacity-50`}>
            {value}
          </div>
        </motion.div>

        {/* Main text */}
        <div className="relative">
          <motion.div
            className="text-[12rem] md:text-[18rem] font-black text-white leading-none"
            style={{ fontFamily: "Arial Black, sans-serif" }}
            animate={{
              textShadow: [
                "0 0 0px rgba(255,255,255,0)",
                "0 0 30px rgba(255,255,255,0.5)",
                "0 0 0px rgba(255,255,255,0)"
              ]
            }}
            transition={{
              duration: 2,
              repeat,
              ease: "easeInOut"
            }}
          >
            {value}
          </motion.div>

          {/* Label */}
          <motion.div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm uppercase tracking-[0.3em] text-gray-500 font-mono">
              {label}
            </span>
          </motion.div>
        </div>

        {/* Accent bar */}
        <motion.div
          className={`absolute -bottom-12 left-0 h-1 ${color}`}
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </motion.div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 ${color} rounded-full`}
          style={{
            left: `${20 + i * 10}%`,
            top: "50%"
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
