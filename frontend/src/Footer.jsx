import React from 'react';

function Footer() {
  return (
    <footer style={{
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '2rem 1rem',
      marginTop: 'auto'
    }}>
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
            EhteCounseling
          </h3>
          <p style={{
            color: 'rgba(255,255,255,0.8)',
            lineHeight: '1.6',
            fontSize: '0.9rem'
          }}>
            Compassionate, confidential mental health support with a pay-what-you-can model. 
            Your wellbeing matters more than your wallet.
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
              Start Counseling
            </a>
            <a href="/?about" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem' }}>
              About Us
            </a>
            <a href="/?pricing" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem' }}>
              Pricing
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

        {/* Contact Info */}
        <div>
          <h4 style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: 'white'
          }}>
            Get Support
          </h4>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <a 
              href="mailto:support@ehtecounseling.com" 
              style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem' }}
            >
              support@ehtecounseling.com
            </a>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', margin: '0.5rem 0 0 0' }}>
              Response time: 24-48 hours
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
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '0.8rem',
            margin: 0
          }}>
            © 2025 EhteCounseling. All rights reserved.
          </p>
          
          {/* Emergency Notice */}
          <p style={{
            color: '#fbbf24',
            fontSize: '0.8rem',
            margin: 0,
            fontWeight: '500'
          }}>
            Emergency? Call 112 (National Emergency) or 1056 (Mental Health Helpline)
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;