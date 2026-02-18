import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, FileText, Users, Calendar, Check } from 'lucide-react';

const steps = [
    {
        id: 1,
        title: 'Select Goal',
        description: 'Choose the outcome you want to achieve from mentorship',
        icon: ClipboardList,
        image: 'https://images.unsplash.com/photo-1758270705799-12efda48d4f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwdGFraW5nJTIwdGVzdCUyMGV4YW18ZW58MXx8fHwxNzY5NjcxODEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        color: '#2F7CF6',
        bgGradient: 'linear-gradient(135deg, #2F7CF6 0%, #1E5BC6 100%)',
    },
    {
        id: 2,
        title: 'Get Matched with Mentor',
        description: 'We pair you with a mentor who fits your goals',
        icon: FileText,
        image: 'https://images.unsplash.com/photo-1759215524566-8aea4761a926?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJlZXIlMjByZXBvcnQlMjBkb2N1bWVudHxlbnwxfHx8fDE3Njk3NDk3MDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        color: '#FF9500',
        bgGradient: 'linear-gradient(135deg, #FF9500 0%, #E68500 100%)',
    },
    {
        id: 3,
        title: 'Select Slot',
        description: 'Pick a time that works best for your schedule',
        icon: Users,
        image: 'https://images.unsplash.com/photo-1758691737182-d42aefd6dee8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50b3IlMjBtZWV0aW5nJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2OTc0OTcwMHww&ixlib=rb-4.1.0&q=80&w=1080',
        color: '#00D4AA',
        bgGradient: 'linear-gradient(135deg, #00D4AA 0%, #00B890 100%)',
    },
    {
        id: 4,
        title: 'Book Session',
        description: 'Confirm and start your session with your mentor',
        icon: Calendar,
        image: 'https://images.unsplash.com/photo-1511871893393-82e9c16b81e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29raW5nJTIwY2FsZW5kYXIlMjBzY2hlZHVsZXxlbnwxfHx8fDE3Njk3NDk3MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        color: '#8E5CF7',
        bgGradient: 'linear-gradient(135deg, #8E5CF7 0%, #7344D9 100%)',
    },
];

export default function CareerStepper() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isExpanding, setIsExpanding] = useState(false);

    useEffect(() => {
        // Wait 1 second, then start expanding the first step
        const initialTimer = setTimeout(() => {
            setIsExpanding(true);
        }, 1000);
        return () => clearTimeout(initialTimer);
    }, []);

    useEffect(() => {
        if (isExpanding) {
            // Show expanded state for 3 seconds
            const expandTimer = setTimeout(() => {
                setIsExpanding(false);

                // After collapsing, move to next step after 0.5s
                setTimeout(() => {
                    if (currentStep < steps.length) {
                        setCurrentStep(currentStep + 1);
                        // Start expanding the next step
                        setTimeout(() => {
                            setIsExpanding(true);
                        }, 500);
                    } else {
                        // Loop back to first step
                        setCurrentStep(1);
                        setTimeout(() => {
                            setIsExpanding(true);
                        }, 500);
                    }
                }, 500);
            }, 3000);

            return () => clearTimeout(expandTimer);
        }
    }, [isExpanding, currentStep]);

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-20 px-4 font-sans overflow-hidden relative selection:bg-blue-100">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-100/40 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
                        Your Career Journey
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                        Follow these steps to unlock your potential
                    </p>
                </motion.div>

                {/* Stepper Container */}
                <div className="relative max-w-6xl mx-auto">


                    <div className="flex justify-between items-start relative px-4 md:px-12">
                        {steps.map((step, index) => {
                            const isActive = currentStep === step.id;
                            const isCompleted = currentStep > step.id;
                            const isPending = currentStep < step.id;

                            // Calculate progress line to next step
                            const showLine = index < steps.length - 1;

                            return (
                                <div key={step.id} className="relative flex flex-col items-center flex-1">

                                    {/* Connectivity Lines (Gray Track + Colored Fill) */}
                                    {showLine && (
                                        <div className="absolute top-[100px] left-[50%] w-full h-[6px] -z-10">
                                            {/* Gray Background Track - Only between steps */}
                                            <div className="absolute inset-0 bg-slate-200 rounded-full" />

                                            {/* Colored Fill */}
                                            <motion.div
                                                className="h-full rounded-full origin-left relative z-10"
                                                style={{ backgroundColor: step.color }}
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: isCompleted ? 1 : 0 }}
                                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                            />
                                        </div>
                                    )}

                                    {/* CARD CONTAINER */}
                                    <div className="relative h-[200px] mb-24 flex items-center justify-center">

                                        {/* Active Card Glow - Behind */}
                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="absolute -inset-4 rounded-[3rem] blur-2xl -z-10"
                                                    style={{ backgroundColor: `${step.color}60` }}
                                                />
                                            )}
                                        </AnimatePresence>

                                        <motion.div
                                            className={`
                                                relative flex items-center justify-center rounded-3xl shadow-lg cursor-pointer
                                                ${isActive ? 'z-20' : 'z-10'}
                                            `}
                                            initial={false}
                                            animate={{
                                                width: isActive && isExpanding ? 280 : 160,
                                                height: isActive && isExpanding ? 280 : 160,
                                                borderColor: isActive ? "transparent" : (isCompleted ? "transparent" : (isPending ? `${step.color}40` : "white")),
                                                backgroundColor: isCompleted ? step.color : (isActive ? "white" : `${step.color}10`),
                                            }}
                                            style={{
                                                backdropFilter: isPending ? "blur(12px)" : "none",
                                                boxShadow: isActive ? "0 25px 50px -12px rgba(0,0,0,0.15)" : (isCompleted ? `0 10px 30px -10px ${step.color}60` : "none")
                                            }}
                                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                        >
                                            {/* 1. COMPLETED: Solid Color Block + Icon */}
                                            {isCompleted && !isActive && (
                                                <motion.div
                                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                                    className="flex flex-col items-center justify-center text-white"
                                                >
                                                    <motion.div
                                                        animate={{ y: [0, -5, 0] }}
                                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                                    >
                                                        <step.icon size={48} strokeWidth={2} className="mb-2" />
                                                    </motion.div>
                                                    <div className="absolute -top-3 -right-3 bg-green-500 text-white p-1 rounded-full shadow-md border-4 border-[#F8FAFC]">
                                                        <Check size={16} strokeWidth={4} />
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* 2. PENDING: Colored Tint + Icon */}
                                            {isPending && (
                                                <motion.div
                                                    className="flex flex-col items-center justify-center"
                                                    animate={{ y: [0, -5, 0] }}
                                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                                                >
                                                    <step.icon size={48} strokeWidth={1.5} color={step.color} style={{ opacity: 0.8 }} />
                                                </motion.div>
                                            )}

                                            {/* 3. ACTIVE: Expanded Image Card */}
                                            {isActive && (
                                                <div className="w-full h-full overflow-hidden rounded-3xl relative">


                                                    {/* Image */}
                                                    {isExpanding ? (
                                                        <motion.div
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            className="w-full h-full"
                                                        >
                                                            <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                                                        </motion.div>
                                                    ) : (
                                                        /* Active but not expanded yet (Icon State) */
                                                        <div className="w-full h-full flex items-center justify-center bg-white">
                                                            <step.icon size={48} color={step.color} strokeWidth={2} />
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </motion.div>
                                    </div>

                                    {/* TEXT CONTENT (Below Card) */}
                                    <div className="text-center relative z-20 h-32 flex flex-col items-center max-w-[240px]">
                                        <motion.h3
                                            animate={{
                                                color: isActive ? step.color : (isCompleted ? "#334155" : "#94A3B8"),
                                                scale: isActive ? 1.1 : 1
                                            }}
                                            className="text-lg font-bold mb-2 leading-tight"
                                        >
                                            {step.id}. {step.title}
                                        </motion.h3>

                                        <motion.p
                                            animate={{ opacity: isActive ? 1 : 0.6 }}
                                            className="text-sm text-slate-500 leading-relaxed max-w-[90%]"
                                        >
                                            {step.description}
                                        </motion.p>

                                        {/* Colored Underline for Active Step */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="underline"
                                                className="w-full h-1 mt-4 rounded-full"
                                                style={{ backgroundColor: step.color }}
                                                initial={{ width: 0 }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 0.8, delay: 0.2 }}
                                            />
                                        )}
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
