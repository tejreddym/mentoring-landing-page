import React from 'react';
import Hero from '../components/Hero';
import { CareerStepper } from '../components/Stepper/components/CareerStepper';
import Sessions from '../components/Sessions';
import DesignSuccessStories from '../pages/DesignSuccessStories';
import { GlassFAQ } from '../components/GlassFAQ';

const UnifiedHome = () => {
    return (
        <div className="w-full">
            {/* Section 1: Hero */}
            <section>
                <Hero />
            </section>

            {/* Section 2: Career Stepper (JSX) */}
            <section>
                <CareerStepper />
            </section>

            {/* Section 3: Sessions */}
            <section>
                <Sessions />
            </section>

            {/* Section 4: Success Stories */}
            {/* DesignSuccessStories already has a 100vh container, so we just render it */}
            <section>
                <DesignSuccessStories />
            </section>

            {/* Section 5: FAQ Glass */}
            <section>
                <GlassFAQ />
            </section>
        </div>
    );
};

export default UnifiedHome;
