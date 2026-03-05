import React, { ReactNode, useState } from 'react';
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
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const isActive = (path: string) => location.pathname === path ? 'active' : '';

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="nav-brand" onClick={closeMenu}>
                    <Shield className="text-primary" />
                    SecureLife
                </Link>
                <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
                    {isOpen ? <X /> : <Menu />}
                </button>
                <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <li><Link to="/" className={isActive('/')} onClick={closeMenu}>Home</Link></li>
                    <li><Link to="/life-insurance" className={isActive('/life-insurance')} onClick={closeMenu}>Life Insurance</Link></li>
                    <li><Link to="/auto-insurance" className={isActive('/auto-insurance')} onClick={closeMenu}>Auto Insurance</Link></li>
                    <li><Link to="/health-insurance" className={isActive('/health-insurance')} onClick={closeMenu}>Health Insurance</Link></li>
                    <li><Link to="/faqs" className={isActive('/faqs')} onClick={closeMenu}>FAQs</Link></li>
                    <li><Link to="/about-us" className={isActive('/about-us')} onClick={closeMenu}>About Us</Link></li>
                    <li><Link to="/contact" className={isActive('/contact')} onClick={closeMenu}>Contact</Link></li>
                </ul>
            </div>
        </nav>
    );
};

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-col">
                        <Link to="/" className="nav-brand" style={{ color: 'white', marginBottom: '1.5rem', display: 'inline-flex' }}>
                            <Shield />
                            SecureLife
                        </Link>
                        <p style={{ color: '#94a3b8', fontSize: '1rem' }}>Providing peace of mind through comprehensive insurance coverage tailored for you and your family.</p>
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
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 SecureLife Insurance. All rights reserved.</p>
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
