import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageCircle, Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const GROQ_API_KEY = "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";

const ChatBot = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // === MASCOT STATE ===
    const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
    const [isBlinking, setIsBlinking] = useState(false);
    const [thought, setThought] = useState("");
    const [isIdleMessage, setIsIdleMessage] = useState(false); // Track if idle message is active
    const botRef = useRef(null);
    const isFocusedRef = useRef(false);

    // === CHAT STATE ===
    const [messages, setMessages] = useState([
        { id: 'init-1', role: 'assistant', content: "Hello! I'm your AI Guide. 🧠" },
        { id: 'init-2', role: 'assistant', content: "Ask me about finding a mentor, scholarships, or career paths!" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // === GENIE STATE ===
    const [genieTarget, setGenieTarget] = useState({ x: 0, y: 0 });
    const thoughtTimerRef = useRef(null);

    // Smart Positioning Logic
    useEffect(() => {
        if (isOpen) {
            // Determine side based on content to avoid overlap
            // Window Width ~400px. Genie ~80px.
            // Right Edge (x=0). Left Edge (x=-400).

            // Rule: Go "Beside" the latest action.
            // If User Sent (Right) -> Genie Left (-340)
            // If AI Sent (Left) -> Genie Right (-20)

            const lastMsgRole = messages.length > 0 ? messages[messages.length - 1].role : 'assistant';
            const goLeft = lastMsgRole === 'user' || isTyping; // User just spoke or AI thinking

            const targetX = goLeft ? -320 : -40;
            const targetY = -250 - Math.random() * 150; // Random float in mid-height

            setGenieTarget({ x: targetX, y: targetY });
        }
    }, [messages, isOpen, isTyping]);

    const showThought = (text, duration = 0) => {
        if (thoughtTimerRef.current) clearTimeout(thoughtTimerRef.current);
        setThought(text);
        if (duration > 0) {
            thoughtTimerRef.current = setTimeout(() => setThought(""), duration);
        }
    };

    const handleGenieHover = () => {
        if (thought || isTyping) return; // Prioritize thinking status

        // Slight delay for hover effect
        if (thoughtTimerRef.current) clearTimeout(thoughtTimerRef.current);
        thoughtTimerRef.current = setTimeout(() => {
            const insights = [
                "Need info on IITs?",
                "Scholarships are open!",
                "I can help with Exams.",
                "Checking mentor availability..."
            ];
            showThought(insights[Math.floor(Math.random() * insights.length)], 4000);
        }, 500);
    };

    // === EFFECTS ===
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 2500);
        return () => clearTimeout(timer);
    }, []);

    // Scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [messages, isTyping]);

    // Blink Logic
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 200);
        }, 3500);
        return () => clearInterval(blinkInterval);
    }, []);

    // Mouse Tracking for Eyes
    useEffect(() => {
        const handleMouseMove = (e) => {
            // Track wherever the bot is (it might be moving)
            // Ideally we track relative to viewport if fixed
            // But let's keep it simple: track relative to the button/mascot center
            // Which changes position.

            // For now, simpler eye tracking: just look at mouse
            if (!isFocusedRef.current) {
                // Idle movement handled elsewhere or just fixed
                const x = (Math.random() - 0.5) * 5;
                const y = (Math.random() - 0.5) * 5;
                // We need a stable ref to the mascot element.
                // If moved, this ref might be stale or complex.
                // Let's just make eyes follow mouse continuously on screen
                const screenX = window.innerWidth;
                const screenY = window.innerHeight;
                const eyeX = (e.clientX / screenX - 0.5) * 6;
                const eyeY = (e.clientY / screenY - 0.5) * 6;
                setEyePosition({ x: eyeX, y: eyeY });
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);


    // === GROQ API HANDLER ===
    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userText = inputValue;
        setInputValue("");
        const newMsg = { id: Date.now(), role: 'user', content: userText };
        setMessages(prev => [...prev, newMsg]);
        setIsTyping(true);
        showThought("Thinking... 💭"); // Persist until response

        try {
            const apiMessages = [
                { role: "system", content: "You are a helpful, enthusiastic mentor guide for a student mentorship platform. Keep answers concise, encouraging, and emoji-rich." },
                ...messages.filter(m => m.id !== 'init-1' && m.id !== 'init-2').map(m => ({ role: m.role, content: m.content })),
                { role: "user", content: userText }
            ];

            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    messages: apiMessages,
                    model: "llama-3.1-8b-instant",
                    temperature: 0.7,
                    max_tokens: 300
                })
            });

            const data = await response.json();
            const aiContent = data.choices?.[0]?.message?.content || "I'm having a little trouble connecting right now. Try again?";

            setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', content: aiContent }]);
            showThought("Here is what I found! 💡", 5000); // Persist result
        } catch (error) {
            console.error("Groq API Error:", error);
            setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', content: "Oops! My brain froze. 🧊 Please try again." }]);
            showThought("Brain freeze! 🧊", 5000);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <AnimatePresence>
            {(isVisible && location.pathname !== '/home2') && (
                <div className="fixed bottom-6 right-6 z-[100] flex items-end justify-end pointer-events-none">
                    {/* === CHAT WINDOW === */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                key="window"
                                initial={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                className="absolute bottom-0 right-0 w-[90vw] md:w-[400px] h-[600px] flex flex-col relative overflow-hidden font-sans pointer-events-auto origin-bottom-right shadow-2xl rounded-[32px] bg-white/70 backdrop-blur-2xl border border-white/60 z-10"
                            >
                                {/* Gradient Blobs */}
                                <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none" />
                                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-violet-500/20 blur-[60px] rounded-full pointer-events-none" />

                                {/* Header */}
                                <div className="relative z-10 p-6 flex items-center justify-between border-b border-white/30 bg-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10" />
                                        <div>
                                            <h3 className="font-bold text-gray-800 text-lg leading-tight">AI Mentor</h3>
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                <span className="text-xs text-gray-500 font-medium">Llama 3.1 Powered</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors text-gray-500">
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Messages */}
                                <div className="relative z-10 flex-1 overflow-y-auto p-6 space-y-4">
                                    {messages.map((msg) => (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-gradient-to-br from-blue-600 to-violet-600 text-white rounded-tr-sm' : 'bg-white/50 border border-white/60 text-gray-700 rounded-tl-sm backdrop-blur-sm'}`}>
                                                {msg.content}
                                            </div>
                                        </motion.div>
                                    ))}
                                    {isTyping && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                            <div className="bg-white/40 border border-white/60 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-0" />
                                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150" />
                                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-300" />
                                            </div>
                                        </motion.div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input */}
                                <div className="relative z-10 p-4">
                                    <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative">
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder="Ask something..."
                                            className="w-full bg-white/60 backdrop-blur-md border border-white/50 rounded-full pl-5 pr-12 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-lg"
                                        />
                                        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-tr from-blue-600 to-violet-600 rounded-full flex items-center justify-center text-white shadow-md hover:scale-105 active:scale-95 transition-all">
                                            <Send size={18} />
                                        </button>
                                    </form>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>


                    {/* === GENIE MASCOT === */}
                    <motion.div
                        initial={false}
                        animate={isOpen ? "open" : "closed"}
                        variants={{
                            closed: {
                                x: 0, y: 0, scale: 1, zIndex: 100 // Button State
                            },
                            open: {
                                x: [0, -200, genieTarget.x], // 1. Start -> 2. Top Center -> 3. Target
                                y: [0, -650, genieTarget.y], // 1. Start -> 2. Way Up -> 3. Target
                                scale: [1, 1.1, 0.6], // Pulse
                                zIndex: [0, 0, 50], // Start Behind (0), stay behind until top, end Front (50)
                                transition: {
                                    duration: 1.8,
                                    times: [0, 0.4, 1],
                                    zIndex: { times: [0, 0.4, 0.45], duration: 1.8 } // Switch to front just after apex
                                }
                            }
                        }}
                        className="absolute bottom-0 right-0 w-20 h-20 pointer-events-auto"
                        onMouseEnter={handleGenieHover}
                    >
                        {/* Thought Bubble */}
                        <AnimatePresence>
                            {(thought && isOpen) && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 5, scale: 0.8 }}
                                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-40 bg-white p-3 rounded-2xl shadow-xl border border-blue-100 text-xs text-center text-blue-600 font-semibold z-50 pointer-events-none"
                                >
                                    {thought}
                                    {/* Tail */}
                                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white transform rotate-45 border-r border-b border-blue-100"></div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* MASCOT SVG BUTTON */}
                        <motion.button
                            onClick={() => setIsOpen(!isOpen)}
                            className="relative w-20 h-20 bg-white/20 backdrop-blur-lg border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.2)] rounded-full flex items-center justify-center group overflow-hidden pointer-events-auto"
                            whileHover={{ scale: 1.05 }}
                            animate={isOpen ? {
                                y: [0, -10, 0],
                                transition: {
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }
                            } : {}}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
                            <div className="w-14 h-14 drop-shadow-md relative z-10">
                                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                                    <path d="M50 5 C 25.1 5 5 25.1 5 50 C 5 74.9 25.1 95 50 95 C 55 95 60 94 65 92 L 85 98 L 78 80 C 88 72 95 62 95 50 C 95 25.1 74.9 5 50 5 Z" fill="#173CBA" />
                                    <g transform="translate(0, -2)">
                                        <g>
                                            <ellipse cx="36" cy="48" rx="10" ry="12" fill="white" />
                                            {/* Pupil 1 */}
                                            <circle cx="36" cy="48" r="3.5" fill="#1E293B" transform={`translate(${eyePosition.x}, ${eyePosition.y - (isTyping ? 3 : 0)})`} />
                                            <motion.rect x="24" y="34" width="24" height="28" fill="#173CBA" initial={{ scaleY: 0 }} animate={{ scaleY: isBlinking ? 1 : 0 }} style={{ originY: 0 }} />
                                        </g>
                                        <g>
                                            <ellipse cx="64" cy="48" rx="10" ry="12" fill="white" />
                                            {/* Pupil 2 */}
                                            <circle cx="64" cy="48" r="3.5" fill="#1E293B" transform={`translate(${eyePosition.x}, ${eyePosition.y - (isTyping ? 3 : 0)})`} />
                                            <motion.rect x="52" y="34" width="24" height="28" fill="#173CBA" initial={{ scaleY: 0 }} animate={{ scaleY: isBlinking ? 1 : 0 }} style={{ originY: 0 }} />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            {!isOpen && (
                                <span className="absolute top-4 right-4 w-3 h-3 bg-[#00C798] rounded-full border border-white shadow-sm z-20 animate-bounce" />
                            )}
                        </motion.button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ChatBot;
