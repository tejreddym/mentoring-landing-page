import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';

const Sessions = () => {
    const [filter, setFilter] = useState('All');

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
            color: "#E0F2FE", // Light Blue
            rotate: -2
        },
        {
            id: 2,
            category: "Medical",
            topic: "NEET Preparation Strategy",
            mentor: "Dr. Sia Verma",
            role: "AIIMS Delhi",
            date: "Feb 14",
            time: "6:30 PM",
            color: "#F0FDF4", // Light Green
            rotate: 1
        },
        {
            id: 3,
            category: "Management",
            topic: "MBA Abroad vs India",
            mentor: "Rohan Das",
            role: "IIM Ahmedabad",
            date: "Feb 15",
            time: "4:00 PM",
            color: "#FFF7ED", // Light Orange
            rotate: -1
        },
        {
            id: 4,
            category: "Law",
            topic: "Life at NLU",
            mentor: "Priya Sharma",
            role: "NLU Jodhpur",
            date: "Feb 18",
            time: "7:00 PM",
            color: "#FAF5FF", // Light Purple
            rotate: 2
        },
        {
            id: 5,
            category: "1:1 Mentoring",
            topic: "Personal Profile Review",
            mentor: "Expert Panel",
            role: "Senior Mentors",
            date: "Daily",
            time: "Slots Available",
            color: "#FFFBEB", // Light Yellow
            rotate: -3
        },
        {
            id: 6,
            category: "Engineering",
            topic: "CS vs IT Branches",
            mentor: "Tech Lead",
            role: "Google",
            date: "Feb 20",
            time: "8:00 PM",
            color: "#E0F2FE", // Light Blue
            rotate: 1
        }
    ];

    const filteredSessions = filter === 'All'
        ? sessions
        : sessions.filter(s => s.category === filter);

    return (
        <div className="min-h-screen bg-[#F5F5F0] overflow-hidden relative flex flex-col items-center py-12 md:py-20 font-sans">
            {/* Corkboard Texture Background */}
            <div className="absolute inset-0 z-0 opacity-80 pointer-events-none"
                style={{
                    backgroundColor: '#d6cba1',
                    backgroundImage: 'url("https://www.transparenttextures.com/patterns/cork-board.png")',
                    backgroundSize: '300px'
                }}
            />

            {/* Header - Pinned Paper Style */}
            <div className="relative z-10 mb-12 text-center transform -rotate-1">
                <div className="bg-white/90 backdrop-blur-sm px-8 py-4 shadow-lg rotate-1 border border-gray-200">
                    <div className="w-3 h-3 rounded-full bg-red-500 absolute -top-1.5 left-1/2 -translate-x-1/2 shadow-sm border border-red-600"></div>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-800 tracking-tight">
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
                            relative px-6 py-3 shadow-md font-handwriting font-bold text-lg transition-colors duration-200
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
                                    <div className="flex items-center gap-1 text-sm font-bold text-gray-800">
                                        <Calendar size={14} /> {session.date}
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                                        <Clock size={12} /> {session.time}
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight min-h-[56px] flex items-center">
                                {session.topic}
                            </h3>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                    <User size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800">{session.mentor}</p>
                                    <p className="text-xs text-gray-600">{session.role}</p>
                                </div>
                            </div>

                            <button className="w-full bg-black/5 hover:bg-black/10 text-gray-900 font-bold py-2 rounded-sm transition-colors flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white">
                                Reserve Spot <ArrowRight size={16} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Sessions;
