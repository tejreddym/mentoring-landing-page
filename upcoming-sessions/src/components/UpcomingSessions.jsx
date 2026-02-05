import React, { useState } from 'react';
import Pin from './Pin';
import { Video, ClipboardList, Bell, ArrowRight } from 'lucide-react';

const categories = ["All Sessions", "JEE", "NEET", "Scholarship", "Career", "Boards", "Architecture"];

const sessionsData = [
    {
        id: 1,
        title: "Advanced Physics: Rotational Dynamics",
        date: "Feb 5, 2026",
        time: "2:00 PM - 3:30 PM",
        speaker: "Dr. H.C. Verma",
        type: "Hall A",
        category: "JEE",
        rotation: "rotate-2",
        pinColor: "#ef4444", // red
        actionType: 'register'
    },
    {
        id: 2,
        title: "Biology: Human Physiology Review",
        date: "Feb 8, 2026",
        time: "10:00 AM - 12:00 PM",
        speaker: "Dr. A.K. Gupta",
        type: "Lab 3",
        category: "NEET",
        rotation: "-rotate-1",
        pinColor: "#3b82f6", // blue
        actionType: 'register'
    },
    {
        id: 3,
        title: "National Boards Strategy Session",
        date: "Feb 10, 2026",
        time: "3:00 PM - 5:00 PM",
        speaker: "Mrs. Sharma",
        type: "Auditorium",
        category: "Boards",
        rotation: "rotate-3",
        pinColor: "#eab308", // yellow
        actionType: 'reminder'
    },
    {
        id: 4,
        title: "Future in AI & Robotics",
        date: "Feb 12, 2026",
        time: "1:00 PM - 2:30 PM",
        speaker: "Prof. Sundar",
        type: "Online - Zoom",
        category: "Career",
        rotation: "-rotate-2",
        pinColor: "#22c55e", // green
        actionType: 'join'
    },
    {
        id: 5,
        title: "Merit Scholarship Test Prep",
        date: "Feb 15, 2026",
        time: "11:00 AM - 1:00 PM",
        speaker: "Vikram Singh",
        type: "Room 201",
        category: "Scholarship",
        rotation: "rotate-1",
        pinColor: "#a855f7", // purple
        actionType: 'register'
    },
    {
        id: 6,
        title: "Sustainable Urban Design Basics",
        date: "Feb 18, 2026",
        time: "9:00 AM - 12:00 PM",
        speaker: "Ar. Meera Reddy",
        type: "Studio B",
        category: "Architecture",
        rotation: "-rotate-3",
        pinColor: "#ec4899", // pink
        actionType: 'reminder'
    }
];

const UpcomingSessions = () => {
    const [activeFilter, setActiveFilter] = useState("All Sessions");

    const filteredSessions = activeFilter === "All Sessions"
        ? sessionsData
        : sessionsData.filter(session => session.category === activeFilter);

    const getActionConfig = (type) => {
        switch (type) {
            case 'join':
                return {
                    label: 'Join Online',
                    icon: Video,
                    colorClass: 'text-rose-600 border-rose-200 hover:bg-rose-50'
                };
            case 'reminder':
                return {
                    label: 'Set Reminder',
                    icon: Bell,
                    colorClass: 'text-amber-600 border-amber-200 hover:bg-amber-50'
                };
            case 'register':
            default:
                return {
                    label: 'Register Now',
                    icon: ClipboardList,
                    colorClass: 'text-indigo-600 border-indigo-200 hover:bg-indigo-50'
                };
        }
    };

    const getCardColor = (pinColor) => {
        switch (pinColor) {
            case '#ef4444': return 'bg-red-50';
            case '#3b82f6': return 'bg-blue-50';
            case '#eab308': return 'bg-yellow-50';
            case '#22c55e': return 'bg-green-50';
            case '#a855f7': return 'bg-purple-50';
            case '#ec4899': return 'bg-pink-50';
            default: return 'bg-stone-50';
        }
    };

    return (
        <div className="relative min-h-screen py-16 px-4 overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-white">
            {/* Texture Background Overlay */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-40"
                style={{
                    backgroundImage: `repeating-linear-gradient(45deg, rgba(0,0,0,0.02) 0px, rgba(0,0,0,0.02) 2px, transparent 2px, transparent 4px)`,
                    backgroundSize: '20px 20px'
                }}
            />


            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 drop-shadow-md mb-2">
                        Upcoming Sessions
                    </h2>
                    <p className="text-gray-700 font-medium text-lg drop-shadow-sm opacity-80">
                        Mark your calendar for these exciting learning opportunities
                    </p>
                </div>

                {/* Session Filter Bar */}
                <div className="flex flex-wrap justify-center gap-4 mb-16 px-4">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveFilter(category)}
                            className={`
                                px-8 py-3 rounded-full font-medium transition-all duration-300 transform
                                ${activeFilter === category
                                    ? 'bg-blue-600 text-white shadow-lg scale-105 ring-2 ring-blue-400 ring-offset-2 ring-offset-green-100'
                                    : 'bg-white text-blue-900 border border-gray-200 hover:shadow-lg hover:bg-blue-50 hover:-translate-y-0.5'
                                }
                            `}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Corkboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8 px-4">
                    {filteredSessions.map((session) => {
                        const action = getActionConfig(session.actionType);
                        const Icon = action.icon;

                        const cardBg = getCardColor(session.pinColor);

                        return (
                            <div
                                key={session.id}
                                className={`transform transition-transform hover:scale-105 duration-300 ease-in-out ${session.rotation}`}
                            >
                                <div className={`relative ${cardBg} p-6 w-full aspect-[4/3] flex flex-col items-center justify-center text-center shadow-[0_20px_40px_-5px_rgba(0,0,0,0.2),0_8px_10px_-6px_rgba(0,0,0,0.1)]`}>

                                    {/* Pin */}
                                    <Pin color={session.pinColor} />

                                    {/* Paper Texture/Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-yellow-50/20 pointer-events-none" />

                                    {/* Content */}
                                    <div className="relative z-10 space-y-3 font-medium w-full flex flex-col items-center">
                                        <h3 className="text-xl leading-tight font-bold text-gray-800">
                                            {session.title}
                                        </h3>

                                        <div className="font-handwritten text-2xl text-gray-600 my-2">
                                            {session.date}
                                        </div>

                                        <div className="text-sm text-gray-500 space-y-1">
                                            <p>{session.time}</p>
                                            <p className="font-semibold text-gray-700">{session.speaker}</p>
                                            <p className="italic text-xs">{session.type}</p>
                                        </div>

                                        {/* Category Badge */}
                                        <span className="inline-block mt-2 px-2 py-0.5 text-xs font-semibold text-blue-800 bg-blue-100 rounded-sm">
                                            {session.category}
                                        </span>

                                        {/* Action Button */}
                                        <button className={`mt-4 group flex items-center gap-2 px-5 py-2 rounded-full border bg-white/50 backdrop-blur-sm transition-all duration-300 ${action.colorClass}`}>
                                            <Icon size={16} className="transition-transform group-hover:scale-110" />
                                            <span className="text-sm font-bold tracking-wide uppercase">{action.label}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    {filteredSessions.length === 0 && (
                        <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
                            <p className="text-xl text-gray-600 font-handwritten">No sessions found for this category.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpcomingSessions;
