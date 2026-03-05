import React, { ReactNode, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';

// Pages
import Home from '../pages/Home';
import LifeInsurance from '../pages/LifeInsurance';
import AutoInsurance from '../pages/AutoInsurance';
import HealthInsurance from '../pages/HealthInsurance';
import FAQ from '../pages/FAQ';
import AboutUs from '../pages/AboutUs';
import Contact from '../pages/Contact';
import AdminLogin from '../pages/AdminLogin';
import AdminDashboard from '../pages/AdminDashboard';
import NotFound from '../pages/NotFound';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const linkClass = (path: string) =>
        `nav-link${location.pathname === path ? ' nav-link--active' : ''}`;

    const mobileLinkClass = (path: string) =>
        `navbar-mobile-link${location.pathname === path ? ' navbar-mobile-link--active' : ''}`;

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/life-insurance', label: 'Life Insurance' },
        { to: '/auto-insurance', label: 'Auto Insurance' },
        { to: '/health-insurance', label: 'Health Insurance' },
        { to: '/faqs', label: 'FAQs' },
        { to: '/about-us', label: 'About Us' },
    ];

    return (
        <div className={`navbar-wrapper${scrolled ? ' navbar-wrapper--scrolled' : ''}`}>
            <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
                <Link to="/" className="navbar-logo" onClick={closeMenu}>
                    <Shield size={26} strokeWidth={2.5} style={{ color: 'var(--accent)' }} />
                    SecureLife
                </Link>

                {/* Desktop Menu */}
                <ul className="navbar-links">
                    {navLinks.map(({ to, label }) => (
                        <li key={to}>
                            <Link to={to} className={linkClass(to)} onClick={closeMenu}>
                                {label}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link to="/contact" className="nav-cta" onClick={closeMenu}>
                            Contact
                        </Link>
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button className="navbar-mobile-btn" onClick={toggleMenu} aria-label="Toggle menu">
                    {isOpen ? <X size={26} /> : <Menu size={26} />}
                </button>

                {/* Mobile Menu Dropdown */}
                {isOpen && (
                    <div className="navbar-mobile-menu">
                        {navLinks.map(({ to, label }) => (
                            <Link key={to} to={to} className={mobileLinkClass(to)} onClick={closeMenu}>
                                {label}
                            </Link>
                        ))}
                        <Link to="/contact" className="navbar-mobile-cta" onClick={closeMenu}>
                            Contact
                        </Link>
                    </div>
                )}
            </nav>
        </div>
    );
};

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-col">
                        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white mb-4 no-underline">
                            <Shield size={24} />
                            SecureLife
                        </Link>
                        <p style={{ color: '#94a3b8', fontSize: '0.9375rem', marginBottom: 0 }}>
                            Providing peace of mind through comprehensive insurance coverage tailored for you and your family.
                        </p>
                    </div>
                    <div className="footer-col">
                        <h4>Products</h4>
                        <ul>
                            <li><Link to="/life-insurance">Life Insurance</Link></li>
                            <li><Link to="/auto-insurance">Auto Insurance</Link></li>
                            <li><Link to="/health-insurance">Health Insurance</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Company</h4>
                        <ul>
                            <li><Link to="/about-us">About Us</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                            <li><Link to="/faqs">FAQs</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Contact</h4>
                        <ul>
                            <li style={{ color: '#94a3b8', fontSize: '0.9375rem' }}>+44 20 1234 5678</li>
                            <li style={{ color: '#94a3b8', fontSize: '0.9375rem' }}>support@securelife.eu</li>
                            <li style={{ color: '#94a3b8', fontSize: '0.9375rem' }}>London, United Kingdom</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p style={{ margin: 0 }}>&copy; 2026 SecureLife Insurance. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: '1 0 auto' }}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                {/* Admin Portal — secret routes, no navbar/footer */}
                <Route path="/control-panel-x7k9/login" element={<AdminLogin />} />
                <Route path="/control-panel-x7k9/dashboard" element={<AdminDashboard />} />

                {/* Public site — with Layout */}
                <Route path="*" element={
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/life-insurance" element={<LifeInsurance />} />
                            <Route path="/auto-insurance" element={<AutoInsurance />} />
                            <Route path="/health-insurance" element={<HealthInsurance />} />
                            <Route path="/faqs" element={<FAQ />} />
                            <Route path="/about-us" element={<AboutUs />} />
                            <Route path="/contact" element={<Contact />} />

                            {/* 404 Catch-All inside the Layout */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Layout>
                } />
            </Routes>
        </Router>
    );
}
