import React from 'react';
import { Link } from 'react-router-dom';
import { Car, ShieldCheck, Banknote, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const FadeInUp: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
        {children}
    </motion.div>
);

const AutoInsurance = () => {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <FadeInUp>
                        <Car size={44} style={{ margin: '0 auto 1.25rem', opacity: 0.9 }} />
                        <h1>Auto Insurance Policies</h1>
                        <p>Hit the road with total confidence. We cover everything from fender benders to major accidents so you never drive alone.</p>
                    </FadeInUp>
                </div>
            </div>

            {/* Why Choose Us */}
            <section className="section-padding" style={{ background: 'white' }}>
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <FadeInUp>
                            <img
                                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800"
                                alt="Car coverage"
                                className="w-full rounded-[20px] shadow-lg"
                            />
                        </FadeInUp>

                        <FadeInUp delay={0.2}>
                            <h2 className="text-insurance-primary">Why choose our auto coverage?</h2>
                            <p>State-of-the-art protection built for the modern driver. Keep your premium low and your coverage high, with 24/7 roadside assistance included on all comprehensive plans.</p>
                            <ul className="mt-8 space-y-4" style={{ listStyle: 'none', padding: 0 }}>
                                {[
                                    'Collision and comprehensive coverage options',
                                    'Uninsured motorist protection',
                                    'Rental car reimbursement',
                                    'Accident forgiveness after 3 accident-free years'
                                ].map((benefit, i) => (
                                    <li key={i} className="flex items-start gap-3 text-base text-insurance-textMain">
                                        <ShieldCheck className="text-insurance-accent mt-0.5 shrink-0" size={20} />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </FadeInUp>
                    </div>
                </div>
            </section>

            {/* Coverages */}
            <section className="section-padding" style={{ background: 'var(--bg-color)' }}>
                <div className="container">
                    <FadeInUp>
                        <h2 className="text-center text-insurance-primary mb-2">Our Coverages</h2>
                        <p className="text-center max-w-xl mx-auto">Flexible options to match your driving needs and budget.</p>
                    </FadeInUp>
                    <div className="card-grid">
                        {[
                            { icon: <AlertTriangle size={24} />, title: 'Liability', desc: 'Covers bodily injury and property damage that you cause to others in an accident. Meets all state minimum requirements.' },
                            { icon: <Banknote size={24} />, title: 'Comprehensive', desc: 'Protects your car from events out of your control—like theft, vandalism, weather damage, and hitting an animal.' },
                            { icon: <Car size={24} />, title: 'Collision', desc: 'Pays specifically to repair or replace your vehicle if it is damaged in an accident with another vehicle or object.' },
                        ].map((item, i) => (
                            <FadeInUp key={i} delay={i * 0.1}>
                                <div className="card h-full">
                                    <div className="card-icon">{item.icon}</div>
                                    <h3>{item.title}</h3>
                                    <p style={{ marginBottom: 0 }}>{item.desc}</p>
                                </div>
                            </FadeInUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding" style={{ background: 'var(--primary-dark)', color: 'white' }}>
                <div className="container text-center">
                    <FadeInUp>
                        <h2 className="text-white mb-6">Ready to hit the road safely?</h2>
                        <p className="text-white/80 max-w-lg mx-auto mb-8">Get a competitive quote in minutes and start driving with confidence.</p>
                        <Link to="/contact?type=auto" className="btn" style={{ background: 'var(--accent)', color: 'white' }}>
                            Get Auto Quote
                        </Link>
                    </FadeInUp>
                </div>
            </section>
        </>
    );
};

export default AutoInsurance;
