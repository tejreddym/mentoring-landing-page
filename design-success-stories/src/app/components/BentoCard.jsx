import { motion } from "motion/react";

export function BentoCard({ children, className = "", delay = 0, glassOpacity = "medium" }) {
    const glassClasses = {
        light: "bg-white/30 backdrop-blur-md border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]",
        medium: "bg-white/50 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]",
        heavy: "bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]",
    };

    return (
        <motion.div
            className={`relative rounded-[2.5rem] overflow-hidden ${glassClasses[glassOpacity]} ${className}`}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.22, 1, 0.36, 1]
            }}
            whileHover={{ y: -5, transition: { duration: 0.4 } }}
        >
            {/* Organic Light sheen on top */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-80" />

            {/* Subtler inner border */}
            <div className="absolute inset-0 rounded-[2.5rem] border border-white/20 pointer-events-none" />

            {children}
        </motion.div>
    );
}
