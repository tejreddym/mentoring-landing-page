import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ClipboardList, FileText, Users, Calendar, Check } from 'lucide-react';

const steps = [{
    id: 1,
    title: 'Take Career Assessment',
    description: 'Discover your ideal career path with our AI-powered test',
    icon: ClipboardList,
    image: 'https://images.unsplash.com/photo-1758270705799-12efda48d4f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwdGFraW5nJTIwdGVzdCUyMGV4YW18ZW58MXx8fHwxNzY5NjcxODEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    color: '#2F7CF6',
    bgGradient: 'linear-gradient(135deg, #2F7CF6 0%, #1E5BC6 100%)'
}, {
    id: 2,
    title: 'See Career Report',
    description: 'Get personalized recommendations and insights',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1759215524566-8aea4761a926?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJlZXIlMjByZXBvcnQlMjBkb2N1bWVudHxlbnwxfHx8fDE3Njk3NDk3MDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    color: '#FF9500',
    bgGradient: 'linear-gradient(135deg, #FF9500 0%, #E68500 100%)'
}, {
    id: 3,
    title: 'Get Matched with Mentor',
    description: 'Connect with the perfect mentor for your goals',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1758691737182-d42aefd6dee8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50b3IlMjBtZWV0aW5nJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2OTc0OTcwMHww&ixlib=rb-4.1.0&q=80&w=1080',
    color: '#00D4AA',
    bgGradient: 'linear-gradient(135deg, #00D4AA 0%, #00B890 100%)'
}, {
    id: 4,
    title: 'Book Session',
    description: 'Start your journey with expert guidance',
    icon: Calendar,
    image: 'https://images.unsplash.com/photo-1511871893393-82e9c16b81e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29raW5nJTIwY2FsZW5kYXIlMjBzY2hlZHVsZXxlbnwxfHx8fDE3Njk3NDk3MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    color: '#8E5CF7',
    bgGradient: 'linear-gradient(135deg, #8E5CF7 0%, #7344D9 100%)'
}];

export function CareerStepperHome3() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isExpanding, setIsExpanding] = useState(false);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            // Wait 1 second after entering view, then start expanding the first step
            const initialTimer = setTimeout(() => {
                setIsExpanding(true);
            }, 1000);
            return () => clearTimeout(initialTimer);
        }
    }, [isInView]);

    useEffect(() => {
        if (isExpanding) {
            // Show expanded state with image for 3 seconds
            const expandTimer = setTimeout(() => {
                setIsExpanding(false);

                // After collapsing, move to next step after 0.5s
                setTimeout(() => {
                    if (currentStep < steps.length) {
                        setCurrentStep(currentStep + 1);
                        // Start expanding the next step after a brief delay
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
        <div ref={containerRef} className="w-full relative overflow-hidden bg-gradient-to-b from-[#F0F9FF] to-[#E0F2FE] py-10 px-4 font-sans">
            {/* Background Texture & Glows (Matches Hero) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"
                    style={{
                        maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
                    }}
                ></div>
                {/* Adjusted blobs for variety */}
                <div className="absolute top-[5%] right-[5%] w-[30%] h-[30%] rounded-full bg-[#173CBA] opacity-[0.03] blur-[100px]"></div>
                <div className="absolute bottom-[10%] left-[5%] w-[30%] h-[40%] rounded-full bg-[#00C798] opacity-[0.03] blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div initial={{
                    opacity: 0,
                    y: -30
                }} animate={{
                    opacity: 1,
                    y: 0
                }} transition={{
                    duration: 0.6
                }} className="text-center mb-16">
                    <h1 className="text-5xl font-bold font-serif text-gray-900 mb-4">
                        Your Career Journey
                    </h1>
                    <p className="text-xl text-gray-600">
                        Follow these steps to unlock your potential
                    </p>
                </motion.div>

                {/* Horizontal Stepper */}
                <div className="relative px-4">
                    <div className="flex justify-between items-start gap-4 mb-12">
                        {steps.map((step, index) => {
                            const isCompleted = currentStep > step.id;
                            const isActive = currentStep === step.id;
                            const isPending = currentStep < step.id;
                            return <div key={step.id} className="relative flex-1 flex flex-col items-center">
                                {/* Step Shape Container - Fixed Height Wrapper */}
                                <div className="h-[180px] flex items-center justify-center mb-6">
                                    <motion.div className="relative flex items-center justify-center flex-shrink-0" animate={{
                                        width: isActive && isExpanding ? 180 : 112,
                                        height: isActive && isExpanding ? 180 : 112
                                    }} transition={{
                                        type: 'spring',
                                        stiffness: 100,
                                        damping: 20
                                    }}>
                                        {/* Outer Glow - Only for Active */}
                                        <AnimatePresence>
                                            {isActive && !isExpanding && <motion.div initial={{
                                                opacity: 0,
                                                scale: 0.8
                                            }} animate={{
                                                opacity: [0.3, 0.5, 0.3],
                                                scale: [1, 1.12, 1]
                                            }} exit={{
                                                opacity: 0
                                            }} transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: 'easeInOut'
                                            }} className="absolute inset-0" style={{
                                                background: step.bgGradient,
                                                borderRadius: '20px',
                                                filter: 'blur(20px)'
                                            }} />}
                                        </AnimatePresence>

                                        {/* Main Square */}
                                        <motion.div initial={{
                                            scale: 0,
                                            rotate: -90
                                        }} animate={{
                                            scale: 1,
                                            rotate: 0,
                                            y: isActive && !isExpanding ? [0, -12, 0] : 0
                                        }} transition={{
                                            scale: {
                                                type: 'spring',
                                                stiffness: 200,
                                                damping: 15,
                                                delay: index * 0.15
                                            },
                                            rotate: {
                                                type: 'spring',
                                                stiffness: 200,
                                                damping: 15,
                                                delay: index * 0.15
                                            },
                                            y: {
                                                duration: 2.5,
                                                repeat: isActive && !isExpanding ? Infinity : 0,
                                                ease: 'easeInOut'
                                            }
                                        }} className="relative w-full h-full rounded-2xl shadow-lg overflow-hidden" style={{
                                            background: isPending ? 'rgba(255, 255, 255, 0.6)' : step.bgGradient, // Changed pending to white/translucent for better contrast on colored bg
                                            opacity: isPending ? 0.6 : isActive ? 1 : 0.8,
                                            filter: isPending ? 'grayscale(0.8)' : 'none',
                                            backdropFilter: isPending ? 'blur(10px)' : 'none'
                                        }}>
                                            {/* Icon - Show when not expanded */}
                                            <AnimatePresence>
                                                {!(isActive && isExpanding) && <motion.div initial={{
                                                    opacity: 0,
                                                    scale: 0.5
                                                }} animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                    rotate: isActive ? [0, 5, -5, 0] : 0
                                                }} exit={{
                                                    opacity: 0,
                                                    scale: 0.5
                                                }} transition={{
                                                    opacity: {
                                                        duration: 0.3
                                                    },
                                                    scale: {
                                                        duration: 0.3
                                                    },
                                                    rotate: {
                                                        duration: 2.5,
                                                        repeat: isActive ? Infinity : 0,
                                                        ease: 'easeInOut'
                                                    }
                                                }} className="absolute inset-0 flex items-center justify-center">
                                                    <step.icon className={`${isActive && isExpanding ? 'w-14 h-14' : 'w-10 h-10'} ${isPending ? 'text-gray-400' : 'text-white'}`} strokeWidth={2.5} />
                                                </motion.div>}
                                            </AnimatePresence>

                                            {/* Image - Show when expanded */}
                                            <AnimatePresence>
                                                {isActive && isExpanding && <motion.div initial={{
                                                    opacity: 0,
                                                    scale: 0.8
                                                }} animate={{
                                                    opacity: 1,
                                                    scale: 1
                                                }} exit={{
                                                    opacity: 0,
                                                    scale: 0.8
                                                }} transition={{
                                                    duration: 0.5
                                                }} className="absolute inset-0">
                                                    <img src={step.image} alt={step.title} className="w-full h-full object-cover rounded-2xl" />
                                                </motion.div>}
                                            </AnimatePresence>

                                            {/* Shimmer Effect for Active - Only when NOT expanded */}
                                            {isActive && !isExpanding && <motion.div initial={{
                                                x: '-100%'
                                            }} animate={{
                                                x: '200%'
                                            }} transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: 'linear'
                                            }} className="absolute inset-0 rounded-2xl" style={{
                                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
                                            }} />}
                                        </motion.div>

                                        {/* Completed Badge */}
                                        <AnimatePresence>
                                            {isCompleted && <motion.div initial={{
                                                scale: 0,
                                                rotate: -180
                                            }} animate={{
                                                scale: 1,
                                                rotate: 0
                                            }} exit={{
                                                scale: 0,
                                                rotate: 180
                                            }} transition={{
                                                type: 'spring',
                                                stiffness: 300,
                                                damping: 20
                                            }} className="absolute -top-2 -right-2 w-9 h-9 bg-green-500 rounded-full flex items-center justify-center shadow-lg z-10">
                                                <Check className="w-5 h-5 text-white" strokeWidth={3} />
                                            </motion.div>}
                                        </AnimatePresence>

                                        {/* Falling Particles Animation */}
                                        <AnimatePresence>
                                            {isActive && !isExpanding && <>
                                                {[...Array(12)].map((_, i) => <motion.div key={i} initial={{
                                                    opacity: 0,
                                                    y: -20,
                                                    x: (Math.random() - 0.5) * 80
                                                }} animate={{
                                                    opacity: [0, 1, 0.8, 0],
                                                    y: 120,
                                                    x: (Math.random() - 0.5) * 140,
                                                    rotate: Math.random() * 360,
                                                    scale: [1, 1.2, 0.8, 0.5]
                                                }} transition={{
                                                    duration: 2.5 + Math.random() * 0.5,
                                                    repeat: Infinity,
                                                    delay: i * 0.15,
                                                    ease: 'easeOut'
                                                }} className="absolute top-0 left-1/2" style={{
                                                    width: 3 + Math.random() * 4,
                                                    height: 3 + Math.random() * 4,
                                                    background: step.color,
                                                    borderRadius: Math.random() > 0.5 ? '50%' : '2px'
                                                }} />)}
                                            </>}
                                        </AnimatePresence>
                                    </motion.div>
                                </div>

                                {/* Animated Connecting Line to Next Step */}
                                {index < steps.length - 1 && <motion.div className="absolute top-[88px] h-1 overflow-visible" animate={{
                                    left: isActive && isExpanding ? 'calc(50% + 90px)' : steps[index + 1].id === currentStep && isExpanding ? 'calc(50% + 56px)' : 'calc(50% + 56px)',
                                    width: isActive && isExpanding ? 'calc(100% - 130px)' : steps[index + 1].id === currentStep && isExpanding ? 'calc(100% - 130px)' : 'calc(100% - 96px)'
                                }} transition={{
                                    type: 'spring',
                                    stiffness: 100,
                                    damping: 20
                                }}>
                                    <div className="relative w-full h-full">
                                        {/* Background Line */}
                                        <div className="absolute w-full h-full bg-white/50 rounded-full" /> {/* Lighter track for better contrast */}

                                        {/* Animated Progress Line */}
                                        <motion.div initial={{
                                            width: 0
                                        }} animate={{
                                            width: isCompleted ? '100%' : '0%'
                                        }} transition={{
                                            duration: 0.8,
                                            delay: 0.3,
                                            ease: 'easeInOut'
                                        }} className="absolute h-full rounded-full" style={{
                                            background: steps[index + 1].bgGradient
                                        }} />

                                        {/* Animated Moving Bubble */}
                                        <AnimatePresence>
                                            {isCompleted && <motion.div initial={{
                                                left: '0%'
                                            }} animate={{
                                                left: ['0%', '100%']
                                            }} transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: 'linear'
                                            }} className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2">
                                                <motion.div animate={{
                                                    scale: [1, 1.4, 1],
                                                    opacity: [0.8, 1, 0.8]
                                                }} transition={{
                                                    duration: 1,
                                                    repeat: Infinity,
                                                    ease: 'easeInOut'
                                                }} className="w-2.5 h-2.5 rounded-full" style={{
                                                    background: steps[index + 1].color,
                                                    boxShadow: `0 0 12px ${steps[index + 1].color}, 0 0 20px ${steps[index + 1].color}`
                                                }} />
                                            </motion.div>}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>}

                                {/* Content */}
                                <motion.div initial={{
                                    opacity: 0,
                                    y: 20
                                }} animate={{
                                    opacity: 1,
                                    y: 0
                                }} transition={{
                                    delay: index * 0.15 + 0.2,
                                    duration: 0.5
                                }} className="text-center max-w-xs min-h-[120px] flex flex-col justify-start"> {/* Fixed min-height to prevent jumping */}
                                    <motion.h3 animate={{
                                        color: isActive ? step.color : isPending ? '#6B7280' : '#374151', // Darker text for pending on light bg
                                        scale: isActive && isExpanding ? 1.05 : 1
                                    }} className="text-lg font-bold font-serif mb-1">
                                        {step.id}. {step.title}
                                    </motion.h3>
                                    <motion.p animate={{
                                        color: isPending ? '#9CA3AF' : '#6B7280'
                                    }} className="text-sm leading-relaxed">
                                        {step.description}
                                    </motion.p>


                                    {/* Progress Bar for Active Step */}
                                    {isActive && <motion.div initial={{
                                        width: 0
                                    }} animate={{
                                        width: '100%'
                                    }} transition={{
                                        duration: 0.8,
                                        delay: 0.3
                                    }} className="mt-3 h-1 rounded-full mx-auto" style={{
                                        background: step.bgGradient
                                    }} />}
                                </motion.div>
                            </div>;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
