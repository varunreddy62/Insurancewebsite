import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Activity, Users, PlusCircle } from 'lucide-react';
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

const HealthInsurance = () => {
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
                            <Shield size={44} style={{ margin: '0 auto 1.25rem' }} />
                        </motion.div>
                        <h1>Health Insurance Options</h1>
                        <p>Prioritize your wellbeing. Get comprehensive health coverage from top providers to ensure you receive the very best medical care without the massive bills.</p>
                    </FadeInUp>
                </div>
            </div>

            {/* Why Choose Us */}
            <section className="section-padding" style={{ background: 'white' }}>
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <FadeInUp>
                            <h2 className="text-insurance-primary">Why our health coverage?</h2>
                            <p>Choosing a health plan is one of the most important decisions you make. We simplify the complex market by offering straightforward, highly-rated plans tailored perfectly to your lifestyle.</p>
                            <ul className="mt-8 space-y-4" style={{ listStyle: 'none', padding: 0 }}>
                                {[
                                    'Access to nationwide hospital networks',
                                    'Low out-of-pocket maximums',
                                    'Coverage for prescriptions and telehealth',
                                    'Free preventative care and wellness perks'
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
                                            <PlusCircle className="text-insurance-accent mt-0.5 shrink-0" size={20} />
                                        </motion.span>
                                        {benefit}
                                    </motion.li>
                                ))}
                            </ul>
                        </FadeInUp>

                        <FadeInUp delay={0.2}>
                            <Parallax speed={-5}>
                                <img
                                    src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800"
                                    alt="Health care services"
                                    className="w-full rounded-[20px] shadow-lg"
                                />
                            </Parallax>
                        </FadeInUp>
                    </div>
                </div>
            </section>

            {/* Plan Tiers */}
            <section className="section-padding" style={{ background: 'var(--bg-color)' }}>
                <div className="container">
                    <FadeInUp>
                        <h2 className="text-center text-insurance-primary mb-2">Plan Tiers</h2>
                        <p className="text-center max-w-xl mx-auto">From basic coverage to premium protection — find the plan that fits your life.</p>
                    </FadeInUp>
                    <div className="card-grid">
                        {[
                            { icon: <Activity size={24} />, title: 'HMO Plans', desc: 'Lower premiums and out-of-pocket costs with a required primary care physician to coordinate all your medical needs.' },
                            { icon: <Users size={24} />, title: 'PPO Plans', desc: 'Maximum flexibility with a larger network of providers. See any doctor without a referral, inside or outside the network.' },
                            { icon: <Shield size={24} />, title: 'HDHP + HSA', desc: 'High deductible plans paired with a tax-advantaged Health Savings Account to grow your money for medical expenses.' },
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
                        <h2 className="text-white mb-6">Your health is an investment</h2>
                        <p className="text-white/80 max-w-lg mx-auto mb-8">Compare plans side by side and find the perfect fit for your healthcare needs.</p>
                        <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
                            <Link to="/contact?type=health" className="btn" style={{ background: 'var(--accent)', color: 'white' }}>
                                Compare Plans Now
                            </Link>
                        </motion.span>
                    </FadeInUp>
                </div>
            </section>
        </>
    );
};

export default HealthInsurance;
