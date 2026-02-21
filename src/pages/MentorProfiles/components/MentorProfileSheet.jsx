import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
    Sheet,
    SheetContent,
    SheetTitle,
} from "./ui/sheet";
import { Star, CheckCircle, GraduationCap, Heart, ChevronRight, MapPin, Clock, ArrowUpRight, X } from "lucide-react";
import BookingPage from "../../BookingPage";

export function MentorProfileSheet({
    isOpen,
    onOpenChange,
    mentor: propMentor,
}) {
    const [mentor, setMentor] = useState(propMentor);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    useEffect(() => {
        if (propMentor) {
            setMentor(propMentor);
        }
    }, [propMentor]);

    useEffect(() => {
        if (!isBookingOpen) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isBookingOpen]);

    if (!mentor) return null;

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <Sheet
                    open={isOpen}
                    onOpenChange={(open) => {
                        if (!open && isBookingOpen) {
                            return;
                        }
                        if (!open) {
                            setIsBookingOpen(false);
                        }
                        onOpenChange(open);
                    }}
                >
                    <SheetContent
                        className={`w-full sm:max-w-full md:max-w-[78%] md:w-[78%] !m-0 !top-0 !right-0 p-0 overflow-hidden !bg-transparent border-none shadow-none [&>button]:text-white [&>button]:top-6 [&>button]:right-6 [&>button]:z-[10001] [&>button>svg]:w-6 [&>button>svg]:h-6 [&>button>svg]:stroke-[3px] ${isBookingOpen ? "pointer-events-none" : ""}`}
                        side="right"
                    >
                        <SheetTitle className="sr-only">Mentor Profile: {mentor.name}</SheetTitle>

                        <motion.div
                            key="mentor-profile"
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
                                {/* Cover Banner */}
                                <div
                                    className="h-52 w-full bg-cover bg-center bg-no-repeat relative"
                                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop')` }}
                                >
                                    <div className="absolute inset-0 bg-black/10"></div> {/* Subtle overlay for text contrast if needed later, or just depth */}
                                </div>

                                <div className="px-6 md:px-8 pb-4">
                                    <div className="relative -mt-12 mb-6 flex flex-col md:flex-row gap-6 items-start">

                                        {/* Left Column: Avatar & Info */}
                                        <div className="flex flex-col items-start z-10">
                                            <div className="relative mb-4">
                                                <img
                                                    src={mentor.image}
                                                    alt={mentor.name}
                                                    className="w-[140px] h-[140px] rounded-full object-cover border-[6px] border-white shadow-lg"
                                                />
                                                <div className="absolute bottom-2 right-2 bg-blue-600 rounded-full p-1.5 border-[3px] border-white z-10">
                                                    <CheckCircle className="w-5 h-5 text-white fill-blue-600" />
                                                </div>
                                            </div>

                                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
                                                {mentor.name}
                                            </h2>

                                            {/* Stats Row */}
                                            <div className="flex items-center gap-2 text-sm text-gray-700 font-medium mb-4">
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                                                    <span className="font-bold text-gray-900">{mentor.rating}</span>
                                                    <span className="text-gray-500">(120 reviews)</span>
                                                </div>
                                                <span className="text-gray-300">•</span>
                                                <div className="flex items-center gap-1">
                                                    <span>🏆</span>
                                                    <span>200+ Sessions</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-2 text-base text-teal-700 mb-2 font-medium">
                                                <GraduationCap className="w-5 h-5 shrink-0" />
                                                <span className="font-semibold">{mentor.jobTitle} • {mentor.company}</span>
                                            </div>

                                            <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                                                <MapPin className="w-4 h-4" />
                                                <span>{mentor.location || "Bangalore, India"}</span>
                                            </div>

                                            <div className="flex gap-2 mb-6">
                                                {mentor.skills.slice(0, 3).map((skill) => (
                                                    <Badge
                                                        key={skill}
                                                        variant="secondary"
                                                        className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full border border-gray-100"
                                                    >
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>

                                            <Button
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base rounded-full shadow-md shadow-blue-100 transition-all hover:shadow-lg font-semibold flex items-center justify-center gap-2 w-full md:w-auto mt-2"
                                                onClick={() => setIsBookingOpen(true)}
                                            >
                                                Book a Session <ChevronRight className="w-4 h-4" />
                                            </Button>
                                        </div>

                                        {/* Right Column: Actions (Desktop) */}
                                        <div className="flex-1 w-full md:w-auto flex flex-col items-start md:items-end pt-6 md:pt-14 gap-4">
                                            <div className="flex flex-wrap gap-3 justify-start md:justify-end w-full">
                                                <Button variant="outline" className="w-12 h-12 p-0 rounded-lg border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-200">
                                                    <Heart className="w-5 h-5" />
                                                </Button>
                                                <Button variant="outline" className="h-12 px-6 rounded-lg border-gray-200 text-gray-700 font-semibold hover:border-gray-300 hover:bg-gray-50">
                                                    Ask a Question
                                                </Button>
                                                <Button variant="outline" className="h-12 px-6 rounded-lg border-gray-200 text-gray-700 font-semibold hover:border-gray-300 hover:bg-gray-50">
                                                    View Pricing
                                                </Button>
                                            </div>

                                            {/* Experience & Education Summary */}
                                            <div className="flex flex-col items-start md:items-end mt-8 md:mt-12 space-y-3">
                                                <p className="text-gray-500 font-medium text-lg">{mentor.yearsOfExperience}+ years of experience</p>

                                                <div className="flex items-center gap-2 text-gray-800 font-bold">
                                                    {/* Microsoft Logo Mock */}
                                                    <div className="grid grid-cols-2 gap-0.5 w-4 h-4 mr-1">
                                                        <div className="bg-[#F25022]"></div>
                                                        <div className="bg-[#7FBA00]"></div>
                                                        <div className="bg-[#00A4EF]"></div>
                                                        <div className="bg-[#FFB900]"></div>
                                                    </div>
                                                    Microsoft
                                                </div>

                                                <div className="flex items-center gap-2 text-gray-800 font-bold">
                                                    {/* Amazon Logo */}
                                                    <img
                                                        src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg"
                                                        alt="Amazon"
                                                        className="w-5 h-5 object-contain mr-1"
                                                    />
                                                    Amazon
                                                </div>

                                                <div className="flex items-center gap-2 text-gray-800 font-bold">
                                                    <GraduationCap className="w-5 h-5 text-gray-800 mr-1" />
                                                    PSG College of Technology
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Section Divider */}
                                <div className="border-t border-gray-100 mx-8"></div>

                                {/* Detailed Content */}
                                {/* Detailed Content Grid */}
                                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                                    {/* Left Column: About & Testimonials */}
                                    <div className="space-y-8">
                                        {/* About Section */}
                                        <section>
                                            <h3 className="text-xl font-bold text-gray-900 mb-4 font-serif">About</h3>
                                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-gray-600 leading-relaxed text-base space-y-4">
                                                <p>
                                                    I am a passionate {mentor.jobTitle} with over {mentor.yearsOfExperience} years of experience in the industry.
                                                    Currently working at {mentor.company}, I specialize in building scalable products and leading high-performing teams.
                                                    I love mentoring aspiring professionals and helping them navigate their careers.
                                                </p>
                                                <p>
                                                    <strong className="text-gray-900 block mb-1">My Mentorship Style</strong>
                                                    I believe in a hands-on, practical approach. Whether you're looking to crack a big tech interview or want to
                                                    improve your day-to-day design/coding skills, I tailor my sessions to your specific needs. I focus on actionable
                                                    advice that you can apply immediately to see results.
                                                </p>
                                                <div>
                                                    <strong className="text-gray-900 block mb-2">What I can help you with:</strong>
                                                    <ul className="list-disc pl-5 space-y-1">
                                                        <li>Portfolio & Resume Reviews</li>
                                                        <li>Mock Interviews (Behavioral & Technical)</li>
                                                        <li>Career Growth Strategy & Promotion Tips</li>
                                                        <li>Navigating Office Politics & Leadership</li>
                                                        <li>Salary Negotiation & Compensation Strategies</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </section>

                                        {/* Testimonials */}
                                        <section>
                                            <h3 className="text-xl font-bold text-gray-900 mb-6 font-serif">What Mentees Say</h3>
                                            <div className="flex flex-col gap-4 pb-4">
                                                {/* Mock Testimonial 1 */}
                                                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 relative">
                                                    <span className="absolute top-5 right-5 text-xs text-gray-400 font-medium">1 month ago</span>
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">JD</div>
                                                        <div>
                                                            <p className="font-bold text-gray-900 text-sm">John Doe</p>

                                                        </div>
                                                    </div>
                                                    <div className="flex gap-0.5 mb-2 text-yellow-500">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                                                        ))}
                                                    </div>
                                                    <p className="text-gray-600 text-sm leading-relaxed">"The insights I gained were invaluable. Truly helped me level up my career."</p>
                                                </div>
                                                {/* Mock Testimonial 2 */}
                                                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 relative">
                                                    <span className="absolute top-5 right-5 text-xs text-gray-400 font-medium">7 days ago</span>
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">AS</div>
                                                        <div>
                                                            <p className="font-bold text-gray-900 text-sm">Alice Smith</p>

                                                        </div>
                                                    </div>
                                                    <div className="flex gap-0.5 mb-2">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-3.5 h-3.5 fill-current ${i < 3 ? "text-yellow-500" : "text-gray-200"}`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <p className="text-gray-600 text-sm leading-relaxed">"Fantastic mentorship! The mock interviews were spot on and very helpful."</p>
                                                </div>
                                                {/* Mock Testimonial 3 */}
                                                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 relative">
                                                    <span className="absolute top-5 right-5 text-xs text-gray-400 font-medium">3 weeks ago</span>
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm">RK</div>
                                                        <div>
                                                            <p className="font-bold text-gray-900 text-sm">Raj Kumar</p>

                                                        </div>
                                                    </div>
                                                    <div className="flex gap-0.5 mb-2 text-yellow-500">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                                                        ))}
                                                    </div>
                                                    <p className="text-gray-600 text-sm leading-relaxed">"Helped me refine my portfolio significantly. I feel much more confident now."</p>
                                                </div>
                                            </div>
                                        </section>
                                    </div>

                                    {/* Right Column: Experience Timeline */}
                                    <div className="space-y-8">
                                        <section>
                                            <h3 className="text-xl font-bold text-gray-900 mb-6 font-serif">Experience</h3>
                                            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                                                <div className="space-y-8 border-l-2 border-gray-200 pl-8 ml-2">
                                                    <div className="relative">
                                                        <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-blue-600 border-[3px] border-white shadow-sm ring-1 ring-gray-100"></div>
                                                        <h4 className="font-bold text-gray-900 text-lg">{mentor.jobTitle}</h4>
                                                        <p className="text-sm text-teal-700 font-medium mb-2">{mentor.company} • 2021 - Present</p>
                                                        <p className="text-gray-600 text-sm">Leading key initiatives and mentoring junior designers. Responsible for the core product design system.</p>
                                                    </div>
                                                    <div className="relative">
                                                        <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-gray-300 border-[3px] border-white shadow-sm ring-1 ring-gray-100"></div>
                                                        <h4 className="font-bold text-gray-900 text-lg">Senior Designer</h4>
                                                        <p className="text-sm text-teal-700 font-medium mb-2">Previous Corp • 2018 - 2021</p>
                                                        <p className="text-gray-600 text-sm">Owned the design system and led the rebrand project. Collaborated with engineering to ship features.</p>
                                                    </div>
                                                    <div className="relative">
                                                        <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-gray-300 border-[3px] border-white shadow-sm ring-1 ring-gray-100"></div>
                                                        <h4 className="font-bold text-gray-900 text-lg">Product Designer</h4>
                                                        <p className="text-sm text-teal-700 font-medium mb-2">Startup Inc • 2016 - 2018</p>
                                                        <p className="text-gray-600 text-sm">First designer hire, established design culture. Designed the MVP from scratch.</p>
                                                    </div>
                                                    <div className="relative">
                                                        <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-gray-300 border-[3px] border-white shadow-sm ring-1 ring-gray-100"></div>
                                                        <h4 className="font-bold text-gray-900 text-lg">UI/UX Intern</h4>
                                                        <p className="text-sm text-teal-700 font-medium mb-2">Creative Agency • 2015 - 2016</p>
                                                        <p className="text-gray-600 text-sm">Assisted senior designers with wireframes and prototypes. Learned the fundamentals of user-centered design.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        {/* Education Section */}
                                        {mentor.education && (
                                            <section>
                                                <h3 className="text-xl font-bold text-gray-900 mb-6 font-serif">Education</h3>
                                                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                                                    <div className="space-y-8 border-l-2 border-gray-200 pl-8 ml-2">
                                                        {mentor.education.map((edu, index) => (
                                                            <div key={index} className="relative">
                                                                <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-gray-300 border-[3px] border-white shadow-sm ring-1 ring-gray-100 flex items-center justify-center">
                                                                    <GraduationCap className="w-2.5 h-2.5 text-gray-500" />
                                                                </div>
                                                                <h4 className="font-bold text-gray-900 text-lg">{edu.degree}</h4>
                                                                <p className="text-sm text-teal-700 font-medium mb-2">{edu.institution} • {edu.year}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </section>
                                        )}
                                    </div>

                                </div>

                                {/* Open Profile Link */}
                                <div className="pt-4 pb-8">
                                    <a
                                        href="#"
                                        className="inline-flex items-center gap-2 text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors group"
                                    >
                                        View More Reviews
                                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </SheetContent>

                    {isBookingOpen && (
                        <div className="fixed inset-0 z-[10002] bg-black/60 flex items-center justify-center pointer-events-auto">
                            <div className="relative w-full max-w-5xl">
                                <BookingPage isModal onClose={() => setIsBookingOpen(false)} />
                            </div>
                        </div>
                    )}
                </Sheet>
            )}
        </AnimatePresence>
    );
}
