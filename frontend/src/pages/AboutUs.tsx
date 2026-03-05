import React from 'react';
import { Shield, Users, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
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

const AboutUs = () => {
    return (
        <>
            <div className="page-header" style={{ paddingBottom: '8rem' }}>
                <div className="container">
                    <FadeInUp>
                        <h1>About SecureLife</h1>
                        <p style={{ fontSize: '1.25rem' }}>A legacy of trust, stability, and unwavering commitment to protecting families across the nation.</p>
                    </FadeInUp>
                </div>
            </div>

            {/* Mission Card */}
            <section style={{ marginTop: '-5rem', paddingBottom: '4.5rem' }}>
                <div className="container">
                    <FadeInUp>
                        <div className="card text-center" style={{ padding: '3.5rem 2.5rem' }}>
                            <h2 className="text-insurance-primary mb-4">Our Mission</h2>
                            <p className="text-lg max-w-3xl mx-auto text-insurance-textMain" style={{ marginBottom: 0 }}>
                                To provide accessible, comprehensive, and transparent insurance solutions that empower individuals and families to live fearlessly, knowing their future is secure.
                            </p>
                        </div>
                    </FadeInUp>
                </div>
            </section>

            {/* Story Section */}
            <section className="section-padding" style={{ background: 'white' }}>
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <FadeInUp>
                            <img
                                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800"
                                alt="Our specialized team"
                                className="w-full rounded-[20px] shadow-lg"
                            />
                        </FadeInUp>

                        <FadeInUp delay={0.2}>
                            <h2 className="text-insurance-primary">Decades of Excellence</h2>
                            <p>Founded in 1998, SecureLife started with a simple belief: insurance shouldn't be confusing, and it shouldn't just be a transaction. It should be a lifelong partnership.</p>
                            <p>Over the past 25 years, we have grown from a small regional office to a nationwide provider, trusted by over 2 million policyholders. Despite our growth, we maintain the personalized, human touch that defined our early years.</p>

                            <div className="grid grid-cols-2 gap-6 mt-10">
                                <div>
                                    <h3 className="text-insurance-accent text-4xl mb-1">2M+</h3>
                                    <p className="text-insurance-textMuted text-sm" style={{ margin: 0 }}>Happy Clients</p>
                                </div>
                                <div>
                                    <h3 className="text-insurance-accent text-4xl mb-1">$1B+</h3>
                                    <p className="text-insurance-textMuted text-sm" style={{ margin: 0 }}>Claims Paid</p>
                                </div>
                            </div>
                        </FadeInUp>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="section-padding" style={{ background: 'var(--bg-color)' }}>
                <div className="container">
                    <FadeInUp>
                        <h2 className="text-center text-insurance-primary mb-2">Our Core Values</h2>
                        <p className="text-center max-w-xl mx-auto">The principles that guide every decision we make and every policy we write.</p>
                    </FadeInUp>

                    <div className="card-grid">
                        {[
                            { icon: <Shield size={24} />, title: 'Integrity', desc: 'We operate with absolute transparency. No hidden fees, no confusing jargon, just honest protection.' },
                            { icon: <Users size={24} />, title: 'Empathy', desc: 'Behind every policy is a person. We treat our clients with the compassion and respect they deserve.' },
                            { icon: <Trophy size={24} />, title: 'Excellence', desc: "We continuously innovate our coverage options to ensure we're offering the best protection in the market." },
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
                        <h2 className="text-white mb-6">Experience the SecureLife difference</h2>
                        <p className="text-white/80 max-w-lg mx-auto mb-8">Join over 2 million policyholders who trust us with their most important decisions.</p>
                        <Link to="/contact" className="btn" style={{ background: 'var(--accent)', color: 'white' }}>Get in Touch</Link>
                    </FadeInUp>
                </div>
            </section>
        </>
    );
};

export default AboutUs;
