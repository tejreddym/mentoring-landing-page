import { Star, CheckCircle, GraduationCap, Heart, ChevronRight, MapPin, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function MentorCard({
    name,
    image,
    rating,
    jobTitle,
    company,
    skills,
    hourlyRate,
    yearsOfExperience,
    bio,
    isFavorite,
    isFeatured,
    isAvailable,
    location,
    languages,
    onToggleFavorite,
    onViewProfile,
}) {
    return (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 hover:border-blue-200 transition-all duration-300 shadow-sm hover:shadow-xl group relative overflow-hidden">
            {/* Featured Badge */}
            {/* Rating Badge */}
            {/* Top Right Actions: Favorite & Rating */}
            <div className="absolute top-4 right-4 z-20 flex items-start gap-3">
                {/* Featured Badge - Bookmark Shape */}
                {isFeatured && (
                    <div
                        className="w-8 h-10 bg-blue-600 flex items-center justify-center shadow-sm"
                        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)" }}
                        title="Star Mentor"
                    >
                        <Star className="w-4 h-4 text-white fill-white mb-1.5" />
                    </div>
                )}

                {/* Favorite Button */}
                <button
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm border ${isFavorite
                        ? "bg-red-50 border-red-200 text-red-500"
                        : "bg-white border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-100"
                        }`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite();
                    }}
                >
                    <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500" : ""}`} />
                </button>

                {/* Rating Badge */}
                <div className="bg-[#FFFBF0] text-orange-700 text-sm font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-orange-50">
                    <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                    {rating}
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">

                {/* Left Column: Costumized Visuals */}
                <div className="w-full md:w-[160px] flex flex-col items-center shrink-0">
                    <div className="relative mb-6">
                        <img
                            src={image}
                            alt={name}
                            className="w-[120px] h-[120px] rounded-full object-cover border-[6px] border-white shadow-lg"
                        />
                        {/* Verification Badge - positioned absolutely bottom-right */}
                        <div className="absolute bottom-1 right-1 bg-blue-600 rounded-full p-1 border-[3px] border-white z-10">
                            <CheckCircle className="w-4 h-4 text-white fill-blue-600" />
                        </div>
                    </div>

                    <div className="flex justify-between w-full max-w-[180px] px-1 text-center gap-2">

                        <div className="flex flex-col items-center flex-1">
                            <p className="text-lg font-bold text-gray-900">200+</p>
                            <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mt-1">SESSIONS</p>
                        </div>
                        <div className="flex flex-col items-center flex-1">
                            <p className="text-lg font-bold text-gray-900">{yearsOfExperience}yr</p>
                            <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mt-1">EXP</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Content */}
                <div className="flex-1 min-w-0 pt-1 text-center md:text-left">

                    {/* Available Badge */}
                    {isAvailable && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-bold tracking-wide uppercase mb-3 self-center md:self-start">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Available now
                        </div>
                    )}

                    <h3 className="text-3xl font-serif font-bold text-gray-900 mb-2 hover:text-blue-700 transition-colors cursor-pointer" onClick={onViewProfile}>
                        {name}
                    </h3>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-base text-teal-700 mb-4 font-medium">
                        <div className="flex items-center gap-2">
                            <GraduationCap className="w-5 h-5 shrink-0" />
                            <span className="font-semibold">{jobTitle} • {company}</span>
                        </div>
                        {location && (
                            <div className="flex items-center gap-1 text-gray-500 text-sm">
                                <MapPin className="w-4 h-4" />
                                <span>{location}</span>
                            </div>
                        )}
                    </div>

                    <p className="text-gray-500 leading-relaxed mb-4 text-sm">
                        {bio || `Helping students navigate the complex world of international admissions and career planning. I specialize in profile building for ${company} and interview preparation.`}
                    </p>

                    {languages && (
                        <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500 mb-6">
                            <Globe className="w-4 h-4 text-blue-500" />
                            <span>Speaks: <span className="font-medium text-gray-700">{languages.join(", ")}</span></span>
                        </div>
                    )}

                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
                        {skills.slice(0, 4).map((skill) => (
                            <Badge
                                key={skill}
                                variant="secondary"
                                className="px-4 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-semibold rounded-full border border-gray-100 transition-colors"
                            >
                                {skill}
                            </Badge>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                        <Button
                            variant="ghost"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-6 py-6 text-base font-semibold rounded-full transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
                            onClick={onViewProfile}
                        >
                            View Profile
                        </Button>
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base rounded-full shadow-md shadow-blue-100 transition-all hover:shadow-lg font-semibold flex items-center justify-center gap-2 w-full sm:grow sm:md:grow-0"
                            onClick={onViewProfile}
                        >
                            Book a Session <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}
