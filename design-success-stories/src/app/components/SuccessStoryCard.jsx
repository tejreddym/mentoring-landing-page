import { motion } from "motion/react";
import { useState } from "react";





export function SuccessStoryCard({ story, variant, index }) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    large: "min-h-[600px]",
    medium: "min-h-[400px]",
    compact: "min-h-[350px]"
  };

  return (
    <motion.div
      className={`relative ${sizeClasses[variant]} rounded-[40px] overflow-hidden group cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Glassmorphic Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${story.bgColor} backdrop-blur-sm`} />
      
      {/* Organic Border Effect */}
      <motion.div
        className="absolute inset-0 rounded-[40px] border border-white/40"
        style={{
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)"
        }}
      />

      {/* Soft Glow Effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 70%)"
        }}
        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
      />

      {/* Content Container */}
      <div className="relative h-full p-8 md:p-12 flex flex-col">
        {/* Portrait Image - Editorial Cutout Style */}
        <motion.div
          className={`absolute ${
            variant === "large" 
              ? "right-0 top-0 w-[45%] h-full" 
               === "medium"
              ? "right-0 bottom-0 w-[50%] h-[70%]"
              : "right-0 bottom-0 w-full h-[60%]"
          } overflow-hidden`}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="relative w-full h-full"
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={story.image}
              alt={story.name}
              className="w-full h-full object-cover object-top mix-blend-multiply opacity-90"
              style={{
                maskImage === "compact" 
                  ? "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.8) 70%, transparent 100%)"
                  : "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.9) 50%)"
              }}
            />
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <div className={`relative z-10 flex flex-col ${variant === "large" ? "max-w-[50%]" : "max-w-[55%]"} space-y-6`}>
          {/* Quote */}
          <motion.blockquote
            className={`${
              variant === "large" 
                ? "text-2xl md:text-3xl" 
                 === "medium"
                ? "text-xl md:text-2xl"
                : "text-lg md:text-xl"
            } font-light text-gray-800 leading-relaxed tracking-tight`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
          >
            "{story.quote}"
          </motion.blockquote>

          {/* Author Info */}
          <motion.div
            className="mt-auto pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
          >
            <div className="space-y-1">
              <p className="text-base md:text-lg font-medium text-gray-900 tracking-tight">
                {story.name}
              </p>
              <p className="text-sm text-gray-500 font-light tracking-wide">
                {story.role}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Decorative Element */}
        <motion.div
          className="absolute bottom-8 left-8 w-12 h-[1px] bg-gradient-to-r from-gray-400 to-transparent opacity-40"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? 80 : 48 }}
          transition={{ duration: 0.6 }}
        />
      </div>
    </motion.div>
  );
}
