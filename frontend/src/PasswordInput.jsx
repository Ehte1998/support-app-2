// PasswordInput Component - Add this to your frontend components
import { useState } from 'react'

function PasswordInput({ 
  value, 
  onChange, 
  placeholder = "Enter password", 
  label = "Password",
  required = false,
  style = {},
  ...props 
}) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div style={{ marginBottom: '1rem', ...style }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: '0.875rem',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '0.5rem'
        }}>
          {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          style={{
            width: '100%',
            padding: '0.75rem',
            paddingRight: '3rem', // Make space for eye icon
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            ...props.inputStyle
          }}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: 'absolute',
            right: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#6b7280',
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.25rem'
          }}
          tabIndex={-1} // Prevent tab focus on this button
        >
          {showPassword ? '🙈' : '👁️'}
        </button>
      </div>
    </div>
  )
}

export default PasswordInput