import React, { useState } from 'react';
import { Shield, TreePine, LogIn, Award } from 'lucide-react';

interface LoginProps {
  onLogin: (role: string, name: string) => void;
}

const ROLES_DATA = [
  { value: 'PCCF', label: 'Principal Chief Conservator (PCCF)', name: 'Dr. K. Ravichandran, IFS' },
  { value: 'CCF', label: 'Chief Conservator of Forests (CCF)', name: 'Thiru S. Ramasubramanian, IFS' },
  { value: 'DFO', label: 'District Forest Officer (DFO)', name: 'Tmt. M. Anbarasi, IFS (Nilgiris)' },
  { value: 'RFO', label: 'Range Forest Officer (RFO)', name: 'M. Kathiravan (Gudalur)' },
  { value: 'Guard', label: 'Forest Guard', name: 'R. Vignesh (Sathyamangalam)' }
];

export default function Login({ onLogin }: LoginProps) {
  const [selectedRole, setSelectedRole] = useState(ROLES_DATA[0].value);
  const [username, setUsername] = useState('admin.ifs');
  const [password, setPassword] = useState('••••••••');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const match = ROLES_DATA.find(r => r.value === selectedRole);
      if (match) {
        onLogin(match.value, match.name);
      }
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="login-container">
      {/* Left side: Hero Banner */}
      <div className="login-hero-banner" style={{
        background: 'linear-gradient(135deg, #064e3b, #022c22)',
      }}>
        {/* Forest abstract overlay pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.15,
          backgroundImage: `radial-gradient(circle at 20% 30%, #22c55e 0%, transparent 50%), 
                            radial-gradient(circle at 80% 70%, #0ea5e9 0%, transparent 50%)`,
          pointerEvents: 'none'
        }} />
        
        {/* SVGs representing forest canopies */}
        <div style={{
          position: 'absolute',
          bottom: '-50px',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'flex-end',
          opacity: 0.25,
          pointerEvents: 'none'
        }}>
          {[...Array(6)].map((_, i) => (
            <svg key={i} width="220" height="300" viewBox="0 0 100 100" fill="none" style={{
              transform: `translateY(${i % 2 === 0 ? '20px' : '0px'}) scale(${0.8 + i * 0.1})`
            }}>
              <path d="M50 10 L85 85 L15 85 Z" fill="#10b981" />
              <path d="M50 25 L80 85 L20 85 Z" fill="#047857" />
              <rect x="46" y="85" width="8" height="15" fill="#78350f" />
            </svg>
          ))}
        </div>

        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', zIndex: 10 }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <TreePine size={32} color="#4ade80" />
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', color: '#4ade80', textTransform: 'uppercase' }}>
              Government of Tamil Nadu
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '0.02em' }}>
              Forest Department
            </div>
          </div>
        </div>

        {/* Middle Brand Info */}
        <div style={{ zIndex: 10, maxWidth: '520px', margin: 'auto 0' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(74, 222, 128, 0.1)',
            border: '1px solid rgba(74, 222, 128, 0.2)',
            fontSize: '12px',
            fontWeight: 600,
            color: '#4ade80',
            marginBottom: '20px'
          }}>
            <Award size={14} /> State Digital Mission Innovation Pilot
          </div>
          <h1 style={{ fontSize: '42px', fontWeight: 800, lineHeight: '1.2', marginBottom: '16px' }}>
            Project VanamAI
          </h1>
          <p style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: '1.6' }}>
            AI-Powered Smart Forest Management & Decision Support Platform. Empowering wildlife telemetry, risk prediction modeling, and real-time response automation.
          </p>
        </div>

        {/* Bottom copyright/version */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', zIndex: 10 }}>
          <span>© 2026 Tamil Nadu Forest Department Digital Mission.</span>
          <span>v2.1 Enterprise Sandbox</span>
        </div>
      </div>

      {/* Right side: Login Card */}
      <div className="login-card-container">
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>Secure System Sign-In</h2>
            <p style={{ fontSize: '13px', color: '#64748b', marginTop: '6px' }}>
              Authorized Departmental Officers only. Session logging active.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Role selection */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Officer Designation</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  outline: 'none',
                  color: '#0f172a',
                  backgroundColor: '#f8fafc'
                }}
              >
                {ROLES_DATA.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Username */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  outline: 'none',
                  color: '#0f172a'
                }}
              />
            </div>

            {/* Password */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Security Credentials</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  outline: 'none',
                  color: '#0f172a'
                }}
              />
            </div>

            {/* Disclaimer check */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '4px' }}>
              <input type="checkbox" defaultChecked required style={{ marginTop: '2px', cursor: 'pointer' }} />
              <span style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.4' }}>
                I agree to the cybersecurity protocols, data privacy guidelines, and access restrictions for government platforms.
              </span>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
              style={{
                padding: '12px',
                borderRadius: '8px',
                marginTop: '10px',
                fontSize: '14px',
                fontWeight: 600
              }}
            >
              {isSubmitting ? (
                <span>Verifying credentials...</span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                  <LogIn size={16} /> Enter VanamAI Portal
                </span>
              )}
            </button>
          </form>

          {/* MFA Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '32px',
            padding: '10px',
            borderRadius: '8px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            fontSize: '11px',
            color: '#64748b'
          }}>
            <Shield size={14} color="#16a34a" /> NIC Secure Multi-Factor Authentication Active
          </div>
        </div>
      </div>
    </div>
  );
}
