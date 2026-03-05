import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Activity, Users, PlusCircle } from 'lucide-react';

const HealthInsurance = () => {
    return (
        <>
            <div className="page-header">
                <div className="container animate-up">
                    <Shield size={48} style={{ margin: '0 auto 1.5rem', opacity: 0.9 }} />
                    <h1>Health Insurance Options</h1>
                    <p>Prioritize your wellbeing. Get comprehensive health coverage from top providers to ensure you receive the very best medical care without the massive bills.</p>
                </div>
            </div>

            <section className="section-padding">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                        <div className="animate-up">
                            <h2 style={{ color: 'var(--primary-dark)' }}>Why our health coverage?</h2>
                            <p>Choosing a health plan is one of the most important decisions you make. We simplify the complex market by offering straightforward, highly-rated plans tailored perfectly to your lifestyle.</p>

                            <ul style={{ listStyle: 'none', marginTop: '2rem' }}>
                                {[
                                    'Access to nationwide hospital networks',
                                    'Low out-of-pocket maximums',
                                    'Coverage for prescriptions and telehealth',
                                    'Free preventative care and wellness perks'
                                ].map((benefit, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '1.125rem' }}>
                                        <PlusCircle color="var(--primary)" />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="animate-up delay-200">
                            <img
                                src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800"
                                alt="Health care services"
                                style={{ width: '100%', borderRadius: 'var(--border-radius)', boxShadow: 'var(--card-shadow)' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding" style={{ background: 'var(--white)' }}>
                <div className="container">
                    <h2 className="text-center" style={{ marginBottom: '3rem' }}>Plan Tiers</h2>
                    <div className="card-grid">
                        <div className="card animate-up">
                            <div className="card-icon"><Activity /></div>
                            <h3>HMO Plans</h3>
                            <p>Lower premiums and out-of-pocket costs with a required primary care physician to coordinate all your medical needs.</p>
                        </div>
                        <div className="card animate-up delay-100">
                            <div className="card-icon"><Users /></div>
                            <h3>PPO Plans</h3>
                            <p>Maximum flexibility with a larger network of providers. See any doctor without a referral, inside or outside the network.</p>
                        </div>
                        <div className="card animate-up delay-200">
                            <div className="card-icon"><Shield /></div>
                            <h3>HDHP + HSA</h3>
                            <p>High deductible plans paired with a tax-advantaged Health Savings Account to grow your money for medical expenses.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-padding" style={{ background: 'var(--primary-dark)', color: 'white' }}>
                <div className="container text-center animate-up">
                    <h2 style={{ color: 'white', marginBottom: '2rem' }}>Your health is an investment</h2>
                    <Link
                        to="/contact?type=health"
                        className="btn btn-primary"
                        style={{ background: 'var(--accent)', color: 'var(--text-main)' }}
                    >
                        Compare Plans Now
                    </Link>
                </div>
            </section>
        </>
    );
};

export default HealthInsurance;
