import React from 'react';

function Footer() {
  return (
    <footer style={{
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '2rem 1rem',
      marginTop: 'auto'
    }}>
      {/* CRITICAL DISCLAIMER BANNER */}
      <div style={{
        background: '#fef2f2',
        color: '#991b1b',
        padding: '1rem',
        borderRadius: '0.5rem',
        marginBottom: '2rem',
        textAlign: 'center',
        border: '2px solid #dc2626'
      }}>
        <strong>⚠️ Peer Support Platform - Not Professional Therapy</strong>
        <br />
        <span style={{ fontSize: '0.875rem' }}>
          For emergencies call <strong>112</strong> or crisis helplines: 
          KIRAN <strong>1800-599-0019</strong>, AASRA <strong>91-22-27546669</strong>
        </span>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        alignItems: 'start'
      }}>
        {/* Brand Section */}
        <div>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: 'white'
          }}>
            FeelingsShare
          </h3>
          <p style={{
            color: 'rgba(255,255,255,0.8)',
            lineHeight: '1.6',
            fontSize: '0.9rem'
          }}>
            A peer support platform connecting you with caring volunteer listeners. 
            Share your feelings in a safe, judgment-free space.
          </p>
          <p style={{
            color: '#fbbf24',
            fontSize: '0.75rem',
            marginTop: '0.5rem',
            fontWeight: '600'
          }}>
            Not professional therapy
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: 'white'
          }}>
            Quick Links
          </h4>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem' }}>
              Share Feelings
            </a>
            <a href="/?about" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem' }}>
              About Us
            </a>
            <a href="/?pricing" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem' }}>
              Contributions
            </a>
            <a href="/?contact" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem' }}>
              Contact Us
            </a>
          </div>
        </div>

        {/* Legal Links */}
        <div>
          <h4 style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: 'white'
          }}>
            Legal & Privacy
          </h4>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <a href="/?terms" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem' }}>
              Terms & Conditions
            </a>
            <a href="/?privacy" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem' }}>
              Privacy Policy
            </a>
            <a href="/?refund" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem' }}>
              Refund Policy
            </a>
          </div>
        </div>

        {/* Emergency Resources */}
        <div>
          <h4 style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#dc2626'
          }}>
            🆘 Crisis Resources
          </h4>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <a 
              href="tel:112" 
              style={{ color: '#fca5a5', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600' }}
            >
              📞 Emergency: 112
            </a>
            <a 
              href="tel:18005990019" 
              style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.85rem' }}
            >
              KIRAN: 1800-599-0019
            </a>
            <a 
              href="tel:912227546669" 
              style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.85rem' }}
            >
              AASRA: 91-22-27546669
            </a>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', margin: '0.5rem 0 0 0' }}>
              24/7 Crisis Support
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.2)',
        marginTop: '2rem',
        paddingTop: '1rem',
        textAlign: 'center'
      }}>
        <p style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: '0.8rem',
          margin: 0
        }}>
          © 2025 FeelingsShare. Peer Support Platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;