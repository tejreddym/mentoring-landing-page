import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../pages/MentorProfiles/components/ui/button";
import { Badge } from "../pages/MentorProfiles/components/ui/badge";
import {
    Sheet,
    SheetContent,
    SheetTitle,
} from "../pages/MentorProfiles/components/ui/sheet";
import {
    Calendar,
    Clock,
    User,
    CheckCircle,
    ChevronRight,
    MapPin,
    Star,
    ArrowUpRight,
    X
} from "lucide-react";

const SessionReservationSheet = ({
    isOpen,
    onOpenChange,
    session
}) => {
    if (!session) return null;

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <Sheet
                    open={isOpen}
                    onOpenChange={onOpenChange}
                >
                    <SheetContent
                        className="w-full sm:max-w-full md:max-w-[78%] md:w-[78%] !m-0 !top-0 !right-0 p-0 overflow-hidden !bg-transparent border-none shadow-none [&>button]:text-white [&>button]:top-6 [&>button]:right-6 [&>button]:z-[10001] [&>button>svg]:w-6 [&>button>svg]:h-6 [&>button>svg]:stroke-[3px]"
                        side="right"
                    >
                        <SheetTitle className="sr-only">Session Details: {session.topic}</SheetTitle>

                        <motion.div
                            key="session-reservation"
                            initial={{ opacity: 0, scale: 0.85, x: 50, y: 50 }}
                            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                            exit={{ opacity: 0, scale: 0, x: 100, y: -800 }}
                            transition={{
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            style={{ transformOrigin: 'bottom right', height: '100%' }}
                            className="h-full bg-white"
                        >
                            <div className="h-full overflow-y-auto custom-scrollbar">
                                {/* Cover Banner */}
                                <div
                                    className="h-52 w-full bg-cover bg-center bg-no-repeat relative"
                                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop')` }}
                                >
                                    <div className="absolute inset-0 bg-black/10"></div>
                                </div>

                                <div className="px-8 pb-4">
                                    <div className="relative -mt-12 mb-6 flex flex-col md:flex-row gap-6 items-start">
                                        {/* Left Column: Avatar & Info */}
                                        <div className="flex flex-col items-start z-10 w-full md:w-auto">
                                            <div className="relative mb-4">
                                                <div className="w-[140px] h-[140px] rounded-[40px] object-cover border-[6px] border-white shadow-2xl bg-gray-100 flex items-center justify-center overflow-hidden transition-transform hover:scale-105 duration-500">
                                                    {session.image ? (
                                                        <img
                                                            src={session.image}
                                                            alt={session.mentor}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <User size={60} className="text-gray-400" />
                                                    )}
                                                </div>
                                                <div className="absolute -bottom-2 -right-2 bg-teal-500 rounded-2xl p-2 border-[4px] border-white z-10 shadow-lg">
                                                    <div className="text-white text-xs font-black uppercase tracking-widest px-1">Active</div>
                                                </div>
                                            </div>

                                            <h2 className="text-5xl font-serif font-black text-gray-900 mb-4 leading-none tracking-tight">
                                                {session.topic}
                                            </h2>

                                            <div className="flex flex-wrap items-center gap-3 mb-8">
                                                <div className="px-4 py-1.5 rounded-2xl bg-primary/5 border border-primary/10 text-primary text-xs font-black uppercase tracking-widest shadow-sm">
                                                    {session.category}
                                                </div>
                                                <div className="px-4 py-1.5 rounded-2xl bg-orange-50 border border-orange-100 text-orange-600 text-xs font-black uppercase tracking-widest shadow-sm">
                                                    {session.vibes}
                                                </div>
                                            </div>

                                            {/* Details Row - Student Focused */}
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl mb-10">
                                                <div className="bg-gray-50/50 p-4 rounded-[32px] border border-gray-100">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">When</p>
                                                    <p className="text-lg font-black text-gray-900">{session.date}</p>
                                                    <p className="text-xs font-bold text-gray-500">{session.time}</p>
                                                </div>
                                                <div className="bg-gray-50/50 p-4 rounded-[32px] border border-gray-100">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Peer Pulse</p>
                                                    <p className="text-lg font-black text-teal-600">{session.peerPulse.split(' ')[0]}+</p>
                                                    <p className="text-xs font-bold text-gray-500">Students Joining</p>
                                                </div>
                                                <div className="bg-gray-50/50 p-4 rounded-[32px] border border-gray-100 col-span-2 md:col-span-1">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Availability</p>
                                                    <p className={`text-lg font-black ${session.availability.includes('full') ? 'text-orange-500' : 'text-primary'}`}>
                                                        {session.availability}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Extreme Transparency: The Catch */}
                                            <div className="w-full max-w-2xl mb-10 p-8 rounded-[40px] bg-gradient-to-br from-orange-50 to-white border-2 border-orange-100 shadow-sm relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
                                                    <X size={80} className="text-orange-900 rotate-12" />
                                                </div>
                                                <div className="relative z-10">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-200">
                                                            ⚠️
                                                        </div>
                                                        <h4 className="text-lg font-black text-orange-900 uppercase tracking-tight">The Real Catch</h4>
                                                    </div>
                                                    <p className="text-gray-700 font-bold leading-relaxed mb-4">
                                                        "{session.theCatch}"
                                                    </p>
                                                    <div className="h-1 w-12 bg-orange-200 rounded-full"></div>
                                                </div>
                                            </div>

                                            {/* Mentor Context */}
                                            <div className="flex items-center gap-4 p-6 rounded-[32px] bg-white border border-gray-100 shadow-sm mb-10 w-full max-w-2xl">
                                                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 overflow-hidden shadow-inner">
                                                    {session.image ? (
                                                        <img src={session.image} alt={session.mentor} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <User size={24} />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-0.5">Your Mentor</p>
                                                    <p className="text-xl font-black text-gray-900 leading-tight">{session.mentor}</p>
                                                    <p className="text-sm font-bold text-primary mt-1">{session.role}</p>
                                                </div>
                                            </div>

                                            {/* Booking Action */}
                                            <div className="w-full max-w-2xl flex flex-col md:flex-row gap-4 mb-4">
                                                <Button
                                                    className={`h-[72px] px-10 text-lg rounded-[24px] shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] font-black flex items-center justify-center gap-3 flex-1 ${session.isFree
                                                        ? "bg-teal-500 hover:bg-teal-600 text-white shadow-teal-100"
                                                        : "bg-primary hover:bg-indigo-700 text-white shadow-primary/30"
                                                        }`}
                                                    onClick={() => {
                                                        alert(session.isFree ? "Registration successful for FREE session!" : "Reservation confirmed for members!");
                                                        onOpenChange(false);
                                                    }}
                                                >
                                                    {session.isFree ? "Grab your FREE Spot" : "Confirm Member Access"} <ArrowUpRight className="w-6 h-6 stroke-[3px]" />
                                                </Button>
                                                <div className="hidden md:flex flex-col justify-center">
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 text-center">Student Vibe</p>
                                                    <div className="px-4 py-2 rounded-2xl bg-white border border-gray-100 shadow-sm text-sm font-black text-gray-800 italic">
                                                        "{session.sentiment.split("'")[1]}"
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Interactive: Drop a Question */}
                                <div className="mx-8 mb-12 p-8 rounded-[40px] bg-indigo-50/50 border-2 border-indigo-100 relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h3 className="text-xl font-black text-indigo-900 mb-6 font-serif flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                                                💬
                                            </div>
                                            Got a burning doubt? Drop it here.
                                        </h3>
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <input
                                                type="text"
                                                placeholder={`What's your biggest doubt about ${session.topic.toLowerCase()}?`}
                                                className="flex-1 bg-white border-2 border-indigo-100 rounded-2xl px-6 h-14 font-bold text-gray-900 placeholder:text-indigo-200 focus:outline-none focus:border-indigo-600 transition-colors shadow-sm"
                                            />
                                            <button className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black shadow-lg shadow-indigo-200 transition-all hover:scale-105 active:scale-95 whitespace-nowrap">
                                                Submit for Q&A
                                            </button>
                                        </div>
                                        <p className="mt-4 text-xs font-bold text-indigo-400 flex items-center gap-2">
                                            <Star size={12} className="fill-indigo-400" /> This will be prioritized during the live session!
                                        </p>
                                    </div>
                                </div>

                                {/* Content Section Divider */}
                                <div className="border-t border-gray-100 mx-8"></div>

                                {/* Detailed Content Grid */}
                                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                                    {/* Left Column: What's in it for you? */}
                                    <div className="space-y-8">
                                        <section>
                                            <h3 className="text-2xl font-black text-gray-900 mb-6 font-serif">What's the TL;DR?</h3>
                                            <div className="bg-gray-50/50 p-8 rounded-[40px] border border-gray-100 text-gray-600 leading-relaxed text-lg space-y-6">
                                                <p className="font-bold text-gray-800">
                                                    Join {session.mentor} for an unfiltered session on <strong>{session.topic}</strong>.
                                                </p>
                                                <div className="space-y-4">
                                                    <div className="flex gap-4 items-start">
                                                        <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center font-black shrink-0 shadow-sm">✓</div>
                                                        <p className="text-sm font-bold leading-snug">Detailed roadmap specifically for students in {session.category}.</p>
                                                    </div>
                                                    <div className="flex gap-4 items-start">
                                                        <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-black shrink-0 shadow-sm">⚡</div>
                                                        <p className="text-sm font-bold leading-snug">Insider hacks {session.mentor} used at {session.role} to excel.</p>
                                                    </div>
                                                    <div className="flex gap-4 items-start">
                                                        <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-black shrink-0 shadow-sm">🎯</div>
                                                        <p className="text-sm font-bold leading-snug">Live interactive exercises (No boring slides).</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>

                                    {/* Right Column: The Flow */}
                                    <div className="space-y-8">
                                        <section>
                                            <h3 className="text-2xl font-black text-gray-900 mb-6 font-serif">The Session Flow</h3>
                                            <div className="bg-gray-50/50 p-8 rounded-[40px] border border-gray-100">
                                                <div className="space-y-8 border-l-4 border-gray-100 pl-8 ml-2">
                                                    <div className="relative">
                                                        <div className="absolute -left-[45px] top-1.5 w-7 h-7 rounded-2xl bg-primary text-white flex items-center justify-center text-[10px] font-black shadow-lg shadow-primary/20 ring-4 ring-white">1</div>
                                                        <h4 className="font-black text-gray-900 text-lg">Introduction & Vibes</h4>
                                                        <p className="text-[10px] text-teal-600 font-black uppercase tracking-widest mb-1">15 Mins</p>
                                                        <p className="text-gray-500 text-sm font-bold">Setting the stage. No fluff.</p>
                                                    </div>
                                                    <div className="relative">
                                                        <div className="absolute -left-[45px] top-1.5 w-7 h-7 rounded-2xl bg-gray-200 text-gray-400 flex items-center justify-center text-[10px] font-black ring-4 ring-white">2</div>
                                                        <h4 className="font-black text-gray-900 text-lg">The Deep Dive</h4>
                                                        <p className="text-[10px] text-teal-600 font-black uppercase tracking-widest mb-1">30 Mins</p>
                                                        <p className="text-gray-500 text-sm font-bold">Cracking the strategy and core concepts.</p>
                                                    </div>
                                                    <div className="relative">
                                                        <div className="absolute -left-[45px] top-1.5 w-7 h-7 rounded-2xl bg-gray-200 text-gray-400 flex items-center justify-center text-[10px] font-black ring-4 ring-white">3</div>
                                                        <h4 className="font-black text-gray-900 text-lg">Interactive Q&A</h4>
                                                        <p className="text-[10px] text-teal-600 font-black uppercase tracking-widest mb-1">20 Mins</p>
                                                        <p className="text-gray-500 text-sm font-bold">Your pre-submitted doubts answered live.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>

                                {/* Bottom Spacer */}
                                <div className="pb-12 h-12"></div>
                            </div>
                        </motion.div>
                    </SheetContent>
                </Sheet>
            )}
        </AnimatePresence>
    );
};

export default SessionReservationSheet;
