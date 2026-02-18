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
                                                <div className="w-[140px] h-[140px] rounded-full object-cover border-[6px] border-white shadow-lg bg-gray-100 flex items-center justify-center overflow-hidden">
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
                                                <div className="absolute bottom-2 right-2 bg-blue-600 rounded-full p-1.5 border-[3px] border-white z-10">
                                                    <CheckCircle className="w-5 h-5 text-white fill-blue-600" />
                                                </div>
                                            </div>

                                            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-2 leading-tight">
                                                {session.topic}
                                            </h2>

                                            <p className="text-blue-600 font-medium mb-4 flex items-center gap-2">
                                                <Star size={16} className="fill-blue-600" />
                                                {session.type || "Interactive session with Q&A"}
                                            </p>

                                            {/* Details Row */}
                                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700 font-medium mb-6">
                                                <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1 rounded-full text-blue-700">
                                                    <Calendar size={14} />
                                                    <span>{session.date}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 bg-indigo-50 px-3 py-1 rounded-full text-indigo-700">
                                                    <Clock size={14} />
                                                    <span>{session.time}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 bg-orange-50 px-3 py-1 rounded-full text-orange-700 whitespace-nowrap">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
                                                    <span>{session.availability || "Slots Available"}</span>
                                                </div>
                                            </div>

                                            {/* Location Section */}
                                            <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100 w-full max-w-2xl">
                                                <div className="flex items-start gap-3">
                                                    <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                                                        <MapPin className="w-5 h-5 text-blue-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-gray-900 mb-1">Session Location</h4>
                                                        <p className="text-gray-600 text-sm mb-3">{session.location || "Online Session"}</p>
                                                        {session.mapsLink && (
                                                            <a
                                                                href={session.mapsLink}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-bold hover:underline"
                                                            >
                                                                View on Google Maps <ArrowUpRight size={14} />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-lg text-teal-700 mb-4 font-semibold">
                                                <User className="w-5 h-5 shrink-0" />
                                                <span>Hosted by {session.mentor} • {session.role}</span>
                                            </div>

                                            <div className="flex gap-2 mb-8">
                                                <Badge
                                                    variant="secondary"
                                                    className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full border border-gray-100"
                                                >
                                                    {session.category}
                                                </Badge>
                                                <Badge
                                                    variant="secondary"
                                                    className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full border border-blue-100"
                                                >
                                                    {session.isFree ? "Free Session" : "Members Only"}
                                                </Badge>
                                            </div>

                                            <Button
                                                className={`px-8 py-6 text-base rounded-full shadow-md transition-all hover:shadow-lg font-semibold flex items-center justify-center gap-2 w-full md:w-auto mt-2 ${session.isFree
                                                        ? "bg-teal-500 hover:bg-teal-600 text-white shadow-teal-100"
                                                        : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-100"
                                                    }`}
                                                onClick={() => {
                                                    alert(session.isFree ? "Registration successful for FREE session!" : "Reservation confirmed for members!");
                                                    onOpenChange(false);
                                                }}
                                            >
                                                {session.isFree ? "Register for FREE" : "Confirm Member Spot"} <ChevronRight className="w-4 h-4" />
                                            </Button>
                                        </div>

                                        {/* Right Column: Experience/Stats Summary (Desktop) */}
                                        <div className="flex-1 w-full md:w-auto flex flex-col items-start md:items-end pt-14 gap-4">
                                            <div className="flex flex-col items-end space-y-3">
                                                <p className="text-gray-500 font-medium text-lg uppercase tracking-wider">Session Highlights</p>

                                                <div className="flex items-center gap-2 text-gray-800 font-bold">
                                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                    Live Q&A Included
                                                </div>

                                                <div className="flex items-center gap-2 text-gray-800 font-bold">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                                    Recorded Playback Available
                                                </div>

                                                <div className="flex items-center gap-2 text-gray-800 font-bold">
                                                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                                    Access to Study Material
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Section Divider */}
                                <div className="border-t border-gray-100 mx-8"></div>

                                {/* Detailed Content Grid */}
                                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                                    {/* Left Column: Session Agenda */}
                                    <div className="space-y-8">
                                        <section>
                                            <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">Session Description</h3>
                                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-gray-600 leading-relaxed text-base space-y-4">
                                                <p>
                                                    Join {session.mentor} for an intensive session on <strong>{session.topic}</strong>.
                                                    This session is specifically designed for students and professionals looking to excel in {session.category}.
                                                </p>
                                                <p>
                                                    <strong className="text-gray-900 block mb-1">What to expect</strong>
                                                    During this {session.time !== "Slots Available" ? "timed" : "interactive"} session, we will dive deep into
                                                    the core principles of {session.topic}. You'll gain practical insights and strategies that aren't
                                                    available in textbooks.
                                                </p>
                                                <div>
                                                    <strong className="text-gray-900 block mb-2">Key Takeaways:</strong>
                                                    <ul className="list-disc pl-5 space-y-1">
                                                        <li>Detailed roadmap for success in {session.category}</li>
                                                        <li>Interactive problem-solving exercises</li>
                                                        <li>Insider tips from {session.mentor}'s experience at {session.role}</li>
                                                        <li>Personalized feedback during the Q&A segment</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </section>
                                    </div>

                                    {/* Right Column: Why Attend */}
                                    <div className="space-y-8">
                                        <section>
                                            <h3 className="text-xl font-bold text-gray-900 mb-6 font-serif">Curriculum</h3>
                                            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                                                <div className="space-y-8 border-l-2 border-gray-200 pl-8 ml-2">
                                                    <div className="relative">
                                                        <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-blue-600 border-[3px] border-white shadow-sm ring-1 ring-gray-100"></div>
                                                        <h4 className="font-bold text-gray-900 text-lg">Introduction & Basics</h4>
                                                        <p className="text-sm text-teal-700 font-medium mb-1">15 Minutes</p>
                                                        <p className="text-gray-600 text-sm">Setting the stage and covering foundational concepts.</p>
                                                    </div>
                                                    <div className="relative">
                                                        <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-gray-300 border-[3px] border-white shadow-sm ring-1 ring-gray-100"></div>
                                                        <h4 className="font-bold text-gray-900 text-lg">Core Strategy Analysis</h4>
                                                        <p className="text-sm text-teal-700 font-medium mb-1">30 Minutes</p>
                                                        <p className="text-gray-600 text-sm">Deep dive into proven frameworks and methodologies.</p>
                                                    </div>
                                                    <div className="relative">
                                                        <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-gray-300 border-[3px] border-white shadow-sm ring-1 ring-gray-100"></div>
                                                        <h4 className="font-bold text-gray-900 text-lg">Live Case Studies</h4>
                                                        <p className="text-sm text-teal-700 font-medium mb-1">30 Minutes</p>
                                                        <p className="text-gray-600 text-sm">Reviewing real-world examples and practical applications.</p>
                                                    </div>
                                                    <div className="relative">
                                                        <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-gray-300 border-[3px] border-white shadow-sm ring-1 ring-gray-100"></div>
                                                        <h4 className="font-bold text-gray-900 text-lg">Interactive Q&A</h4>
                                                        <p className="text-sm text-teal-700 font-medium mb-1">15 Minutes</p>
                                                        <p className="text-gray-600 text-sm">Your chance to get specific questions answered by {session.mentor}.</p>
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
