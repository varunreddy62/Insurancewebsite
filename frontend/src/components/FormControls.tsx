import React from 'react';

interface BaseControlProps {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
}

interface InputProps extends BaseControlProps {
  type?: 'text' | 'email' | 'tel' | 'number';
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  name,
  type = 'text',
  value,
  placeholder,
  onChange,
  error,
  required,
}) => (
  <div className="form-group">
    <label className="form-label" htmlFor={name}>
      {label}
      {required ? ' *' : ''}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="form-input"
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${name}-error` : undefined}
    />
    {error ? (
      <p id={`${name}-error`} style={{ color: '#b91c1c', marginTop: '0.25rem', fontSize: '0.875rem' }}>
        {error}
      </p>
    ) : null}
  </div>
);

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends BaseControlProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  error,
  required,
}) => (
  <div className="form-group">
    <label className="form-label" htmlFor={name}>
      {label}
      {required ? ' *' : ''}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="form-input"
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${name}-error` : undefined}
    >
      {placeholder ? (
        <option value="" disabled>
          {placeholder}
        </option>
      ) : null}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error ? (
      <p id={`${name}-error`} style={{ color: '#b91c1c', marginTop: '0.25rem', fontSize: '0.875rem' }}>
        {error}
      </p>
    ) : null}
  </div>
);

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps extends BaseControlProps {
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required,
}) => (
  <div className="form-group">
    <p className="form-label" style={{ marginBottom: '0.5rem' }}>
      {label}
      {required ? ' *' : ''}
    </p>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className="btn btn-secondary"
          style={{
            padding: '0.4rem 1rem',
            borderRadius: '999px',
            borderWidth: value === option.value ? 0 : 1,
            borderStyle: 'solid',
            borderColor: 'rgba(148, 163, 184, 0.6)',
            background: value === option.value ? 'var(--primary)' : '#ffffff',
            color: value === option.value ? '#ffffff' : 'var(--text-main)',
            fontSize: '0.875rem',
          }}
          aria-pressed={value === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
    {error ? (
      <p id={`${name}-error`} style={{ color: '#b91c1c', marginTop: '0.25rem', fontSize: '0.875rem' }}>
        {error}
      </p>
    ) : null}
  </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', disabled, ...rest }) => {
  const baseClasses = 'btn';
  const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  return (
    <button
      className={`${baseClasses} ${variantClass}`}
      disabled={disabled}
      {...rest}
      style={{
        opacity: disabled ? 0.7 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {children}
    </button>
  );
};

interface FormSectionCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const FormSectionCard: React.FC<FormSectionCardProps> = ({ title, description, children }) => (
  <div className="card animate-up" style={{ padding: '1.75rem' }}>
    <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>{title}</h3>
    {description ? (
      <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>{description}</p>
    ) : null}
    {children}
  </div>
);

