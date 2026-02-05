import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Quote, Award } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: "Ankit Sharma",
        field: "Mechanical Engineering",
        quote: "I was confused between Computer Science and Mechanical Engineering. My Student Mentor, who graduated from IIT Bombay, helped me understand the real-world applications of both fields. After 3 sessions, I had complete clarity.",
        mentor: "Student Mentor",
        subInfo: "Chose Mechanical Engineering at IIT Delhi",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
        id: 2,
        name: "Riya Patel",
        field: "Medicine",
        quote: "Coming from a middle-class family, I thought MBBS abroad was impossible. My Scholarship Mentor found 5 scholarships I was eligible for. I secured a 60% scholarship at a top medical college!",
        mentor: "Scholarship Mentor",
        subInfo: "Secured 60% Scholarship for MBBS",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
        id: 3,
        name: "Vikram Singh",
        field: "Medicine",
        quote: "I scored 580 in NEET and was confused about counseling. My Admission Mentor guided me through every step of state quota counseling. I got a seat in a government medical college that I didn't even know existed!",
        mentor: "Admission Mentor",
        subInfo: "Secured Government Medical College Seat",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
        id: 4,
        name: "Suhani Verma",
        field: "Commerce & Management",
        quote: "I was terrified of the high fees for an MBA. My Loan Mentor explained government subsidy schemes for students that my local bank never told me about. I secured a full education loan with zero collateral.",
        mentor: "Loan Mentor",
        subInfo: "Studying at NMIMS without financial burden",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
        id: 5,
        name: "Arjun Reddy",
        field: "JEE Aspirant",
        quote: "Two months before JEE, I hit a burnout wall and couldn't sleep. My Health Mentor (a psychologist) didn't just say 'relax'—she gave me a specific sleep schedule and anxiety management plan. My mock scores improved by 40 marks.",
        mentor: "Health Mentor",
        subInfo: "Overcame Exam Anxiety & Cleared JEE Advanced",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
        id: 6,
        name: "Meera Iyer",
        field: "Data Science",
        quote: "I loved coding but hated standard theory. My Career Mentor connected me with an alumni working at Google, who helped me build a practical GitHub portfolio. That portfolio got me an internship in my 2nd year!",
        mentor: "Career Mentor",
        subInfo: "Landed Internship in 2nd Year",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200"
    }
];

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-rotate
    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const handleAvatarClick = (index) => {
        setActiveIndex(index);
        setIsAutoPlaying(false);
    };

    const getVisibleItems = () => {
        const total = testimonials.length;
        const prevIndex = (activeIndex - 1 + total) % total;
        const nextIndex = (activeIndex + 1) % total;
        return [
            { ...testimonials[prevIndex], position: 'top', relativeIndex: -1 },
            { ...testimonials[activeIndex], position: 'center', relativeIndex: 0 },
            { ...testimonials[nextIndex], position: 'bottom', relativeIndex: 1 },
        ];
    };

    const visibleItems = getVisibleItems();
    const activeStudent = testimonials[activeIndex];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F0F9FF] to-[#E0F2FE] pt-28 pb-12 px-4 md:px-12 flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24 overflow-hidden relative">
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"></div>
                <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-[#173CBA] opacity-[0.03] blur-[100px]"></div>
                <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-[#00C798] opacity-[0.03] blur-[100px]"></div>
            </div>

            {/* Left Column: Arc Carousel */}
            <div className="relative w-full md:w-[400px] h-[500px] flex items-center justify-start ml-0 md:ml-12 z-10 shrink-0">
                {/* Curve SVG - Positioned to define the path */}
                <svg className="absolute left-[20px] top-0 h-full w-[100px] hidden md:block overflow-visible pointer-events-none" viewBox="0 0 100 500">
                    {/* Curve: Starts/Ends at x=0, Peaks at x=80 (Right bulge) */}
                    <path
                        d="M 0,0 Q 80,250 0,500"
                        fill="none"
                        stroke="#173CBA"
                        strokeWidth="1.5"
                        strokeOpacity="0.2"
                        strokeLinecap="round"
                        strokeDasharray="4 6"
                    />
                </svg>

                {/* Items Container */}
                <div className="relative h-full w-full flex flex-col items-start justify-center pl-4">
                    <AnimatePresence mode="popLayout">
                        {visibleItems.map((item) => {
                            let yOffset = 0;
                            let xOffset = 0;
                            let scale = 1;
                            let opacity = 1;
                            let zIndex = 0;

                            // Calculate positions based on the curve Q 80,250
                            if (item.position === 'center') {
                                yOffset = 0;
                                xOffset = 70; // Peak of curve
                                scale = 1.1;
                                opacity = 1;
                                zIndex = 20;
                            } else if (item.position === 'top') {
                                yOffset = -140;
                                xOffset = 0; // Start of curve
                                scale = 0.85;
                                opacity = 0.5;
                                zIndex = 10;
                            } else if (item.position === 'bottom') {
                                yOffset = 140;
                                xOffset = 0; // End of curve
                                scale = 0.85;
                                opacity = 0.5;
                                zIndex = 10;
                            }

                            return (
                                <motion.div
                                    key={item.id}
                                    layoutId={`avatar-${item.id}`}
                                    className="absolute flex items-center gap-4 cursor-pointer group w-[350px]"
                                    initial={{ opacity: 0, y: yOffset + 20 }}
                                    animate={{
                                        opacity,
                                        scale,
                                        x: window.innerWidth > 768 ? xOffset : 0,
                                        y: window.innerWidth > 768 ? yOffset : (item.relativeIndex * 100),
                                        zIndex
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    onClick={() => handleAvatarClick(testimonials.findIndex(t => t.id === item.id))}
                                >
                                    {/* Avatar */}
                                    <div className={`
                                        relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 transition-all duration-300 bg-white shrink-0
                                        ${item.position === 'center'
                                            ? 'border-[#00C798] shadow-[0_0_20px_rgba(0,199,152,0.4)] ring-2 ring-[#00C798]/20'
                                            : 'border-blue-100 grayscale hover:grayscale-0'}
                                    `}>
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>

                                    {/* Info: Name & Guided By (Visible for all, faded for inactive) */}
                                    <div className="flex flex-col items-start transition-opacity duration-300">
                                        <h3 className={`font-serif font-bold text-gray-900 leading-tight ${item.position === 'center' ? 'text-lg' : 'text-base'}`}>
                                            {item.name}
                                        </h3>

                                        {/* Guided By Badge/Text */}
                                        <div className="flex items-center gap-1.5 mt-1">
                                            {item.position === 'center' && <Award size={12} className="text-[#00C798]" />}
                                            <span className={`text-[11px] md:text-xs font-bold uppercase tracking-wide
                                                ${item.position === 'center' ? 'text-[#173CBA]' : 'text-gray-400'}
                                            `}>
                                                Guided by {item.mentor}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {/* Right Column: Success Card */}
            <div className="w-full md:w-[600px] z-20 min-h-[400px] flex items-center relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
                        className="w-full bg-white/60 backdrop-blur-2xl border border-white/80 p-8 md:p-12 rounded-2xl shadow-[0_30px_80px_-20px_rgba(23,60,186,0.2)] relative overflow-hidden group hover:shadow-[0_40px_100px_-20px_rgba(0,199,152,0.2)] transition-shadow duration-500"
                    >
                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-50/50 to-transparent rounded-bl-full -z-10" />

                        <Quote className="absolute top-8 right-10 text-[#173CBA]/5 w-20 h-20 rotate-12" />

                        <div className="relative z-10">
                            {/* Profile Header */}
                            <div className="flex items-center gap-4 mb-6">
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 leading-tight">
                                        {activeStudent.name}
                                    </h2>
                                    <p className="text-[#173CBA] font-bold tracking-wide uppercase text-xs mt-1">
                                        {activeStudent.field}
                                    </p>
                                </div>
                            </div>

                            {/* Main Quote */}
                            <blockquote className="text-lg md:text-2xl text-gray-700 leading-relaxed font-medium mb-8">
                                "{activeStudent.quote}"
                            </blockquote>

                            {/* Divider */}
                            <div className="h-px w-full bg-gradient-to-r from-gray-200 to-transparent mb-6" />

                            {/* Footer Info */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                                {/* Mentor Badge */}
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#173CBA]">
                                        <Award size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-gray-500 font-bold uppercase">Mentored By</span>
                                        <span className="text-sm font-bold text-[#173CBA]">{activeStudent.mentor}</span>
                                    </div>
                                </div>

                                {/* Outcome Badge */}
                                <div className="bg-[#00C798]/10 px-4 py-2 rounded-xl border border-[#00C798]/20 text-[#006e54] text-sm font-semibold max-w-[250px] text-center sm:text-right">
                                    {activeStudent.subInfo}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Testimonials;
