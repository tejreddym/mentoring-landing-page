import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { Send, X, BookOpen, Sparkles, GraduationCap, Lightbulb } from 'lucide-react';

const GROQ_API_KEY = "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";

const NextGenChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 'init', role: 'assistant', content: "Hi there! I'm your Edutech Mentor. Ready to chart your path to success?" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [mascotState, setMascotState] = useState('idle'); // idle, thinking, talking, copying, success
    const messagesEndRef = useRef(null);
    const triggerRef = useRef(null); // Ref for floating button

    // Eye tracking values (MotionValues for performance)
    const eyeX = useMotionValue(0);
    const eyeY = useMotionValue(0);
    const [isBlinking, setIsBlinking] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isTyping]);

    // === INTERACTIVITY ===

    useEffect(() => {
        // 1. Mouse Tracking (Eyes)
        // Follows cursor only when within 200px of the floating icon
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;

            if (!isOpen && triggerRef.current) {
                const rect = triggerRef.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                // Calculate distance
                const dist = Math.hypot(clientX - centerX, clientY - centerY);

                if (dist < 200) {
                    // Look at cursor
                    const dx = clientX - centerX;
                    const dy = clientY - centerY;
                    const angle = Math.atan2(dy, dx);
                    const maxOffset = 6; // Eye movement radius

                    eyeX.set(Math.cos(angle) * maxOffset);
                    eyeY.set(Math.sin(angle) * maxOffset);
                } else {
                    // Reset if far away
                    eyeX.set(0);
                    eyeY.set(0);
                }
            } else {
                eyeX.set(0);
                eyeY.set(0);
            }
        };

        // 2. Copy Detection
        const handleCopy = () => {
            setMascotState('copying');
            setTimeout(() => setMascotState('idle'), 2000);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('copy', handleCopy);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('copy', handleCopy);
        };
    }, [isOpen]); // Re-bind when open state changes

    // 3. Random Blinking (Alive feel)
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            if (mascotState === 'idle') {
                setIsBlinking(true);
                setTimeout(() => setIsBlinking(false), 200);
            }
        }, 3000 + Math.random() * 2000); // Random interval between 3-5s
        return () => clearInterval(blinkInterval);
    }, [mascotState]);


    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userText = inputValue;
        setInputValue("");
        const newMsg = { id: Date.now(), role: 'user', content: userText };
        setMessages(prev => [...prev, newMsg]);
        setIsTyping(true);
        setMascotState('thinking');

        // Check for positive sentiment for easter egg
        const positiveKeywords = ['thanks', 'thank you', 'great', 'awesome', 'cool'];
        if (positiveKeywords.some(w => userText.toLowerCase().includes(w))) {
            setMascotState('success');
            setTimeout(() => setMascotState('thinking'), 1500);
        }

        try {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    messages: [
                        { role: "system", content: "You are a helpful, encouraging, and knowledgeable educational mentor. You help students with career guidance, college admissions, and study tips. Use emojis frequently. Be concise." },
                        ...messages.filter(m => m.id !== 'init').map(m => ({ role: m.role, content: m.content })),
                        { role: "user", content: userText }
                    ],
                    model: "llama-3.1-8b-instant",
                    temperature: 0.7,
                    max_tokens: 300
                })
            });

            const data = await response.json();
            const aiContent = data.choices?.[0]?.message?.content || "I seem to have lost my train of thought. Can you ask again?";
            setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', content: aiContent }]);
            setMascotState('talking');
            setTimeout(() => setMascotState('idle'), 2000);
        } catch (error) {
            setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', content: "Oops! My connection is a bit fuzzy. Try again?" }]);
            setMascotState('idle');
        } finally {
            setIsTyping(false);
        }
    };

    const MascotSVG = ({ className, eyeX = 0, eyeY = 0, state }) => (
        <svg viewBox="0 0 100 100" fill="none" className={className}>
            {/* Animations definitions */}
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#173CBA" />
                    <stop offset="100%" stopColor="#0F2B9E" />
                </linearGradient>
            </defs>

            {/* Body */}
            <path d="M50 5 C 25.1 5 5 25.1 5 50 C 5 74.9 25.1 95 50 95 C 55 95 60 94 65 92 L 85 98 L 78 80 C 88 72 95 62 95 50 C 95 25.1 74.9 5 50 5 Z" fill="url(#grad1)" />

            {/* Face Area */}
            <g transform="translate(0, -2)">
                <g>
                    <ellipse cx="36" cy="48" rx="10" ry="12" fill="white" />
                    {/* Pupil 1 */}
                    <motion.circle
                        cx="36" cy="48" r="3.5" fill="#1E293B"
                        style={{ x: state === 'copying' ? 0 : eyeX, y: state === 'copying' ? 2 : eyeY }}
                        animate={{
                            scale: state === 'success' ? 1.2 : 1
                        }}
                    />
                    {/* Blink / Squint */}
                    <motion.rect
                        x="24" y="34" width="24" height="28" fill="#173CBA"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: (isBlinking || state === 'thinking' || state === 'copying') ? 1 : 0 }}
                        style={{ originY: 0 }}
                        transition={{ duration: 0.1 }}
                    />
                </g>
                <g>
                    <ellipse cx="64" cy="48" rx="10" ry="12" fill="white" />
                    {/* Pupil 2 */}
                    <motion.circle
                        cx="64" cy="48" r="3.5" fill="#1E293B"
                        style={{ x: state === 'copying' ? 0 : eyeX, y: state === 'copying' ? 2 : eyeY }}
                        animate={{
                            scale: state === 'success' ? 1.2 : 1
                        }}
                    />
                    {/* Blink / Squint */}
                    <motion.rect
                        x="52" y="34" width="24" height="28" fill="#173CBA"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: (isBlinking || state === 'thinking' || state === 'copying') ? 1 : 0 }}
                        style={{ originY: 0 }}
                        transition={{ duration: 0.1 }}
                    />
                </g>

                {/* Mouth (Talk / Smile / O-face) */}
                {state === 'talking' && (
                    <motion.path
                        d="M 45 65 Q 50 70 55 65"
                        stroke="white" strokeWidth="2" strokeLinecap="round"
                        animate={{ d: ["M 45 65 Q 50 70 55 65", "M 45 65 Q 50 60 55 65"] }}
                        transition={{ duration: 0.2, repeat: Infinity }}
                    />
                )}

                {state === 'copying' && ( // Pencil / Note taking look? Or just stars?
                    <motion.g animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 0.3 }}>
                        <path d="M 75 20 L 85 30 L 80 40" stroke="#FFD700" strokeWidth="3" fill="none" />
                    </motion.g>
                )}

                {state === 'success' && (
                    <motion.path d="M 40 65 Q 50 75 60 65" stroke="white" strokeWidth="3" strokeLinecap="round" />
                )}
            </g>

            {/* Extras */}
            {state === 'copying' && (
                <>
                    <motion.text x="10" y="30" fontSize="20" fill="#FFD700"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    >📝</motion.text>
                </>
            )}
            {state === 'success' && (
                <>
                    <motion.text x="80" y="20" fontSize="20"
                        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1.5 }}
                    >✨</motion.text>
                    <motion.text x="10" y="80" fontSize="20"
                        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1.5 }} delay={0.1}
                    >🎉</motion.text>
                </>
            )}
        </svg>
    );

    return (
        <>
            {/* === TRIGGER (Floating, Alive, Glassmorphic) === */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        ref={triggerRef}
                        layoutId="bot-trigger"
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-8 right-8 z-[50] group"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            y: [0, -10, 0] // Floating animation
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                            y: { duration: 3, repeat: Infinity, ease: "easeInOut" } // Floating loop
                        }}
                        whileHover={{ scale: 1.05 }}
                    >
                        {/* Circle (Glassmorphic style like original) */}
                        <div className="relative w-24 h-24 rounded-full bg-white/20 backdrop-blur-lg border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.2)] flex items-center justify-center overflow-hidden">
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

                            <MascotSVG className="w-16 h-16 relative z-10 drop-shadow-md" eyeX={eyeX} eyeY={eyeY} state="idle" />
                        </div>

                        {/* Badge */}
                        <div className="absolute top-0 right-0 bg-[#00C798] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md animate-bounce border border-white">
                            HELP?
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* === IMMERSIVE INTERFACE (Light & Academic) === */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 mb-16 md:mb-0"
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-[#F0F9FF]/80 backdrop-blur-md"
                        />

                        {/* Main Card */}
                        <motion.div
                            layoutId="bot-trigger"
                            className="relative w-full max-w-5xl h-[85vh] bg-white rounded-[40px] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white/50"
                            style={{ boxShadow: '0 20px 80px -10px rgba(23, 60, 186, 0.15)' }}
                        >
                            {/* --- Left Panel (Mascot & Context) --- */}
                            <div className="hidden md:flex flex-col w-80 bg-[#F8FAFC] border-r border-slate-100 p-8 relative">
                                <div className="flex-1 flex flex-col items-center justify-center text-center">
                                    {/* Big Mascot */}
                                    <div className="w-40 h-40 mb-6 relative">
                                        <div className="absolute inset-0 bg-blue-100/50 rounded-full blur-3xl" />
                                        <MascotSVG className="w-full h-full relative z-10 drop-shadow-xl" eyeX={eyeX} eyeY={eyeY} state={mascotState} />
                                    </div>

                                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Edutech Mentor</h2>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-8">
                                        AI-powered guidance for your academic journey. Ask me anything!
                                    </p>

                                    {/* Feature Chips */}
                                    <div className="flex flex-wrap justify-center gap-2">
                                        <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600 shadow-sm flex items-center gap-1">
                                            <GraduationCap size={12} className="text-[#173CBA]" /> Colleges
                                        </span>
                                        <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600 shadow-sm flex items-center gap-1">
                                            <Sparkles size={12} className="text-[#F59E0B]" /> Careers
                                        </span>
                                        <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600 shadow-sm flex items-center gap-1">
                                            <BookOpen size={12} className="text-[#00C798]" /> Study Tips
                                        </span>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <div className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Powered by Llama 3.1</div>
                                </div>
                            </div>

                            {/* --- Right Panel (Chat) --- */}
                            <div className="flex-1 flex flex-col bg-white relative">
                                {/* Header (Mobile Only) */}
                                <div className="md:hidden h-16 border-b border-slate-100 flex items-center justify-between px-6 bg-white/80 backdrop-blur-sm z-10 sticky top-0">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-[#173CBA] flex items-center justify-center overflow-hidden">
                                            <MascotSVG className="w-6 h-6" eyeX={0} eyeY={0} state="idle" />
                                        </div>
                                        <span className="font-bold text-slate-800">Mentor AI</span>
                                    </div>
                                    <button onClick={() => setIsOpen(false)} className="p-2 bg-slate-100 rounded-full text-slate-500"><X size={18} /></button>
                                </div>

                                {/* Close Button (Desktop) */}
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="hidden md:flex absolute top-6 right-6 w-10 h-10 bg-slate-50 hover:bg-slate-100 rounded-full items-center justify-center text-slate-400 hover:text-slate-600 transition-colors z-20"
                                >
                                    <X size={20} />
                                </button>

                                {/* Messages Area */}
                                <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6">
                                    {messages.map((msg) => (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`
                                                relative max-w-[85%] md:max-w-[70%] p-5 rounded-2xl text-sm md:text-base leading-relaxed shadow-sm
                                                ${msg.role === 'user'
                                                    ? 'bg-[#173CBA] text-white rounded-tr-sm'
                                                    : 'bg-white border border-slate-100 text-slate-700 rounded-tl-sm shadow-[0_2px_10px_rgba(0,0,0,0.03)]'
                                                }
                                            `}>
                                                {msg.role === 'assistant' && (
                                                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-sm">
                                                        <MascotSVG className="w-5 h-5" eyeX={eyeX} eyeY={eyeY} state={isTyping ? "thinking" : "idle"} />
                                                    </div>
                                                )}
                                                {msg.content}
                                            </div>
                                        </motion.div>
                                    ))}

                                    {isTyping && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start ml-2">
                                            <div className="bg-slate-50 border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
                                                <span className="w-2 h-2 bg-blue-300 rounded-full animate-bounce delay-0" />
                                                <span className="w-2 h-2 bg-blue-300 rounded-full animate-bounce delay-150" />
                                                <span className="w-2 h-2 bg-blue-300 rounded-full animate-bounce delay-300" />
                                            </div>
                                        </motion.div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input Area */}
                                <div className="p-6 md:p-8 border-t border-slate-100 bg-white">
                                    <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative flex items-center gap-3">
                                        <div className="relative flex-1 group">
                                            <input
                                                type="text"
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                placeholder="Type your question here..."
                                                className="w-full bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-xl pl-5 pr-12 py-4 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                            />
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 opacity-50 group-focus-within:opacity-100 transition-opacity">
                                                <Lightbulb size={18} />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={!inputValue.trim()}
                                            className="h-14 w-14 rounded-xl bg-[#173CBA] hover:bg-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50 disabled:shadow-none transform active:scale-95"
                                        >
                                            <Send size={20} />
                                        </button>
                                    </form>
                                    <div className="text-center mt-3 flex items-center justify-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">Mentor Online • 24/7 Support</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default NextGenChatBot;
