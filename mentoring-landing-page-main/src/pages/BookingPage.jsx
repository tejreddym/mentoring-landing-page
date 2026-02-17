import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ChevronLeft } from 'lucide-react';

const BookingPage = () => {
    const navigate = useNavigate();
    // STATE
    const [step, setStep] = useState(1);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    // REFS
    const step1Ref = useRef(null);
    const step2Ref = useRef(null);
    const step3Ref = useRef(null);
    const canvasRef = useRef(null);

    // MOCK DATA
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const defaultSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:30 PM", "06:00 PM"];

    // ANIMATION: Enter
    useEffect(() => {
        gsap.fromTo(step1Ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
    }, []);

    // CALENDAR LOGIC
    const handleMonthChange = (e) => {
        const [y, m] = e.target.value.split('-').map(Number);
        const newDate = new Date(y, m, 1);
        setCurrentDate(newDate);
    };

    const renderDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const days = [];

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="day-card empty"></div>);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dateKey = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
            const isBooked = (i % 7 === 0);
            const status = isBooked ? 'booked' : 'available';
            const isSelected = selectedDate === dateKey;

            days.push(
                <div
                    key={dateKey}
                    className={`day-card ${status} ${isSelected ? 'selected' : ''}`}
                    onClick={() => status !== 'booked' && handleDateSelect(dateKey, i)}
                >
                    <span className="day-num">{i}</span>
                </div>
            );
        }
        return days;
    };

    const handleDateSelect = (dateKey) => {
        setSelectedDate(dateKey);
        setSelectedTime(null);
    };

    // STEP NAVIGATION
    const goToStep2 = () => {
        gsap.to(step1Ref.current, {
            x: -20, opacity: 0, duration: 0.3, onComplete: () => {
                setStep(2);
                setTimeout(() => {
                    gsap.fromTo(step2Ref.current, { x: 20, opacity: 0 }, { x: 0, opacity: 1 });
                }, 10);
            }
        });
    };

    const goToStep3 = () => {
        gsap.to(step2Ref.current, {
            x: -20, opacity: 0, duration: 0.3, onComplete: () => {
                setStep(3);
                setTimeout(() => {
                    gsap.fromTo(step3Ref.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1 });
                    triggerConfetti();
                }, 10);
            }
        });
    };

    const goBack = () => {
        if (step === 3) {
            gsap.to(step3Ref.current, {
                scale: 0.9, opacity: 0, duration: 0.3, onComplete: () => {
                    setStep(2);
                    setTimeout(() => {
                        gsap.fromTo(step2Ref.current, { x: 20, opacity: 0 }, { x: 0, opacity: 1 });
                    }, 10);
                }
            });
        } else if (step === 2) {
            gsap.to(step2Ref.current, {
                x: 20, opacity: 0, duration: 0.3, onComplete: () => {
                    setStep(1);
                    setTimeout(() => {
                        gsap.fromTo(step1Ref.current, { x: -20, opacity: 0 }, { x: 0, opacity: 1 });
                    }, 10);
                }
            });
        } else {
            navigate('/');
        }
    };

    const triggerConfetti = () => {
        if (window.confetti && canvasRef.current) {
            const myConfetti = window.confetti.create(canvasRef.current, { resize: true, useWorker: true });
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10001 };
            myConfetti({ ...defaults, particleCount: 50, origin: { x: 0.2, y: 0.3 } });
            myConfetti({ ...defaults, particleCount: 50, origin: { x: 0.8, y: 0.3 } });
            setTimeout(() => myConfetti({ ...defaults, particleCount: 50, origin: { x: 0.5, y: 0.5 } }), 500);
        }
    };

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-3xl w-full flex flex-col md:flex-row min-h-[500px]">

                {/* SIDEBAR */}
                <div className="w-full md:w-1/3 bg-slate-50 border-r border-slate-100 p-8 flex flex-col">
                    <button onClick={() => navigate('/')} className="mb-8 flex items-center gap-2 text-slate-500 hover:text-slate-800 font-medium transition-colors">
                        <ChevronLeft size={20} /> Back to Profile
                    </button>

                    <div className="text-center mb-8">
                        <img src="https://i.pravatar.cc/150?img=12"
                            className="w-24 h-24 rounded-full mx-auto mb-4 shadow-md" alt="Mentor" />
                        <h3 className="text-lg font-serif font-bold text-slate-900">Rajiv Inuganti</h3>
                        <p className="text-sm text-slate-500">Senior Product Designer</p>
                    </div>

                    <div className="space-y-4 flex-1">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Date</span>
                            <span className="font-bold text-slate-900">{selectedDate || '--'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Time</span>
                            <span className="font-bold text-slate-900">{selectedTime || '--'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Duration</span>
                            <span className="font-bold text-slate-900">60 Min</span>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center">
                        <span className="font-medium text-slate-900">Total</span>
                        <span className="text-2xl font-bold text-blue-600">$50.00</span>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="flex-1 p-8 relative flex flex-col">
                    {/* STEPPER */}
                    <div className="flex justify-center mb-8">
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>1</div>
                            <div className={`w-12 h-1 bg-slate-200`}>
                                <div className={`h-full bg-blue-600 transition-all duration-300`} style={{ width: step > 1 ? '100%' : '0%' }}></div>
                            </div>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>2</div>
                            <div className={`w-12 h-1 bg-slate-200`}>
                                <div className={`h-full bg-blue-600 transition-all duration-300`} style={{ width: step > 2 ? '100%' : '0%' }}></div>
                            </div>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>3</div>
                        </div>
                    </div>

                    {/* STEPS */}
                    <div className="flex-1 relative">
                        {/* STEP 1: SCHEDULING */}
                        {step === 1 && (
                            <div ref={step1Ref} className="h-full flex flex-col">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 text-center md:text-left">Select Date & Time</h2>

                                <div className="flex-1 overflow-y-auto pr-2">
                                    <div className="mb-6">
                                        <select
                                            value={`${currentYear}-${currentMonth}`}
                                            onChange={handleMonthChange}
                                            className="text-lg font-bold text-blue-600 bg-transparent border-none outline-none cursor-pointer hover:underline"
                                        >
                                            {Array.from({ length: 12 }).map((_, i) => {
                                                const d = new Date();
                                                d.setMonth(d.getMonth() + i);
                                                const y = d.getFullYear();
                                                const m = d.getMonth();
                                                return <option key={`${y}-${m}`} value={`${y}-${m}`}>{monthNames[m]} {y}</option>
                                            })}
                                        </select>
                                    </div>

                                    <div className="days-row mb-6">
                                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                                            <span key={d} className="weekday-label">{d}</span>
                                        ))}
                                        {renderDays()}
                                    </div>

                                    <h3 className="font-bold text-slate-900 mb-3 text-sm">Available Slots</h3>
                                    <div className="grid grid-cols-3 gap-2 mb-6">
                                        {selectedDate ? (
                                            defaultSlots.map(time => (
                                                <button
                                                    key={time}
                                                    onClick={() => setSelectedTime(time)}
                                                    className={`py-2 px-2 rounded-lg text-xs font-medium transition-all ${selectedTime === time
                                                        ? 'bg-blue-600 text-white shadow-md transform scale-105'
                                                        : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600'
                                                        }`}
                                                >
                                                    {time}
                                                </button>
                                            ))
                                        ) : (
                                            <div className="col-span-full text-center py-8 text-slate-400 italic text-sm">
                                                Select a date above to see available times
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button
                                    onClick={goToStep2}
                                    disabled={!selectedTime}
                                    className="w-full py-3 bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all"
                                >
                                    Continue to Payment
                                </button>
                            </div>
                        )}

                        {/* STEP 2: PAYMENT */}
                        {step === 2 && (
                            <div ref={step2Ref} className="h-full flex flex-col">
                                <h2 className="text-xl font-bold text-slate-900 mb-2 text-center md:text-left">Payment Details</h2>
                                <p className="text-slate-500 mb-6 text-sm text-center md:text-left">Complete your booking securely.</p>

                                <div className="space-y-4 flex-1">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">Card Number</label>
                                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm" />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="block text-xs font-medium text-slate-700 mb-1">Expiry</label>
                                            <input type="text" placeholder="MM/YY" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm" />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-xs font-medium text-slate-700 mb-1">CVC</label>
                                            <input type="text" placeholder="123" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">Name on Card</label>
                                        <input type="text" placeholder="John Doe" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm" />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button onClick={goBack} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">
                                        Back
                                    </button>
                                    <button onClick={goToStep3} className="flex-[2] py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all">
                                        Pay & Confirm
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: CONFIRMATION */}
                        {step === 3 && (
                            <div ref={step3Ref} className="h-full flex flex-col items-center justify-center text-center relative px-4">
                                <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none"></canvas>

                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 animate-bounce-slow shadow-sm mx-auto">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-3">Booking Confirmed!</h2>
                                <p className="text-slate-500 mb-8 max-w-sm mx-auto text-sm leading-relaxed">
                                    You're all set! A calendar invitation has been sent to your email. Get ready to level up your career.
                                </p>

                                <div className="flex gap-3 w-full max-w-xs mx-auto mb-4">
                                    <button onClick={() => alert("Added to Calendar!")} className="flex-1 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                                        📅 Add to Calendar
                                    </button>
                                    <button onClick={() => window.open('https://meet.google.com/new', '_blank')} className="flex-1 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                                        🎥 Google Meet
                                    </button>
                                </div>

                                <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
                                    <button onClick={() => navigate('/dashboard')} className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:scale-105 transition-all text-sm">
                                        Go to Dashboard
                                    </button>
                                    <button onClick={() => navigate('/')} className="w-full py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors text-sm">
                                        Back to Home
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
