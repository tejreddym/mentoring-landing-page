import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { SuccessCard3D } from "@/app/components/SuccessCard3D";





export function VerticalFeed({ stories }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseY = useMotionValue(0);

  // Auto-scroll effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stories.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, stories.length]);

  // Handle mouse movement for subtle 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    mouseY.set(y - rect.height / 2);
  };

  // Calculate which cards to show (previous, current, next, and some buffer)
  const getVisibleCards = () => {
    const visible = [];
    for (let i = -3; i <= 3; i++) {
      const index = (currentIndex + i + stories.length) % stories.length;
      visible.push({
        story,
        offset,
        originalIndex: index
      });
    }
    return visible;
  };

  const visibleCards = getVisibleCards();

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{
        perspective: "2000px",
        perspectiveOrigin: "50% 40%"
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient Light Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-200/30 via-purple-200/20 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* 3D Card Stack */}
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence mode="sync">
          {visibleCards.map(({ story, offset, originalIndex }) => (
            <SuccessCard3D
              key={`${story.id}-${originalIndex}-${currentIndex}`}
              story={story}
              offset={offset}
              isCenter={offset === 0}
              mouseY={mouseY}
              onClick={() => {
                if (offset !== 0) {
                  const newIndex = (currentIndex + offset + stories.length) % stories.length;
                  setCurrentIndex(newIndex);
                }
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        <motion.button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length)}
          className="w-12 h-12 rounded-full backdrop-blur-xl bg-white/40 border border-white/20 flex items-center justify-center text-gray-600 hover:bg-white/60 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rotate-90">
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>

        <motion.button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % stories.length)}
          className="w-12 h-12 rounded-full backdrop-blur-xl bg-white/40 border border-white/20 flex items-center justify-center text-gray-600 hover:bg-white/60 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="-rotate-90">
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </div>

      {/* Progress Indicators */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {stories.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="relative group"
          >
            <div className={`w-1 h-8 rounded-full transition-all ${
              index === currentIndex 
                ? "bg-gray-900" 
                : "bg-gray-300 hover:bg-gray-400"
            }`} />
            {index === currentIndex && !isPaused && (
              <motion.div
                className="absolute inset-0 bg-blue-500 rounded-full"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 4, ease: "linear" }}
                style={{ transformOrigin: "top" }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Pause Indicator */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 backdrop-blur-xl bg-white/40 rounded-full px-6 py-3 border border-white/20"
          >
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Paused
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
