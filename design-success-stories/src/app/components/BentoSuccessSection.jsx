import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { BentoCard } from "./BentoCard";
import { HolographicMetric } from "./HolographicMetric";

// Data
const stories = [
    {
        id: 1,
        name: "Sarah Mitchell",
        role: "CEO, TechVenture",
        image: "https://images.unsplash.com/photo-1610631066894-62452ccb927c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc3dvbWFuJTIwcG9ydHJhaXQlMjBjb25maWRlbnR8ZW58MXx8fHwxNzY5NzUwMDAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        metric: "400%",
        metricLabel: "Lead Growth",
        quote: "Transformed our pipeline completely.",
        accent: "bg-blue-50"
    },
    {
        id: 2,
        name: "Marcus Chen",
        role: "Founder, Quantum",
        image: "https://images.unsplash.com/photo-1742119971773-57e0131095b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZW50cmVwcmVuZXVyJTIwcG9ydHJhaXQlMjBtb2Rlcm58ZW58MXx8fHwxNzY5NzUwMDAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        metric: "2.8M",
        metricLabel: "Active Users",
        quote: "Scaled globally with zero downtime.",
        accent: "bg-indigo-50"
    },
    {
        id: 3,
        name: "Elena Rodriguez",
        role: "VP, Nexus Digital",
        image: "https://images.unsplash.com/photo-1737574821698-862e77f044c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGVjdXRpdmUlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGNvcnBvcmF0ZXxlbnwxfHx8fDE3Njk3NTAwMDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        metric: "$12M",
        metricLabel: "Annual Revenue",
        quote: "We hit our ARR milestone early.",
        accent: "bg-purple-50"
    },
    {
        id: 4,
        name: "David Park",
        role: "Co-Founder, Innovate",
        image: "https://images.unsplash.com/photo-1758691737644-ef8be18256c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGxlYWRlciUyMHBvcnRyYWl0JTIwaW5ub3ZhdGl2ZXxlbnwxfHx8fDE3Njk3NTAwMDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        metric: "95%",
        metricLabel: "Retention Rate",
        quote: "Industry-leading retention achieved.",
        accent: "bg-emerald-50"
    }
];

export function BentoSuccessSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target,
        offset: ["start end", "end start"]
    });

    const yMove = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={containerRef} className="relative w-full min-h-screen py-24 px-6 md:px-12 bg-[#F8F9FA] overflow-hidden selection:bg-indigo-100">

            {/* Background Abstract/Spatial Environment */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-indigo-100/40 to-purple-100/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-blue-100/40 to-teal-100/40 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header - Swiss Magazine Style */}
                <div className="mb-20 md:mb-32">
                    <motion.h2
                        className="text-6xl md:text-9xl font-light tracking-tighter text-gray-900 mb-6"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Success<br />Stories
                    </motion.h2>
                    <motion.div
                        className="flex items-center gap-4 text-sm font-medium tracking-widest uppercase text-gray-500"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        <span className="w-12 h-px bg-gray-400" />
                        <span>Client Impact Report 2025</span>
                    </motion.div>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 grid-rows-[auto_auto_auto]">

                    {/* 1. Large Feature Card (Top Left) */}
                    <BentoCard className="md:col-span-8 md:row-span-2 min-h-[500px] md:min-h-[600px] flex md:flex-row flex-col-reverse group" glassOpacity="medium">
                        <div className="flex-1 p-10 flex flex-col justify-between relative z-10">
                            <div>
                                <HolographicMetric value={stories[0].metric} label={stories[0].metricLabel} />
                                <p className="mt-8 text-2xl md:text-4xl font-light leading-tight text-gray-800">
                                    "{stories[0].quote}"
                                </p>
                            </div>
                            <div className="flex items-center gap-4 mt-8">
                                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/50">
                                    <img src={stories[0].image} alt={stories[0].name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="text-gray-900 font-medium">{stories[0].name}</div>
                                    <div className="text-gray-500 text-sm">{stories[0].role}</div>
                                </div>
                            </div>
                        </div>
                        {/* Image Cutout Interaction */}
                        <div className="flex-1 relative h-[400px] md:h-auto overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F8F9FA]/10 to-[#F8F9FA]/80 md:bg-gradient-to-l md:via-transparent md:to-transparent z-10" />
                            <motion.img
                                src={stories[0].image}
                                alt="Portrait"
                                className="absolute inset-0 w-full h-full object-cover object-top"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.8 }}
                            />
                        </div>
                    </BentoCard>

                    {/* 2. Metric Only Card (Top Right) */}
                    <BentoCard className="md:col-span-4 min-h-[300px] flex items-center justify-center bg-gradient-to-br from-white/60 to-purple-50/60" delay={0.1}>
                        <div className="text-center p-8">
                            <HolographicMetric value="2.4K" label="Happy Clients" />
                        </div>
                    </BentoCard>

                    {/* 3. Portrait Focus Card (Middle Right) */}
                    <BentoCard className="md:col-span-4 min-h-[400px] relative group" delay={0.2} glassOpacity="heavy">
                        <img
                            src={stories[1].image}
                            alt={stories[1].name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8 text-white">
                            <div className="text-4xl font-bold mb-2">{stories[1].metric}</div>
                            <div className="text-sm uppercase tracking-wide opacity-80">{stories[1].metricLabel}</div>
                            <p className="mt-4 text-lg font-light leading-snug text-white/90">
                                {stories[1].name}
                            </p>
                        </div>
                    </BentoCard>

                    {/* 4. Wide Condensed Card (Bottom Span) */}
                    <BentoCard className="md:col-span-12 min-h-[300px] flex flex-col md:flex-row items-center gap-8 p-12 bg-white/40" delay={0.3}>
                        <div className="flex-1">
                            <h3 className="text-3xl font-light text-gray-900 mb-4">Global Impact</h3>
                            <p className="text-gray-600 max-w-md leading-relaxed">
                                We partner with visionaries across the globe to build products that define the future.
                            </p>
                        </div>
                        <div className="flex-1 flex gap-8 justify-around">
                            <HolographicMetric value={stories[2].metric} label={stories[2].metricLabel} />
                            <div className="hidden md:block w-px h-32 bg-gray-200" />
                            <HolographicMetric value={stories[3].metric} label={stories[3].metricLabel} />
                        </div>
                    </BentoCard>

                </div>
            </div>
        </section>
    );
}
