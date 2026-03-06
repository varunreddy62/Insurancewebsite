import React, { useState } from 'react';
import { API_BASE } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { Shield, LogIn, Eye, EyeOff } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

const ADMIN_BASE = '/control-panel-x7k9';
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';

const AdminLogin: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!recaptchaToken) {
            setError('Please complete the reCAPTCHA verification.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${API_BASE}/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, recaptchaToken }),
            });
            const data = await res.json();

            if (!res.ok || !data.success) {
                setError(data.message || 'Login failed.');
                setLoading(false);
                // Reset token on failure
                setRecaptchaToken(null);
                return;
            }

            localStorage.setItem('adminToken', data.data.accessToken);
            localStorage.setItem('adminName', data.data.admin.name);
            localStorage.setItem('adminEmail', data.data.admin.email);
            navigate(`${ADMIN_BASE}/dashboard`);
        } catch {
            setError('Network error. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, rgba(248, 250, 252, 1) 0%, rgba(224, 242, 254, 1) 100%)',
            padding: '1rem',
        }}>
            <div style={{
                width: '100%',
                maxWidth: '420px',
                background: 'white',
                borderRadius: '1.25rem',
                padding: '2.5rem 2rem',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.05)',
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        padding: '0.75rem',
                        borderRadius: '1rem',
                        background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                        marginBottom: '1rem',
                    }}>
                        <Shield size={32} color="white" />
                    </div>
                    <h1 style={{ color: '#0f172a', fontSize: '1.5rem', margin: '0.5rem 0 0.25rem' }}>
                        Admin Portal
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>
                        Sign in to manage leads
                    </p>
                </div>

                {error && (
                    <div style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        background: 'rgba(239, 68, 68, 0.15)',
                        color: '#fca5a5',
                        fontSize: '0.875rem',
                        marginBottom: '1.25rem',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', color: '#0f172a', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 500 }}>
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="admin@insurance.com"
                            style={{
                                width: '100%',
                                padding: '0.7rem 1rem',
                                borderRadius: '0.6rem',
                                border: '1px solid #cbd5e1',
                                background: 'white',
                                color: '#0f172a',
                                fontSize: '0.95rem',
                                outline: 'none',
                                boxSizing: 'border-box',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', color: '#0f172a', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 500 }}>
                            Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                style={{
                                    width: '100%',
                                    padding: '0.7rem 2.8rem 0.7rem 1rem',
                                    borderRadius: '0.6rem',
                                    border: '1px solid #cbd5e1',
                                    background: 'white',
                                    color: '#0f172a',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '0.7rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    color: '#64748b',
                                    cursor: 'pointer',
                                    padding: '0.25rem',
                                }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                        <ReCAPTCHA
                            sitekey={RECAPTCHA_SITE_KEY}
                            onChange={(token: string | null) => setRecaptchaToken(token)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '0.6rem',
                            border: 'none',
                            background: loading ? '#475569' : 'linear-gradient(135deg, #2563eb, #7c3aed)',
                            color: 'white',
                            fontSize: '1rem',
                            fontWeight: 600,
                            cursor: loading ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            transition: 'opacity 0.2s',
                        }}
                    >
                        {loading ? 'Signing in...' : <><LogIn size={18} /> Sign In</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
