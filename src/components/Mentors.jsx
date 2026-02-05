import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, GraduationCap, Briefcase, Banknote, Heart, Building2, ArrowRight, Star } from 'lucide-react';

const Mentors = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const mentors = [
        {
            id: 'student',
            title: "Student Mentor",
            role: "Peer & Campus Life",
            icon: Users,
            color: "#3B82F6", // Blue
            bg: "bg-blue-900",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800&h=1200",
            desc: "Your friend, philosopher, and guide. helping you navigate campus culture, clubs, and student life.",
            stats: ["Senior Students", "Campus Guides", "Peer Support"]
        },
        {
            id: 'admission',
            title: "Admission Mentor",
            role: "College & Applications",
            icon: Building2,
            color: "#8B5CF6", // Violet
            bg: "bg-violet-900",
            image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=800&h=1200", // University
            desc: "Expert guidance for college applications, essays, and interviews to get you into your dream university.",
            stats: ["Ex-Admissions", "Essay Experts", "Interview Prep"]
        },
        {
            id: 'career',
            title: "Career Mentor",
            role: "Jobs & Internships",
            icon: Briefcase,
            color: "#F59E0B", // Amber
            bg: "bg-amber-900",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800&h=1200", // Corporate
            desc: "Chart your professional path. From resume building to landing internships and your first full-time job.",
            stats: ["Industry Vets", "HR Leaders", "Career Coaches"]
        },
        {
            id: 'loan',
            title: "Loan Mentor",
            role: "Finance & Aid",
            icon: Banknote,
            color: "#10B981", // Emerald
            bg: "bg-emerald-900",
            image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800&h=1200", // Money/Finance
            desc: "Navigating the complex world of student loans, interest rates, and financial planning for education.",
            stats: ["Finance Experts", "Loan Advisors", "Bank Partners"]
        },
        {
            id: 'health',
            title: "Health Mentor",
            role: "Wellness & Stress",
            icon: Heart,
            color: "#EF4444", // Red
            bg: "bg-red-900",
            image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&q=80&w=800&h=1200", // Yoga/Health
            desc: "Prioritizing your mental and physical well-being. Support for stress, anxiety, and staying healthy.",
            stats: ["Psychologists", "Wellness Coaches", "Counselors"]
        },
        {
            id: 'scholarship',
            title: "Scholarship Mentor",
            role: "Grants & Funding",
            icon: GraduationCap,
            color: "#EC4899", // Pink
            bg: "bg-pink-900",
            image: "https://images.unsplash.com/photo-1627556592933-ffe99c1cd9eb?auto=format&fit=crop&q=80&w=800&h=1200", // Graduation
            desc: "Unlocking financial opportunities. Find and apply for scholarships, grants, and bursaries you qualify for.",
            stats: ["Funding Scouts", "Application Help", "Grant Writers"]
        }
    ];

    return (
        <div className="h-screen w-full bg-black flex flex-col md:flex-row overflow-hidden font-sans">
            {mentors.map((mentor, index) => {
                const isActive = activeIndex === index;
                const Icon = mentor.icon;

                return (
                    <motion.div
                        key={mentor.id}
                        layout
                        onClick={() => setActiveIndex(index)}
                        onHoverStart={() => setActiveIndex(index)}
                        className={`relative h-full flex-1 min-w-[60px] md:min-w-[100px] cursor-pointer border-r border-white/10 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isActive ? 'flex-[4] md:flex-[5]' : ''}`}
                    >
                        {/* Background Image with Overlay */}
                        <div className="absolute inset-0">
                            <img
                                src={mentor.image}
                                alt={mentor.title}
                                className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-100' : 'scale-110 grayscale'}`}
                            />
                            <div className={`absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90 ${isActive ? 'opacity-80' : 'opacity-60'}`}
                                style={{ backgroundColor: isActive ? 'transparent' : 'black', mixBlendMode: 'multiply' }}
                            />
                            {/* Color Tint on Active */}
                            <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${isActive ? 'opacity-40' : ''}`} style={{ backgroundColor: mentor.color, mixBlendMode: 'overlay' }}></div>

                            {/* Gradient for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                        </div>

                        {/* Collapsed State Content (Vertical Text) */}
                        {!isActive && (
                            <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 z-10">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mb-8 p-3 rounded-full bg-white/10 backdrop-blur-md"
                                >
                                    <Icon size={24} color="white" />
                                </motion.div>
                                <h3 className="text-white font-bold text-xl tracking-widest uppercase whitespace-nowrap -rotate-90 opacity-70">
                                    {mentor.role.split(' ')[0]}
                                </h3>
                            </div>
                        )}

                        {/* Expanded State Content */}
                        <AnimatePresence>
                            {isActive && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: 0.2, duration: 0.4 }}
                                    className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-20"
                                >
                                    {/* Small Label */}
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="flex items-center gap-2 mb-4"
                                    >
                                        <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-black bg-white rounded-full">
                                            {mentor.role}
                                        </span>
                                        <div className="h-[1px] w-12 bg-white/50"></div>
                                    </motion.div>

                                    {/* Main Title */}
                                    <motion.h2
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
                                    >
                                        {mentor.title}
                                    </motion.h2>

                                    {/* Description */}
                                    <motion.p
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="text-gray-300 text-lg md:text-xl max-w-xl mb-8 leading-relaxed font-light"
                                    >
                                        {mentor.desc}
                                    </motion.p>

                                    {/* Stats / Tags */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                        className="flex flex-wrap gap-3 mb-10"
                                    >
                                        {mentor.stats.map((stat, i) => (
                                            <div key={i} className="flex items-center gap-2 text-sm font-medium text-white/80 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                                                <Star size={14} className="text-yellow-400" fill="currentColor" />
                                                {stat}
                                            </div>
                                        ))}
                                    </motion.div>

                                    {/* CTA */}
                                    <motion.button
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.7 }}
                                        className="self-start group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all"
                                    >
                                        Meet {mentor.title.split(' ')[1]}s
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Floating Icon Animation (Background) */}
                        {isActive && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                                animate={{ opacity: 0.1, scale: 1.2, rotate: 0 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="absolute -top-20 -right-20 pointer-events-none"
                            >
                                <Icon size={400} color="white" />
                            </motion.div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
};

export default Mentors;
