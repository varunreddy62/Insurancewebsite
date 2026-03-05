import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
    return (
        <div style={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem'
        }}>
            <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                padding: '1.5rem',
                borderRadius: '50%',
                marginBottom: '1.5rem',
                color: '#ef4444'
            }}>
                <AlertCircle size={64} />
            </div>

            <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', color: '#0f172a' }}>
                404
            </h1>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#334155' }}>
                Page Not Found
            </h2>

            <p style={{
                color: '#64748b',
                maxWidth: '450px',
                marginBottom: '2rem',
                fontSize: '1.1rem'
            }}>
                Oops! The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
            </p>

            <Link
                to="/"
                className="btn btn-primary"
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none'
                }}
            >
                <ArrowLeft size={18} />
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
