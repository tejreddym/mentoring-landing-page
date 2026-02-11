import React from 'react';
import Hero from '../components/Hero';
import { CareerStepperHome3 } from '../components/Stepper/components/CareerStepperHome3';
import Sessions from '../components/Sessions';
import DesignSuccessStories from '../pages/DesignSuccessStories';
import { GlassFAQ } from '../components/GlassFAQ';
import SectionDivider from '../components/SectionDivider';

const Home3_1 = () => {
    return (
        <div className="w-full">
            {/* Section 1: Hero */}
            <section className="relative z-50">
                <Hero />
                <div className="absolute bottom-0 w-full translate-y-[99%]">
                    <SectionDivider variant="wave" fill="#E0F2FE" /> {/* Matches Hero End */}
                </div>
            </section>

            {/* Section 2: Career Stepper (JSX) */}
            <section className="relative z-40">
                <CareerStepperHome3 />
                <div className="absolute bottom-0 w-full translate-y-[99%]">
                    <SectionDivider variant="curve" fill="#E0F2FE" /> {/* Matches Stepper End */}
                </div>
            </section>

            {/* Section 3: Sessions */}
            <section className="relative z-30">
                <Sessions />
                <div className="absolute bottom-0 w-full translate-y-[99%]">
                    <SectionDivider variant="tilt" fill="#E0F2FE" /> {/* Matches Sessions End */}
                </div>
            </section>

            {/* Section 4: Success Stories */}
            {/* DesignSuccessStories already has a 100vh container, so we just render it */}
            <section className="relative z-20">
                <DesignSuccessStories />
                <div className="absolute bottom-0 w-full translate-y-[1px]">
                    <SectionDivider variant="wave" fill="#F5F9F7" className="rotate-180" /> {/* Matches FAQ Start (Green Hill effect) */}
                </div>
            </section>

            {/* Section 5: FAQ Glass */}
            <section className="relative z-10">
                <GlassFAQ />
            </section>
        </div>
    );
};

export default Home3_1;
