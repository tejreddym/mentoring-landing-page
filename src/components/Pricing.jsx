import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Check, Star } from 'lucide-react';

const Pricing = () => {
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
            x: -1, // Multiplier for direction
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
            x: 1, // Multiplier for direction
            color: "#FFECB3" // Amber
        }
    ];

    return (
        <div ref={containerRef} className="relative min-h-[450vh] bg-[#F5F5F0]">
            <div className="sticky top-0 h-screen flex flex-col items-center p-4 font-sans overflow-visible">
                {/* Background Texture */}
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")',
                        backgroundSize: '300px'
                    }}
                />

                <div className="relative z-10 max-w-7xl w-full flex flex-col pt-24 md:pt-32 items-center h-auto">
                    <h2 className="text-4xl md:text-5xl font-serif text-stone-500/90 font-bold mb-6 relative z-0 text-center tracking-tight drop-shadow-[1px_1px_0_rgba(255,255,255,0.8)] pointer-events-none">
                        Our Guidance Packs
                    </h2>

                    <div className="relative w-full min-h-[500px] flex flex-col md:flex-row items-center justify-center perspective-[1000px]">
                        {packs.map((pack, index) => (
                            <PricingCard
                                key={pack.id}
                                pack={pack}
                                index={index}
                                scrollYProgress={scrollYProgress}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const PricingCard = ({ pack, index, scrollYProgress }) => {
    const isMiddle = pack.id === 2;

    // Scroll Animations
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const spreadDistance = 380; // Distance to spread out

    const x = useTransform(
        scrollYProgress,
        [0.1, 0.5],
        [0, isMiddle ? 0 : pack.x * spreadDistance]
    );

    const rotate = useTransform(
        scrollYProgress,
        [0.1, 0.5],
        [0, isMiddle ? 0 : pack.rotation]
    );

    const scale = useTransform(
        scrollYProgress,
        [0.1, 0.5],
        [isMiddle ? 1 : 0.9, 1]
    );

    const opacity = useTransform(
        scrollYProgress,
        [0.1, 0.3],
        [isMiddle ? 1 : 0, 1]
    );

    const zIndex = isMiddle ? 30 : 20;

    return (
        <motion.div
            style={{
                backgroundColor: pack.color,
                x: isMobile ? 0 : x, // Disable x spread on mobile
                rotate: isMobile ? 0 : rotate,
                scale: isMobile ? 1 : scale,
                opacity: isMobile ? 1 : opacity,
                zIndex,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                position: isMobile ? 'relative' : 'absolute', // Absolute on desktop for stacking, Relative on mobile
                marginTop: isMobile ? '20px' : (isMiddle ? '-20px' : '0px')
            }}
            className={`
                w-full max-w-[340px] md:w-[350px] p-5 rounded-sm shadow-xl cursor-default
                flex flex-col
                border border-gray-200/50 transform-gpu
                min-h-[480px]
            `}
        >
            {/* Recommended Badge */}
            {pack.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FFC107] text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10 flex items-center gap-1 uppercase tracking-wider">
                    <Star className="w-3 h-3 fill-current" />
                    Recommended
                </div>
            )}

            {/* Tape Effect */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-white/30 backdrop-blur-sm rotate-[-2deg] shadow-sm pointer-events-none" />

            <h3 className="text-xl md:text-2xl font-bold font-serif text-slate-800 mb-1 leading-tight mt-2">
                {pack.title}
            </h3>

            <div className="w-12 h-1 bg-black/5 rounded-full mb-4 mt-2" />

            {/* Features List */}
            <ul className="space-y-2 mb-4 flex-grow">
                {pack.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-slate-700 text-sm">
                        <Check className={`w-4 h-4 mr-2 flex-shrink-0 mt-0.5 ${pack.id === 2 ? 'text-green-600' : 'text-green-600'
                            }`} />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            {/* Detailed Items */}
            <div className="mb-4 pt-3 border-t border-black/5">
                <p className="font-bold text-slate-800 text-sm mb-2">{pack.details}</p>
                <ul className="space-y-1 pl-1">
                    {pack.mentors.map((mentor, i) => (
                        <li key={i} className="flex items-center text-slate-600 text-xs font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-2" />
                            {mentor}
                        </li>
                    ))}
                </ul>
            </div>

            <button
                className={`w-full py-2.5 text-white rounded-lg font-bold text-sm tracking-wide transition-all shadow-md mt-auto
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
