import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';

const Pricing = () => {
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
            xOffset: -380, // Target x spread
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
            xOffset: 0,
            recommended: true,
            color: "#E1F5FE" // Blue
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
            xOffset: 380, // Target x spread
            color: "#FFECB3" // Amber
        }
    ];

    return (
        <div className="relative min-h-[120vh] bg-[#F5F5F0] py-20">
            <div className="container mx-auto px-4 flex flex-col items-center">
                {/* Background Texture */}
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")',
                        backgroundSize: '300px'
                    }}
                />

                <div className="relative z-10 max-w-7xl w-full flex flex-col items-center h-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl font-serif text-stone-500/90 font-bold mb-16 relative z-0 text-center tracking-tight drop-shadow-[1px_1px_0_rgba(255,255,255,0.8)]"
                    >
                        Our Guidance Packs
                    </motion.h2>

                    <div className="relative w-full min-h-[600px] flex flex-col md:flex-row items-center justify-center perspective-[1000px]">
                        {packs.map((pack, index) => (
                            <PricingCard
                                key={pack.id}
                                pack={pack}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const PricingCard = ({ pack, index }) => {
    const isMiddle = pack.id === 2;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const variants = {
        initial: {
            x: 0,
            y: 0,
            rotate: 0,
            scale: isMiddle ? 1 : 0.85,
            opacity: isMiddle ? 1 : 0,
            zIndex: isMiddle ? 30 : 20
        },
        animate: {
            x: isMobile ? 0 : pack.xOffset,
            y: 0,
            rotate: isMobile ? 0 : pack.rotation,
            scale: 1,
            opacity: 1,
            zIndex: isMiddle ? 30 : 20,
            transition: {
                type: "spring",
                stiffness: 70,
                damping: 15,
                delay: index * 0.2, // Stagger effect
                duration: 1.2
            }
        }
    };

    return (
        <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: false, amount: 0.3 }}
            variants={variants}
            style={{
                backgroundColor: pack.color,
                position: isMobile ? 'relative' : 'absolute',
                marginTop: isMobile ? '24px' : '0'
            }}
            className={`
                w-full max-w-[340px] md:w-[350px] p-6 rounded-sm shadow-xl cursor-default
                flex flex-col
                border border-gray-200/50 transform-gpu
                h-[600px]
            `}
        >
            {/* Recommended Badge */}
            {pack.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FFC107] text-slate-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-md z-10 flex items-center gap-1.5 uppercase tracking-wider">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    Recommended
                </div>
            )}

            {/* Tape Effect */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-20 h-7 bg-white/40 backdrop-blur-sm rotate-[-3deg] shadow-sm pointer-events-none" />

            <h3 className="text-2xl font-bold font-serif text-slate-800 mb-1 leading-tight mt-3">
                {pack.title}
            </h3>

            <div className="w-16 h-1 bg-black/5 rounded-full mb-6 mt-3" />

            {/* Features List */}
            <ul className="space-y-3 mb-6 flex-grow">
                {pack.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-slate-700 text-sm md:text-base">
                        <Check className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 text-green-600" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            {/* Detailed Items */}
            <div className="mb-6 pt-4 border-t border-black/10">
                <p className="font-bold text-slate-800 text-sm mb-3">{pack.details}</p>
                <ul className="space-y-2 pl-1">
                    {pack.mentors.map((mentor, i) => (
                        <li key={i} className="flex items-center text-slate-600 text-xs md:text-sm font-medium">
                            <div className="w-2 h-2 rounded-full bg-slate-400 mr-3" />
                            {mentor}
                        </li>
                    ))}
                </ul>
            </div>

            <button
                className={`w-full py-3 text-white rounded-lg font-bold text-sm md:text-base tracking-wide transition-all shadow-md mt-auto
                    ${pack.recommended
                        ? "bg-gradient-to-r from-[#173CBA] to-[#00C798] hover:opacity-90 hover:shadow-lg"
                        : pack.id === 3
                            ? "bg-[#00C798] hover:bg-emerald-600"
                            : "bg-[#173CBA] hover:bg-blue-800"
                    }
                `}
            >
                Get Started
            </button>
        </motion.div>
    );
};

export default Pricing;
