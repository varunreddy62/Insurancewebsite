import React from 'react';
import { Shield, Users, Target, Clock, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
    return (
        <>
            <div className="page-header" style={{ paddingBottom: '10rem' }}>
                <div className="container animate-up">
                    <h1>About SecureLife</h1>
                    <p style={{ fontSize: '1.25rem' }}>A legacy of trust, stability, and unwavering commitment to protecting families across the nation.</p>
                </div>
            </div>

            <section className="section-padding" style={{ marginTop: '-8rem' }}>
                <div className="container">
                    <div className="card animate-up" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                        <h2 style={{ color: 'var(--primary-dark)', marginBottom: '1.5rem' }}>Our Mission</h2>
                        <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto', color: 'var(--text-main)' }}>
                            To provide accessible, comprehensive, and transparent insurance solutions that empower individuals and families to live fearlessly, knowing their future is secure.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section-padding" style={{ background: 'var(--white)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                        <div className="animate-up">
                            <img
                                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800"
                                alt="Our specialized team"
                                style={{ width: '100%', borderRadius: 'var(--border-radius)', boxShadow: 'var(--card-shadow)' }}
                            />
                        </div>

                        <div className="animate-up delay-200">
                            <h2 style={{ color: 'var(--primary-dark)' }}>Decades of Excellence</h2>
                            <p>Founded in 1998, SecureLife started with a simple belief: insurance shouldn't be confusing, and it shouldn't just be a transaction. It should be a lifelong partnership.</p>
                            <p>Over the past 25 years, we have grown from a small regional office to a nationwide provider, trusted by over 2 million policyholders. Despite our growth, we maintain the personalized, human touch that defined our early years.</p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '3rem' }}>
                                <div>
                                    <h3 style={{ color: 'var(--primary)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>2M+</h3>
                                    <p style={{ margin: 0 }}>Happy Clients</p>
                                </div>
                                <div>
                                    <h3 style={{ color: 'var(--primary)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>$1B+</h3>
                                    <p style={{ margin: 0 }}>Claims Paid</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <h2 className="text-center animate-up" style={{ marginBottom: '3rem' }}>Our Core Values</h2>

                    <div className="card-grid">
                        <div className="card animate-up">
                            <div className="card-icon" style={{ background: 'rgba(14, 165, 233, 0.1)', color: 'var(--secondary)' }}>
                                <Shield />
                            </div>
                            <h3>Integrity</h3>
                            <p>We operate with absolute transparency. No hidden fees, no confusing jargon, just honest protection.</p>
                        </div>

                        <div className="card animate-up delay-100">
                            <div className="card-icon" style={{ background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary)' }}>
                                <Users />
                            </div>
                            <h3>Empathy</h3>
                            <p>Behind every policy is a person. We treat our clients with the compassion and respect they deserve.</p>
                        </div>

                        <div className="card animate-up delay-200">
                            <div className="card-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--accent)' }}>
                                <Trophy />
                            </div>
                            <h3>Excellence</h3>
                            <p>We continuously innovate our coverage options to ensure we're offering the best protection in the market.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding" style={{ background: 'var(--primary-dark)', color: 'white' }}>
                <div className="container text-center animate-up">
                    <h2 style={{ color: 'white', marginBottom: '2rem' }}>Experience the SecureLife difference</h2>
                    <Link to="/contact" className="btn btn-primary" style={{ background: 'var(--accent)', color: 'var(--text-main)' }}>Get in Touch</Link>
                </div>
            </section>
        </>
    );
};

export default AboutUs;
