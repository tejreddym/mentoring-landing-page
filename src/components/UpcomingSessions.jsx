import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowRight, User, Star } from 'lucide-react';

const UpcomingSessions = () => {
    const [filter, setFilter] = useState('All');

    const categories = ["All", "Tech", "Design", "Business", "Marketing"];

    const sessions = [
        {
            id: 1,
            title: "Future of AI in Product Design",
            mentor: "Sarah Chen",
            role: "Product Lead at OpenAI",
            date: "March 15, 2026",
            time: "10:00 AM PST",
            category: "Tech",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
            tags: ["AI", "Design", "Product"]
        },
        {
            id: 2,
            title: "Building Scalable Startups",
            mentor: "Michael Ross",
            role: "Founder at YC Alumni",
            date: "March 18, 2026",
            time: "2:00 PM PST",
            category: "Business",
            image: "https://images.unsplash.com/photo-1559136555-930d72f1d302?auto=format&fit=crop&q=80&w=800",
            tags: ["Startup", "Growth", "Funding"]
        },
        {
            id: 3,
            title: "Modern UI/UX Trends 2026",
            mentor: "Jessica Lee",
            role: "Principal Designer at Airbnb",
            date: "March 20, 2026",
            time: "11:30 AM PST",
            category: "Design",
            image: "https://images.unsplash.com/photo-1558655146-d09347e0c708?auto=format&fit=crop&q=80&w=800",
            tags: ["UI/UX", "Mobile", "Web"]
        },
        {
            id: 4,
            title: "Content Marketing Masterclass",
            mentor: "David Kim",
            role: "CMO at GrowthHacker",
            date: "March 22, 2026",
            time: "9:00 AM PST",
            category: "Marketing",
            image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
            tags: ["Content", "SEO", "Social"]
        }
    ];

    const filteredSessions = filter === 'All' ? sessions : sessions.filter(s => s.category === filter);

    return (
        <div className="min-h-screen bg-[#F8FAFC] relative overflow-hidden font-sans selection:bg-blue-100 pb-20">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-50 to-transparent pointer-events-none" />
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-purple-100/40 rounded-full blur-[100px] animate-pulse delay-1000" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 pt-24">

                {/* Header */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-semibold text-sm tracking-wide uppercase"
                    >
                        Learn from the best
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6"
                    >
                        Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Sessions</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-600 leading-relaxed"
                    >
                        Join interactive live sessions with industry leaders. Master new skills, ask questions, and network with peers.
                    </motion.p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map((cat, idx) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`
                                px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300
                                ${filter === cat
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-105'
                                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}
                            `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Sessions List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatePresence mode='popLayout'>
                        {filteredSessions.map((session) => (
                            <motion.div
                                key={session.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                whileHover={{ y: -5 }}
                                className="group relative bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden"
                            >
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Image */}
                                    <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden relative shrink-0">
                                        <img
                                            src={session.image}
                                            alt={session.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-lg shadow-sm">
                                            {session.category}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-3">
                                                <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                                                    <Calendar size={14} className="text-blue-500" /> {session.date}
                                                </span>
                                                <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                                                    <Clock size={14} className="text-blue-500" /> {session.time}
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                {session.title}
                                            </h3>

                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                                                    {session.mentor[0]}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800">{session.mentor}</p>
                                                    <p className="text-xs text-slate-500">{session.role}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-4 border-t border-slate-100 pt-4">
                                            <div className="flex gap-2">
                                                {session.tags.map(tag => (
                                                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded-sm">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <button className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                                                Register <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default UpcomingSessions;
