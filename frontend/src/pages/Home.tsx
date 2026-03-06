import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, Heart, Shield, Star, ChevronDown, CheckCircle, Clock, Award, ThumbsUp, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Parallax, ParallaxBanner } from 'react-scroll-parallax';

/* ── Reusable Motion Wrappers ── */

const FadeInUp: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
        {children}
    </motion.div>
);

const HoverCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

const MotionButton: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className = '', style }) => (
    <motion.span
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15 }}
        style={{ display: 'inline-block', ...style }}
        className={className}
    >
        {children}
    </motion.span>
);

const Home: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqData = [
        { q: 'How do I file a claim?', a: 'You can file a claim through our online portal or by calling our 24/7 hotline. Most valid claims are processed within 24 hours.' },
        { q: 'Can I cancel my policy?', a: 'Yes. You can cancel at any time with no hidden penalties. We calculate refunds on a pro‑rata basis.' },
        { q: 'Are multi‑policy discounts available?', a: 'Bundling auto, health, and life insurance can save you up to 15% on total premiums.' },
        { q: 'Do you support online servicing?', a: 'Absolutely. Manage policies, download documents, and track claims entirely online.' }
    ];

    return (
        <div>
            {/* ══════════════════════════════════════════
                HERO SECTION — Parallax Background + Two-Column
                ══════════════════════════════════════════ */}
            <section className="hero-section" style={{ position: 'relative', overflow: 'hidden' }}>
                {/* Parallax background image */}
                <ParallaxBanner
                    layers={[
                        {
                            image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80',
                            speed: -10,
                        },
                    ]}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                />
                {/* Gradient overlays for depth */}
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(6, 39, 31, 0.75)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(6,39,31,0.9) 0%, rgba(11,61,46,0.7) 50%, rgba(21,122,59,0.5) 100%)' }} />
                {/* Subtle radial glow */}
                <div className="section-glow" style={{ position: 'absolute', top: '-20%', right: '-10%', width: '60%', height: '120%', background: 'radial-gradient(ellipse at center, rgba(76,175,80,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

                <div className="hero-grid" style={{ position: 'relative', zIndex: 10 }}>
                    <motion.div
                        className="hero-text"
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.span
                            className="hero-badge"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            Europe's trusted insurance partner
                        </motion.span>
                        <h1 className="hero-title">Insurance Solutions For Your Future</h1>
                        <p className="hero-subtitle">
                            Secure your future with a modern, transparent insurance provider. Simple coverage, fast claims, and real human support when it matters most.
                        </p>
                        <div className="hero-actions">
                            <MotionButton>
                                <Link to="/contact" className="btn btn-accent">Get Consultation</Link>
                            </MotionButton>
                            <MotionButton>
                                <Link to="/about-us" className="btn btn-ghost" style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'white' }}>Learn More</Link>
                            </MotionButton>
                        </div>
                    </motion.div>

                    <motion.div
                        className="hero-image-wrapper"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <div className="hero-image-glow" />
                        <Parallax speed={5}>
                            <img
                                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800"
                                alt="Professional insurance consultation"
                                className="hero-image"
                            />
                        </Parallax>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}
                >
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.6875rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 500 }}>Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        style={{ width: '28px', height: '44px', borderRadius: '14px', border: '1.5px solid rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'center', paddingTop: '8px' }}
                    >
                        <div style={{ width: '4px', height: '10px', background: 'rgba(255,255,255,0.5)', borderRadius: '2px' }} />
                    </motion.div>
                </motion.div>
            </section>

            {/* ══════════════════════════════════════════
                PAYOUT RESULTS — White bg
                ══════════════════════════════════════════ */}
            <section className="home-section section-white" style={{ position: 'relative', overflow: 'hidden' }}>
                {/* Subtle background glow */}
                <div className="section-glow" style={{ position: 'absolute', bottom: '-30%', left: '-10%', width: '50%', height: '80%', background: 'radial-gradient(ellipse at center, rgba(76,175,80,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <FadeInUp>
                        <div className="payout-heading">
                            <h2>Our Company's Payout Results</h2>
                            <p>We pride ourselves on transparent and rapid claim settlements, ensuring peace of mind when it matters most. Our automated systems process most valid claims within 24 hours.</p>
                            <div className="payout-badges">
                                <span className="payout-badge">Reliable</span>
                                <span className="payout-badge">Fast</span>
                                <span className="payout-badge">Secure</span>
                            </div>
                        </div>
                    </FadeInUp>

                    <div className="payout-grid">
                        {[
                            { label: 'Total Paid', value: '$10M+', icon: Award },
                            { label: 'Processing Time', value: '24 hr', icon: Clock },
                            { label: 'Approval Rate', value: '98%', icon: CheckCircle },
                            { label: 'Satisfaction', value: '4.9/5', icon: ThumbsUp }
                        ].map((stat, idx) => (
                            <FadeInUp key={stat.label} delay={idx * 0.1}>
                                <motion.div
                                    className="payout-stat"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <motion.div
                                        className="payout-icon"
                                        whileHover={{ scale: 1.1, rotate: 3 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <stat.icon size={28} strokeWidth={1.5} />
                                    </motion.div>
                                    <strong className="payout-value">{stat.value}</strong>
                                    <span className="payout-label">{stat.label}</span>
                                </motion.div>
                            </FadeInUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                INSURANCE COVERAGE CARDS — Gray bg
                ══════════════════════════════════════════ */}
            <section className="home-section section-gray">
                <div className="container">
                    <FadeInUp>
                        <div className="coverage-header">
                            <div>
                                <h2>Our Coverage</h2>
                                <p>Comprehensive insurance solutions tailored to your life's journey.</p>
                            </div>
                            <Link to="/life-insurance" className="coverage-link">
                                View all plans <span className="arrow">→</span>
                            </Link>
                        </div>
                    </FadeInUp>

                    <div className="coverage-grid">
                        {[
                            { to: '/auto-insurance', icon: Car, title: 'Auto Insurance', desc: 'Comprehensive coverage for your vehicle with 24/7 roadside assistance and transparent repairs.' },
                            { to: '/health-insurance', icon: Shield, title: 'Health Insurance', desc: 'Flexible medical plans covering regular checkups, emergencies, and everything in between.' },
                            { to: '/life-insurance', icon: Heart, title: 'Life Insurance', desc: "Long-term protection built to secure your family's financial future in every scenario." }
                        ].map((card, idx) => (
                            <FadeInUp key={card.title} delay={idx * 0.1}>
                                <HoverCard>
                                    <Link to={card.to} className="coverage-card">
                                        <motion.div
                                            className="coverage-card-icon"
                                            whileHover={{ scale: 1.1, rotate: 3 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <card.icon size={24} strokeWidth={1.5} />
                                        </motion.div>
                                        <h3>{card.title}</h3>
                                        <p>{card.desc}</p>
                                    </Link>
                                </HoverCard>
                            </FadeInUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                TESTIMONIALS — White bg
                ══════════════════════════════════════════ */}
            <section className="home-section section-white">
                <div className="container">
                    <FadeInUp>
                        <div className="testimonial-heading">
                            <h2>What Our Clients Say</h2>
                            <p>Trusted by thousands of families and businesses across Europe.</p>
                        </div>
                    </FadeInUp>

                    <div className="testimonial-grid">
                        {[
                            { name: 'Sarah Jenkins', role: 'Business Owner', quote: '"The claims process was incredibly fast. I felt supported every step of the way — it never felt like I was dealing with a big corporation."' },
                            { name: 'Marcus Reid', role: 'Freelancer', quote: '"Finally, an insurance company that doesn\'t hide behind jargon. Transparent pricing and no surprise exclusions."' },
                            { name: 'Elena Gomez', role: 'Architect', quote: '"Professional, reliable, and modern. My auto claim was handled within 24 hours, exactly as promised."' },
                        ].map((item, idx) => (
                            <FadeInUp key={item.name} delay={idx * 0.1}>
                                <HoverCard className="h-full">
                                    <div className="testimonial-card" style={{ height: '100%' }}>
                                        <div className="testimonial-stars">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star key={i} size={16} fill="#4CAF50" color="#4CAF50" />
                                            ))}
                                        </div>
                                        <p className="testimonial-quote">{item.quote}</p>
                                        <div className="testimonial-author">
                                            <div className="testimonial-avatar" />
                                            <div>
                                                <div className="testimonial-name">{item.name}</div>
                                                <div className="testimonial-role">{item.role}</div>
                                            </div>
                                        </div>
                                    </div>
                                </HoverCard>
                            </FadeInUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                FAQ ACCORDION — Gray bg — AnimatePresence
                ══════════════════════════════════════════ */}
            <section className="home-section section-gray">
                <div className="container">
                    <FadeInUp>
                        <div className="home-faq-heading">
                            <h2>Common Questions</h2>
                            <p>Quick answers to the most frequently asked questions about our coverage.</p>
                        </div>
                    </FadeInUp>

                    <div className="home-faq-list">
                        {faqData.map((faq, idx) => (
                            <FadeInUp key={faq.q} delay={idx * 0.08}>
                                <div className={`home-faq-item${openFaq === idx ? ' home-faq-item--open' : ''}`}>
                                    <button
                                        className="home-faq-question"
                                        onClick={() => toggleFaq(idx)}
                                        aria-expanded={openFaq === idx}
                                    >
                                        {faq.q}
                                        <motion.span
                                            animate={{ rotate: openFaq === idx ? 180 : 0 }}
                                            transition={{ duration: 0.25, ease: "easeOut" }}
                                            style={{ display: 'flex' }}
                                        >
                                            <ChevronDown size={20} className="home-faq-chevron" style={{ transform: 'none' }} />
                                        </motion.span>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {openFaq === idx && (
                                            <motion.div
                                                key="faq-answer"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25, ease: "easeOut" }}
                                                style={{ overflow: 'hidden', padding: '0 1.5rem' }}
                                            >
                                                <p style={{ paddingBottom: '1.25rem', margin: 0, color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.9375rem' }}>{faq.a}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </FadeInUp>
                        ))}
                    </div>

                    <FadeInUp delay={0.3}>
                        <div className="home-faq-more">
                            <Link to="/faqs">View all FAQs <span className="arrow">→</span></Link>
                        </div>
                    </FadeInUp>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                CONTACT + CALLBACK — White bg
                ══════════════════════════════════════════ */}
            <section className="home-section section-white">
                <div className="container">
                    <div className="contact-split">
                        <FadeInUp>
                            <div className="contact-info">
                                <h2>Get in Touch</h2>
                                <p>Have questions about coverage or claims? Our team is available around the clock to guide you.</p>
                                <ul className="contact-details">
                                    <li className="contact-detail-item">
                                        <motion.div className="contact-detail-icon" whileHover={{ scale: 1.1, rotate: 3 }} transition={{ duration: 0.2 }}>
                                            <Phone size={16} />
                                        </motion.div>
                                        <span><strong style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>Phone:</strong>+44 20 1234 5678</span>
                                    </li>
                                    <li className="contact-detail-item">
                                        <motion.div className="contact-detail-icon" whileHover={{ scale: 1.1, rotate: 3 }} transition={{ duration: 0.2 }}>
                                            <Mail size={16} />
                                        </motion.div>
                                        <span><strong style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>Email:</strong>support@trustwave.eu</span>
                                    </li>
                                </ul>
                                <MotionButton>
                                    <Link to="/contact" className="btn btn-primary">Talk to an Expert</Link>
                                </MotionButton>
                            </div>
                        </FadeInUp>

                        <FadeInUp delay={0.15}>
                            <HoverCard>
                                <div className="callback-card">
                                    <h3>Request a Callback</h3>
                                    <p>Share a few details and an advisor will call you back within one business day.</p>
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            alert('Callback request submitted. (Hook this up to backend when ready.)');
                                        }}
                                        className="callback-form"
                                    >
                                        <input className="callback-input" placeholder="Full name" required />
                                        <input className="callback-input" placeholder="Phone number" required />
                                        <input className="callback-input" placeholder="Email (optional)" />
                                        <MotionButton style={{ width: '100%' }}>
                                            <button type="submit" className="callback-submit">
                                                Request Callback
                                            </button>
                                        </MotionButton>
                                    </form>
                                </div>
                            </HoverCard>
                        </FadeInUp>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                IMAGE STORY — Gray bg — Parallax image
                ══════════════════════════════════════════ */}
            <section className="home-section section-gray" style={{ overflow: 'hidden' }}>
                <div className="container">
                    <div className="story-grid">
                        <FadeInUp>
                            <Parallax speed={-8}>
                                <div className="story-image-container">
                                    <img
                                        src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800"
                                        alt="Family protection"
                                    />
                                    <div className="story-image-overlay" />
                                    <div className="story-image-caption">
                                        "Protecting what matters most, exactly when you need it."
                                    </div>
                                </div>
                            </Parallax>
                        </FadeInUp>
                        <FadeInUp delay={0.15}>
                            <div className="story-content">
                                <div className="story-divider" />
                                <h2>Protection That Grows With You</h2>
                                <p>
                                    Life is unpredictable, but your coverage shouldn't be. We design our policies to adapt to your changing needs, ensuring you and your loved ones are always protected.
                                </p>
                                <MotionButton>
                                    <Link to="/about-us" className="btn btn-ghost">
                                        Discover Our Story <span style={{ marginLeft: '0.25rem' }}>→</span>
                                    </Link>
                                </MotionButton>
                            </div>
                        </FadeInUp>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                PARTNERS — White bg
                ══════════════════════════════════════════ */}
            <section className="home-section section-white">
                <div className="container">
                    <FadeInUp>
                        <div className="partners-section">
                            <p className="partners-label">Trusted by industry leaders</p>
                            <div className="partners-row">
                                {['Acme Corp', 'Global Inc', 'Nova Systems', 'Umbrella', 'Vertex'].map((partner, idx) => (
                                    <motion.span
                                        key={partner}
                                        className="partner-name"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 0.2, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: idx * 0.08 }}
                                        whileHover={{ opacity: 0.6, scale: 1.05 }}
                                    >
                                        {partner}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </FadeInUp>
                </div>
            </section>
        </div>
    );
};

export default Home;
