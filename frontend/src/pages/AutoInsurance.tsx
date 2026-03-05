import React from 'react';
import { Link } from 'react-router-dom';
import { Car, ShieldCheck, Banknote, AlertTriangle } from 'lucide-react';

const AutoInsurance = () => {
    return (
        <>
            <div className="page-header">
                <div className="container animate-up">
                    <Car size={48} style={{ margin: '0 auto 1.5rem', opacity: 0.9 }} />
                    <h1>Auto Insurance Policies</h1>
                    <p>Hit the road with total confidence. We cover everything from fender benders to major accidents so you never drive alone.</p>
                </div>
            </div>

            <section className="section-padding">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                        <div className="animate-up delay-200" style={{ order: -1 }}>
                            <img
                                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800"
                                alt="Car coverage"
                                style={{ width: '100%', borderRadius: 'var(--border-radius)', boxShadow: 'var(--card-shadow)' }}
                            />
                        </div>

                        <div className="animate-up">
                            <h2 style={{ color: 'var(--primary-dark)' }}>Why choose our auto coverage?</h2>
                            <p>State-of-the-art protection built for the modern driver. Keep your premium low and your coverage high, with 24/7 roadside assistance included on all comprehensive plans.</p>

                            <ul style={{ listStyle: 'none', marginTop: '2rem' }}>
                                {[
                                    'Collision and comprehensive coverage options',
                                    'Uninsured motorist protection',
                                    'Rental car reimbursement',
                                    'Accident forgiveness after 3 accident-free years'
                                ].map((benefit, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '1.125rem' }}>
                                        <ShieldCheck color="var(--primary)" />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </section>

            <section className="section-padding" style={{ background: 'var(--white)' }}>
                <div className="container">
                    <h2 className="text-center" style={{ marginBottom: '3rem' }}>Our Coverages</h2>
                    <div className="card-grid">
                        <div className="card animate-up">
                            <div className="card-icon"><AlertTriangle /></div>
                            <h3>Liability</h3>
                            <p>Covers bodily injury and property damage that you cause to others in an accident. Meets all state minimum requirements.</p>
                        </div>
                        <div className="card animate-up delay-100">
                            <div className="card-icon"><Banknote /></div>
                            <h3>Comprehensive</h3>
                            <p>Protects your car from events out of your control—like theft, vandalism, weather damage, and hitting an animal.</p>
                        </div>
                        <div className="card animate-up delay-200">
                            <div className="card-icon"><Car /></div>
                            <h3>Collision</h3>
                            <p>Pays specifically to repair or replace your vehicle if it is damaged in an accident with another vehicle or object.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding" style={{ background: 'var(--primary-dark)', color: 'white' }}>
                <div className="container text-center animate-up">
                    <h2 style={{ color: 'white', marginBottom: '2rem' }}>Ready to hit the road safely?</h2>
                    <Link
                        to="/contact?type=auto"
                        className="btn btn-primary"
                        style={{ background: 'var(--accent)', color: 'var(--text-main)' }}
                    >
                        Get Auto Quote
                    </Link>
                </div>
            </section>
        </>
    );
};

export default AutoInsurance;
