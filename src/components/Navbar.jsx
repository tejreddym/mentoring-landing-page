import React, { useState } from 'react';
import { Search, ChevronDown, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="w-full bg-[#F0F9FF] px-6 py-4 md:px-12 flex items-center justify-between sticky top-0 z-[9999]">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
                <img src="/logo.png" alt="College Mentor" className="h-10 w-auto object-contain" />
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                <Link to="/" className="hover:text-[#173CBA] transition-colors font-bold text-[#173CBA]">Home</Link>

                <div className="flex items-center gap-1 cursor-pointer hover:text-[#173CBA] transition-colors">
                    Colleges <ChevronDown size={14} />
                </div>

                <div className="flex items-center gap-1 cursor-pointer hover:text-[#173CBA] transition-colors">
                    Courses <ChevronDown size={14} />
                </div>

                <div className="flex items-center gap-1 cursor-pointer hover:text-[#173CBA] transition-colors">
                    Exams <ChevronDown size={14} />
                </div>

                {/* Careers - Highlighted Yellow as requested */}
                <div className="flex items-center gap-1 cursor-pointer text-yellow-500 font-bold transition-colors">
                    Careers <ChevronDown size={14} />
                </div>

                <a href="#" className="hover:text-[#173CBA] transition-colors">News</a>

                {/* More Dropdown */}
                <div className="relative group">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-[#173CBA] transition-colors">
                        More <ChevronDown size={14} />
                    </div>
                    {/* Dropdown Menu */}
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[9999]">
                        <Link to="/testimonials" className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#F0F9FF] hover:text-[#173CBA] font-medium transition-colors">
                            Testimonials
                        </Link>

                        <Link to="/faq" className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#F0F9FF] hover:text-[#173CBA] font-medium transition-colors">
                            FAQ
                        </Link>
                        <Link to="/faq-glass" className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#F0F9FF] hover:text-[#173CBA] font-medium transition-colors">
                            FAQ (Glass)
                        </Link>
                        <Link to="/sessions" className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#F0F9FF] hover:text-[#173CBA] font-medium transition-colors">
                            Sessions
                        </Link>
                        <Link to="/mentors" className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#F0F9FF] hover:text-[#173CBA] font-medium transition-colors">
                            Mentors Showcase
                        </Link>
                        <Link to="/mentors-v2" className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#F0F9FF] hover:text-[#173CBA] font-medium transition-colors">
                            Mentors 2.0 (Stack)
                        </Link>
                        <a href="/pages/SixMentors.html" className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#F0F9FF] hover:text-[#173CBA] font-medium transition-colors">
                            Six Mentors (Spotlight)
                        </a>

                        <Link to="/services" className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#F0F9FF] hover:text-[#173CBA] font-medium transition-colors">
                            Services & Pricing
                        </Link>

                        <Link to="/services-v4" className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#F0F9FF] hover:text-[#173CBA] font-medium transition-colors">
                            Services 4.0 (Roadmap)
                        </Link>
                        <Link to="/roadmap" className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#F0F9FF] hover:text-[#173CBA] font-medium transition-colors">
                            Career Roadmap (Stepper)
                        </Link>
                        <Link to="/design-success-stories" className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#F0F9FF] hover:text-[#173CBA] font-medium transition-colors">
                            Success Stories
                        </Link>
                        <Link to="/upcoming-sessions" className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#F0F9FF] hover:text-[#173CBA] font-medium transition-colors">
                            Upcoming Sessions
                        </Link>
                        <Link to="/stepper" className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#F0F9FF] hover:text-[#173CBA] font-medium transition-colors border-t border-gray-100">
                            Career Stepper (JSX)
                        </Link>
                        <Link to="/home3.1" className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#F0F9FF] hover:text-[#173CBA] font-medium transition-colors border-t border-gray-100">
                            Home 3.1
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
                <button className="text-primary hover:text-blue-700 transition-colors p-2 rounded-full hover:bg-blue-50">
                    <Search size={20} color="#173CBA" />
                </button>

                <button className="hidden md:flex items-center gap-2 bg-white text-[#00C798] border border-[#00C798] px-5 py-2 rounded-lg font-bold text-sm hover:bg-green-50 transition-colors shadow-sm">
                    <LogIn size={16} /> Login
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
