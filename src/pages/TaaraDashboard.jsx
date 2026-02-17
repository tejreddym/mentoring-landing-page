import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, Calendar, Clock, User, LogOut, Layout, BookOpen, Settings, Bell, Search } from 'lucide-react';

const TaaraDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('upcoming');

    const bookedSession = JSON.parse(localStorage.getItem('demo-booking-data')) || {
        mentorName: "Rajiv Inuganti",
        date: "Feb 24",
        time: "11:00 AM",
        topic: "Career Mentorship"
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans flex text-slate-800">
            <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
                <div className="p-8">
                    <h1 className="text-2xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600">
                        Taara
                    </h1>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-medium">
                        <Layout size={20} /> Dashboard
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-colors">
                        <BookOpen size={20} /> My Learning
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-colors">
                        <Calendar size={20} /> Schedule
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-colors">
                        <Settings size={20} /> Settings
                    </a>
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button onClick={() => navigate('/')} className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-medium w-full transition-colors">
                        <LogOut size={20} /> Sign Out
                    </button>
                </div>
            </aside>

            <main className="flex-1 overflow-y-auto">
                <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
                    <div className="flex items-center gap-4 md:hidden">
                        <span className="text-xl font-serif font-bold text-blue-700">Taara</span>
                    </div>

                    <div className="relative hidden md:block w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search mentors, skills, or sessions..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative text-slate-500 hover:text-slate-700">
                            <Bell size={20} />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-semibold text-slate-900">Alex Student</p>
                                <p className="text-xs text-slate-500">Premium Member</p>
                            </div>
                            <img src="https://i.pravatar.cc/150?img=33" alt="Profile" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                        </div>
                    </div>
                </header>

                <div className="px-6 md:px-12 py-10 max-w-6xl mx-auto">
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">My Learning Journey</h2>
                        <p className="text-slate-500">Track your upcoming sessions and master new skills.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/20">
                            <p className="text-blue-100 text-sm font-medium mb-1">Upcoming Sessions</p>
                            <h3 className="text-3xl font-bold">01</h3>
                        </div>
                        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                            <p className="text-slate-500 text-sm font-medium mb-1">Hours Mentored</p>
                            <h3 className="text-3xl font-bold text-slate-900">12.5</h3>
                        </div>
                        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                            <p className="text-slate-500 text-sm font-medium mb-1">Skills Progress</p>
                            <h3 className="text-3xl font-bold text-slate-900">85%</h3>
                        </div>
                    </div>

                    <div className="flex gap-1 bg-slate-100/50 p-1 rounded-xl w-fit mb-8">
                        {['upcoming', 'completed', 'resources'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'upcoming' && (
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center">
                                <div className="flex flex-col items-center justify-center w-full md:w-24 h-24 bg-blue-50 text-blue-600 rounded-2xl shrink-0">
                                    <span className="text-xs font-bold uppercase tracking-wider">FEB</span>
                                    <span className="text-2xl font-bold">24</span>
                                    <span className="text-xs font-medium">11:00 AM</span>
                                </div>

                                <div className="flex-1 text-center md:text-left">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold mb-3">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                        CONFIRMED
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{bookedSession.topic || "Career Growth Strategy"}</h3>
                                    <div className="flex items-center justify-center md:justify-start gap-4 text-slate-500 text-sm">
                                        <span className="flex items-center gap-1"><User size={16} /> {bookedSession.mentorName}</span>
                                        <span className="flex items-center gap-1"><Clock size={16} /> 60 min</span>
                                        <span className="flex items-center gap-1"><Video size={16} /> Google Meet</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate('/video-call')}
                                    className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                                >
                                    Join Meeting <Video size={18} />
                                </button>
                            </div>

                            <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                                <span>Session ID: #8293</span>
                                <a href="#" className="font-medium text-blue-600 hover:underline">Reschedule</a>
                            </div>
                        </div>
                    )}

                    <div className="mt-10 text-center">
                        <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-medium transition-colors">
                            <span className="text-xl">+</span> Book another session
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TaaraDashboard;
