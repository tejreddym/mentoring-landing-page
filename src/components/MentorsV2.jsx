import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Users, GraduationCap, Briefcase, Banknote, Heart, Building2, ArrowRight, Star } from 'lucide-react';

const MentorsV2 = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const mentors = [
        {
            id: 'student',
            title: "Student Mentor",
            role: "Peer & Campus Life",
            icon: Users,
            color: "#3B82F6", // Blue
            bg: "bg-blue-600",
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
            bg: "bg-violet-600",
            image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=800&h=1200",
            desc: "Expert guidance for college applications, essays, and interviews to get you into your dream university.",
            stats: ["Ex-Admissions", "Essay Experts", "Interview Prep"]
        },
        {
            id: 'career',
            title: "Career Mentor",
            role: "Jobs & Internships",
            icon: Briefcase,
            color: "#F59E0B", // Amber
            bg: "bg-amber-600",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800&h=1200",
            desc: "Chart your professional path. From resume building to landing internships and your first full-time job.",
            stats: ["Industry Vets", "HR Leaders", "Career Coaches"]
        },
        {
            id: 'loan',
            title: "Loan Mentor",
            role: "Finance & Aid",
            icon: Banknote,
            color: "#10B981", // Emerald
            bg: "bg-emerald-600",
            image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800&h=1200",
            desc: "Navigating the complex world of student loans, interest rates, and financial planning for education.",
            stats: ["Finance Experts", "Loan Advisors", "Bank Partners"]
        },
        {
            id: 'health',
            title: "Health Mentor",
            role: "Wellness & Stress",
            icon: Heart,
            color: "#EF4444", // Red
            bg: "bg-red-600",
            image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&q=80&w=800&h=1200",
            desc: "Prioritizing your mental and physical well-being. Support for stress, anxiety, and staying healthy.",
            stats: ["Psychologists", "Wellness Coaches", "Counselors"]
        },
        {
            id: 'scholarship',
            title: "Scholarship Mentor",
            role: "Grants & Funding",
            icon: GraduationCap,
            color: "#EC4899", // Pink
            bg: "bg-pink-600",
            image: "https://images.unsplash.com/photo-1627556592933-ffe99c1cd9eb?auto=format&fit=crop&q=80&w=800&h=1200",
            desc: "Unlocking financial opportunities. Find and apply for scholarships, grants, and bursaries you qualify for.",
            stats: ["Funding Scouts", "Application Help", "Grant Writers"]
        }
    ];

    return (
        <div ref={containerRef} className="relative w-full bg-black">
            {/* Header */}
            <div className="h-screen flex items-center justify-center sticky top-0 z-0">
                <h1 className="text-6xl md:text-9xl font-bold text-white text-center tracking-tighter opacity-20">
                    Meet Your<br />Mentors
                </h1>
            </div>

            <div className="relative">
                {mentors.map((mentor, index) => (
                    <Card
                        key={mentor.id}
                        {...mentor}
                        index={index}
                        total={mentors.length}
                        progress={scrollYProgress}
                    />
                ))}
            </div>
            {/* Spacer to allow scrolling past the last card */}
            <div className="h-screen"></div>
        </div>
    );
};

const Card = ({ title, role, icon: Icon, color, bg, image, desc, stats, index, total, progress }) => {
    // Calculate the range for this card's animation based on scroll progress
    const range = [index * 0.1, 1];
    const targetScale = 1 - (total - index) * 0.05;

    const scale = useTransform(progress, range, [1, targetScale]);

    // As cards stack, top position changes to create the stack effect
    // We want them to stick to the top, but slightly offset so we see the ones behind?
    // Actually standard stacking card is usually sticky top-0.

    return (
        <div className="h-screen flex items-center justify-center sticky top-0">
            <motion.div
                className={`
                    relative w-[90vw] md:w-[1000px] h-[70vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row
                    border border-white/10 ${bg}
                `}
                style={{
                    scale,
                    top: `calc(15vh + ${index * 20}px)` // Offset slightly if needed, but sticky handles position
                }}
            >
                {/* Image Section */}
                <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent md:bg-gradient-to-l" />
                    <div className={`absolute top-4 left-4 p-3 rounded-full bg-white/20 backdrop-blur-md`}>
                        <Icon size={24} color="white" />
                    </div>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-12 flex flex-col justify-center bg-black/20 backdrop-blur-sm">
                    <div className="mb-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 w-fit">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                        <span className="text-xs font-bold uppercase tracking-wider text-white/80">{role}</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        {title}
                    </h2>

                    <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8">
                        {desc}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-10">
                        {stats.map((stat, i) => (
                            <span key={i} className="text-sm font-medium text-white/90 bg-white/20 px-3 py-1 rounded-md">
                                # {stat}
                            </span>
                        ))}
                    </div>

                    <button className="flex items-center gap-2 text-white font-bold group w-fit">
                        Book a Session <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default MentorsV2;
