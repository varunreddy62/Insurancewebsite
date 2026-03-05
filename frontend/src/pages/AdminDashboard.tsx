import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Phone, User, Clock, Filter, ChevronDown, ChevronUp, Plus, Trash2, Calendar, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

const ADMIN_BASE = '/control-panel-x7k9';

interface CallLog {
    adminId: string;
    notes: string;
    callStatus: string;
    createdAt: { _seconds: number } | string;
}

interface Lead {
    id: string;
    fullName: string;
    mobile: string;
    insuranceType: string;
    status: string;
    details: Record<string, unknown>;
    callLogs: CallLog[];
    createdAt: { _seconds: number } | string;
}

interface Stats {
    new: number;
    contacted: number;
    converted: number;
    rejected: number;
    total: number;
}

const statusColors: Record<string, { bg: string; text: string }> = {
    new: { bg: '#dbeafe', text: '#1e40af' },
    contacted: { bg: '#fef3c7', text: '#92400e' },
    converted: { bg: '#dcfce7', text: '#166534' },
    rejected: { bg: '#fee2e2', text: '#991b1b' },
};

const formatDate = (ts: { _seconds: number } | string | undefined) => {
    if (!ts) return '—';
    if (typeof ts === 'string') return new Date(ts).toLocaleString('en-IN');
    if (typeof ts === 'object' && '_seconds' in ts)
        return new Date(ts._seconds * 1000).toLocaleString('en-IN');
    return '—';
};

const getToken = () => localStorage.getItem('adminToken');

const authFetch = async (url: string, options: RequestInit = {}) => {
    const token = getToken();
    if (!token) throw new Error('Not authenticated');
    return fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            ...(options.headers || {}),
        },
    });
};

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [leads, setLeads] = useState<Lead[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('');
    const [expandedLead, setExpandedLead] = useState<string | null>(null);
    const [callLogForm, setCallLogForm] = useState<{ leadId: string; notes: string; callStatus: string } | null>(null);
    const [statusUpdateLoading, setStatusUpdateLoading] = useState<string | null>(null);

    // Filters
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [specificDate, setSpecificDate] = useState('');

    const adminName = localStorage.getItem('adminName') || 'Admin';

    const fetchData = useCallback(async () => {
        try {
            const statusQuery = filterStatus ? `?status=${filterStatus}` : '';
            const [leadsRes, statsRes] = await Promise.all([
                authFetch(`/admin/leads${statusQuery}`),
                authFetch('/admin/dashboard'),
            ]);

            if (leadsRes.status === 401 || statsRes.status === 401) {
                localStorage.clear();
                navigate(`${ADMIN_BASE}/login`);
                return;
            }

            const leadsData = await leadsRes.json();
            const statsData = await statsRes.json();

            if (leadsData.success) setLeads(leadsData.data);
            if (statsData.success) setStats(statsData.data);
        } catch {
            console.error('Failed to fetch data');
        }
        setLoading(false);
    }, [filterStatus, navigate]);

    useEffect(() => {
        if (!getToken()) {
            navigate(`${ADMIN_BASE}/login`);
            return;
        }
        fetchData();
    }, [fetchData, navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate(`${ADMIN_BASE}/login`);
    };

    const handleStatusUpdate = async (leadId: string, newStatus: string) => {
        setStatusUpdateLoading(leadId);
        try {
            const res = await authFetch(`/admin/leads/${leadId}/status`, {
                method: 'PATCH',
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.status === 401) { localStorage.clear(); navigate(`${ADMIN_BASE}/login`); return; }
            await fetchData();
        } catch { /* ignore */ }
        setStatusUpdateLoading(null);
    };

    const handleAddCallLog = async () => {
        if (!callLogForm || !callLogForm.notes.trim() || !callLogForm.callStatus.trim()) return;
        try {
            const res = await authFetch(`/admin/leads/${callLogForm.leadId}/call-log`, {
                method: 'POST',
                body: JSON.stringify({ notes: callLogForm.notes, callStatus: callLogForm.callStatus }),
            });
            if (res.status === 401) { localStorage.clear(); navigate(`${ADMIN_BASE}/login`); return; }
            setCallLogForm(null);
            await fetchData();
        } catch { /* ignore */ }
    };

    const handleDeleteLead = async (leadId: string, e: React.MouseEvent) => {
        e.stopPropagation(); // prevent expanding the card
        if (!window.confirm('Are you sure you want to delete this lead permanently? This cannot be undone.')) {
            return;
        }

        try {
            const res = await authFetch(`/admin/leads/${leadId}`, {
                method: 'DELETE',
            });
            if (res.status === 401) { localStorage.clear(); navigate(`${ADMIN_BASE}/login`); return; }
            await fetchData();
        } catch {
            console.error('Failed to delete lead');
        }
    };

    const cardStyle: React.CSSProperties = {
        background: 'white',
        borderRadius: '1rem',
        padding: '1.25rem 1.5rem',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
    };

    // Filter leads by date
    const filteredLeads = leads.filter(lead => {
        if (!lead.createdAt) return true;

        let leadDate: Date;
        if (typeof lead.createdAt === 'string') {
            leadDate = new Date(lead.createdAt);
        } else if (typeof lead.createdAt === 'object' && '_seconds' in lead.createdAt) {
            leadDate = new Date(lead.createdAt._seconds * 1000);
        } else {
            return true;
        }

        // Normalize leadDate to just the date part (local time)
        const dateStr = leadDate.toLocaleDateString('en-CA'); // YYYY-MM-DD format

        if (specificDate) {
            return dateStr === specificDate;
        }

        if (startDate && endDate) {
            return dateStr >= startDate && dateStr <= endDate;
        } else if (startDate) {
            return dateStr >= startDate;
        } else if (endDate) {
            return dateStr <= endDate;
        }

        return true;
    });

    const handleExportExcel = () => {
        if (filteredLeads.length === 0) {
            alert('No leads to export.');
            return;
        }

        const exportData = filteredLeads.map(lead => {
            const date = typeof lead.createdAt === 'string'
                ? new Date(lead.createdAt)
                : typeof lead.createdAt === 'object' && '_seconds' in lead.createdAt
                    ? new Date(lead.createdAt._seconds * 1000)
                    : null;

            return {
                Date: date ? date.toLocaleDateString('en-IN') : '—',
                Time: date ? date.toLocaleTimeString('en-IN') : '—',
                Name: lead.fullName,
                Mobile: lead.mobile,
                Type: lead.insuranceType.toUpperCase(),
                Status: lead.status.toUpperCase(),
                Details: Object.entries(lead.details || {}).map(([k, v]) => `${k}: ${v}`).join(', '),
                'Call Logs': lead.callLogs ? lead.callLogs.length : 0
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');

        const timestamp = new Date().toISOString().slice(0, 10);
        XLSX.writeFile(workbook, `Insurance_Leads_${timestamp}.xlsx`);
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f8fafc',
            color: '#0f172a',
        }}>
            {/* Header */}
            <div style={{
                padding: '1rem 1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #e2e8f0',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(8px)',
                position: 'sticky',
                top: 0,
                zIndex: 10,
            }}>
                <h1 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700 }}>
                    📊 Lead Dashboard
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ color: '#64748b', fontSize: '0.9rem' }}>
                        <User size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                        {adminName}
                    </span>
                    <button onClick={handleLogout} style={{
                        background: 'rgba(239,68,68,0.15)',
                        border: '1px solid rgba(239,68,68,0.3)',
                        color: '#fca5a5',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.85rem',
                    }}>
                        <LogOut size={14} /> Logout
                    </button>
                </div>
            </div>

            <div style={{ padding: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
                {/* Stats Cards */}
                {stats && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '1rem',
                        marginBottom: '1.5rem',
                    }}>
                        {[
                            { label: 'Total', value: stats.total, color: '#60a5fa' },
                            { label: 'New', value: stats.new, color: '#38bdf8' },
                            { label: 'Contacted', value: stats.contacted, color: '#fbbf24' },
                            { label: 'Converted', value: stats.converted, color: '#4ade80' },
                            { label: 'Rejected', value: stats.rejected, color: '#f87171' },
                        ].map((s) => (
                            <div key={s.label} style={{ ...cardStyle, textAlign: 'center' }}>
                                <p style={{ margin: 0, color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</p>
                                <p style={{ margin: '0.35rem 0 0', fontSize: '2rem', fontWeight: 800, color: s.color }}>{s.value}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Filter */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <Filter size={16} color="#94a3b8" />
                    <select
                        value={filterStatus}
                        onChange={(e) => { setFilterStatus(e.target.value); setLoading(true); }}
                        style={{
                            background: 'white',
                            color: '#0f172a',
                            border: '1px solid #cbd5e1',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            fontSize: '0.9rem',
                        }}
                    >
                        <option value="">All Leads</option>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                {/* Date Filters & Export */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', background: 'white', padding: '1rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={16} color="#64748b" />
                        <span style={{ fontSize: '0.9rem', color: '#475569', fontWeight: 500 }}>Date Range:</span>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => { setStartDate(e.target.value); setSpecificDate(''); }}
                            style={{ padding: '0.4rem 0.6rem', border: '1px solid #cbd5e1', borderRadius: '0.4rem', fontSize: '0.85rem' }}
                        />
                        <span style={{ color: '#94a3b8' }}>to</span>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => { setEndDate(e.target.value); setSpecificDate(''); }}
                            style={{ padding: '0.4rem 0.6rem', border: '1px solid #cbd5e1', borderRadius: '0.4rem', fontSize: '0.85rem' }}
                        />
                    </div>

                    <div style={{ width: '1px', height: '24px', background: '#e2e8f0', margin: '0 0.5rem' }}></div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.9rem', color: '#475569', fontWeight: 500 }}>Specific Date:</span>
                        <input
                            type="date"
                            value={specificDate}
                            onChange={(e) => {
                                setSpecificDate(e.target.value);
                                setStartDate('');
                                setEndDate('');
                            }}
                            style={{ padding: '0.4rem 0.6rem', border: '1px solid #cbd5e1', borderRadius: '0.4rem', fontSize: '0.85rem' }}
                        />
                    </div>

                    <div style={{ flex: 1 }}></div>

                    <button
                        onClick={handleExportExcel}
                        style={{
                            background: '#10b981', // emerald-500
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.2)'
                        }}
                    >
                        <Download size={16} /> Export Excel
                    </button>
                </div>

                {/* Leads List */}
                {loading ? (
                    <p style={{ color: '#94a3b8', textAlign: 'center', padding: '3rem' }}>Loading leads...</p>
                ) : leads.length === 0 ? (
                    <div style={{ ...cardStyle, textAlign: 'center', padding: '3rem' }}>
                        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>No leads found.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {filteredLeads.map((lead) => {
                            const isExpanded = expandedLead === lead.id;
                            const sc = statusColors[lead.status] || statusColors.new;
                            return (
                                <div key={lead.id} style={cardStyle}>
                                    <div
                                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                                        onClick={() => setExpandedLead(isExpanded ? null : lead.id)}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                                            <div>
                                                <p style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: '#0f172a' }}>{lead.fullName}</p>
                                                <p style={{ margin: '0.15rem 0 0', color: '#64748b', fontSize: '0.85rem' }}>
                                                    <Phone size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                                                    {lead.mobile}
                                                    <span style={{ margin: '0 0.5rem', opacity: 0.4 }}>•</span>
                                                    {lead.insuranceType.toUpperCase()}
                                                    <span style={{ margin: '0 0.5rem', opacity: 0.4 }}>•</span>
                                                    <Clock size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                                                    {formatDate(lead.createdAt)}
                                                </p>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '999px',
                                                fontSize: '0.75rem',
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                background: sc.bg,
                                                color: sc.text,
                                            }}>
                                                {lead.status}
                                            </span>

                                            <button
                                                onClick={(e) => handleDeleteLead(lead.id, e)}
                                                style={{
                                                    background: 'transparent',
                                                    border: 'none',
                                                    color: '#ef4444',
                                                    cursor: 'pointer',
                                                    padding: '0.25rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: '0.3rem'
                                                }}
                                                title="Delete Lead"
                                            >
                                                <Trash2 size={16} />
                                            </button>

                                            {isExpanded ? <ChevronUp size={18} color="#64748b" /> : <ChevronDown size={18} color="#64748b" />}
                                        </div>
                                    </div>

                                    {isExpanded && (
                                        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                                            {/* Details */}
                                            <div style={{ marginBottom: '1rem' }}>
                                                <h4 style={{ margin: '0 0 0.5rem', color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase' }}>Details</h4>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                    {Object.entries(lead.details || {}).map(([key, val]) => (
                                                        <span key={key} style={{
                                                            padding: '0.25rem 0.6rem',
                                                            borderRadius: '0.4rem',
                                                            background: '#f1f5f9',
                                                            color: '#334155',
                                                            fontSize: '0.8rem',
                                                        }}>
                                                            {key}: <strong>{String(val)}</strong>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Status Update */}
                                            <div style={{ marginBottom: '1rem' }}>
                                                <h4 style={{ margin: '0 0 0.5rem', color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase' }}>Update Status</h4>
                                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                                    {['new', 'contacted', 'converted', 'rejected'].map((s) => (
                                                        <button
                                                            key={s}
                                                            disabled={lead.status === s || statusUpdateLoading === lead.id}
                                                            onClick={() => handleStatusUpdate(lead.id, s)}
                                                            style={{
                                                                padding: '0.3rem 0.7rem',
                                                                borderRadius: '0.4rem',
                                                                border: `1px solid ${statusColors[s].text}`,
                                                                background: lead.status === s ? statusColors[s].bg : 'transparent',
                                                                color: lead.status === s ? statusColors[s].text : '#94a3b8',
                                                                fontSize: '0.8rem',
                                                                fontWeight: 600,
                                                                cursor: lead.status === s ? 'default' : 'pointer',
                                                                textTransform: 'capitalize',
                                                                opacity: lead.status === s ? 1 : 0.7,
                                                            }}
                                                        >
                                                            {s}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Call Logs */}
                                            <div style={{ marginBottom: '1rem' }}>
                                                <h4 style={{ margin: '0 0 0.5rem', color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                                                    Call Logs ({lead.callLogs?.length || 0})
                                                </h4>
                                                {(lead.callLogs || []).map((log, i) => (
                                                    <div key={i} style={{
                                                        padding: '0.5rem 0.75rem',
                                                        background: '#f8fafc',
                                                        border: '1px solid #e2e8f0',
                                                        borderRadius: '0.4rem',
                                                        marginBottom: '0.4rem',
                                                        fontSize: '0.85rem',
                                                    }}>
                                                        <span style={{ color: '#2563eb', fontWeight: 600 }}>{log.callStatus}</span>
                                                        <span style={{ margin: '0 0.4rem', color: '#cbd5e1' }}>|</span>
                                                        <span style={{ color: '#475569' }}>{log.notes}</span>
                                                        <span style={{ float: 'right', color: '#94a3b8', fontSize: '0.75rem' }}>{formatDate(log.createdAt)}</span>
                                                    </div>
                                                ))}
                                                {callLogForm?.leadId === lead.id ? (
                                                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                                                        <select
                                                            value={callLogForm.callStatus}
                                                            onChange={(e) => setCallLogForm({ ...callLogForm, callStatus: e.target.value })}
                                                            style={{
                                                                background: 'white',
                                                                color: '#0f172a',
                                                                border: '1px solid #cbd5e1',
                                                                padding: '0.4rem 0.6rem',
                                                                borderRadius: '0.4rem',
                                                                fontSize: '0.85rem',
                                                            }}
                                                        >
                                                            <option value="">Status...</option>
                                                            <option value="Called">Called</option>
                                                            <option value="No Answer">No Answer</option>
                                                            <option value="Follow Up">Follow Up</option>
                                                            <option value="Interested">Interested</option>
                                                            <option value="Not Interested">Not Interested</option>
                                                        </select>
                                                        <input
                                                            placeholder="Notes..."
                                                            value={callLogForm.notes}
                                                            onChange={(e) => setCallLogForm({ ...callLogForm, notes: e.target.value })}
                                                            style={{
                                                                flex: 1,
                                                                minWidth: '150px',
                                                                background: 'white',
                                                                color: '#0f172a',
                                                                border: '1px solid #cbd5e1',
                                                                padding: '0.4rem 0.6rem',
                                                                borderRadius: '0.4rem',
                                                                fontSize: '0.85rem',
                                                            }}
                                                        />
                                                        <button
                                                            onClick={handleAddCallLog}
                                                            style={{
                                                                background: '#2563eb',
                                                                color: 'white',
                                                                border: 'none',
                                                                padding: '0.4rem 0.8rem',
                                                                borderRadius: '0.4rem',
                                                                cursor: 'pointer',
                                                                fontSize: '0.85rem',
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={() => setCallLogForm(null)}
                                                            style={{
                                                                background: 'transparent',
                                                                color: '#64748b',
                                                                border: '1px solid #cbd5e1',
                                                                padding: '0.4rem 0.6rem',
                                                                borderRadius: '0.4rem',
                                                                cursor: 'pointer',
                                                                fontSize: '0.85rem',
                                                            }}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => setCallLogForm({ leadId: lead.id, notes: '', callStatus: '' })}
                                                        style={{
                                                            background: 'transparent',
                                                            border: '1px dashed #cbd5e1',
                                                            color: '#2563eb',
                                                            padding: '0.35rem 0.7rem',
                                                            borderRadius: '0.4rem',
                                                            cursor: 'pointer',
                                                            fontSize: '0.8rem',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.3rem',
                                                            marginTop: '0.5rem',
                                                        }}
                                                    >
                                                        <Plus size={14} /> Add Call Log
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
