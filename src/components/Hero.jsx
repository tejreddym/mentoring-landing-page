import React, { useState, useEffect, useRef } from 'react';
import Compass from './Compass';
import { ArrowRight, User, Users, Target, Trophy, ChevronDown, Play } from 'lucide-react';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';

const Counter = ({ from, to }) => {
    const nodeRef = useRef();
    const isInView = useInView(nodeRef, { once: true, margin: "-10px" });

    useEffect(() => {
        const node = nodeRef.current;
        if (isInView) {
            const controls = animate(from, to, {
                duration: 1.5,
                onUpdate(value) {
                    node.textContent = Math.round(value).toLocaleString();
                }
            });
            return () => controls.stop();
        }
    }, [from, to, isInView]);

    return <span ref={nodeRef} />;
};



// Helper Component for Random Bubbles
const RandomBubble = ({ imagePool, delay = 0, allowedSlots }) => {
    const [key, setKey] = useState(0);
    const [pos, setPos] = useState(null);
    const [currentSrc, setCurrentSrc] = useState(null);

    const getRandomItem = (arr) => {
        if (!arr || arr.length === 0) return null;
        return arr[Math.floor(Math.random() * arr.length)];
    };

    useEffect(() => {
        setPos(getRandomItem(allowedSlots));
        setCurrentSrc(getRandomItem(imagePool));
    }, []);

    if (!pos || !currentSrc) return null;

    return (
        <motion.div
            key={key}
            className="absolute w-14 h-14 md:w-18 md:h-18 rounded-full overflow-hidden border-2 border-white shadow-lg z-0 bg-white"
            style={pos}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
            transition={{
                duration: 5,
                times: [0, 0.1, 0.9, 1],
                delay: key === 0 ? delay : Math.random() * 2
            }}
            onAnimationComplete={() => {
                setPos(getRandomItem(allowedSlots));
                setCurrentSrc(getRandomItem(imagePool));
                setKey(prev => prev + 1);
            }}
        >
            <img src={currentSrc} className="w-full h-full object-cover" alt="Mentor" />
        </motion.div>
    );
};

const Hero = () => {
    const [targetHeading, setTargetHeading] = useState(null); // Used for user interaction tracking if needed, but we can derive mostly
    const [worryValue, setWorryValue] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [autoAngle, setAutoAngle] = useState(0);
    const resetTimer = React.useRef(null);

    const mentorToWorry = {
        north: 'guide',
        admission: 'college',
        career: 'career',
        loan: 'loan',
        health: 'stress',
        scholarship: 'fees'
    };

    // Map worry to angle for locking
    const worryToAngle = {
        'guide': 0,
        'college': 60,
        'career': 120,
        'loan': 180,
        'stress': 240,
        'fees': 300
    };

    const options = [
        { value: "fees", label: "Can't afford fees" },
        { value: "college", label: "Unknown college" },
        { value: "stress", label: "Feeling stressed" },
        { value: "career", label: "Job prospects?" },
        { value: "loan", label: "Handling loans?" },
        { value: "guide", label: "Need guidance?" }
    ];

    const activeWorryKey = worryValue || Object.keys(worryToAngle).find(key => worryToAngle[key] === autoAngle);
    const currentLabel = options.find(o => o.value === activeWorryKey)?.label || "What's your worry?";

    // Auto-Rotation Effect
    useEffect(() => {
        if (worryValue) return; // Pause if user is interacting

        const interval = setInterval(() => {
            setAutoAngle((prev) => (prev - 60 + 360) % 360);
        }, 3000);

        return () => clearInterval(interval);
    }, [worryValue]);

    const handleSelect = (val) => {
        setWorryValue(val);
        // Sync autoAngle to selected so it doesn't jump randomly on resume
        if (worryToAngle[val] !== undefined) {
            setAutoAngle(worryToAngle[val]);
        }

        // Clear existing timer
        if (resetTimer.current) clearTimeout(resetTimer.current);

        // Auto-reset after 7 seconds of inactivity
        if (val) {
            resetTimer.current = setTimeout(() => {
                setWorryValue("");
            }, 7000);
        }
    };

    // Click anywhere to revert logic
    useEffect(() => {
        if (!worryValue) return;

        const handleClear = () => handleSelect("");

        // Small delay to avoid capturing the opening click
        const timer = setTimeout(() => {
            window.addEventListener('click', handleClear);
        }, 100);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('click', handleClear);
        };
    }, [worryValue]);

    const handleCompassClick = (id) => {
        const val = mentorToWorry[id];
        if (val) {
            handleSelect(val);
        }
    };

    // Determine what to show: User selection OR Auto-rotation
    const effectiveHeading = worryValue && worryToAngle[worryValue] !== undefined
        ? worryToAngle[worryValue]
        : autoAngle;

    // Find active mentor ID based on worry value for the Morph effect
    const activeMentor = Object.keys(mentorToWorry).find(key => mentorToWorry[key] === worryValue);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F0F9FF] to-[#E0F2FE] grid grid-cols-1 md:grid-cols-2 overflow-hidden relative font-sans">
            {/* Background Texture & Glows */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"
                    style={{
                        maskImage: 'linear-gradient(to right, black 50%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, black 50%, transparent 100%)'
                    }}
                ></div>

                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#173CBA] opacity-[0.03] blur-[120px]"></div>
                <div className="absolute top-[20%] right-[0%] w-[40%] h-[60%] rounded-full bg-[#00C798] opacity-[0.03] blur-[120px]"></div>
            </div>

            {/* Left Column */}
            <div className="flex flex-col justify-center px-6 py-12 md:px-8 lg:px-12 xl:px-16 z-10 w-full relative order-1">

                {/* Headline */}
                <h1 className="font-serif text-4xl md:text-5xl lg:text-[54px] font-bold tracking-tight text-[#111827] leading-[1.2] lg:leading-[1.1] mb-6 max-w-xl lg:max-w-2xl">
                    Find the Right Mentor <br />
                    <span className="text-[#111827]">to </span>
                    <span className="inline-block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Shape Your Career
                    </span>
                </h1>



                {/* Sub-headline */}
                <p className="text-lg text-[#4B5563] mb-10 leading-relaxed max-w-lg md:max-w-2xl font-normal">
                    Get a personalized roadmap for college admissions, careers, scholarships, and student life — guided 1-on-1 by experts who’ve been there.
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-8 mb-16 w-full">
                    <button className="bg-primary text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-blue-600 transition-colors shadow-sm flex items-center justify-center gap-2 w-full sm:w-auto h-[50px] min-w-[280px]">
                        <User size={20} /> Find My Mentor
                    </button>
                    <button className="bg-white text-primary border border-primary px-8 py-3 rounded-lg font-medium text-lg hover:bg-blue-50 transition-colors shadow-sm flex items-center justify-center gap-2 w-full sm:w-auto h-[50px]">
                        <Play size={20} /> Watch Video
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 w-full scale-95 origin-left">
                    <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary shrink-0">
                            <Users size={16} className="md:w-5 md:h-5" />
                        </div>
                        <div className="text-center md:text-left">
                            <div className="text-xs md:text-xl font-bold font-serif text-[#111827] leading-none">
                                <Counter from={0} to={10000} />+
                            </div>
                            <div className="text-[10px] md:text-sm text-[#4B5563] leading-tight mt-0.5">Students Mentored</div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary shrink-0">
                            <Target size={16} className="md:w-5 md:h-5" />
                        </div>
                        <div className="text-center md:text-left">
                            <div className="text-xs md:text-xl font-bold font-serif text-[#111827] leading-none">
                                <Counter from={0} to={95} />%
                            </div>
                            <div className="text-[10px] md:text-sm text-[#4B5563] leading-tight mt-0.5">Success Rate</div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary shrink-0">
                            <Trophy size={16} className="md:w-5 md:h-5" />
                        </div>
                        <div className="text-center md:text-left">
                            <div className="text-xs md:text-xl font-bold font-serif text-[#111827] leading-none">
                                <Counter from={0} to={500} />+
                            </div>
                            <div className="text-[10px] md:text-sm text-[#4B5563] leading-tight mt-0.5">Expert Mentors</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="relative flex items-center justify-center bg-gray-100/50 md:bg-transparent h-[50vh] md:h-auto w-full order-2">

                {/* Floating Bubbles Removed */}


                <Compass targetHeading={effectiveHeading} activeMentor={activeMentor} onLabelLock={handleCompassClick}>
                    <div className="w-full h-full flex flex-col items-center justify-center gap-1 z-50">
                        {/* Custom Dropdown Trigger */}
                        <div
                            className="cursor-pointer flex flex-row items-center justify-center gap-1 group relative transition-opacity hover:opacity-80"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <span className={`text-sm font-bold text-center min-w-[120px] transition-colors ${isDropdownOpen ? 'text-[#173CBA]' : 'text-gray-900'}`}>
                                {currentLabel}
                            </span>

                            <div className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-[#173CBA]' : 'text-gray-900'}`}>
                                <ChevronDown size={18} strokeWidth={2.5} />
                            </div>

                            {/* Dropdown Menu */}
                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-[120%] w-56 bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-white/60 overflow-hidden flex flex-col p-1 mt-2 z-50"
                                    >
                                        {options.map((option) => (
                                            <div
                                                key={option.value}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSelect(option.value);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`
                                                    px-4 py-3 text-sm font-bold rounded-xl cursor-pointer text-center transition-all duration-200
                                                    ${worryValue === option.value
                                                        ? 'bg-blue-50 text-[#173CBA]'
                                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                                                `}
                                            >
                                                {option.label}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </Compass>
            </div>
        </div>
    );
};

export default Hero;
