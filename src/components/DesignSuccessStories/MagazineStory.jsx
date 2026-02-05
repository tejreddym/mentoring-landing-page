import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";





export function MagazineStory({ story, index }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"]
  });

  const isEven = index % 2 === 0;
  
  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scaleImage = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 0.95]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once, margin: "-200px" }}
      transition={{ duration: 1 }}
      className="relative"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
        isEven ? "" : "lg:grid-flow-dense"
      }`}>
        {/* Image Section - Full Bleed */}
        <motion.div
          className={`lg:col-span-7 relative ${isEven ? "" : "lg:col-start-6"}`}
          style={{ y: imageY }}
        >
          <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
            {/* Color accent bar */}
            <motion.div
              className={`absolute top-0 left-0 w-2 h-full ${story.color} z-20`}
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />

            {/* Portrait Image */}
            <motion.div
              className="absolute inset-0"
              style={{ scale: scaleImage }}
            >
              <img
                src={story.image}
                alt={story.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Floating Metric Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className={`absolute ${isEven ? "bottom-8 right-8" : "bottom-8 left-8"} ${story.color} p-6 md:p-8`}
            >
              <div className="text-5xl md:text-7xl font-black text-white leading-none">
                {story.metric}
              </div>
              <div className="text-xs md:text-sm text-white/80 uppercase tracking-wider font-mono mt-2">
                {story.metricLabel}
              </div>
            </motion.div>

            {/* Number Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className={`absolute ${isEven ? "top-8 left-8" : "top-8 right-8"} text-white/5 text-[12rem] font-black leading-none`}
              style={{ fontFamily: "Arial Black, sans-serif" }}
            >
              {(index + 1).toString().padStart(2, '0')}
            </motion.div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          className={`lg:col-span-5 ${isEven ? "" : "lg:col-start-1 lg:row-start-1"} space-y-8`}
          style={{ y: textY }}
        >
          {/* Quote - Large Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-8">
              <span className="text-white/20">"</span>
              {story.quote.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.03 }}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
              <span className="text-white/20">"</span>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className={`h-1 ${story.color}`}
          />

          {/* Author Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="space-y-2"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              {story.name}
            </h3>
            <p className="text-base md:text-lg text-gray-400">
              {story.title}
            </p>
            <p className="text-sm text-gray-500 uppercase tracking-wider font-mono">
              {story.company}
            </p>
          </motion.div>

          {/* Impact Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pt-4"
          >
            <div className="flex items-start gap-4">
              <div className={`w-1 h-20 ${story.color} mt-1`} />
              <div>
                <div className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-mono">
                  Key Impact
                </div>
                <div className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed">
                  {story.impact}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1 }}
            className="flex items-center gap-4 pt-8"
          >
            <div className="w-12 h-px bg-white/20" />
            <span className="text-xs text-gray-600 font-mono">
              {(index + 1).toString().padStart(2, '0')} / 04
            </span>
            <div className="flex-1 h-px bg-white/5" />
          </motion.div>
        </motion.div>
      </div>

      {/* Background Text Element */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute -z-10 top-1/2 -translate-y-1/2 left-0 right-0 overflow-hidden pointer-events-none"
      >
        <div
          className="text-[20rem] md:text-[30rem] font-black text-white/[0.02] leading-none whitespace-nowrap"
          style={{ fontFamily: "Arial Black, sans-serif" }}
        >
          SUCCESS
        </div>
      </motion.div>
    </motion.div>
  );
}
