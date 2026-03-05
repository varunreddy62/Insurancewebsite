import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
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
                <div className="container">
                    <FadeInUp>
                        <HelpCircle size={44} style={{ margin: '0 auto 1.25rem', opacity: 0.9 }} />
                        <h1>Frequently Asked Questions</h1>
                        <p>We're here to provide clarity. Find answers to common questions about our policies, coverage options, and claims process.</p>
                    </FadeInUp>
                </div>
            </div>

            <section className="section-padding" style={{ background: 'white' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <FadeInUp>
                        <div className="accordion">
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
                                        <ChevronDown className="accordion-icon" size={20} />
                                    </button>
                                    <div className="accordion-content">
                                        <p style={{ marginTop: '0.5rem', marginBottom: 0, lineHeight: 1.7 }}>{faq.answer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FadeInUp>
                </div>
            </section>

            <section className="section-padding" style={{ background: 'var(--bg-color)' }}>
                <div className="container" style={{ maxWidth: '600px' }}>
                    <FadeInUp>
                        <div className="card text-center" style={{ padding: '3rem 2.5rem' }}>
                            <h3 className="text-insurance-primary">Still have questions?</h3>
                            <p>Our licensed insurance agents are ready to help you find the perfect coverage.</p>
                            <Link to="/contact" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>Contact Us</Link>
                        </div>
                    </FadeInUp>
                </div>
            </section>
        </>
    );
};

export default FAQ;
