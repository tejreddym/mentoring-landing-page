import { MentorCard } from "./components/MentorCard";
import { MentorProfileSheet } from "./components/MentorProfileSheet";
import { Search } from "lucide-react";
import { useState } from "react";

// Mock mentor data
const mentors = [
    {
        id: "1",
        name: "Sarah Chen",
        image: "https://images.unsplash.com/photo-1758600587839-56ba05596c69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGJ1c2luZXNzd29tYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcwNTE4MDk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 4.9,
        jobTitle: "Senior UX Designer",
        company: "Google",
        bio: "Helping designers level up their career with portfolio reviews and interview prep. I focus on storytelling and design systems.",
        skills: ["Leadership", "Strategy", "Design Systems"],
        hourlyRate: 150,
        yearsOfExperience: 8,
        isFeatured: true,
        isAvailable: true,

        location: "Bangalore, India",
        languages: ["English", "Mandarin"],
        education: [
            {
                degree: "Master of Design (Interaction Design)",
                institution: "National Institute of Design",
                year: "2014 - 2016",
            },
            {
                degree: "B.Tech in Computer Science",
                institution: "PSG College of Technology",
                year: "2010 - 2014",
            },
            {
                degree: "Certification in User Research",
                institution: "Interaction Design Foundation",
                year: "2017",
            },
            {
                degree: "Visual Design Specialist",
                institution: "California Institute of the Arts",
                year: "2016",
            },
            {
                degree: "Leadership Principles",
                institution: "Harvard Business School Online",
                year: "2019",
            },
        ],
    },
    {
        id: "2",
        name: "Marcus Johnson",
        image: "https://images.unsplash.com/photo-1732154478254-f94aebec9501?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGJ1c2luZXNzd29tYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcwNjI3OTg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 5.0,
        jobTitle: "Product Manager",
        company: "Meta",
        bio: "Ex-founder turned PM. I help aspiring PMs break into big tech and master product strategy and execution.",
        skills: ["Product Strategy", "Agile", "Analytics"],
        hourlyRate: 175,
        yearsOfExperience: 10,
        isFeatured: true,
        isAvailable: false,

        location: "Mumbai, India",
        languages: ["English", "French"],
        education: [
            {
                degree: "MBA",
                institution: "Stanford Graduate School of Business",
                year: "2014 - 2016",
            },
            {
                degree: "B.S. Computer Science",
                institution: "University of Texas at Austin",
                year: "2008 - 2012",
            },
        ],
    },
    {
        id: "3",
        name: "Emily Rodriguez",
        image: "https://images.unsplash.com/photo-1692459411840-f396f46a0524?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXRpbmElMjBwcm9mZXNzaW9uYWwlMjBidXNpbmVzc3xlbnwxfHx8fDE3NzA2Mjc5ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 4.8,
        jobTitle: "Engineering Manager",
        company: "Amazon",
        bio: "Passionate about building scalable teams and systems. I can help with architectural decisions and leadership skills.",
        skills: ["Team Building", "Architecture", "Mentorship"],
        hourlyRate: 160,
        yearsOfExperience: 12,
        isFeatured: false,
        isAvailable: true,

        location: "Hyderabad, India",
        languages: ["English", "Spanish"],
        education: [
            {
                degree: "M.S. Computer Science",
                institution: "Georgia Institute of Technology",
                year: "2012 - 2014",
            },
            {
                degree: "B.S. Software Engineering",
                institution: "University of Washington",
                year: "2008 - 2012",
            },
        ],
    },
    {
        id: "4",
        name: "David Park",
        image: "https://images.unsplash.com/photo-1723537742563-15c3d351dbf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBidXNpbmVzcyUyMGhlYWRzaG90fGVufDF8fHx8MTc3MDU4ODcwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 4.9,
        jobTitle: "Tech Lead",
        company: "Microsoft",
        bio: "Full-stack expert specializing in cloud architecture. Let's optimize your code and your career path.",
        skills: ["Cloud Architecture", "DevOps", "Security"],
        hourlyRate: 165,
        yearsOfExperience: 9,

        location: "Gurgaon, India",
        languages: ["English", "Korean"],
    },
    {
        id: "5",
        name: "Jessica Taylor",
        image: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcwNTkyNzM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 4.7,
        jobTitle: "Head of Design",
        company: "Airbnb",
        bio: "Leading design at scale. I mentor on design leadership, stakeholder management, and building user-centric products.",
        skills: ["UX Research", "Brand Strategy", "Leadership"],
        hourlyRate: 180,
        yearsOfExperience: 11,

        location: "Pune, India",
        languages: ["English", "German"],
    },
    {
        id: "6",
        name: "Ahmed Hassan",
        image: "https://images.unsplash.com/photo-1768565422698-2faaefa61fcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBlYXN0ZXJuJTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzcwNjI3OTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 4.9,
        jobTitle: "Data Science Lead",
        company: "Spotify",
        bio: "Turning data into insights. I can guide you through ML algorithms, data strategy, and python best practices.",
        skills: ["Machine Learning", "Analytics", "Python"],
        hourlyRate: 170,
        yearsOfExperience: 7,

        location: "Delhi, India",
        languages: ["English", "Arabic"],
    },
    {
        id: "7",
        name: "Olivia Kim",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHByb2Zlc3Npb25hbCUyMHdvbWFufGVufDF8fHx8MTc3MDYyODAyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 4.8,
        jobTitle: "Senior Product Designer",
        company: "Netflix",
        bio: "Specializing in prototyping and user testing. I love helping designers refine their craft and process.",
        skills: ["Prototyping", "User Research", "Figma"],
        hourlyRate: 140,
        yearsOfExperience: 6,

        location: "Chennai, India",
        languages: ["English"],
    },
    {
        id: "8",
        name: "James Wilson",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzA2MjgwNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 4.9,
        jobTitle: "Engineering Lead",
        company: "Uber",
        bio: "Building high-scale systems. I can help with system design interviews and backend architecture.",
        skills: ["System Design", "Scalability", "Go"],
        hourlyRate: 190,
        yearsOfExperience: 14,

        location: "Noida, India",
        languages: ["English"],
    },
    {
        id: "9",
        name: "Sofia Patel",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMG1hbm5hZ2VyfGVufDF8fHx8MTc3MDYyMDg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 4.7,
        jobTitle: "Marketing Director",
        company: "Apple",
        bio: "Global marketing strategist. I mentor on brand growth, digital marketing, and climbing the corporate ladder.",
        skills: ["Brand Strategy", "Growth", "Marketing"],
        hourlyRate: 165,
        yearsOfExperience: 11,
        location: "Mumbai, India",
        languages: ["English", "Hindi"],
    },
];

export default function App() {
    const [selectedMentor, setSelectedMentor] = useState(null);
    const [favorites, setFavorites] = useState(new Set());

    const toggleFavorite = (mentorId) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(mentorId)) {
                newFavorites.delete(mentorId);
            } else {
                newFavorites.add(mentorId);
            }
            return newFavorites;
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50/60 via-white to-indigo-50/40">
            {/* Hero Section */}
            <div className="relative bg-transparent overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/80"></div>

                {/* Top Glow Effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-100/40 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-10 text-center">

                    {/* Badge Pill */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/80 border border-blue-100 text-blue-700 text-sm font-semibold mb-8 shadow-sm backdrop-blur-sm animate-fade-in-up">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        #1 Mentorship Platform
                    </div>

                    <h1 className="text-6xl md:text-7xl font-serif font-bold text-gray-900 mb-8 tracking-tight leading-tight">
                        Find Your <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-700 via-indigo-600 to-violet-600">Perfect Mentor</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed font-light">
                        Connect with world-class experts from <span className="font-semibold text-gray-800">Google, Meta, and more</span> to accelerate your career growth.
                    </p>

                </div>
            </div>

            {/* Mentor Grid */}
            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="grid grid-cols-1 gap-6">
                    {mentors.map((mentor) => (
                        <MentorCard
                            key={mentor.id}
                            {...mentor}
                            isFavorite={favorites.has(mentor.id)}
                            onToggleFavorite={() => toggleFavorite(mentor.id)}
                            onViewProfile={() => setSelectedMentor(mentor)}
                        />
                    ))}
                </div>
            </div>

            <MentorProfileSheet
                isOpen={!!selectedMentor}
                onOpenChange={(open) => !open && setSelectedMentor(null)}
                mentor={selectedMentor}
            />
        </div>
    );
}
