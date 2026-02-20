import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import SessionReservationSheet from './SessionReservationSheet';

const Sessions = () => {
    const [filter, setFilter] = useState('All');
    const [selectedSession, setSelectedSession] = useState(null);
    const [hoveredId, setHoveredId] = useState(null);

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
            image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100",
            location: "Starhub Co work, Koregaon Park",
            availability: "Almost full",
            isFree: true,
            type: "Interactive session with Q&A",
            vibes: "🔥 High Intensity",
            sentiment: "92% felt 'Ready to Crush it'",
            peerPulse: "24 Students from Pune joined",
            theCatch: "Fast-paced, carry a notepad!",
            color: "#FFF9C4", // Yellow (From Guidance Packs)
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
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
            location: "Online Zoom Session",
            availability: "12 Spots Left",
            isFree: false,
            type: "Expert Strategy Workshop",
            vibes: "🧠 Brain Recharge",
            sentiment: "88% felt 'De-stressed'",
            peerPulse: "18 Med-aspirants joined",
            theCatch: "Bring your specific doubts.",
            color: "#E8F5E9", // Green
            rotate: 2
        },
        {
            id: 3,
            category: "Management",
            topic: "MBA Abroad vs India",
            mentor: "Rohan Das",
            role: "IIM Ahmedabad",
            date: "Feb 15",
            time: "4:00 PM",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
            location: "Starhub Co work, Koregaon Park",
            availability: "Almost full",
            isFree: true,
            type: "Interactive session with Q&A",
            vibes: "💰 ROI Focused",
            sentiment: "95% found 'Clarity'",
            peerPulse: "42 Future Leaders joined",
            theCatch: "Heavy on Finance & Salaries.",
            color: "#FFECB3", // Amber (From Guidance Packs)
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
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100",
            location: "Online Webinar",
            availability: "25 Spots Left",
            isFree: true,
            vibes: "⚖️ Reality Check",
            sentiment: "84% felt 'Eye-opened'",
            peerPulse: "15 Law buffs joined",
            theCatch: "Brutal honesty about work-hours.",
            color: "#F3E5F5", // Purple
            rotate: 3
        },
        {
            id: 5,
            category: "1:1 Mentoring",
            topic: "Personal Profile Review",
            mentor: "Expert Panel",
            role: "Senior Mentors",
            date: "Daily",
            time: "Slots Available",
            image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=100&h=100",
            location: "Private Video Call",
            availability: "Limited Slots",
            isFree: false,
            vibes: "🎯 Hyper-Focus",
            sentiment: "99% felt 'Heard'",
            peerPulse: "Joined by 100+ Seniors",
            theCatch: "Strict 20-min slots.",
            color: "#FCE4EC", // Pink
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
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=100&h=100",
            location: "Online Live Stream",
            availability: "Open Entry",
            isFree: true,
            vibes: "⚡ Tech Fuel",
            sentiment: "91% felt 'Optimistic'",
            peerPulse: "30+ Geeks streaming",
            theCatch: "Will talk about complex code.",
            color: "#E1F5FE", // Light Blue (From Guidance Packs)
            rotate: 1
        }
    ];

    const filteredSessions = filter === 'All'
        ? sessions
        : sessions.filter(s => s.category === filter);

    return (
        <div className="w-full relative overflow-hidden bg-[#faf8f5] py-24 px-4 font-sans">
            {/* Notice Board Background Texture */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]"
                style={{ backgroundImage: 'radial-gradient(#444cf7 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>
            {/* Subtle corkboard warmth */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-yellow-900/[0.03] mix-blend-multiply"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 relative"
                >
                    {/* Header 'Tape' */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/60 shadow-sm rotate-2 backdrop-blur-sm z-20"></div>

                    <div className="inline-block px-5 py-3 bg-yellow-100 border border-yellow-300 text-yellow-800 text-lg font-bold uppercase tracking-widest mb-4 shadow-sm rotate-[-1deg] translate-y-2 relative z-10">
                        Upcoming Sessions
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black font-marker text-gray-900 mb-6 tracking-tight leading-[1.1] relative z-10 mix-blend-multiply mt-4">
                        Real talk with mentors
                    </h2>
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium mb-4">
                        Grab a slot before they're gone!
                    </p>
                </motion.div>

                {/* Filters - Sticky Note Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-20 px-4">
                    {filters.map((f, i) => (
                        <motion.button
                            key={f}
                            onClick={() => setFilter(f)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ y: -5, rotate: filter === f ? 0 : (i % 2 === 0 ? 2 : -2) }}
                            whileTap={{ scale: 0.95 }}
                            className={`
                                px-6 py-3 font-black transition-all duration-300 shadow-md relative
                                ${filter === f
                                    ? 'bg-blue-600 text-white scale-110 z-10 rotate-0'
                                    : 'bg-[#fefce8] text-gray-700 hover:bg-yellow-200'}
                            `}
                            style={{
                                borderBottomRightRadius: '15px 5px',
                                borderBottomLeftRadius: '2px 2px',
                                borderTopRightRadius: '2px 2px',
                                borderTopLeftRadius: '2px 2px',
                                transform: filter !== f ? `rotate(${i % 2 === 0 ? -1 : 1}deg)` : 'rotate(0deg)'
                            }}
                        >
                            {/* Tape for filter */}
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-white/50 shadow-sm rotate-[5deg]"></div>
                            {f}
                        </motion.button>
                    ))}
                </div>

                {/* Sessions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-2 max-w-6xl mx-auto">
                    <AnimatePresence mode='popLayout'>
                        {filteredSessions.map((session, index) => (
                            <motion.div
                                key={session.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1, rotate: hoveredId === session.id ? 0 : session.rotate }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onMouseEnter={() => setHoveredId(session.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 15,
                                    delay: index * 0.05
                                }}
                                whileHover={{ scale: 1.05, zIndex: 50, y: -10 }}
                                onClick={() => setSelectedSession(session)}
                                className="group relative p-6 shadow-[2px_4px_10px_rgba(0,0,0,0.15)] hover:shadow-[10px_15px_25px_rgba(0,0,0,0.2)] cursor-pointer transition-shadow duration-300"
                                style={{
                                    backgroundColor: session.color,
                                    borderBottomRightRadius: '40px 10px',
                                    borderBottomLeftRadius: '2px 2px',
                                    borderTopRightRadius: '2px 2px',
                                    borderTopLeftRadius: '2px 2px',
                                    zIndex: hoveredId === session.id ? 50 : 10
                                }}
                            >
                                {/* Tape at the top */}
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/50 shadow-sm rotate-[-2deg] backdrop-blur-sm border border-white/20"></div>

                                {/* Student Activity Pulse */}
                                <div className="absolute top-6 left-6 flex items-center gap-2 z-20 mix-blend-multiply">
                                    <div className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black/40 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-black/60"></span>
                                    </div>
                                    <span className="text-[10px] font-black text-black/60 uppercase tracking-widest">{session.peerPulse}</span>
                                </div>

                                <div className="relative z-10 pt-5">
                                    <div className="flex justify-between items-start mb-5">
                                        <div className="flex flex-col gap-1">
                                            <div className="text-lg font-bold text-gray-900 mix-blend-multiply">{session.vibes.split(' ')[0]}</div>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-[#173CBA] bg-white/60 px-2 py-0.5 rounded shadow-sm border border-white/50 mix-blend-luminosity">
                                                {session.vibes.split(' ').slice(1).join(' ')}
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-end gap-1 px-3 py-1.5 bg-white/50 backdrop-blur-sm shadow-sm rotate-1" style={{ borderBottomRightRadius: '10px 2px' }}>
                                            <div className="flex items-center gap-1.5 text-xs font-black text-gray-900 mix-blend-multiply">
                                                <Calendar size={12} className="text-gray-900 stroke-[3px]" /> {session.date}
                                            </div>
                                            <div className="text-[10px] font-bold text-gray-700 uppercase tracking-tight mix-blend-multiply">
                                                {session.time}
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl md:text-[26px] font-bold font-serif text-gray-900 mb-5 leading-tight group-hover:text-blue-700 transition-all duration-300 min-h-[64px] mix-blend-multiply">
                                        {session.topic}
                                    </h3>

                                    {/* The "Catch" - Notice Board Style */}
                                    <div className="mb-5 p-2.5 bg-black/5 border-l-4 border-orange-500 relative mix-blend-multiply">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-orange-700 mb-1 flex items-center gap-1">
                                            <span className="text-xs">⚠️</span> The Catch
                                        </p>
                                        <p className="text-[11px] font-bold text-gray-800 leading-normal italic">{session.theCatch}</p>
                                    </div>

                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-md border-2 border-white rotate-[-3deg]">
                                            {session.image ? (
                                                <img src={session.image} alt={session.mentor} className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-500" />
                                            ) : (
                                                <User size={20} />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-base font-black text-gray-900 leading-tight tracking-tight mix-blend-multiply">{session.mentor}</p>
                                            <p className="text-[11px] font-bold text-gray-700 mt-0.5 mix-blend-multiply">{session.role}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t-2 border-dashed border-black/10 mt-auto">
                                        <div className="flex flex-col max-w-[80%]">
                                            <span className="text-[12px] font-bold text-gray-800 tracking-tight italic mix-blend-multiply leading-snug">
                                                "{session.sentiment}"
                                            </span>
                                        </div>
                                        <div className="w-8 h-8 bg-black/80 text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform rotate-[-10deg] group-hover:rotate-0 group-hover:bg-blue-600">
                                            <ArrowRight size={16} strokeWidth={3} />
                                        </div>
                                    </div>
                                </div>

                                {/* Pen scratch annotation hidden initially */}
                                <div className="absolute top-2 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    <div className="text-[12px] text-red-600 font-marker rotate-[15deg] underline decoration-wavy">Join!</div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
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
