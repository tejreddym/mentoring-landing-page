import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const partners = [
    {
        id: 1,
        name: "Ahmed Al-Fayed",
        role: "CEO, TechSolutions",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=facearea&facepad=2&w=256&h=256&q=80",
        quote: "Since partnering, our lead generation has increased by 450%. The tools are intuitive and the support is unmatched.",
        position: "top-[5%] left-[20%]",
        size: "w-20 h-20"
    },
    {
        id: 2,
        name: "Sarah Jenkins",
        role: "CTO, CloudNine",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=facearea&facepad=2&w=256&h=256&q=80",
        quote: "The scalability of the platform allowed us to handle our Black Friday traffic without a single hitch.",
        position: "top-[15%] right-[10%]",
        size: "w-20 h-20"
    },
    {
        id: 3,
        name: "Michael Chen",
        role: "Director, FutureCorp",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=facearea&facepad=2&w=256&h=256&q=80",
        quote: "A game-changer for our workflow. We've saved countless hours on manual tasks.",
        position: "bottom-[15%] left-[15%]",
        size: "w-20 h-20"
    },
    {
        id: 4,
        name: "Aisha Patel",
        role: "Founder, StartUp Inc",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=facearea&facepad=2&w=256&h=256&q=80",
        quote: "The analytics dashboard gives us insights we didn't even know we needed. Highly recommended.",
        position: "bottom-[10%] right-[25%]",
        size: "w-20 h-20"
    },
    {
        id: 5,
        name: "David Ross",
        role: "VP Sales, Growthly",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=facearea&facepad=2&w=256&h=256&q=80",
        quote: "Revenue is up 30% quarter over quarter. The ROI speaks for itself.",
        position: "top-[45%] left-[45%]",
        size: "w-20 h-20"
    },
    {
        id: 6,
        name: "Emma Wilson",
        role: "Head of Product, Innovate",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=facearea&facepad=2&w=256&h=256&q=80",
        quote: "We launched three months ahead of schedule thanks to these tools.",
        position: "top-[40%] right-[5%]",
        size: "w-20 h-20"
    },
    {
        id: 7,
        name: "James Carter",
        role: "Director, EcoTech",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=facearea&facepad=2&w=256&h=256&q=80",
        quote: "Sustainability tracking has never been easier. Truly revolutionary.",
        position: "bottom-[35%] left-[5%]",
        size: "w-20 h-20"
    }
];

export function PartnerSpotlight() {
    const [activeId, setActiveId] = useState(1);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const activePartner = partners.find((p) => p.id === activeId) || partners[0];

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setActiveId((prev) => {
                const currentIndex = partners.findIndex((p) => p.id === prev);
                const safeIndex = currentIndex === -1 ? 0 : currentIndex;
                const nextIndex = (safeIndex + 1) % partners.length;
                return partners[nextIndex].id;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    return (
        <section className="py-24 bg-gradient-to-br from-[#E8F2FF] to-[#F5F9F7] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Hero Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold font-serif tracking-tight text-gray-900 mb-6">
                        Real Stories, Real Transformations
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto">
                        See how our mentors helped students achieve their career dreams
                    </p>
                </div>

                <div
                    className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >

                    {/* Left Column: Avatar Cluster */}
                    <div className="relative w-full lg:w-1/2 h-[400px] lg:h-[500px] flex items-center justify-center">
                        {/* Background Blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-200/50 rounded-full blur-3xl" />

                        {/* Avatars */}
                        <div className="relative w-full h-full">
                            {partners.map((partner) => {
                                const isActive = partner.id === activeId;

                                return (
                                    <motion.button
                                        key={partner.id}
                                        className={`absolute rounded-full p-1 transition-all duration-500 ease-out object-cover ${partner.position} ${isActive
                                            ? "w-40 h-40 ring-4 ring-offset-4 ring-[#173CBA] z-30 shadow-xl shadow-blue-900/20"
                                            : `${partner.size} ring-1 ring-white/50 hover:ring-2 hover:ring-[#00C798] z-10 grayscale hover:grayscale-0`
                                            }`}
                                        onClick={() => setActiveId(partner.id)}
                                        onMouseEnter={() => setActiveId(partner.id)}
                                        whileHover={{ scale: 1.1 }}
                                        layoutId={`avatar-${partner.id}`}
                                    >
                                        <img
                                            src={partner.image}
                                            alt={partner.name}
                                            className="w-full h-full rounded-full object-cover bg-white"
                                        />
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Column: Content Card */}
                    <div className="w-full lg:w-1/2 relative z-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activePartner.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100"
                            >
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-2xl lg:text-3xl font-bold font-serif text-gray-900 tracking-tight">
                                            Partner Spotlight: <br />
                                            <span className="text-[#173CBA]">{activePartner.name}</span>
                                        </h3>
                                    </div>

                                    <blockquote className="text-lg lg:text-xl text-gray-600 leading-relaxed font-light italic font-serif">
                                        "{activePartner.quote}"
                                    </blockquote>

                                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-900">- {activePartner.role}</p>
                                            <p className="text-sm text-gray-500">Discover how our products helped {activePartner.name.split(' ')[0]} achieve his goals.</p>
                                        </div>
                                    </div>


                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}
