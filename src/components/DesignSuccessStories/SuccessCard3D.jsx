import { motion, MotionValue, useTransform } from "framer-motion";
import { useState } from "react";





export function SuccessCard3D({ story, offset, isCenter, mouseY, onClick }: SuccessCard3DProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate Z-position based on offset from center
  const getZTransform = () => {
    if (offset === 0) return 200; // Hero card pushed forward
    const distance = Math.abs(offset);
    return -distance * 150; // Cards pushed back exponentially
  };

  // Calculate Y-position for vertical scrolling effect
  const getYTransform = () => {
    return offset * 180; // Vertical spacing
  };

  // Calculate scale based on distance from center
  const getScale = () => {
    if (offset === 0) return 1; // Hero card at full size
    const distance = Math.abs(offset);
    return Math.max(0.4, 1 - distance * 0.25); // Smaller as distance increases
  };

  // Calculate opacity and blur based on distance
  const getOpacity = () => {
    if (offset === 0) return 1; // Hero card fully opaque
    const distance = Math.abs(offset);
    return Math.max(0.2, 1 - distance * 0.3);
  };

  const getBlur = () => {
    if (offset === 0) return 0; // Hero card sharp
    const distance = Math.abs(offset);
    return Math.min(20, distance * 8); // Heavy blur for distant cards
  };

  // Subtle rotation based on mouse position
  const rotateX = useTransform(mouseY, [-300, 300], isCenter ? [2, -2] : [0, 0]);

  const zTransform = getZTransform();
  const yTransform = getYTransform();
  const scale = getScale();
  const opacity = getOpacity();
  const blur = getBlur();

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        rotateX,
        translateZ,
        translateY,
        scale,
        opacity,
        filter: `blur(${blur}px)`,
        transformStyle: "preserve-3d"
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity, 
        scale,
        translateZ,
        translateY: yTransform
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 0.6 }
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Backlight Glow for Center Card */}
      {isCenter && (
        <motion.div
          className="absolute -inset-8 bg-gradient-radial from-blue-400/40 via-purple-400/20 to-transparent rounded-[48px] blur-2xl"
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 3,
            repeat,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Main Card */}
      <motion.div
        className="relative w-[480px] h-[280px] rounded-3xl overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden"
        }}
        whileHover={isCenter ? { scale: 1.02 } : {}}
        transition={{ duration: 0.4 }}
      >
        {/* Glassmorphic Background */}
        <div className="absolute inset-0 backdrop-blur-2xl bg-white/70 border border-white/40">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/30 to-white/10" />
        </div>

        {/* Frosted glass texture */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }}
        />

        {/* Content Container */}
        <div className="relative h-full flex">
          {/* Left Side - Image */}
          <div className="w-[45%] relative overflow-hidden">
            <motion.div
              className="absolute inset-0"
              animate={isCenter ? {
                scale: isHovered ? 1.05 : 1
              } : {}}
              transition={{ duration: 0.6 }}
            >
              <img
                src={story.image}
                alt={story.name}
                className="w-full h-full object-cover"
              />
              {/* Image gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/80" />
            </motion.div>

            {/* Decorative corner accent */}
            <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-transparent" />
          </div>

          {/* Right Side - Content */}
          <div className="flex-1 p-8 flex flex-col justify-between relative">
            {/* Metric Badge */}
            <motion.div
              className="inline-flex items-center gap-2 self-start"
              animate={isCenter ? {
                scale: [1, 1.05, 1],
              } : {}}
              transition={{
                duration: 2,
                repeat,
                ease: "easeInOut"
              }}
            >
              <div className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 backdrop-blur-xl border border-white/20">
                <div className="text-2xl font-black text-white tracking-tight">
                  {story.metric}
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <div className="space-y-3">
              <p className="text-base text-gray-700 leading-relaxed font-light">
                {story.description}
              </p>
              
              {/* Author Info */}
              <div className="pt-2 border-t border-gray-300/30">
                <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                  {story.name}
                </h3>
                <p className="text-sm text-gray-600 font-light mt-0.5">
                  {story.title}
                </p>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1 font-medium">
                  {story.company}
                </p>
              </div>
            </div>

            {/* Shimmer effect for center card */}
            {isCenter && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: [-500, 500]
                }}
                transition={{
                  duration: 3,
                  repeat,
                  repeatDelay: 2,
                  ease: "easeInOut"
                }}
                style={{
                  maskImage: "linear-gradient(to right, transparent, black, transparent)"
                }}
              />
            )}
          </div>
        </div>

        {/* Soft Shadow for depth */}
        <div 
          className="absolute -inset-1 -z-10 bg-black/5 rounded-3xl blur-xl"
          style={{
            transform: `translateZ(-10px)`
          }}
        />

        {/* Border highlight */}
        {isCenter && (
          <motion.div
            className="absolute inset-0 rounded-3xl border-2 border-white/60"
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
