import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { X, Check, Star } from 'lucide-react';

const Pricing = () => {
    const [focusedIndex, setFocusedIndex] = useState(null);
    const containerRef = useRef(null);

    // Track scroll progress of the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const packs = [
        {
            id: 1,
            title: "Academic Success Pack",
            features: [
                "Stream & College Selection",
                "Career Guidance Sessions",
                "Parent Guidance Sessions"
            ],
            details: "3 sessions each with:",
            mentors: [
                "Student Buddy Mentor",
                "Admission Mentor"
            ],
            rotation: -3,
            x: -20,
            y: 0,
            color: "#FFF9C4" // Yellow
        },
        {
            id: 2,
            title: "Career & College Prep Pack",
            features: [
                "Stream & College Selection",
                "Career Guidance Sessions",
                "Parent Guidance Sessions"
            ],
            details: "2 sessions each with:",
            mentors: [
                "Student Buddy Mentor",
                "Career Mentor",
                "Admission Mentor",
                "Scholarship Mentor"
            ],
            rotation: 0,
            x: 0,
            y: 0,
            color: "#E1F5FE", // Blue
            recommended: true
        },
        {
            id: 3,
            title: "Premium All-Inclusive Pack",
            features: [
                "Stream & College Selection",
                "Career Guidance Sessions",
                "Parent Guidance Sessions"
            ],
            details: "2 sessions with ALL mentors:",
            mentors: [
                "Student Buddy Mentor",
                "Career Mentor",
                "Admission Mentor",
                "Student Health Mentor",
                "Scholarship Mentor",
                "Loan Mentorship Mentor"
            ],
            rotation: 3,
            x: 20,
            y: 0,
            color: "#FFECB3" // Amber
        }
    ];

    return (
        <div ref={containerRef} className="relative min-h-[150vh] bg-[#F5F5F0]">
            <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center p-4 font-sans">
                {/* Background Texture */}
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")',
                        backgroundSize: '300px'
                    }}
                />

                <div className="relative z-10 max-w-6xl w-full h-[85vh] flex flex-col py-10 md:py-0">
                    <h2 className="text-4xl md:text-5xl font-serif text-stone-500/90 font-bold mb-12 md:mb-16 relative z-0 text-center w-full tracking-tight drop-shadow-[1px_1px_0_rgba(255,255,255,0.8)] pointer-events-none">
                        Our Guidance Packs
                    </h2>

                    <div className="relative w-full flex-1 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 perspective-[1000px]">
                        {packs.map((pack, index) => (
                            <PricingCard
                                key={pack.id}
                                pack={pack}
                                index={index}
                                focusedIndex={focusedIndex}
                                setFocusedIndex={setFocusedIndex}
                                scrollYProgress={scrollYProgress}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const PricingCard = ({ pack, index, focusedIndex, setFocusedIndex, scrollYProgress }) => {
    const isFocused = focusedIndex === index;
    const isMiddle = pack.id === 2;

    // Scroll Animations
    // Delay start until 15% scroll to ensure they look stacked initially.
    const targetX = window.innerWidth > 768 ? pack.x * 5 : 0;

    // Animation range: Starts at 0.15, finishes at 0.5 (halfway through container)
    const x = useTransform(scrollYProgress, [0.15, 0.5], [0, targetX]);
    const rotate = useTransform(scrollYProgress, [0.15, 0.5], [0, pack.rotation]);
    const scale = useTransform(scrollYProgress, [0.15, 0.5], [0.95, 1]);

    // Side cards hidden initially, fade in as they move out
    const sideOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
    const finalOpacity = isMiddle ? 1 : sideOpacity;

    // Z-Index logic: Middle always on top when stacked
    const zIndex = isFocused ? 50 : (isMiddle ? 30 : 20);

    return (
        <motion.div
            layoutId={`pack-${pack.id}`}
            onClick={() => setFocusedIndex(isFocused ? null : index)}
            initial={{ x: 0, rotate: 0 }}
            style={{
                backgroundColor: pack.color,
                x: isFocused ? 0 : x,
                rotate: isFocused ? 0 : rotate,
                scale: isFocused ? 1.15 : scale,
                opacity: isFocused ? 1 : finalOpacity,
                zIndex,
                boxShadow: isFocused
                    ? '0 30px 60px -12px rgba(0, 0, 0, 0.25)'
                    : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            whileHover={{ scale: isFocused ? 1.15 : 1.05, zIndex: 40 }}
            className={`
                relative w-72 md:w-80 p-6 rounded-sm shadow-xl cursor-pointer
                flex flex-col
                border border-gray-200/50 transform-gpu
                ${isFocused ? 'h-auto min-h-[500px]' : 'h-[420px]'}
                transition-all duration-300
            `}
        >
            {/* Recommended Badge */}
            {pack.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-md z-50 flex items-center gap-1">
                    <Star size={12} fill="currentColor" /> RECOMMENDED
                </div>
            )}

            {/* Tape Effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-8 bg-white/30 backdrop-blur-sm transform -rotate-1 shadow-sm border border-white/20" />

            <div className="mt-4 mb-4">
                <h3 className="font-serif text-2xl font-bold text-gray-800 leading-tight mb-2">
                    {pack.title}
                </h3>
                <div className="h-1 w-20 bg-black/10 rounded-full mb-4" />
            </div>

            <div className="flex-1 space-y-4 font-handwriting text-gray-700 text-sm md:text-base leading-relaxed overflow-hidden relative pb-8">
                <ul className="space-y-2">
                    {pack.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <Check size={16} className="mt-1 text-green-600 flex-shrink-0" />
                            <span>{feat}</span>
                        </li>
                    ))}
                </ul>

                <div className="border-t border-black/5 pt-3 mt-3">
                    <p className="font-bold text-gray-800 mb-2">{pack.details}</p>
                    <ul className="space-y-1.5 pl-2">
                        {pack.mentors.map((mentor, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                {mentor}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Bottom Marker */}
            <div className="text-right text-xs text-black/20 font-bold mt-4 pt-4 border-t border-black/5 pb-2">
                College Mentor Pack #{pack.id}
            </div>

            {/* Gradient Fade Overlay - Bottom of Card */}
            {!isFocused && (
                <div
                    className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none flex items-end justify-center pb-6 rounded-b-sm z-20"
                    style={{ background: `linear-gradient(to top, ${pack.color} 40%, transparent)` }}
                >
                    <span className="font-serif italic text-black/30 text-lg">more...</span>
                </div>
            )}

            {isFocused && (
                <button
                    onClick={(e) => { e.stopPropagation(); setFocusedIndex(null); }}
                    className="absolute top-2 right-2 p-1 rounded-full hover:bg-black/5 transition-colors"
                >
                    <X size={20} className="text-gray-500" />
                </button>
            )}
        </motion.div>
    );
};

export default Pricing;
