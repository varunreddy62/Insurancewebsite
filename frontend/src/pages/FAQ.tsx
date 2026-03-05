import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
    {
        question: "How much life insurance do I actually need?",
        answer: "A general rule of thumb is to have a life insurance policy whose death benefit is 10 to 15 times your annual income. However, the exact amount depends on your personal financial situation, debts, mortgage, future education costs for children, and ongoing living expenses."
    },
    {
        question: "What is the difference between Term and Whole Life insurance?",
        answer: "Term life insurance provides coverage for a specific period (like 10, 20, or 30 years) and pays a death benefit only if you die during that term. Whole life insurance provides lifetime coverage and includes a savings component called cash value, which grows over time."
    },
    {
        question: "Does my auto insurance cover rental cars?",
        answer: "In most cases, the coverage limits and deductibles of your personal auto insurance policy apply to a rental car used for personal reasons. However, if you only have liability coverage, it won't cover damage to the rental car itself. We recommend reviewing your specific policy details before declining the rental agency's coverage."
    },
    {
        question: "What happens if I miss a health insurance premium payment?",
        answer: "If you miss a payment, you typically enter a grace period (often 30 days, or 90 days for certain ACA plans). During this time, your coverage remains active. If the premium isn't paid by the end of the grace period, your policy may be canceled, leaving you responsible for any medical bills incurred."
    },
    {
        question: "How quickly can I get an insurance quote?",
        answer: "You can usually get a preliminary quote within minutes by calling our agents or using our online contact form. A finalized, accurate quote depends on factors like your health (for life/health insurance) or driving record (for auto) and may require a brief phone consultation."
    }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <>
            <div className="page-header">
                <div className="container animate-up">
                    <HelpCircle size={48} style={{ margin: '0 auto 1.5rem', opacity: 0.9 }} />
                    <h1>Frequently Asked Questions</h1>
                    <p>We're here to provide clarity. Find answers to common questions about our policies, coverage options, and claims process.</p>
                </div>
            </div>

            <section className="section-padding">
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div className="accordion animate-up">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
                            >
                                <button
                                    className="accordion-header"
                                    onClick={() => toggleAccordion(index)}
                                    aria-expanded={activeIndex === index}
                                >
                                    {faq.question}
                                    <ChevronDown className="accordion-icon" />
                                </button>
                                <div className="accordion-content">
                                    <p style={{ marginTop: '1rem', marginBottom: 0 }}>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center animate-up delay-200" style={{ marginTop: '4rem', padding: '3rem', background: 'var(--white)', borderRadius: 'var(--border-radius)', boxShadow: 'var(--card-shadow)' }}>
                        <h3>Still have questions?</h3>
                        <p>Our licensed insurance agents are ready to help you find the perfect coverage.</p>
                        <Link to="/contact" className="btn btn-primary" style={{ marginTop: '1rem' }}>Contact Us</Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default FAQ;
