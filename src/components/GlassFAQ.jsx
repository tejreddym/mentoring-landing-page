import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    id: 1,
    question: "How can I connect with a mentor who fits my specific career goals?",
    answer: "You can browse our extensive directory of mentors, filtering by industry, expertise, and career level. Once you find a match, you can request a connection or book a session directly through their profile."
  },
  {
    id: 2,
    question: "How do I get started with your product?",
    answer: "Getting started is simple! Sign up for a free account, complete the onboarding tutorial, and you'll have access to all the basic features. Our comprehensive documentation and support team are here to help you every step of the way."
  },
  {
    id: 3,
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers. All payments are processed securely through industry-standard encryption."
  },
  {
    id: 4,
    question: "Can I cancel my subscription at any time?",
    answer: "Yes, absolutely! You can cancel your subscription at any time from your account settings. There are no cancellation fees, and you'll continue to have access until the end of your billing period."
  },
  {
    id: 5,
    question: "Do you offer customer support?",
    answer: "We offer 24/7 customer support through email, live chat, and phone. Our premium and enterprise plans also include dedicated account managers and priority support channels."
  },
  {
    id: 6,
    question: "Is my data secure?",
    answer: "Security is our top priority. We use bank-level encryption, regular security audits, and comply with GDPR, SOC 2, and ISO 27001 standards. Your data is stored in secure, redundant data centers with automatic backups."
  }
];

export function GlassFAQ() {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (id) => {
    setOpenItem(prev => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden font-sans">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0" style={{ background: '#F5F9F7' }}>
        {/* Animated gradient orbs for mesh effect */}
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-50/70 blur-[120px] animate-pulse"></div>
        <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-50/60 blur-[130px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-[-15%] left-[20%] w-[550px] h-[550px] rounded-full bg-purple-50/60 blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[60%] right-[30%] w-[400px] h-[400px] rounded-full bg-pink-50/50 blur-[110px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 pt-48 pb-12">
        <div className="w-full max-w-3xl">
          {/* FAQ Heading with Glow & Blur */}
          <div className="text-center mb-12 relative">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-24 bg-blue-400/20 blur-[64px] rounded-full pointer-events-none" />
            <h1
              className="text-6xl font-bold font-serif text-gray-900 mb-4 relative z-10 tracking-tight"
            >
              FAQ
            </h1>
            <p className="text-gray-600 text-lg relative z-10 font-medium">
              Find answers to commonly asked questions
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {faqData.map((item) => {
                const isOpen = openItem === item.id;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="group relative"
                  >
                    {/* Rotating Border Container (Large Centered) */}
                    <div className="absolute -inset-[3px] rounded-[26px] overflow-hidden z-0 pointer-events-none">
                      <motion.div
                        className="absolute top-1/2 left-1/2 w-[200%] h-[200%]"
                        initial={{ opacity: 0, x: "-50%", y: "-50%" }}
                        animate={{
                          rotate: 360,
                          opacity: isOpen ? 1 : 0
                        }}
                        transition={{
                          rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                          opacity: { duration: 0.3 }
                        }}
                        style={{
                          background: `conic-gradient(from 0deg, transparent, transparent 70%, #3B82F6 100%)`
                        }}
                      />
                    </div>

                    {/* Glass Card */}
                    <motion.div
                      layout
                      className="relative rounded-[24px] overflow-hidden z-10"
                      style={{
                        background: isOpen
                          ? '#F5F9FF'
                          : 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(32px)',
                        WebkitBackdropFilter: 'blur(32px)',
                        border: '1px solid rgba(255, 255, 255, 0.8)',
                        boxShadow: isOpen
                          ? '0 24px 48px rgba(0, 0, 0, 0.1), inset 4px 0 0 0 #3B82F6, inset 0 1px 0 rgba(255, 255, 255, 0.9)'
                          : '0 4px 16px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.7)'
                      }}
                    >
                      {/* Specular Edge Highlight */}
                      <div className="absolute inset-0 pointer-events-none border border-white/50 rounded-[24px]" />
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Question Button */}
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="w-full px-8 py-6 flex items-center justify-between text-left relative z-20"
                      >
                        <span
                          className={`text-lg pr-4 transition-colors duration-300 font-semibold font-serif ${isOpen ? 'text-blue-900' : 'text-gray-900'}`}
                        >
                          {item.question}
                        </span>

                        {/* Toggle Icon */}
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0, backgroundColor: isOpen ? 'rgba(59, 130, 246, 0.1)' : 'transparent' }}
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                        >
                          {isOpen ? (
                            <Minus className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Plus className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                          )}
                        </motion.div>
                      </button>

                      {/* Answer */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 30
                            }}
                            className="overflow-hidden relative z-20"
                          >
                            <div className="px-8 pb-8 pt-0">
                              <motion.div
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className="text-gray-600 leading-relaxed text-[16px]"
                              >
                                {item.answer}
                              </motion.div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>


          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-16 text-center"
          >
            <div
              className="inline-block rounded-[24px] px-8 py-4 hover:scale-[1.02] transition-transform duration-300 cursor-pointer group"
              style={{
                background: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(32px)',
                WebkitBackdropFilter: 'blur(32px)',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.05)'
              }}
            >
              <p className="text-gray-600 text-sm flex items-center">
                Still have questions?{' '}
                <span className="font-semibold ml-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                  Contact our team &rarr;
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
