import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, CheckCircle2, ShieldAlert, Award } from 'lucide-react';

const LifeInsurance = () => {
    return (
        <>
            <div className="page-header">
                <div className="container animate-up">
                    <Heart size={48} style={{ margin: '0 auto 1.5rem', opacity: 0.9 }} />
                    <h1>Life Insurance Solutions</h1>
                    <p>Protecting what matters most because life is unpredictable. Ensure your family's financial stability no matter what happens.</p>
                </div>
            </div>

            <section className="section-padding">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                        <div className="animate-up">
                            <h2 style={{ color: 'var(--primary-dark)' }}>Why choose our life insurance?</h2>
                            <p>We understand that every family has unique needs and financial goals. Our life insurance policies are designed to offer flexible, affordable, and comprehensive protection.</p>

                            <ul style={{ listStyle: 'none', marginTop: '2rem' }}>
                                {[
                                    'Tax-free death benefit for your beneficiaries',
                                    'Flexible premium payment options',
                                    'Living benefits for chronic or terminal illness',
                                    'Convertible term policies to permanent coverage'
                                ].map((benefit, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '1.125rem' }}>
                                        <CheckCircle2 color="var(--primary)" />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="animate-up delay-200">
                            <img
                                src="https://images.unsplash.com/photo-1543269664-56d5d517865f?auto=format&fit=crop&q=80&w=800"
                                alt="Family planning"
                                style={{ width: '100%', borderRadius: 'var(--border-radius)', boxShadow: 'var(--card-shadow)' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding" style={{ background: 'var(--white)' }}>
                <div className="container">
                    <h2 className="text-center" style={{ marginBottom: '3rem' }}>Our Coverages</h2>
                    <div className="card-grid">
                        <div className="card animate-up">
                            <div className="card-icon"><ShieldAlert /></div>
                            <h3>Term Life</h3>
                            <p>Affordable coverage for a specific period (10, 20, or 30 years). Ideal for protecting income during your prime working years.</p>
                        </div>
                        <div className="card animate-up delay-100">
                            <div className="card-icon"><Award /></div>
                            <h3>Whole Life</h3>
                            <p>Permanent protection that lasts your entire life, building cash value over time that you can borrow against.</p>
                        </div>
                        <div className="card animate-up delay-200">
                            <div className="card-icon"><Heart /></div>
                            <h3>Universal Life</h3>
                            <p>Permanent coverage with flexible premiums and adjustable death benefits to match your changing life circumstances.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding" style={{ background: 'var(--primary-dark)', color: 'white' }}>
                <div className="container text-center animate-up">
                    <h2 style={{ color: 'white', marginBottom: '2rem' }}>Get a personalized quote today</h2>
                    <Link
                        to="/contact?type=life"
                        className="btn btn-primary"
                        style={{ background: 'var(--accent)', color: 'var(--text-main)' }}
                    >
                        Calculate My Needs
                    </Link>
                </div>
            </section>
        </>
    );
};

export default LifeInsurance;
