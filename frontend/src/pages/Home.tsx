import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Heart, Shield, Star } from 'lucide-react';

const Home: React.FC = () => {
    return (
        <>
            {/* Hero */}
            <header className="hero home-hero">
                <div className="container home-hero-content">
                    <div className="hero-text animate-up">
                        <p className="home-badge">Europe’s trusted insurance partner</p>
                        <h1 className="home-title">INSURANCE SOLUTIONS</h1>
                        <p className="home-subtitle">
                            Secure your future with a modern, transparent insurance provider.
                            Simple coverage, fast claims, and real human support when it matters most.
                        </p>
                        <div className="home-hero-actions">
                            <Link to="/contact" className="btn btn-primary">
                                Get Consultation
                            </Link>
                            <Link to="/about-us" className="btn btn-secondary">
                                Learn more
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Payout results */}
            <section className="section-padding">
                <div className="container home-stats-section">
                    <div className="home-stats-copy animate-up">
                        <div className="home-divider" />
                        <h2>OUR COMPANY’S PAYOUT RESULTS</h2>
                        <p>
                            We pride ourselves on transparent and rapid claim settlements, ensuring
                            peace of mind when it matters most. Our automated systems process
                            most valid claims within 24 hours.
                        </p>
                        <div className="home-pill-row">
                            <span>Reliable</span>
                            <span>Fast</span>
                            <span>Secure</span>
                        </div>
                    </div>

                    <div className="home-stats-grid animate-up delay-100">
                        <div className="home-stat-card">
                            <span className="home-stat-label">Total Paid</span>
                            <strong className="home-stat-value">$10M+</strong>
                        </div>
                        <div className="home-stat-card">
                            <span className="home-stat-label">Processing Time</span>
                            <strong className="home-stat-value">24 hr</strong>
                        </div>
                        <div className="home-stat-card">
                            <span className="home-stat-label">Approval Rate</span>
                            <strong className="home-stat-value">98%</strong>
                        </div>
                        <div className="home-stat-card">
                            <span className="home-stat-label">Satisfaction</span>
                            <strong className="home-stat-value">4.9 / 5</strong>
                        </div>
                    </div>
                </div>
            </section>

            {/* Coverage cards */}
            <section className="section-padding home-coverage">
                <div className="container">
                    <div className="home-section-header">
                        <h2>Our Coverage</h2>
                        <Link to="/life-insurance" className="home-link">
                            View all plans
                        </Link>
                    </div>

                    <div className="card-grid">
                        <Link to="/auto-insurance" className="card home-coverage-card animate-up">
                            <div className="card-icon">
                                <Car size={28} />
                            </div>
                            <h3>Auto Insurance</h3>
                            <p>
                                Comprehensive coverage for your vehicle with 24/7 roadside
                                assistance and transparent repairs.
                            </p>
                        </Link>

                        <Link to="/health-insurance" className="card home-coverage-card animate-up delay-100">
                            <div className="card-icon">
                                <Shield size={28} />
                            </div>
                            <h3>Health Insurance</h3>
                            <p>
                                Flexible medical plans covering regular checkups, emergencies,
                                and everything in between.
                            </p>
                        </Link>

                        <Link to="/life-insurance" className="card home-coverage-card animate-up delay-200">
                            <div className="card-icon">
                                <Heart size={28} />
                            </div>
                            <h3>Life Insurance</h3>
                            <p>
                                Long‑term protection built to secure your family’s financial
                                future in every scenario.
                            </p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section-padding home-testimonials">
                <div className="container">
                    <div className="text-center animate-up">
                        <h2>What our clients say</h2>
                        <p>Trusted by thousands of families and businesses across Europe.</p>
                    </div>

                    <div className="home-testimonial-grid">
                        {[
                            {
                                name: 'Sarah Jenkins',
                                role: 'Business Owner',
                                quote:
                                    '“The claims process was incredibly fast. I felt supported every step of the way — it never felt like I was dealing with a big corporation.”',
                            },
                            {
                                name: 'Marcus Reid',
                                role: 'Freelancer',
                                quote:
                                    '“Finally, an insurance company that doesn’t hide behind jargon. Transparent pricing and no surprise exclusions.”',
                            },
                            {
                                name: 'Elena Gomez',
                                role: 'Architect',
                                quote:
                                    '“Professional, reliable, and modern. My auto claim was handled within 24 hours, exactly as promised.”',
                            },
                        ].map((item, idx) => (
                            <article key={item.name} className={`home-testimonial-card animate-up ${idx === 1 ? 'delay-100' : idx === 2 ? 'delay-200' : ''}`}>
                                <div className="home-testimonial-header">
                                    <div className="home-avatar" />
                                    <div>
                                        <h3>{item.name}</h3>
                                        <p className="home-testimonial-role">{item.role}</p>
                                    </div>
                                </div>
                                <div className="home-stars">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} size={16} fill="#facc15" color="#facc15" />
                                    ))}
                                </div>
                                <p className="home-testimonial-quote">{item.quote}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ preview */}
            <section className="section-padding home-faq">
                <div className="container">
                    <h2 className="text-center">Common questions</h2>
                    <div className="home-faq-grid">
                        <div className="home-faq-item">
                            <h3>How do I file a claim?</h3>
                            <p>
                                You can file a claim through our online portal or by calling our 24/7
                                hotline. Most valid claims are processed within 24 hours.
                            </p>
                        </div>
                        <div className="home-faq-item">
                            <h3>Can I cancel my policy?</h3>
                            <p>
                                Yes. You can cancel at any time with no hidden penalties. We
                                calculate refunds on a pro‑rata basis.
                            </p>
                        </div>
                        <div className="home-faq-item">
                            <h3>Are multi‑policy discounts available?</h3>
                            <p>
                                Bundling auto, health, and life insurance can save you up to 15% on
                                total premiums.
                            </p>
                        </div>
                        <div className="home-faq-item">
                            <h3>Do you support online servicing?</h3>
                            <p>
                                Absolutely. Manage policies, download documents, and track claims
                                entirely online.
                            </p>
                        </div>
                    </div>

                    <div className="text-center" style={{ marginTop: '2.5rem' }}>
                        <Link to="/faqs" className="home-link">
                            View all FAQs
                        </Link>
                    </div>
                </div>
            </section>

            {/* Get in touch preview */}
            <section className="section-padding home-contact">
                <div className="container home-contact-grid">
                    <div className="home-contact-copy animate-up">
                        <h2>Get in Touch</h2>
                        <p>
                            Have questions about coverage or claims? Our team is available around
                            the clock to guide you.
                        </p>
                        <ul>
                            <li><strong>Phone:</strong> +44 20 1234 5678</li>
                            <li><strong>Email:</strong> support@trustwave.eu</li>
                            <li><strong>Office:</strong> 10 Downing St, London, UK</li>
                        </ul>
                        <Link to="/contact" className="btn btn-primary">
                            Talk to an expert
                        </Link>
                    </div>

                    <div className="home-contact-card animate-up delay-100">
                        <h3>Request a callback</h3>
                        <p>Share a few details and an advisor will call you back within one business day.</p>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                alert('Callback request submitted. (Hook this up to backend when ready.)');
                            }}
                        >
                            <input className="form-input" placeholder="Full name" required />
                            <input className="form-input" placeholder="Phone number" required />
                            <input className="form-input" placeholder="Email (optional)" />
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.75rem' }}>
                                Request callback
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
