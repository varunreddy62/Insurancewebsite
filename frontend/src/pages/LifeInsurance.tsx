import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, CheckCircle2, ShieldAlert, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';

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

const LifeInsurance = () => {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <FadeInUp>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.9 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Heart size={44} style={{ margin: '0 auto 1.25rem' }} />
                        </motion.div>
                        <h1>Life Insurance Solutions</h1>
                        <p>Protecting what matters most because life is unpredictable. Ensure your family's financial stability no matter what happens.</p>
                    </FadeInUp>
                </div>
            </div>

            {/* Why Choose Us */}
            <section className="section-padding" style={{ background: 'white' }}>
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <FadeInUp>
                            <h2 className="text-insurance-primary">Why choose our life insurance?</h2>
                            <p>We understand that every family has unique needs and financial goals. Our life insurance policies are designed to offer flexible, affordable, and comprehensive protection.</p>
                            <ul className="mt-8 space-y-4" style={{ listStyle: 'none', padding: 0 }}>
                                {[
                                    'Tax-free death benefit for your beneficiaries',
                                    'Flexible premium payment options',
                                    'Living benefits for chronic or terminal illness',
                                    'Convertible term policies to permanent coverage'
                                ].map((benefit, i) => (
                                    <motion.li
                                        key={i}
                                        className="flex items-start gap-3 text-base text-insurance-textMain"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.1 }}
                                    >
                                        <motion.span whileHover={{ scale: 1.1, rotate: 3 }} transition={{ duration: 0.2 }}>
                                            <CheckCircle2 className="text-insurance-accent mt-0.5 shrink-0" size={20} />
                                        </motion.span>
                                        {benefit}
                                    </motion.li>
                                ))}
                            </ul>
                        </FadeInUp>

                        <FadeInUp delay={0.2}>
                            <Parallax speed={-5}>
                                <img
                                    src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800"
                                    alt="Family planning"
                                    className="w-full rounded-[20px] shadow-lg"
                                />
                            </Parallax>
                        </FadeInUp>
                    </div>
                </div>
            </section>

            {/* Coverages */}
            <section className="section-padding" style={{ background: 'var(--bg-color)' }}>
                <div className="container">
                    <FadeInUp>
                        <h2 className="text-center text-insurance-primary mb-2">Our Coverages</h2>
                        <p className="text-center max-w-xl mx-auto">Choose the right level of protection for your unique life stage and financial goals.</p>
                    </FadeInUp>
                    <div className="card-grid">
                        {[
                            { icon: <ShieldAlert size={24} />, title: 'Term Life', desc: 'Affordable coverage for a specific period (10, 20, or 30 years). Ideal for protecting income during your prime working years.' },
                            { icon: <Award size={24} />, title: 'Whole Life', desc: 'Permanent protection that lasts your entire life, building cash value over time that you can borrow against.' },
                            { icon: <Heart size={24} />, title: 'Universal Life', desc: 'Permanent coverage with flexible premiums and adjustable death benefits to match your changing life circumstances.' },
                        ].map((item, i) => (
                            <FadeInUp key={i} delay={i * 0.1}>
                                <motion.div
                                    className="card h-full"
                                    whileHover={{ y: -6, scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <motion.div className="card-icon" whileHover={{ scale: 1.1, rotate: 3 }} transition={{ duration: 0.2 }}>
                                        {item.icon}
                                    </motion.div>
                                    <h3>{item.title}</h3>
                                    <p style={{ marginBottom: 0 }}>{item.desc}</p>
                                </motion.div>
                            </FadeInUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding" style={{ background: 'var(--primary-dark)', color: 'white' }}>
                <div className="container text-center">
                    <FadeInUp>
                        <h2 className="text-white mb-6">Get a personalized quote today</h2>
                        <p className="text-white/80 max-w-lg mx-auto mb-8">Our licensed agents will analyze your situation and recommend the perfect coverage amount.</p>
                        <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
                            <Link to="/contact?type=life" className="btn" style={{ background: 'var(--accent)', color: 'white' }}>
                                Calculate My Needs
                            </Link>
                        </motion.span>
                    </FadeInUp>
                </div>
            </section>
        </>
    );
};

export default LifeInsurance;
