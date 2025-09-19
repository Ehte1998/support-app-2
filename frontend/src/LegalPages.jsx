import React from 'react';

// Terms and Conditions Component
export function TermsAndConditions() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '1rem',
        padding: '3rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1f2937', marginBottom: '2rem' }}>
          Terms and Conditions
        </h1>
        
        <div style={{ color: '#4b5563', lineHeight: '1.8', fontSize: '1rem' }}>
          <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>1. Acceptance of Terms</h2>
          <p>By accessing and using EhteCounseling.com, you accept and agree to be bound by the terms and provision of this agreement.</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>2. Service Description</h2>
          <p>EhteCounseling provides online mental health counseling services through chat and video sessions. Our services are provided by qualified mental health professionals.</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>3. User Responsibilities</h2>
          <ul>
            <li>You must be at least 18 years old to use our services</li>
            <li>Provide accurate and truthful information during registration</li>
            <li>Maintain the confidentiality of your account credentials</li>
            <li>Use the service in a respectful and appropriate manner</li>
          </ul>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>4. Privacy and Confidentiality</h2>
          <p>We are committed to protecting your privacy and maintaining the confidentiality of your personal and health information in accordance with applicable laws and professional standards.</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>5. Payment Terms</h2>
          <p>Our service operates on a "pay what you feel it's worth" model. Payment is requested after service delivery and is voluntary based on your assessment of the value received.</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>6. Limitations of Service</h2>
          <p>Our services are not intended for emergency situations. If you are experiencing a mental health emergency, please contact emergency services immediately.</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>7. Disclaimer</h2>
          <p>While we strive to provide quality mental health support, we cannot guarantee specific outcomes. Our services supplement but do not replace traditional mental health care.</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>8. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Users will be notified of significant changes.</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>9. Contact Information</h2>
          <p>For questions about these terms, contact us at: support@ehtecounseling.com</p>
        </div>
      </div>
    </div>
  );
}

// Privacy Policy Component
export function PrivacyPolicy() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '1rem',
        padding: '3rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1f2937', marginBottom: '2rem' }}>
          Privacy Policy
        </h1>
        
        <div style={{ color: '#4b5563', lineHeight: '1.8', fontSize: '1rem' }}>
          <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Information We Collect</h2>
          <p>We collect information you provide directly to us, such as:</p>
          <ul>
            <li>Account registration information (name, email address)</li>
            <li>Communication preferences</li>
            <li>Session content and messages (encrypted and confidential)</li>
            <li>Payment information (processed securely through third-party providers)</li>
          </ul>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>How We Use Your Information</h2>
          <ul>
            <li>To provide counseling services and support</li>
            <li>To communicate with you about your sessions</li>
            <li>To improve our services</li>
            <li>To ensure platform security</li>
          </ul>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Information Sharing</h2>
          <p>We do not sell, trade, or otherwise transfer your personal information to third parties, except:</p>
          <ul>
            <li>With your explicit consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect the safety of users or the public</li>
            <li>With service providers who assist in our operations (under strict confidentiality agreements)</li>
          </ul>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Data Security</h2>
          <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Data Retention</h2>
          <p>We retain your personal information only as long as necessary to provide services and comply with legal obligations.</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Withdraw consent for data processing</li>
          </ul>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Cookies and Tracking</h2>
          <p>We use essential cookies to provide our services. We do not use tracking cookies for advertising purposes.</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Contact Us</h2>
          <p>For privacy-related questions or concerns, contact us at: privacy@ehtecounseling.com</p>
        </div>
      </div>
    </div>
  );
}

// Refund Policy Component
export function RefundPolicy() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '1rem',
        padding: '3rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1f2937', marginBottom: '2rem' }}>
          Cancellation & Refund Policy
        </h1>
        
        <div style={{ color: '#4b5563', lineHeight: '1.8', fontSize: '1rem' }}>
          <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Our Unique Payment Model</h2>
          <p>EhteCounseling operates on a "pay what you feel it's worth" model, where payment is requested after service delivery. This approach minimizes the need for traditional refund policies.</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Session Cancellation</h2>
          <p>You may end a counseling session at any time for any reason. There are no penalties or fees for ending a session early.</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Payment Refunds</h2>
          <p>Since payments are made voluntarily after receiving services:</p>
          <ul>
            <li>You only pay after experiencing the service quality</li>
            <li>Payment amount is entirely your choice</li>
            <li>If you're unsatisfied, you may choose to pay nothing</li>
            <li>Refunds for voluntary payments will be considered on a case-by-case basis</li>
          </ul>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Refund Process</h2>
          <p>If you believe you deserve a refund after making a voluntary payment:</p>
          <ol>
            <li>Contact us at support@ehtecounseling.com within 7 days</li>
            <li>Explain your concerns and reasons for the refund request</li>
            <li>We will review your case and respond within 3-5 business days</li>
            <li>Approved refunds will be processed within 7-10 business days</li>
          </ol>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Service Interruptions</h2>
          <p>If technical issues prevent completion of your session:</p>
          <ul>
            <li>We will attempt to resolve the issue immediately</li>
            <li>Alternative communication methods may be offered</li>
            <li>Sessions may be rescheduled at your convenience</li>
            <li>No payment is expected for incomplete sessions due to technical failures</li>
          </ul>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Professional Standards</h2>
          <p>If you experience unprofessional conduct or ethical violations:</p>
          <ul>
            <li>Report the issue immediately to support@ehtecounseling.com</li>
            <li>We will investigate all complaints thoroughly</li>
            <li>Appropriate corrective actions will be taken</li>
            <li>Full refunds may be provided for verified misconduct</li>
          </ul>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Account Termination</h2>
          <p>You may terminate your account at any time. Upon account closure:</p>
          <ul>
            <li>Your personal data will be handled according to our Privacy Policy</li>
            <li>Session records will be retained as required by law</li>
            <li>Any pending refund requests will be processed</li>
          </ul>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Contact Information</h2>
          <p>For refund requests or questions about this policy:</p>
          <p>Email: support@ehtecounseling.com<br />
          Response time: 24-48 hours</p>
        </div>
      </div>
    </div>
  );
}

// Contact Page Component
export function ContactUs() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: 'white',
            margin: '0 0 1rem 0',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            Contact Us
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: '1.6'
          }}>
            We're here to help with any questions or concerns about our counseling services
          </p>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '3rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          {/* Contact Information */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              background: '#f9fafb',
              borderRadius: '0.75rem',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: '#3b82f6',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '1.2rem'
              }}>
                ✉️
              </div>
              <h3 style={{ color: '#1f2937', marginBottom: '0.5rem' }}>Email Support</h3>
              <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.9rem' }}>
                Get help with your account, sessions, or technical issues
              </p>
              <a 
                href="mailto:support@ehtecounseling.com" 
                style={{
                  color: '#3b82f6',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
              >
                support@ehtecounseling.com
              </a>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              background: '#f9fafb',
              borderRadius: '0.75rem',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: '#10b981',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '1.2rem'
              }}>
                🔒
              </div>
              <h3 style={{ color: '#1f2937', marginBottom: '0.5rem' }}>Privacy Concerns</h3>
              <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.9rem' }}>
                Questions about data privacy and confidentiality
              </p>
              <a 
                href="mailto:privacy@ehtecounseling.com" 
                style={{
                  color: '#10b981',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
              >
                privacy@ehtecounseling.com
              </a>
            </div>
          </div>

          {/* Quick Contact Options */}
          <div style={{
            background: '#f0fdf4',
            borderRadius: '0.75rem',
            padding: '2rem',
            marginBottom: '2rem',
            border: '1px solid #bbf7d0'
          }}>
            <h3 style={{
              color: '#166534',
              fontSize: '1.3rem',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              Need Immediate Support?
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              <button
                onClick={() => window.location.href = '/'}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Start Counseling Session
              </button>
              <button
                onClick={() => window.open('tel:112')}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Emergency: Call 112
              </button>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h3 style={{
              color: '#1f2937',
              fontSize: '1.5rem',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              Frequently Asked Questions
            </h3>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{
                background: '#f9fafb',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb'
              }}>
                <h4 style={{ color: '#374151', marginBottom: '0.5rem' }}>
                  How quickly can I get support?
                </h4>
                <p style={{ color: '#6b7280', margin: 0, lineHeight: '1.6' }}>
                  Our counselors typically respond within minutes during business hours. 
                  You can start a session immediately by clicking "Start Counseling Session" on our homepage.
                </p>
              </div>

              <div style={{
                background: '#f9fafb',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb'
              }}>
                <h4 style={{ color: '#374151', marginBottom: '0.5rem' }}>
                  Is my information really confidential?
                </h4>
                <p style={{ color: '#6b7280', margin: 0, lineHeight: '1.6' }}>
                  Yes, absolutely. All communications are encrypted and confidential. 
                  We follow strict privacy standards and will never share your information without your consent.
                </p>
              </div>

              <div style={{
                background: '#f9fafb',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb'
              }}>
                <h4 style={{ color: '#374151', marginBottom: '0.5rem' }}>
                  What if I can't afford to pay?
                </h4>
                <p style={{ color: '#6b7280', margin: 0, lineHeight: '1.6' }}>
                  That's completely okay. Our "pay what you feel it's worth" model means you can access 
                  counseling regardless of your financial situation. Your mental health is our priority.
                </p>
              </div>
            </div>
          </div>

          {/* Response Time Notice */}
          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            background: '#eff6ff',
            borderRadius: '0.5rem',
            border: '1px solid #bfdbfe',
            textAlign: 'center'
          }}>
            <p style={{
              color: '#1e40af',
              margin: 0,
              fontSize: '0.9rem'
            }}>
              <strong>Response Time:</strong> We typically respond to emails within 24-48 hours. 
              For urgent matters, please start a counseling session directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}