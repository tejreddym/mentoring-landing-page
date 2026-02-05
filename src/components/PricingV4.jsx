import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, ArrowRight, GraduationCap, BookOpen, Crown } from 'lucide-react';

const PricingV4 = () => {
    // Mentors Data (Shared across packs)
    const allMentors = [
        "Student Buddy Mentor",
        "Career Mentor",
        "Admission Mentor",
        "Scholarship Mentor",
        "Student Health Mentor",
        "Loan Mentorship Mentor"
    ];

    const packs = [
        {
            id: 1,
            title: "Academic Success",
            icon: BookOpen,
            description: "Build a strong foundation for your future.",
            price: "Essential",
            color: "#173CBA", // Primary Blue
            lightColor: "#E0E7FF",
            features: [
                "Stream & College Selection",
                "Career Guidance Sessions",
                "Parent Guidance Sessions"
            ],
            mentors: ["Student Buddy Mentor", "Admission Mentor"],
            sessions: "3 Sessions Each",
            delay: 0.1
        },
        {
            id: 2,
            title: "Career & College Prep",
            icon: GraduationCap,
            description: "Accelerate your path to the dream college.",
            price: "Advanced",
            color: "#00C798", // Accent Green
            lightColor: "#D1FAE5",
            features: [
                "Stream & College Selection",
                "Career Guidance Sessions",
                "Parent Guidance Sessions"
            ],
            mentors: ["Student Buddy", "Career Mentor", "Admission Mentor", "Scholarship Mentor"],
            sessions: "2 Sessions Each",
            popular: true,
            delay: 0.2
        },
        {
            id: 3,
            title: "Premium All-Inclusive",
            icon: Crown,
            description: "The ultimate mentorship experience without limits.",
            price: "Elite",
            color: "#F59E0B", // Motivational Orange
            lightColor: "#FEF3C7",
            features: [
                "Stream & College Selection",
                "Career Guidance Sessions",
                "Parent Guidance Sessions"
            ],
            mentors: ["All 6 Mentors Included!"],
            sessions: "2 Sessions w/ Everyone",
            delay: 0.3
        }
    ];

    return (
        <div className="min-h-screen bg-[#F5F9F7] font-sans selection:bg-[#173CBA] selection:text-white pb-20 overflow-x-hidden">
            {/* --- Hero Section --- */}
            <div className="relative pt-20 pb-16 px-6 text-center overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-[80px] -z-10" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00C798]/10 rounded-full blur-[80px] -z-10" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-white border border-gray-200 text-[#173CBA] text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
                        College Mentor • Guidance 4.0
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                        Choose Your <span className="text-[#173CBA]">Path to Success</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Every student's journey is unique. We've designed three distinct pathways to help you navigate your academic future with confidence.
                    </p>
                </motion.div>
            </div>

            {/* --- Roadmap Container --- */}
            <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Connecting Line (Desktop Only) */}
                <div className="hidden lg:block absolute top-[140px] left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent -z-10" />

                {packs.map((pack, index) => (
                    <div key={pack.id} className="relative group">
                        {/* Connector Node (Desktop) */}
                        <div className="hidden lg:flex absolute top-[126px] left-1/2 -translate-x-1/2 w-8 h-8 bg-white border-4 border-gray-100 rounded-full items-center justify-center z-0 transition-colors duration-300 group-hover:border-[color:var(--hover-color)]" style={{ '--hover-color': pack.color }}>
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pack.color }} />
                        </div>

                        <PricingCard pack={pack} index={index} />
                    </div>
                ))}
            </div>

            {/* --- Trust Badge Section --- */}
            <div className="mt-24 text-center">
                <p className="text-gray-400 text-sm font-medium uppercase tracking-widest mb-4">Trusted by students from</p>
                <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Placeholders for logos */}
                    <span className="text-xl font-bold text-gray-800">IIT Bombay</span>
                    <span className="text-xl font-bold text-gray-800">BITS Pilani</span>
                    <span className="text-xl font-bold text-gray-800">Delhi University</span>
                    <span className="text-xl font-bold text-gray-800">NIT Trichy</span>
                </div>
            </div>
        </div>
    );
};

const PricingCard = ({ pack, index }) => {
    const isPopular = pack.popular;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: pack.delay, duration: 0.5 }}
            whileHover={{ y: -10 }}
            className={`
                relative bg-white rounded-2xl p-8 border hover:shadow-2xl hover:shadow-[color:var(--shadow-color)]
                transition-all duration-300 flex flex-col h-full
                ${isPopular ? 'border-2 border-[#00C798] shadow-lg' : 'border-gray-100 shadow-md'}
            `}
            style={{
                '--shadow-color': `${pack.color}20`, // 20% opacity hex
            }}
        >
            {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00C798] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1 z-20">
                    <Star size={12} fill="currentColor" /> MOST POPULAR
                </div>
            )}

            {/* Decorative Top Bar */}
            <div className="absolute top-0 left-8 right-8 h-1 rounded-b-lg opacity-80" style={{ backgroundColor: pack.color }} />

            {/* Header */}
            <div className="mb-6 mt-2">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:rotate-6"
                    style={{ backgroundColor: pack.lightColor }}>
                    <pack.icon size={28} style={{ color: pack.color }} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pack.title}</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed min-h-[40px]">{pack.description}</p>
            </div>

            {/* Price Tag (Style) */}
            <div className="mb-8 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-gray-900">{pack.price}</span>
                <span className="text-gray-400 font-medium text-sm">/ Lifetime Access</span>
            </div>

            {/* Features */}
            <div className="flex-1 space-y-6">
                <div>
                    <h4 className="text-xs uppercase text-gray-400 font-bold tracking-wider mb-3">What's Included</h4>
                    <ul className="space-y-3">
                        {pack.features.map((feat, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                                <Check size={18} className="shrink-0 mt-0.5" style={{ color: pack.color }} />
                                <span>{feat}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="pt-6 border-t border-dashed border-gray-200">
                    <h4 className="text-xs uppercase text-gray-400 font-bold tracking-wider mb-3">Mentors Assigned</h4>
                    <div className="flex flex-wrap gap-2">
                        {pack.mentors.map((mentor, i) => (
                            <span key={i} className="px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100 text-[11px] font-semibold text-gray-600">
                                {mentor}
                            </span>
                        ))}
                    </div>
                    <div className="mt-3 text-xs font-bold text-gray-500 bg-gray-50 inline-block px-2 py-1 rounded">
                        🕒 {pack.sessions}
                    </div>
                </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
                <button
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                        backgroundColor: pack.color,
                        boxShadow: `0 4px 14px 0 ${pack.color}50`
                    }}
                >
                    Get Started <ArrowRight size={18} />
                </button>
                <p className="text-center text-[10px] text-gray-400 mt-3 font-medium">
                    No credit card required for initial consultation
                </p>
            </div>
        </motion.div>
    );
};

export default PricingV4;
