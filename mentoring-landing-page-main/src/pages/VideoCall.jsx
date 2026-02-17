import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Hand, Star } from 'lucide-react';

const VideoCall = () => {
    const navigate = useNavigate();
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [isCallEnded, setIsCallEnded] = useState(false);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');

    const handleEndCall = () => {
        // In a real app, stop tracks here
        setIsCallEnded(true);
    };

    const submitFeedback = () => {
        // Logic to send feedback to server would go here
        console.log({ rating, feedback });
        navigate('/dashboard');
    };

    if (isCallEnded) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl animate-fade-in-up">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                        <Star size={32} fill="currentColor" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Rate your session</h2>
                    <p className="text-gray-500 mb-6">How was your mentorship with Rajiv?</p>

                    <div className="flex justify-center gap-2 mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                className={`transition-transform hover:scale-110 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                            >
                                <Star size={32} fill="currentColor" />
                            </button>
                        ))}
                    </div>

                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Share your experience (optional)..."
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    ></textarea>

                    <button
                        onClick={submitFeedback}
                        className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
                    >
                        Submit Feedback
                    </button>

                    <button
                        onClick={() => navigate('/dashboard')}
                        className="mt-4 text-sm text-gray-400 hover:text-gray-600"
                    >
                        Skip Feedback
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-gray-900 flex flex-col relative overflow-hidden text-white">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-4 z-10 bg-gradient-to-b from-black/50 to-transparent flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold">R</div>
                    <span>Rajiv Inuganti</span>
                    <span className="bg-red-500 text-xs px-2 py-0.5 rounded ml-2">REC</span>
                </div>
            </div>

            {/* Main Video Area (Mentor) */}
            <div className="flex-1 relative flex items-center justify-center bg-gray-800">
                <div className="text-center opacity-50">
                    <div className="w-24 h-24 rounded-full bg-gray-700 mx-auto mb-4 flex items-center justify-center">
                        <span className="text-4xl">👤</span>
                    </div>
                    <p>Mentor's Video Stream</p>
                </div>

                {/* PIP (User) */}
                <div className="absolute bottom-24 right-6 w-48 h-32 bg-gray-700 rounded-lg border-2 border-gray-600 shadow-xl overflow-hidden">
                    {isVideoOff ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-800">
                            <VideoOff size={24} />
                        </div>
                    ) : (
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" alt="You" className="w-full h-full object-cover" />
                    )}
                    <span className="absolute bottom-1 left-2 text-xs text-white/80 font-medium">You</span>
                </div>
            </div>

            {/* Controls Bar */}
            <div className="h-20 bg-gray-900 border-t border-gray-800 flex items-center justify-center gap-6 px-4">
                <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-4 rounded-full transition-colors ${isMuted ? 'bg-red-500/20 text-red-500' : 'bg-gray-800 hover:bg-gray-700'}`}
                >
                    {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                </button>

                <button
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    className={`p-4 rounded-full transition-colors ${isVideoOff ? 'bg-red-500/20 text-red-500' : 'bg-gray-800 hover:bg-gray-700'}`}
                >
                    {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
                </button>

                <button className="p-4 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300">
                    <Hand size={24} />
                </button>

                <button className="p-4 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300">
                    <MessageSquare size={24} />
                </button>

                <button
                    onClick={handleEndCall}
                    className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg px-8"
                >
                    <PhoneOff size={24} />
                </button>
            </div>
        </div>
    );
};

export default VideoCall;
