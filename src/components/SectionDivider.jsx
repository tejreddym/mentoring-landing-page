import React from 'react';

const SectionDivider = ({ fill, className = "", variant = "wave" }) => {
    const variants = {
        wave: (
            <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                fill={fill}
            ></path>
        ),
        curve: (
            <path
                d="M0,60 C150,90 400,100 600,60 C800,20 1050,10 1200,60 V0 H0 V60 Z"
                fill={fill}
            ></path>
        ),
        tilt: (
            <path
                d="M1200,120 L0,16.48 V0 H1200 V120 Z"
                fill={fill}
            ></path>
        ),
        clouds: (
            <path
                d="M0,60 C60,40 100,20 160,40 C220,60 260,80 320,60 C380,40 420,20 480,40 C540,60 580,80 640,60 C700,40 740,20 800,40 C860,60 900,80 960,60 C1020,40 1060,20 1120,40 C1180,60 1200,80 1200,80 V0 H0 V60 Z"
                fill={fill}
            ></path>
        ),
        book: (
            <path
                d="M0,0 v40 c150,30 450,40 600,0 c150,40 450,30 600,0 v-40 H0 Z"
                fill={fill}
            ></path>
        ),
        simple_curve: (
            <path
                d="M0,0 L1200,0 L1200,50 Q600,120 0,50 Z"
                fill={fill}
            ></path>
        )
    };

    return (
        <div className={`w-full overflow-hidden leading-[0] pointer-events-none ${className}`}>
            <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[100px]"
            >
                {variants[variant] || variants.wave}
            </svg>
        </div>
    );
};

export default SectionDivider;
