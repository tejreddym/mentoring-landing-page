import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Home2 from './components/Home2';
import Navbar from './components/Navbar';
import Testimonials from './components/Testimonials';

import ChatBot from './components/ChatBot';
import FAQ from './components/FAQ';
import { GlassFAQ } from './components/GlassFAQ';
import Sessions from './components/Sessions';
import Mentors from './components/Mentors';
import MentorsV2 from './components/MentorsV2';

import Pricing from './components/Pricing';

import PricingV4 from './components/PricingV4';
import CareerStepper from './components/CareerStepper';
import StepperApp from './components/Stepper/App';
import DesignSuccessStories from './pages/DesignSuccessStories';
import UpcomingSessions from './components/UpcomingSessions';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/home2" element={<Home2 />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/roadmap" element={<CareerStepper />} />

        <Route path="/services" element={<Pricing />} />

        <Route path="/services-v4" element={<PricingV4 />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/faq-glass" element={<GlassFAQ />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/mentors-v2" element={<MentorsV2 />} />
        <Route path="/design-success-stories" element={<DesignSuccessStories />} />
        <Route path="/upcoming-sessions" element={<UpcomingSessions />} />
        <Route path="/stepper" element={<StepperApp />} />
      </Routes>
      <ChatBot />
    </Router>
  );
}

export default App;
