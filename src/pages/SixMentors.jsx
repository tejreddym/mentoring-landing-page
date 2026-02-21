import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./SixMentors.css";
import "./SixMentorsScoped.css";

// Files in public directory are served at root path
const blueSpotlightData = "/blue-spotlight.png";

// Determine if we are in a browser environment for SSR safety
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const SixMentors = () => {
    const [activeMentorIndex, setActiveMentorIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [isGridActive, setIsGridActive] = useState(false); // Track grid layout state
    const [activeSubIndex, setActiveSubIndex] = useState(0); // For mobile carousel dots
    const [isMobile, setIsMobile] = useState(false); // Track mobile view

    // Refs for GSAP and scrolling
    const containerRef = useRef(null);
    const innerContainerRef = useRef(null);
    const stickyViewportRef = useRef(null);
    const scrollTrackRef = useRef(null);
    const torchRef = useRef(null);
    const torchImgRef = useRef(null);
    const rightPanelRef = useRef(null);
    const gridRef = useRef(null);
    const cardsRef = useRef([]);
    const carouselContainerRef = useRef(null);

    // Data
    const MENTOR_CARDS = [
        {
            id: "card0",
            title: "Student Mentor",
            description:
                '"Guides students through academic challenges and personal growth."',
            image:
                "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=300",
        },
        {
            id: "card1",
            title: "Admission Mentor",
            description:
                '"Supports students in choosing the right course and institution."',
            image:
                "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=format&fit=crop&q=80&w=300",
        },
        {
            id: "card2",
            title: "Loan Mentor",
            description:
                '"Assists students and parents with education loan options, eligibility, and repayment."',
            image:
                "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=300",
        },
        {
            id: "card3",
            title: "Career Mentor",
            description:
                '"Helps students explore career paths, internships, and opportunities."',
            image:
                "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=300",
        },
        {
            id: "card4",
            title: "Scholarship Mentor",
            description: '"Guides students in identifying suitable scholarships and grants."',
            image:
                "https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?auto=format&fit=crop&q=80&w=300",
        },
        {
            id: "card5",
            title: "Health Mentor",
            description: '"Promotes physical and mental well-being among students."',
            image:
                "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=300",
        },
    ];

    const MENTORS_DATA = [
        {
            name: "Student Mentor",
            subs: [
                {
                    n: "Rajiv Inuganti",
                    e: "7+ yrs",
                    d: "Career counseling",
                    img: "https://i.pravatar.cc/150?img=12",
                },
                {
                    n: "Anjali Verma",
                    e: "5+ yrs",
                    d: "Student success",
                    img: "https://i.pravatar.cc/150?img=32",
                },
                {
                    n: "Sarah Lin",
                    e: "4 yrs",
                    d: "Study Skills",
                    img: "https://i.pravatar.cc/150?img=48",
                },
                {
                    n: "David Chen",
                    e: "3 yrs",
                    d: "Peer support",
                    img: "https://i.pravatar.cc/150?img=15",
                },
                {
                    n: "Alex Morgan",
                    e: "2 yrs",
                    d: "Freshman Guide",
                    img: "https://i.pravatar.cc/150?img=11",
                },
                // 4 Extra Mentors
                {
                    n: "Sophia Reed",
                    e: "6 yrs",
                    d: "Academic Planning",
                    img: "https://i.pravatar.cc/150?img=5",
                },
                {
                    n: "Marcus Johnson",
                    e: "4 yrs",
                    d: "Leadership Coach",
                    img: "https://i.pravatar.cc/150?img=8",
                },
                {
                    n: "Elena Rodriguez",
                    e: "5+ yrs",
                    d: "International Student Support",
                    img: "https://i.pravatar.cc/150?img=9",
                },
                {
                    n: "Thomas Wright",
                    e: "3 yrs",
                    d: "Research Skills",
                    img: "https://i.pravatar.cc/150?img=13",
                },
            ],
        },
        {
            name: "Admission Mentor",
            subs: [
                {
                    n: "Medoju Mohan",
                    e: "10+ yrs",
                    d: "Admissions expert",
                    img: "https://i.pravatar.cc/150?img=11",
                },
                {
                    n: "Pooja Nair",
                    e: "8+ yrs",
                    d: "International",
                    img: "https://i.pravatar.cc/150?img=44",
                },
                {
                    n: "Robert Fox",
                    e: "6 yrs",
                    d: "College applications",
                    img: "https://i.pravatar.cc/150?img=33",
                },
                {
                    n: "Emily Zhao",
                    e: "5 yrs",
                    d: "Entrance exams",
                    img: "https://i.pravatar.cc/150?img=24",
                },
                // Extras
                {
                    n: "Chris Evans",
                    e: "6 yrs",
                    d: "Essay Review",
                    img: "https://i.pravatar.cc/150?img=15",
                },
                {
                    n: "Natasha R",
                    e: "4 yrs",
                    d: "Interview Prep",
                    img: "https://i.pravatar.cc/150?img=25",
                },
                {
                    n: "Bruce B",
                    e: "9 yrs",
                    d: "Strategic Planning",
                    img: "https://i.pravatar.cc/150?img=65",
                },
                {
                    n: "Tony Stark",
                    e: "10 yrs",
                    d: "Engineering Admissions",
                    img: "https://i.pravatar.cc/150?img=55",
                },
            ],
        },
        {
            name: "Loan Mentor",
            subs: [
                {
                    n: "Vikas Shah",
                    e: "12+ yrs",
                    d: "Loan advisory",
                    img: "https://i.pravatar.cc/150?img=70",
                },
                {
                    n: "Ritu M",
                    e: "9+ yrs",
                    d: "Planning",
                    img: "https://i.pravatar.cc/150?img=41",
                },
                {
                    n: "Amit Patel",
                    e: "8 yrs",
                    d: "Interest rates",
                    img: "https://i.pravatar.cc/150?img=53",
                },
                {
                    n: "Lisa Wong",
                    e: "6 yrs",
                    d: "Scholarship funding",
                    img: "https://i.pravatar.cc/150?img=22",
                },
                // Extras
                {
                    n: "Harry Potter",
                    e: "3 yrs",
                    d: "Financial Aid",
                    img: "https://i.pravatar.cc/150?img=52",
                },
                {
                    n: "Hermione G",
                    e: "5 yrs",
                    d: "Budgeting",
                    img: "https://i.pravatar.cc/150?img=42",
                },
                {
                    n: "Ron W",
                    e: "2 yrs",
                    d: "Student Loans",
                    img: "https://i.pravatar.cc/150?img=12",
                },
                {
                    n: "David Lee",
                    e: "2 yrs",
                    d: "Mock interviews",
                    img: "https://i.pravatar.cc/150?img=17",
                },
                // Extras
                {
                    n: "Aisha Khan",
                    e: "5 yrs",
                    d: "Salary Negotiation",
                    img: "https://i.pravatar.cc/150?img=20",
                },
                {
                    n: "Paul Chen",
                    e: "3 yrs",
                    d: "Design Systems",
                    img: "https://i.pravatar.cc/150?img=55",
                },
                {
                    n: "Lara Croft",
                    e: "7 yrs",
                    d: "Exploration",
                    img: "https://i.pravatar.cc/150?img=33",
                },
                {
                    n: "Mike Ross",
                    e: "4 yrs",
                    d: "Legal Tech",
                    img: "https://i.pravatar.cc/150?img=12",
                },
            ],
        },
        {
            name: "Career Mentor",
            subs: [
                {
                    n: "Surya Kotha",
                    e: "18+ yrs",
                    d: "Tech leadership",
                    img: "https://i.pravatar.cc/150?img=68",
                },
                {
                    n: "Arjun Patel",
                    e: "9+ yrs",
                    d: "Resume building",
                    img: "https://i.pravatar.cc/150?img=59",
                },
                {
                    n: "Nina Ricci",
                    e: "11 yrs",
                    d: "Interview prep",
                    img: "https://i.pravatar.cc/150?img=49",
                },
                {
                    n: "Tom Hardy",
                    e: "7 yrs",
                    d: "Networking",
                    img: "https://i.pravatar.cc/150?img=13",
                },
                // Extras
                {
                    n: "Jerry S",
                    e: "8 yrs",
                    d: "Public Speaking",
                    img: "https://i.pravatar.cc/150?img=23",
                },
                {
                    n: "Elaine B",
                    e: "5 yrs",
                    d: "Copywriting",
                    img: "https://i.pravatar.cc/150?img=43",
                },
                {
                    n: "George C",
                    e: "4 yrs",
                    d: "Real Estate",
                    img: "https://i.pravatar.cc/150?img=53",
                },
                {
                    n: "Kramer",
                    e: "9 yrs",
                    d: "Entrepreneurship",
                    img: "https://i.pravatar.cc/150?img=63",
                },
            ],
        },
        {
            name: "Scholarship Mentor",
            subs: [
                {
                    n: "Nikhil Verma",
                    e: "10+ yrs",
                    d: "Global grants",
                    img: "https://i.pravatar.cc/150?img=61",
                },
                {
                    n: "Sonia G",
                    e: "8+ yrs",
                    d: "Funding",
                    img: "https://i.pravatar.cc/150?img=42",
                },
                {
                    n: "Maria G",
                    e: "6 yrs",
                    d: "Arts grants",
                    img: "https://i.pravatar.cc/150?img=35",
                },
                {
                    n: "John Doe",
                    e: "5 yrs",
                    d: "Merit scholarships",
                    img: "https://i.pravatar.cc/150?img=60",
                },
                // Extras
                {
                    n: "Jane Doe",
                    e: "4 yrs",
                    d: "STEM Grants",
                    img: "https://i.pravatar.cc/150?img=40",
                },
                {
                    n: "Alice W",
                    e: "3 yrs",
                    d: "Need-based Aid",
                    img: "https://i.pravatar.cc/150?img=30",
                },
                {
                    n: "Bob M",
                    e: "6 yrs",
                    d: "Sports Scholarships",
                    img: "https://i.pravatar.cc/150?img=20",
                },
                {
                    n: "Charlie C",
                    e: "5 yrs",
                    d: "Fellowships",
                    img: "https://i.pravatar.cc/150?img=10",
                },
            ],
        },
        {
            name: "Health Mentor",
            subs: [
                {
                    n: "Dr. Meera",
                    e: "15+ yrs",
                    d: "Mental health",
                    img: "https://i.pravatar.cc/150?img=45",
                },
                {
                    n: "Rohan Sen",
                    e: "6+ yrs",
                    d: "Stress management",
                    img: "https://i.pravatar.cc/150?img=57",
                },
                {
                    n: "Anita Roy",
                    e: "9 yrs",
                    d: "Yoga & Mindfulness",
                    img: "https://i.pravatar.cc/150?img=36",
                },
                {
                    n: "James King",
                    e: "3 yrs",
                    d: "Optimization",
                    img: "https://i.pravatar.cc/150?img=60",
                },
                // Extras
                {
                    n: "Sara Tan",
                    e: "4 yrs",
                    d: "Content Strategy",
                    img: "https://i.pravatar.cc/150?img=41",
                },
                {
                    n: "Ben Stokes",
                    e: "5 yrs",
                    d: "B2B Sales",
                    img: "https://i.pravatar.cc/150?img=51",
                },
                {
                    n: "Jenny Lo",
                    e: "2 yrs",
                    d: "Growth Hacking",
                    img: "https://i.pravatar.cc/150?img=32",
                },
                {
                    n: "Tim Cook",
                    e: "8 yrs",
                    d: "Logistics",
                    img: "https://i.pravatar.cc/150?img=11",
                },
            ],
        },
    ];

    // Handle Mobile View Detection
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 767);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Handle Scroll for Carousel Pagination Dots
    const handleCarouselScroll = () => {
        if (!carouselContainerRef.current) return;
        const container = carouselContainerRef.current;

        const slideWidth = container.offsetWidth;
        const scrollPosition = container.scrollLeft;
        const centerOffset = scrollPosition + (slideWidth / 2);

        let activeIndex = 0;
        let minDistance = Infinity;

        Array.from(container.children).forEach((child, index) => {
            const childCenter = child.offsetLeft + (child.offsetWidth / 2);
            const distance = Math.abs(centerOffset - childCenter);

            if (distance < minDistance) {
                minDistance = distance;
                activeIndex = index;
            }
        });

        const maxIndex = isMobile ? MENTORS_DATA.length : currentSubMentors.length;
        if (activeIndex < maxIndex) {
            if (activeSubIndex !== activeIndex) {
                setActiveSubIndex(activeIndex);
            }
            if (isMobile && activeMentorIndex !== activeIndex) {
                setActiveMentorIndex(activeIndex);
            }
        }
    };

    useLayoutEffect(() => {
        // Initial Settings
        gsap.set(torchRef.current, { opacity: 1, x: 0, y: 0 });
        gsap.set(torchImgRef.current, { opacity: 0 });
        // gsap.set(".torch-wrap", { x: 0, y: 0 }); // Handled by CSS/structure

        const cards = cardsRef.current;

        // Cards start INVISIBLE and OFF-SCREEN (Bottom).
        gsap.set(cards, {
            xPercent: -50,
            yPercent: -50,
            x: 0,
            y: window.innerHeight * 0.8,
            opacity: 0,
            scale: 0.8,
            zIndex: (i) => i + 1,
        });

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: scrollTrackRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                    pin: stickyViewportRef.current,
                },
            });

            // --- PHASE 1: SEQUENTIAL SCROLL ---
            tl.to({}, { duration: 0.8 });
            tl.to(
                torchImgRef.current,
                {
                    opacity: 1,
                    duration: 1.5,
                    ease: "power2.inOut",
                },
                ">"
            );

            cards.forEach((card, i) => {
                tl.to(
                    card,
                    {
                        x: 0,
                        y: i * -5,
                        scale: 1,
                        opacity: 1,
                        rotation: i % 2 === 0 ? 3 : -3,
                        xPercent: -50,
                        yPercent: -50,
                        duration: 2,
                        ease: "power2.out",
                    },
                    ">"
                );

                if (i < cards.length - 1) {
                    tl.to({}, { duration: 1 });
                }
            });

            // --- PHASE 2: PAUSE REMOVED FOR SMOOTHER TRANSITION ---
            // tl.to({}, { duration: 2 }); 

            // --- PHASE 3: GRID TRANSITION ---
            const transitionStart = ">";

            tl.to(
                torchRef.current,
                {
                    autoAlpha: 0,
                    duration: 1,
                },
                transitionStart
            );

            // Animate Container Background
            const bgTargets = [containerRef.current, innerContainerRef.current, document.body];
            const mainBg = document.getElementById("main-bg");
            if (mainBg) bgTargets.push(mainBg);

            tl.fromTo(
                bgTargets,
                { backgroundColor: "#131c31" },
                {
                    backgroundColor: "#e6f2ff",
                    duration: 3,
                    ease: "power2.inOut",
                },
                transitionStart
            );



            // Grid Calculation
            const cardW = 140;
            const cardH = 160;
            const gapX = 40; // Horizontal gap
            const gapY = 40; // Vertical gap
            // Center of the left panel (approx 25% of screen width)
            const gridCenterX = window.innerWidth * 0.25;

            // Initial position is center of screen (50vw, 50vh)
            const initialX = window.innerWidth * 0.5;

            // Animate Cards Position & Size
            tl.to(
                cards,
                {
                    x: (i) => {
                        const col = i % 2;
                        // 0 = left col, 1 = right col
                        // If col 0, move LEFT of gridCenterX. If col 1, move RIGHT of gridCenterX.
                        const xOffset = col === 0 ? -(cardW / 2 + gapX / 2) : (cardW / 2 + gapX / 2);

                        // Target X in absolute coordinates = gridCenterX + xOffset
                        // GSAP 'x' is relative to initial position (initialX)
                        // So GSAP x = Target X - initialX
                        return (gridCenterX + xOffset) - initialX;
                    },
                    y: (i) => {
                        const row = Math.floor(i / 2); // 0, 1, 2
                        // Center row (index 1) should be at y=0 relative to center
                        // Row 0: -height - gapY
                        // Row 1: 0
                        // Row 2: +height + gapY
                        const yOffset = (row - 1) * (cardH + gapY);
                        return yOffset;
                    },
                    width: cardW,
                    height: cardH,
                    rotation: (i) => {
                        const col = i % 2;
                        return col === 0 ? -3 : 3;
                    },
                    scale: 1,
                    borderRadius: "12px", // Match .mentors-layout
                    xPercent: -50,
                    yPercent: -50,
                    zIndex: (i) => 10 + i, // Ensure higher index cards are on top
                    duration: 4,
                    ease: "power2.inOut",
                    onStart: () => {
                        setIsGridActive(true);
                    },
                    onReverseComplete: () => {
                        setIsGridActive(false);
                    },
                },
                transitionStart
            );

            // Animate Images explicitly
            const images = cards.map(c => c.querySelector('.card__founder-img'));
            tl.to(images, {
                width: "100%",
                height: "50%",
                borderRadius: "0",
                duration: 4,
                ease: "power2.inOut"
            }, transitionStart);

            // --- PHASE 4: RIGHT PANEL ---
            tl.to(
                rightPanelRef.current,
                {
                    opacity: 1,
                    visibility: "visible",
                    duration: 2,
                },
                ">"
            );
        });

        return () => ctx.revert();
    }, []);

    // Update Right Panel content when activeMentorIndex or currentPage changes
    useEffect(() => {
        if (gridRef.current) {
            // Animate new items
            gsap.fromTo(
                gridRef.current.children,
                { y: 20, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    stagger: 0.08,
                    duration: 0.5,
                    ease: "back.out(1.5)",
                },
            );
        }
    }, [activeMentorIndex, currentPage]);

    const handleCardClick = (index) => {
        setActiveMentorIndex(index);
        setCurrentPage(0); // Reset page on category switch
    };

    const handlePageChange = (newPage) => {
        const data = MENTORS_DATA[activeMentorIndex];
        if (!data) return;
        const itemsPerPage = 4;
        const totalPages = Math.ceil(data.subs.length / itemsPerPage);

        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    // Data Access
    const currentData = MENTORS_DATA[activeMentorIndex];
    const currentSubMentors = currentData ? currentData.subs : [];

    return (
        <div id="main-bg" style={{ width: "100%", minHeight: "100vh" }}>
            <div className="scroll-track" ref={scrollTrackRef}>
                <div className="sticky-viewport" ref={stickyViewportRef}>
                    <div
                        className="section is--spotlight"
                        ref={containerRef}
                        style={{
                            width: "100%",
                            height: "100vh",
                            padding: 0,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <div
                            className="w-layout-blockcontainer container is--spotlight w-container"
                            ref={innerContainerRef}
                        >
                            <div className="spotlight">
                                <div className="torch-wrap" id="torch" ref={torchRef}>
                                    <h2 className="h2 is--serif is--z1" style={{ color: "white" }}>
                                        OUR MENTORS
                                    </h2>
                                    <img
                                        src={blueSpotlightData}
                                        loading="lazy"
                                        alt="Blue Spotlight"
                                        className="torch__img"
                                        ref={torchImgRef}
                                    />
                                </div>

                                {MENTOR_CARDS.map((card, index) => (
                                    <div
                                        key={card.id}
                                        className={`card mentor-card ${activeMentorIndex === index ? "active-card" : ""
                                            } ${isGridActive ? "mentors-layout" : ""}`}
                                        id={card.id}
                                        ref={(el) => (cardsRef.current[index] = el)}
                                        onClick={() => handleCardClick(index)}
                                    >
                                        <div className="card__wrap">
                                            <div className="card__content">
                                                <div className="card__content-left">
                                                    <h2 className="h3 is--serif" style={{ textAlign: "center" }}>
                                                        {card.title.split(" ").map((word, i) => (
                                                            <span key={i} style={{ display: "block" }}>
                                                                {word}
                                                            </span>
                                                        ))}
                                                    </h2>
                                                    <div className="para-temp white _36 desc" style={{ textAlign: "center" }}>
                                                        {card.description}
                                                    </div>
                                                </div>
                                                <img
                                                    src={card.image}
                                                    className="card__founder-img"
                                                    alt={card.title}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="right-panel" id="rightPanel" ref={rightPanelRef}>
                        <h3
                            style={{
                                fontFamily: '"Playfair Display"',
                                fontSize: "28px",
                                marginBottom: "12px",
                            }}
                        >
                            {currentData ? currentData.name : "Mentors"}
                        </h3>
                        <div className="sub-grid" id="subGrid" ref={gridRef}>
                            {/* Render Carousel on Mobile or Single Focus on Desktop */}
                            <div
                                className="sub-carousel-container"
                                ref={carouselContainerRef}
                                onScroll={handleCarouselScroll}
                                style={{
                                    display: 'flex',
                                    flexDirection: isMobile ? 'row' : 'column',
                                    flex: 1,
                                    gap: "16px",
                                    overflowX: isMobile ? 'auto' : 'hidden',
                                    scrollSnapType: isMobile ? 'x mandatory' : 'none',
                                    scrollBehavior: 'smooth',
                                    paddingBottom: isMobile ? '10px' : '0' // space for scrollbar/dots
                                }}
                            >
                                {/* On Mobile: render all categories. On Desktop: render only the first submentor of the active category */}
                                {isMobile ? MENTORS_DATA.map((category, idx) => {
                                    const subMentor = category.subs[0];
                                    return (
                                        <div
                                            key={idx}
                                            className="sub-card featured-mentor-card mobile-swipe-card"
                                            style={{
                                                flex: "0 0 100%", // Force full width for mobile snapping
                                                height: '100%',
                                                scrollSnapAlign: 'center',
                                            }}
                                        >
                                            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                                                {/* Header */}
                                                <div className="card-header" style={{ display: "flex", gap: "16px", alignItems: "center", paddingBottom: "16px", borderBottom: "1px solid #f1f5f9", marginBottom: "16px" }}>
                                                    <img
                                                        src={subMentor.img}
                                                        alt={subMentor.n}
                                                        style={{ width: "72px", height: "72px", borderRadius: "50%", objectFit: "cover" }}
                                                    />
                                                    <div>
                                                        <h4 style={{ margin: 0, fontSize: "20px", color: "#0f172a", fontWeight: 700 }}>{subMentor.n}</h4>
                                                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                                                            <span style={{ fontSize: "13px", color: "#f59e0b", fontWeight: 700 }}>★ 4.9</span>
                                                            <span style={{ fontSize: "13px", color: "#64748b" }}>(120 reviews)</span>
                                                        </div>
                                                        <span style={{ fontSize: "13px", color: "#3B82F6", fontWeight: 600, display: "block", marginTop: "4px" }}>{subMentor.e} Experience</span>
                                                    </div>
                                                </div>

                                                <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
                                                    {/* About */}
                                                    <div>
                                                        <h5 style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 700 }}>About</h5>
                                                        <p style={{ fontSize: "14px", color: "#334155", margin: 0, lineHeight: 1.6 }}>{subMentor.d}. Dedicated to guiding students through their academic journey with personalized strategies and expert insights.</p>
                                                    </div>

                                                    {/* Stats */}
                                                    <div style={{ display: "flex", gap: "32px", justifyContent: 'space-between' }}>
                                                        <div><span style={{ display: "block", fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>500+</span><span style={{ fontSize: "12px", color: "#64748b" }}>Sessions</span></div>
                                                        <div><span style={{ display: "block", fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>Top 1%</span><span style={{ fontSize: "12px", color: "#64748b" }}>Mentor</span></div>
                                                        <div><span style={{ display: "block", fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>98%</span><span style={{ fontSize: "12px", color: "#64748b" }}>Success Rate</span></div>
                                                    </div>

                                                    {/* Expertise */}
                                                    <div>
                                                        <h5 style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 700 }}>Expertise</h5>
                                                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                                            {["Study Abroad", "Scholarships", "Career", "Admissions"].map((tag, i) => (
                                                                <span key={i} style={{ background: "#e0f2fe", color: "#0284c7", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600 }}>{tag}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Mobile View All Button placed at bottom of each mentor card */}
                                                <div style={{ marginTop: '20px' }}>
                                                    <Link to="/mentor-profiles" style={{ textDecoration: 'none' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', background: '#f1f5f9', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
                                                            <span style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>View All {category.name}s</span>
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }) : currentSubMentors.length > 0 && (
                                    <div className="sub-card featured-mentor-card">
                                        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                                            {/* Header */}
                                            <div className="card-header" style={{ display: "flex", gap: "16px", alignItems: "center", paddingBottom: "16px", borderBottom: "1px solid #f1f5f9", marginBottom: "16px" }}>
                                                <img src={currentSubMentors[0].img} alt={currentSubMentors[0].n} style={{ width: "72px", height: "72px", borderRadius: "50%", objectFit: "cover" }} />
                                                <div>
                                                    <h4 style={{ margin: 0, fontSize: "20px", color: "#0f172a", fontWeight: 700 }}>{currentSubMentors[0].n}</h4>
                                                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                                                        <span style={{ fontSize: "13px", color: "#f59e0b", fontWeight: 700 }}>★ 4.9</span>
                                                        <span style={{ fontSize: "13px", color: "#64748b" }}>(120 reviews)</span>
                                                    </div>
                                                    <span style={{ fontSize: "13px", color: "#3B82F6", fontWeight: 600, display: "block", marginTop: "4px" }}>{currentSubMentors[0].e} Experience</span>
                                                </div>
                                            </div>

                                            <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
                                                {/* About */}
                                                <div>
                                                    <h5 style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 700 }}>About</h5>
                                                    <p style={{ fontSize: "14px", color: "#334155", margin: 0, lineHeight: 1.6 }}>{currentSubMentors[0].d}. Dedicated to guiding students through their academic journey with personalized strategies and expert insights.</p>
                                                </div>

                                                {/* Stats */}
                                                <div style={{ display: "flex", gap: "32px", justifyContent: 'flex-start' }}>
                                                    <div><span style={{ display: "block", fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>500+</span><span style={{ fontSize: "12px", color: "#64748b" }}>Sessions</span></div>
                                                    <div><span style={{ display: "block", fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>Top 1%</span><span style={{ fontSize: "12px", color: "#64748b" }}>Mentor</span></div>
                                                    <div><span style={{ display: "block", fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>98%</span><span style={{ fontSize: "12px", color: "#64748b" }}>Success Rate</span></div>
                                                </div>

                                                {/* Expertise Tags */}
                                                <div>
                                                    <h5 style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 700 }}>Expertise</h5>
                                                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                                        {["Study Abroad", "Scholarships", "Career", "Admissions"].map((tag, i) => (
                                                            <span key={i} style={{ background: "#e0f2fe", color: "#0284c7", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600 }}>{tag}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card-arrow">
                                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"></path><path d="M7 7h10v10"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Pagination Dots */}
                            {isMobile && MENTORS_DATA.length > 0 && (
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    marginTop: '8px',
                                    marginBottom: '4px'
                                }}>
                                    {MENTORS_DATA.map((_, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                width: activeSubIndex === idx ? '24px' : '8px',
                                                height: '8px',
                                                borderRadius: '4px',
                                                background: activeSubIndex === idx ? '#3b82f6' : '#cbd5e1',
                                                transition: 'all 0.3s ease'
                                            }}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Desktop "View More" Button / Card */}
                            {!isMobile && (
                                <Link to="/mentor-profiles" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div
                                        className="sub-card view-all-card"
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            textAlign: "center",
                                            background: "#f1f5f9", // Slight contrast
                                            borderStyle: "dashed",
                                            cursor: "pointer",
                                            transition: "all 0.3s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = "#e2e8f0";
                                            e.currentTarget.style.borderColor = "#3b82f6";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = "#f1f5f9";
                                            e.currentTarget.style.borderColor = "";
                                        }}
                                    >
                                        <div className="view-all-content" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div
                                                style={{
                                                    width: "48px",
                                                    height: "48px",
                                                    borderRadius: "50%",
                                                    background: "#e2e8f0",
                                                    color: "#64748b",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    // Removed margin: 0 auto... to allow flex gap to handle spacing
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                                    <circle cx="9" cy="7" r="4"></circle>
                                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                                </svg>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
                                                <h4 style={{ margin: 0, fontSize: "14px", color: "#334155" }}>
                                                    View All Mentors
                                                </h4>
                                                <span style={{ fontSize: "11px", color: "#94a3b8" }}>
                                                    Discover more experts
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default SixMentors;
