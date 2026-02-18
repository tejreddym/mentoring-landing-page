import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import SessionReservationSheet from './SessionReservationSheet';

const Sessions = () => {
    const [filter, setFilter] = useState('All');
    const [selectedSession, setSelectedSession] = useState(null);

    const filters = ["All", "Engineering", "Medical", "Management", "Law", "1:1 Mentoring"];

    const sessions = [
        {
            id: 1,
            category: "Engineering",
            topic: "Cracking JEE Advanced",
            mentor: "Aryan Gupta",
            role: "IIT Bombay Alum",
            date: "Feb 12",
            time: "5:00 PM",
            color: "#FEF9C366",
            rotate: -2,
            image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100",
            location: "Starhub Co work Jewel Square Mall, Koregaon Park",
            mapsLink: "https://maps.google.com/?q=Starhub+Co+work+Jewel+Square+Mall+Koregaon+Park",
            availability: "Almost full",
            isFree: true,
            type: "Interactive session with Q&A"
        },
        {
            id: 2,
            category: "Medical",
            topic: "NEET Preparation Strategy",
            mentor: "Dr. Sia Verma",
            role: "AIIMS Delhi",
            date: "Feb 14",
            time: "6:30 PM",
            color: "#DCFCE766",
            rotate: 1,
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
            location: "Online Zoom Session",
            mapsLink: null,
            availability: "12 Spots Left",
            isFree: false,
            type: "Expert Strategy Workshop"
        },
        {
            id: 3,
            category: "Management",
            topic: "MBA Abroad vs India",
            mentor: "Rohan Das",
            role: "IIM Ahmedabad",
            date: "Feb 15",
            time: "4:00 PM",
            color: "#FFEDD566",
            rotate: -1,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
            location: "Starhub Co work Jewel Square Mall, Koregaon Park",
            mapsLink: "https://maps.google.com/?q=Starhub+Co+work+Jewel+Square+Mall+Koregaon+Park",
            availability: "Almost full",
            isFree: true,
            type: "Interactive session with Q&A"
        },
        {
            id: 4,
            category: "Law",
            topic: "Life at NLU",
            mentor: "Priya Sharma",
            role: "NLU Jodhpur",
            date: "Feb 18",
            time: "7:00 PM",
            color: "#F3E8FF66",
            rotate: 2,
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100",
            location: "Online Webinar",
            mapsLink: null,
            availability: "25 Spots Left",
            isFree: true,
            type: "Q&A and Career Talk"
        },
        {
            id: 5,
            category: "1:1 Mentoring",
            topic: "Personal Profile Review",
            mentor: "Expert Panel",
            role: "Senior Mentors",
            date: "Daily",
            time: "Slots Available",
            color: "#FFE4E666",
            rotate: -3,
            image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=100&h=100",
            location: "Private Video Call",
            mapsLink: null,
            availability: "Limited Slots",
            isFree: false,
            type: "1:1 Focused Guidance"
        },
        {
            id: 6,
            category: "Engineering",
            topic: "CS vs IT Branches",
            mentor: "Tech Lead",
            role: "Google",
            date: "Feb 20",
            time: "8:00 PM",
            color: "#E9D5FF66",
            rotate: 1,
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=100&h=100",
            location: "Online Live Stream",
            mapsLink: null,
            availability: "Open Entry",
            isFree: true,
            type: "Career Path Workshop"
        }
    ];

    const filteredSessions = filter === 'All'
        ? sessions
        : sessions.filter(s => s.category === filter);

    return (
        <div className="min-h-screen bg-[#d2efee] overflow-hidden relative flex flex-col items-center py-12 md:py-20 font-sans">
            {/* Background Texture & Glows */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"
                    style={{
                        maskImage: 'linear-gradient(to right, black 50%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, black 50%, transparent 100%)'
                    }}
                ></div>

                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#173CBA] opacity-[0.03] blur-[120px]"></div>
                <div className="absolute top-[20%] right-[0%] w-[40%] h-[60%] rounded-full bg-[#00C798] opacity-[0.03] blur-[120px]"></div>
            </div>

            {/* Header - Pinned Paper Style */}
            <div className="relative z-10 mb-12 text-center transform -rotate-1 drop-shadow-2xl">
                <div
                    className="bg-white/90 backdrop-blur-sm px-10 py-6 relative"
                    style={{
                        clipPath: 'polygon(0% 5%, 5% 0%, 12% 5%, 20% 0%, 30% 5%, 40% 0%, 50% 5%, 60% 0%, 70% 5%, 80% 0%, 90% 5%, 95% 0%, 100% 5%, 98% 15%, 100% 25%, 98% 35%, 100% 45%, 98% 55%, 100% 65%, 98% 75%, 100% 85%, 98% 95%, 100% 100%, 90% 95%, 80% 100%, 70% 95%, 60% 100%, 50% 95%, 40% 100%, 30% 95%, 20% 100%, 10% 95%, 0% 100%, 2% 90%, 0% 80%, 2% 70%, 0% 60%, 2% 50%, 0% 40%, 2% 30%, 0% 20%, 2% 10%)'
                    }}
                >
                    <div className="w-4 h-4 rounded-full bg-red-500 absolute top-3 left-1/2 -translate-x-1/2 shadow-inner border border-red-700 z-10"></div>
                    <h1 className="text-3xl md:text-5xl font-bold font-serif text-gray-800 tracking-tight pt-2">
                        Upcoming Sessions
                    </h1>
                </div>
            </div>

            {/* Filters - Sticky Notes */}
            <div className="relative z-10 flex flex-wrap justify-center gap-4 mb-16 max-w-4xl px-4">
                {filters.map((f, i) => (
                    <motion.button
                        key={f}
                        onClick={() => setFilter(f)}
                        whileHover={{ scale: 1.1, rotate: 0 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                            rotate: filter === f ? 0 : (i % 2 === 0 ? 2 : -2),
                            scale: filter === f ? 1.1 : 1,
                            zIndex: filter === f ? 20 : 1
                        }}
                        className={`
                            relative px-6 py-3 shadow-md font-serif font-bold text-lg transition-colors duration-200
                            ${filter === f ? 'bg-yellow-200 text-black shadow-xl' : 'bg-yellow-100 text-gray-700 hover:bg-yellow-50'}
                        `}
                        style={{
                            clipPath: 'polygon(2% 0%, 98% 1%, 100% 98%, 0% 100%)' // Generic jagged paper look
                        }}
                    >
                        {f}
                    </motion.button>
                ))}
            </div>

            {/* Sessions Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl px-6 w-full">
                <AnimatePresence mode='popLayout'>
                    {filteredSessions.map((session) => (
                        <motion.div
                            key={session.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0, rotate: session.rotate }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="relative bg-white p-6 shadow-lg group cursor-pointer"
                            style={{ backgroundColor: session.color }}
                        >
                            {/* Pin Graphic */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 shadow-md border border-red-600 z-20"></div>

                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-black/50 border border-black/10 px-2 py-1 rounded-sm">
                                    {session.category}
                                </span>
                                <div className="text-right">
                                    <div className="flex items-center gap-1 text-sm font-bold font-serif text-gray-800">
                                        <Calendar size={14} /> {session.date}
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                                        <Clock size={12} /> {session.time}
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold font-serif text-gray-900 mb-2 leading-tight min-h-[56px] flex items-center">
                                {session.topic}
                            </h3>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
                                    {session.image ? (
                                        <img src={session.image} alt={session.mentor} className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={20} />
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800">{session.mentor}</p>
                                    <p className="text-xs text-gray-600">{session.role}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedSession(session)}
                                className="w-full bg-black/5 hover:bg-black/10 text-gray-900 font-bold py-2 rounded-sm transition-colors flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white"
                            >
                                Reserve Spot <ArrowRight size={16} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <SessionReservationSheet
                isOpen={!!selectedSession}
                onOpenChange={(open) => !open && setSelectedSession(null)}
                session={selectedSession}
            />
        </div>
    );
};

export default Sessions;
