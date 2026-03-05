import React, { useEffect, useMemo, useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useLeadFormStore, InsuranceType } from '../store/useLeadFormStore';
import { Input, Select, RadioGroup, Button, FormSectionCard } from '../components/FormControls';

type FieldErrors = Record<string, string>;

const phonePattern = /^[6-9]\d{9}$/;

const Contact: React.FC = () => {
    const [searchParams] = useSearchParams();
    const presetType = searchParams.get('type') as InsuranceType | null;

    const {
        baseFields,
        conditionalFields,
        selectedInsuranceType,
        loading,
        error,
        completed,
        setBaseField,
        setConditionalField,
        setInsuranceType,
        setFromPreset,
        setLoading,
        setError,
        setCompleted,
        reset,
    } = useLeadFormStore();

    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

    useEffect(() => {
        if (presetType) {
            setFromPreset(presetType);
        }
    }, [presetType, setFromPreset]);

    const validate = useMemo(
        () => () => {
            const errors: FieldErrors = {};

            if (!baseFields.fullName.trim()) {
                errors.fullName = 'Full name is required.';
            }

            if (!phonePattern.test(baseFields.mobile.trim())) {
                errors.mobile = 'Enter a valid 10-digit mobile number.';
            }

            if (baseFields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(baseFields.email)) {
                errors.email = 'Enter a valid email address.';
            }

            if (!selectedInsuranceType) {
                errors.insuranceType = 'Please select an insurance type.';
            } else if (selectedInsuranceType === 'auto') {
                const auto = conditionalFields.auto;
                if (!auto.vehicleType) errors.vehicleType = 'Vehicle type is required.';
                if (!auto.vehicleAge) errors.vehicleAge = 'Vehicle age is required.';
                if (!auto.previousPolicy) errors.previousPolicy = 'Select previous policy option.';
                if (!auto.claimHistory) errors.claimHistory = 'Select claim history option.';
            } else if (selectedInsuranceType === 'health') {
                const health = conditionalFields.health;
                if (!health.coverageType) errors.coverageType = 'Select coverage type.';
                if (!health.memberAgeGroup.trim()) errors.memberAgeGroup = 'Age group is required.';
                if (!health.city.trim()) errors.city = 'City is required.';
                if (!health.coverageTier) errors.coverageTier = 'Select coverage preference.';
            } else if (selectedInsuranceType === 'life') {
                const life = conditionalFields.life;
                if (!life.age.trim()) errors.age = 'Age is required.';
                if (!Number.isInteger(Number(life.age)) || Number(life.age) < 18 || Number(life.age) > 70) {
                    errors.age = 'Age must be between 18 and 70.';
                }
                if (!life.annualIncome.trim()) errors.annualIncome = 'Annual income is required.';
                if (Number(life.annualIncome) < 100000) {
                    errors.annualIncome = 'Annual income must be at least ₹1,00,000.';
                }
                if (!life.maritalStatus) errors.maritalStatus = 'Select marital status.';
                if (!life.dependents.trim()) errors.dependents = 'Number of dependents is required.';
                if (!life.smoker) errors.smoker = 'Select smoker status.';
            }

            setFieldErrors(errors);
            return Object.keys(errors).length === 0;
        },
        [baseFields, conditionalFields, selectedInsuranceType]
    );

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validate()) {
            return;
        }

        if (!selectedInsuranceType) {
            return;
        }

        setLoading(true);
        setError(null);

        // Build details based on insurance type
        let details: Record<string, unknown> = {};

        if (selectedInsuranceType === 'auto') {
            const auto = conditionalFields.auto;
            details = {
                vehicleType: auto.vehicleType,
                vehicleAge: auto.vehicleAge,
                previousPolicy: auto.previousPolicy === 'yes',
                claimLastYear: auto.claimHistory === 'yes',
            };
        } else if (selectedInsuranceType === 'health') {
            const health = conditionalFields.health;
            details = {
                coverageFor: health.coverageType,
                ageGroup: health.memberAgeGroup,
                city: health.city,
                condition: health.preExistingDisease || null,
                coveragePreference: health.coverageTier,
            };
        } else if (selectedInsuranceType === 'life') {
            const life = conditionalFields.life;
            details = {
                age: Number(life.age),
                annualIncome: Number(life.annualIncome),
                maritalStatus: life.maritalStatus,
                dependents: Number(life.dependents || '0'),
                smoker: life.smoker === 'yes',
            };
        }

        const body = {
            fullName: baseFields.fullName.trim(),
            mobile: baseFields.mobile.trim(),
            insuranceType: selectedInsuranceType,
            details,
        };

        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data: { success: boolean; message?: string; data?: { id: string } } = await response.json();

            if (!response.ok || !data.success) {
                setError(data.message ?? 'Something went wrong while submitting your details.');
                setLoading(false);
                return;
            }

            setCompleted(true);
        } catch {
            setError('Network error while submitting your details. Please try again.');
            setLoading(false);
            return;
        }

        setLoading(false);
    };

    const showForm = !completed;

    return (
        <>
            <div className="page-header">
                <div className="container animate-up">
                    <Mail size={48} style={{ margin: '0 auto 1.5rem', opacity: 0.9 }} />
                    <h1>Get Your Insurance Consultation</h1>
                    <p>
                        Share a few details and our expert advisors will reach out with tailored
                        quotes for Auto, Health, or Life insurance.
                    </p>
                </div>
            </div>

            <section className="section-padding">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                        <div className="animate-up">
                            <h2 style={{ color: 'var(--primary-dark)', marginBottom: '1.5rem' }}>We’re here to help</h2>
                            <p>
                                Talk to a licensed expert who understands the European insurance landscape. We keep the process
                                simple, transparent, and fully digital.
                            </p>
                            <div style={{ marginTop: '2.5rem', display: 'grid', gap: '1.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem' }}>
                                    <div
                                        style={{
                                            background: 'rgba(37, 99, 235, 0.1)',
                                            padding: '0.9rem',
                                            borderRadius: '999px',
                                            color: 'var(--primary)',
                                        }}
                                    >
                                        <Phone size={22} />
                                    </div>
                                    <div>
                                        <h4 style={{ marginBottom: '0.25rem' }}>Call Us</h4>
                                        <p style={{ margin: 0, color: 'var(--text-main)', fontWeight: 500 }}>+44 20 1234 5678</p>
                                        <p style={{ margin: 0, fontSize: '0.875rem' }}>Mon–Fri, 9:00–18:00 CET</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem' }}>
                                    <div
                                        style={{
                                            background: 'rgba(14, 165, 233, 0.1)',
                                            padding: '0.9rem',
                                            borderRadius: '999px',
                                            color: 'var(--secondary)',
                                        }}
                                    >
                                        <Mail size={22} />
                                    </div>
                                    <div>
                                        <h4 style={{ marginBottom: '0.25rem' }}>Email Us</h4>
                                        <p style={{ margin: 0, color: 'var(--text-main)', fontWeight: 500 }}>support@trustwave.eu</p>
                                        <p style={{ margin: 0, fontSize: '0.875rem' }}>We usually reply within one business day.</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem' }}>
                                    <div
                                        style={{
                                            background: 'rgba(245, 158, 11, 0.1)',
                                            padding: '0.9rem',
                                            borderRadius: '999px',
                                            color: 'var(--accent)',
                                        }}
                                    >
                                        <MapPin size={22} />
                                    </div>
                                    <div>
                                        <h4 style={{ marginBottom: '0.25rem' }}>Visit Us</h4>
                                        <p style={{ margin: 0, color: 'var(--text-main)', fontWeight: 500 }}>10 Downing St</p>
                                        <p style={{ margin: 0, fontSize: '0.875rem' }}>London, United Kingdom</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="animate-up delay-200">
                            {completed ? (
                                <div
                                    className="card"
                                    style={{
                                        padding: '2rem',
                                        background: '#dcfce7',
                                        color: '#166534',
                                        borderRadius: 'var(--border-radius)',
                                    }}
                                >
                                    <h3 style={{ marginBottom: '0.5rem' }}>Thank you!</h3>
                                    <p style={{ marginBottom: '0.75rem', color: '#166534' }}>
                                        Your details have been shared with our advisory team.
                                    </p>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#166534' }}>
                                        You will receive a call shortly on{' '}
                                        <strong>+91 {baseFields.mobile}</strong> with personalized plan options.
                                    </p>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {error ? (
                                        <div
                                            style={{
                                                padding: '0.9rem 1rem',
                                                borderRadius: '0.75rem',
                                                background: '#fef2f2',
                                                color: '#b91c1c',
                                                fontSize: '0.9rem',
                                            }}
                                        >
                                            {error}
                                        </div>
                                    ) : null}
                                    {showForm ? (
                                        <FormSectionCard
                                            title="Tell us about your needs"
                                            description="Start with the basics, then we’ll ask for a few details depending on your insurance type."
                                        >
                                            <form onSubmit={handleSubmit}>
                                                <Input
                                                    label="Full Name"
                                                    name="fullName"
                                                    value={baseFields.fullName}
                                                    onChange={(event) => setBaseField('fullName', event.target.value)}
                                                    placeholder="Jane Doe"
                                                    required
                                                    error={fieldErrors.fullName}
                                                />
                                                <div
                                                    style={{
                                                        display: 'grid',
                                                        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                                                        gap: '1rem',
                                                    }}
                                                >
                                                    <Input
                                                        label="Mobile Number"
                                                        name="mobile"
                                                        type="tel"
                                                        value={baseFields.mobile}
                                                        onChange={(event) => setBaseField('mobile', event.target.value)}
                                                        placeholder="9876543210"
                                                        required
                                                        error={fieldErrors.mobile}
                                                    />
                                                    <Input
                                                        label="Email (optional)"
                                                        name="email"
                                                        type="email"
                                                        value={baseFields.email}
                                                        onChange={(event) => setBaseField('email', event.target.value)}
                                                        placeholder="you@example.com"
                                                        error={fieldErrors.email}
                                                    />
                                                </div>
                                                <Select
                                                    label="Insurance Type"
                                                    name="insuranceType"
                                                    required
                                                    value={baseFields.insuranceType}
                                                    onChange={(event) =>
                                                        setInsuranceType(event.target.value as InsuranceType)
                                                    }
                                                    options={[
                                                        { value: 'auto', label: 'Auto Insurance' },
                                                        { value: 'health', label: 'Health Insurance' },
                                                        { value: 'life', label: 'Life Insurance' },
                                                    ]}
                                                    placeholder="Select insurance type"
                                                    error={fieldErrors.insuranceType}
                                                />

                                                {selectedInsuranceType === 'auto' ? (
                                                    <div className="animate-up" style={{ marginTop: '1.25rem' }}>
                                                        <h4 style={{ marginBottom: '0.75rem' }}>Auto details</h4>
                                                        <div
                                                            style={{
                                                                display: 'grid',
                                                                gridTemplateColumns:
                                                                    'repeat(auto-fit, minmax(160px, 1fr))',
                                                                gap: '1rem',
                                                            }}
                                                        >
                                                            <Select
                                                                label="Vehicle Type"
                                                                name="vehicleType"
                                                                value={conditionalFields.auto.vehicleType}
                                                                onChange={(event) =>
                                                                    setConditionalField(
                                                                        'auto',
                                                                        'vehicleType',
                                                                        event.target.value
                                                                    )
                                                                }
                                                                required
                                                                options={[
                                                                    { value: '2-wheeler', label: '2-wheeler' },
                                                                    { value: '4-wheeler', label: '4-wheeler' },
                                                                    { value: 'commercial', label: 'Commercial' },
                                                                    { value: 'taxi', label: 'Taxi' },
                                                                ]}
                                                                placeholder="Choose type"
                                                                error={fieldErrors.vehicleType}
                                                            />
                                                            <Select
                                                                label="Vehicle Age"
                                                                name="vehicleAge"
                                                                value={conditionalFields.auto.vehicleAge}
                                                                onChange={(event) =>
                                                                    setConditionalField(
                                                                        'auto',
                                                                        'vehicleAge',
                                                                        event.target.value
                                                                    )
                                                                }
                                                                required
                                                                options={[
                                                                    { value: '0-1 year', label: '0-1 year' },
                                                                    { value: '1-3 years', label: '1-3 years' },
                                                                    { value: '3-5 years', label: '3-5 years' },
                                                                    { value: '5+ years', label: '5+ years' },
                                                                ]}
                                                                placeholder="Select age"
                                                                error={fieldErrors.vehicleAge}
                                                            />
                                                        </div>
                                                        <div
                                                            style={{
                                                                display: 'grid',
                                                                gridTemplateColumns:
                                                                    'repeat(auto-fit, minmax(160px, 1fr))',
                                                                gap: '1rem',
                                                                marginTop: '0.75rem',
                                                            }}
                                                        >
                                                            <RadioGroup
                                                                label="Previous Policy"
                                                                name="previousPolicy"
                                                                value={conditionalFields.auto.previousPolicy}
                                                                onChange={(value) =>
                                                                    setConditionalField(
                                                                        'auto',
                                                                        'previousPolicy',
                                                                        value as 'yes' | 'no' | ''
                                                                    )
                                                                }
                                                                options={[
                                                                    { value: 'yes', label: 'Yes' },
                                                                    { value: 'no', label: 'No' },
                                                                ]}
                                                                required
                                                                error={fieldErrors.previousPolicy}
                                                            />
                                                            <RadioGroup
                                                                label="Claim in last year"
                                                                name="claimHistory"
                                                                value={conditionalFields.auto.claimHistory}
                                                                onChange={(value) =>
                                                                    setConditionalField(
                                                                        'auto',
                                                                        'claimHistory',
                                                                        value as 'yes' | 'no' | ''
                                                                    )
                                                                }
                                                                options={[
                                                                    { value: 'yes', label: 'Yes' },
                                                                    { value: 'no', label: 'No' },
                                                                ]}
                                                                required
                                                                error={fieldErrors.claimHistory}
                                                            />
                                                        </div>
                                                    </div>
                                                ) : null}

                                                {selectedInsuranceType === 'health' ? (
                                                    <div className="animate-up" style={{ marginTop: '1.25rem' }}>
                                                        <h4 style={{ marginBottom: '0.75rem' }}>Health details</h4>
                                                        <RadioGroup
                                                            label="Coverage for"
                                                            name="coverageType"
                                                            value={conditionalFields.health.coverageType}
                                                            onChange={(value) =>
                                                                setConditionalField(
                                                                    'health',
                                                                    'coverageType',
                                                                    value as
                                                                    | 'self'
                                                                    | 'family'
                                                                    | 'parents'
                                                                    | 'self_family'
                                                                    | ''
                                                                )
                                                            }
                                                            options={[
                                                                { value: 'self', label: 'Self' },
                                                                { value: 'family', label: 'Family' },
                                                                { value: 'parents', label: 'Parents' },
                                                                { value: 'self_family', label: 'Self + Family' },
                                                            ]}
                                                            required
                                                            error={fieldErrors.coverageType}
                                                        />
                                                        <div
                                                            style={{
                                                                display: 'grid',
                                                                gridTemplateColumns:
                                                                    'repeat(auto-fit, minmax(160px, 1fr))',
                                                                gap: '1rem',
                                                                marginTop: '0.75rem',
                                                            }}
                                                        >
                                                            <Input
                                                                label="Age group"
                                                                name="memberAgeGroup"
                                                                value={conditionalFields.health.memberAgeGroup}
                                                                onChange={(event) =>
                                                                    setConditionalField(
                                                                        'health',
                                                                        'memberAgeGroup',
                                                                        event.target.value
                                                                    )
                                                                }
                                                                placeholder="e.g. 26–35"
                                                                required
                                                                error={fieldErrors.memberAgeGroup}
                                                            />
                                                            <Input
                                                                label="City"
                                                                name="city"
                                                                value={conditionalFields.health.city}
                                                                onChange={(event) =>
                                                                    setConditionalField(
                                                                        'health',
                                                                        'city',
                                                                        event.target.value
                                                                    )
                                                                }
                                                                placeholder="City name"
                                                                required
                                                                error={fieldErrors.city}
                                                            />
                                                        </div>
                                                        <Input
                                                            label="Pre-existing condition (optional)"
                                                            name="preExistingDisease"
                                                            value={conditionalFields.health.preExistingDisease}
                                                            onChange={(event) =>
                                                                setConditionalField(
                                                                    'health',
                                                                    'preExistingDisease',
                                                                    event.target.value
                                                                )
                                                            }
                                                            placeholder="E.g. diabetes, hypertension"
                                                        />
                                                        <Select
                                                            label="Coverage preference"
                                                            name="coverageTier"
                                                            value={conditionalFields.health.coverageTier}
                                                            onChange={(event) =>
                                                                setConditionalField(
                                                                    'health',
                                                                    'coverageTier',
                                                                    event.target.value as
                                                                    | 'basic'
                                                                    | 'standard'
                                                                    | 'premium'
                                                                    | ''
                                                                )
                                                            }
                                                            required
                                                            options={[
                                                                { value: 'basic', label: 'Basic' },
                                                                { value: 'standard', label: 'Standard' },
                                                                { value: 'premium', label: 'Premium' },
                                                            ]}
                                                            placeholder="Select preference"
                                                            error={fieldErrors.coverageTier}
                                                        />
                                                    </div>
                                                ) : null}

                                                {selectedInsuranceType === 'life' ? (
                                                    <div className="animate-up" style={{ marginTop: '1.25rem' }}>
                                                        <h4 style={{ marginBottom: '0.75rem' }}>Life details</h4>
                                                        <div
                                                            style={{
                                                                display: 'grid',
                                                                gridTemplateColumns:
                                                                    'repeat(auto-fit, minmax(160px, 1fr))',
                                                                gap: '1rem',
                                                            }}
                                                        >
                                                            <Input
                                                                label="Age"
                                                                name="age"
                                                                type="number"
                                                                value={conditionalFields.life.age}
                                                                onChange={(event) =>
                                                                    setConditionalField(
                                                                        'life',
                                                                        'age',
                                                                        event.target.value
                                                                    )
                                                                }
                                                                placeholder="Your age"
                                                                required
                                                                error={fieldErrors.age}
                                                            />
                                                            <Input
                                                                label="Annual income (₹)"
                                                                name="annualIncome"
                                                                type="number"
                                                                value={conditionalFields.life.annualIncome}
                                                                onChange={(event) =>
                                                                    setConditionalField(
                                                                        'life',
                                                                        'annualIncome',
                                                                        event.target.value
                                                                    )
                                                                }
                                                                placeholder="800000"
                                                                required
                                                                error={fieldErrors.annualIncome}
                                                            />
                                                        </div>
                                                        <Select
                                                            label="Marital status"
                                                            name="maritalStatus"
                                                            value={conditionalFields.life.maritalStatus}
                                                            onChange={(event) =>
                                                                setConditionalField(
                                                                    'life',
                                                                    'maritalStatus',
                                                                    event.target.value as
                                                                    | 'single'
                                                                    | 'married'
                                                                    | 'divorced'
                                                                    | 'widowed'
                                                                    | ''
                                                                )
                                                            }
                                                            required
                                                            options={[
                                                                { value: 'single', label: 'Single' },
                                                                { value: 'married', label: 'Married' },
                                                                { value: 'divorced', label: 'Divorced' },
                                                                { value: 'widowed', label: 'Widowed' },
                                                            ]}
                                                            placeholder="Select status"
                                                            error={fieldErrors.maritalStatus}
                                                        />
                                                        <div
                                                            style={{
                                                                display: 'grid',
                                                                gridTemplateColumns:
                                                                    'repeat(auto-fit, minmax(160px, 1fr))',
                                                                gap: '1rem',
                                                                marginTop: '0.75rem',
                                                            }}
                                                        >
                                                            <Input
                                                                label="Number of dependents"
                                                                name="dependents"
                                                                type="number"
                                                                value={conditionalFields.life.dependents}
                                                                onChange={(event) =>
                                                                    setConditionalField(
                                                                        'life',
                                                                        'dependents',
                                                                        event.target.value
                                                                    )
                                                                }
                                                                placeholder="0"
                                                                required
                                                                error={fieldErrors.dependents}
                                                            />
                                                            <RadioGroup
                                                                label="Smoker"
                                                                name="smoker"
                                                                value={conditionalFields.life.smoker}
                                                                onChange={(value) =>
                                                                    setConditionalField(
                                                                        'life',
                                                                        'smoker',
                                                                        value as 'yes' | 'no' | ''
                                                                    )
                                                                }
                                                                options={[
                                                                    { value: 'yes', label: 'Yes' },
                                                                    { value: 'no', label: 'No' },
                                                                ]}
                                                                required
                                                                error={fieldErrors.smoker}
                                                            />
                                                        </div>
                                                    </div>
                                                ) : null}

                                                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
                                                    <Button type="submit" variant="primary" disabled={loading}>
                                                        {loading ? 'Submitting...' : <><Send size={16} /> Submit</>}
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="secondary"
                                                        disabled={loading}
                                                        onClick={() => {
                                                            reset();
                                                            setFieldErrors({});
                                                        }}
                                                    >
                                                        Reset
                                                    </Button>
                                                </div>
                                            </form>
                                        </FormSectionCard>
                                    ) : null}


                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
