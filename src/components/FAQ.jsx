import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const FAQ = () => {
    const [focusedIndex, setFocusedIndex] = useState(null);
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const questions = [
        {
            id: 1,
            q: "How do I choose a mentor?",
            a: "Browse through our verified mentor profiles using the 'Find My Mentor' tool. Filter by industry, expertise, and availability to find your perfect match.",
            rotation: -5,
            x: -10,
            y: -10,
            color: "#FFF9C4" // Light Yellow
        },
        {
            id: 2,
            q: "Is this service free?",
            a: "We offer both free introductory sessions and premium mentorship packages. Financial aid and scholarships are available for eligible students.",
            rotation: 8,
            x: 20,
            y: 5,
            color: "#E1F5FE" // Light Blue
        },
        {
            id: 3,
            q: "Can I switch mentors?",
            a: "Absolutely. If you feel a mentor isn't the right fit, you can request a switch at any time through your dashboard with no questions asked.",
            rotation: -12,
            x: -25,
            y: 15,
            color: "#FFECB3" // Amber
        },
        {
            id: 4,
            q: "How often do we meet?",
            a: "It's up to you! Most students meet bi-weekly, but you can schedule sessions as frequently as needed based on your goals and mentor availability.",
            rotation: 6,
            x: 15,
            y: -20,
            color: "#F1F8E9" // Light Green
        },
        {
            id: 5,
            q: "What if I'm not satisfied?",
            a: "We have a 100% satisfaction guarantee. If your first session doesn't help clarify your path, we'll refund you or pair you with a senior mentor for free.",
            rotation: 3,
            x: 0,
            y: 0,
            color: "#FFFFFF" // White
        }
    ];

    const cardVariants = {
        initial: {
            opacity: 0,
            scale: 0.8,
            x: 0,
            y: 0,
            rotate: 0,
        },
        animate: (item) => ({
            opacity: 1,
            scale: 1,
            x: isMobile ? 0 : item.x * 10,
            y: isMobile ? 0 : item.y * 10,
            rotate: isMobile ? 0 : item.rotation,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: isMobile ? (item.id - 1) * 0.15 : (item.id - 1) * 0.1,
            }
        })
    };

    return (
        <div className="min-h-screen bg-[#F5F5F0] overflow-hidden relative flex items-center justify-center p-4">
            {/* Background Texture (Desk Effect) */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")',
                    backgroundSize: '300px'
                }}
            />

            <div className="relative z-10 max-w-5xl w-full h-auto px-4 flex flex-col py-16 md:py-24">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-serif text-stone-500/90 font-bold mb-8 md:mb-12 relative z-0 text-left w-full pl-2 md:pl-0 tracking-tight drop-shadow-[1px_1px_0_rgba(255,255,255,0.8)] pointer-events-none"
                >
                    Common Questions
                </motion.h2>

                <div className={`relative w-full ${isMobile ? 'flex flex-col items-center gap-6 mt-4' : 'flex-1 flex items-center justify-center min-h-[600px] mt-12'}`}>
                    {questions.map((item, index) => {
                        const isFocused = focusedIndex === index;

                        return (
                            <motion.div
                                key={item.id}
                                layoutId={`card-${item.id}`}
                                custom={item}
                                initial="initial"
                                whileInView={isFocused ? undefined : "animate"}
                                viewport={{ once: false, amount: 0.3 }}
                                variants={cardVariants}
                                onClick={() => setFocusedIndex(isFocused ? null : index)}
                                animate={isFocused ? {
                                    rotate: 0,
                                    x: 0,
                                    y: isMobile ? -10 : 0,
                                    scale: isMobile ? 1.05 : 1.2,
                                    zIndex: 50,
                                    opacity: 1
                                } : undefined}
                                whileHover={{ scale: isFocused ? (isMobile ? 1.05 : 1.2) : (isMobile ? 1.02 : 1.1), zIndex: 40 }}
                                className={`
                                    ${isMobile ? 'relative w-full max-w-[340px] min-h-[280px]' : 'absolute w-64 h-80 md:w-72 md:h-96'}
                                    p-6 rounded-sm shadow-xl cursor-pointer
                                    flex flex-col justify-between
                                    border border-gray-200/50 transform-gpu
                                `}
                                style={{
                                    backgroundColor: item.color,
                                    boxShadow: isFocused
                                        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                                        : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                }}
                            >
                                {/* Tape Effect */}
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/30 backdrop-blur-sm transform -rotate-2" />

                                <div>
                                    <span className="text-xs font-bold tracking-widest text-black/40 uppercase mb-2 block">
                                        Question #{item.id}
                                    </span>
                                    <h3 className="font-serif text-xl md:text-2xl text-gray-800 leading-tight mb-4">
                                        {item.q}
                                    </h3>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isFocused ? 1 : 0.6 }} // Reveal answer better when focused
                                    className={`
                                        font-handwriting text-gray-700 text-sm md:text-base leading-relaxed
                                        ${isFocused ? 'line-clamp-none' : 'line-clamp-3'}
                                    `}
                                >
                                    {item.a}
                                </motion.div>

                                {/* Bottom Marker */}
                                <div className="text-right text-xs text-black/20 font-bold mt-4">
                                    College Mentor
                                </div>

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
                    })}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
