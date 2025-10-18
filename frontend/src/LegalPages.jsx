// ============================================
// CRITICAL LEGAL PAGES FOR PEER SUPPORT PLATFORM
// These disclaimers are ESSENTIAL for Google Play approval
// ============================================

import React from 'react';

// Terms and Conditions Component - UPDATED
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
        
        {/* CRITICAL DISCLAIMER BOX */}
        <div style={{
          background: '#fef2f2',
          border: '3px solid #dc2626',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            color: '#dc2626',
            fontSize: '1.3rem',
            marginBottom: '1rem',
            fontWeight: 'bold'
          }}>
            ⚠️ CRITICAL DISCLAIMER
          </h2>
          <div style={{ color: '#991b1b', lineHeight: '1.7' }}>
            <p style={{ marginBottom: '0.75rem', fontWeight: '600' }}>
              FeelingsShare is a PEER SUPPORT PLATFORM, NOT a professional mental health service:
            </p>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
              <li>This is NOT professional therapy, counseling, or medical advice</li>
              <li>Supporters are VOLUNTEERS, not licensed mental health professionals</li>
              <li>NOT for crisis situations - Call 112 or crisis helplines immediately</li>
              <li>No doctor-patient or therapist-client relationship is created</li>
              <li>NOT a substitute for professional mental health care</li>
            </ul>
            <p style={{ fontWeight: '600' }}>
              By using this platform, you acknowledge these limitations and agree to seek professional help when needed.
            </p>
          </div>
        </div>
        
        <div style={{ color: '#4b5563', lineHeight: '1.8', fontSize: '1rem' }}>
          <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>1. Acceptance of Terms</h2>
          <p>By accessing and using FeelingsShare.com, you accept and agree to be bound by these terms. If you do not agree, please do not use our platform.</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>2. Service Description</h2>
          <p>FeelingsShare provides peer-to-peer emotional support through an online platform connecting users with volunteer listeners. Our services are for general emotional support and are NOT professional mental health services.</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>3. User Eligibility</h2>
          <ul>
            <li>You must not be in a mental health crisis requiring professional intervention</li>
            <li>You acknowledge this is peer support, not professional therapy</li>
          </ul>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>4. User Responsibilities</h2>
          <ul>
            <li>Provide accurate information during registration</li>
            <li>Maintain confidentiality of your account credentials</li>
            <li>Use the service respectfully and appropriately</li>
            <li>Seek professional help for mental health crises or serious conditions</li>
            <li>Understand that supporters are volunteers, not professionals</li>
          </ul>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>5. Emergency Situations</h2>
          <p style={{ color: '#dc2626', fontWeight: '600' }}>
            This platform is NOT for emergencies. If you are experiencing a mental health crisis, suicidal thoughts, 
            or immediate danger, contact:
          </p>
          <ul style={{ color: '#dc2626' }}>
            <li>Emergency Services: 112</li>
            <li>KIRAN Mental Health Helpline: 1800-599-0019</li>
            <li>AASRA Suicide Prevention: 91-22-27546669</li>
            <li>Vandrevala Foundation: 1860-2662-345</li>
          </ul>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>6. Privacy and Confidentiality</h2>
          <p>We are committed to protecting your privacy. However, we may be required to disclose information if:</p>
          <ul>
            <li>Required by law</li>
            <li>Necessary to protect user safety or prevent harm</li>
            <li>Related to suspected abuse or danger to self/others</li>
          </ul>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>7. Voluntary Contributions</h2>
          <p>Our platform operates on a voluntary contribution model. Contributions are optional and not payment for professional services. All contributions are non-refundable unless explicitly approved on a case-by-case basis.</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>8. Limitations of Service</h2>
          <p>We do NOT provide:</p>
          <ul>
            <li>Professional mental health diagnosis or treatment</li>
            <li>Crisis intervention services</li>
            <li>Medical or psychiatric advice</li>
            <li>Treatment for severe mental health conditions</li>
            <li>Emergency response services</li>
          </ul>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>9. Disclaimer of Warranties</h2>
          <p>THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. We do not guarantee specific outcomes, therapeutic benefits, or professional-level support. Volunteer listeners provide their best efforts but are not trained mental health professionals.</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>10. Limitation of Liability</h2>
          <p>FeelingsShare and its volunteers shall not be liable for any damages arising from use of the platform, including but not limited to emotional distress, mental health deterioration, or crisis situations. Users assume all risks associated with peer support.</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>11. Termination</h2>
          <p>We reserve the right to terminate access for users who misuse the platform, pose safety risks, or violate these terms.</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>12. Changes to Terms</h2>
          <p>We may modify these terms at any time. Continued use after changes constitutes acceptance of new terms.</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>13. Governing Law</h2>
          <p>These terms are governed by the laws of India. Any disputes shall be resolved in the courts of [Your Jurisdiction].</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>14. Contact Information</h2>
          <p>For questions about these terms, contact: support@feelingsshare.com</p>
          
          <div style={{
            background: '#fef3c7',
            border: '2px solid #f59e0b',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginTop: '2rem'
          }}>
            <p style={{ color: '#92400e', margin: 0, fontWeight: '600' }}>
              By using FeelingsShare, you acknowledge that you have read, understood, and agree to these Terms and Conditions, 
              including the understanding that this is peer support and not professional mental health care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Privacy Policy Component - UPDATED
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
          
          <div style={{
            background: '#eff6ff',
            border: '2px solid #3b82f6',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginBottom: '2rem'
          }}>
            <p style={{ color: '#1e40af', margin: 0 }}>
              <strong>Note:</strong> This is a peer support platform. While we protect your privacy, 
              we do not handle medical records or provide professional healthcare services.
            </p>
          </div>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Information We Collect</h2>
          <p>We collect information you provide directly to us:</p>
          <ul>
            <li>Account information (name, email address, password)</li>
            <li>Conversation content between you and volunteer listeners</li>
            <li>Optional demographic information</li>
            <li>Voluntary contribution/payment information (processed by third parties)</li>
            <li>Technical data (IP address, browser type, device information)</li>
          </ul>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>How We Use Your Information</h2>
          <ul>
            <li>To provide peer support connections and platform services</li>
            <li>To communicate about your conversations and platform updates</li>
            <li>To improve our platform and user experience</li>
            <li>To ensure platform security and prevent abuse</li>
            <li>To comply with legal obligations</li>
          </ul>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Information Sharing</h2>
          <p>We do NOT sell your personal information. We may share information only:</p>
          <ul>
            <li>With your explicit consent</li>
            <li>With volunteer listeners (only conversation content, not personal details)</li>
            <li>To comply with legal obligations</li>
            <li>To protect user safety or prevent harm</li>
            <li>With service providers under strict confidentiality agreements (e.g., payment processors)</li>
          </ul>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Data Security</h2>
          <p>We implement appropriate security measures to protect your information. However, no online platform is 100% secure. We use encryption for conversations and secure storage for account information.</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Data Retention</h2>
          <p>We retain your information only as long as necessary to provide services and comply with legal obligations. You may request deletion of your account and associated data at any time.</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Withdraw consent for data processing</li>
            <li>Export your data</li>
          </ul>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Cookies and Tracking</h2>
          <p>We use essential cookies to provide our services. We do not use tracking cookies for advertising purposes. You can control cookie preferences through your browser settings.</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Third-Party Services</h2>
          <p>We use third-party services for:</p>
          <ul>
            <li>Payment processing (Cashfree for UPI/GPay, PayPal for international) - voluntary contributions only</li>
            <li>Video calling (Google Meet, Zoom) - optional user choice</li>
            <li>Cloud hosting and infrastructure</li>
          </ul>
          <p>These services have their own privacy policies.</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Children's Privacy</h2>
          <p>Our platform is not intended for users under 18. We do not knowingly collect information from minors.</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Data Deletion</h2>
          <p>To request account deletion, contact us at privacy@feelingsshare.com or use the in-app deletion feature. We will process requests within 30 days.</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Contact Us</h2>
          <p>For privacy questions or concerns: privacy@feelingsshare.com</p>
        </div>
      </div>
    </div>
  );
}

// Refund Policy Component - UPDATED
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
          Contribution & Refund Policy
        </h1>
        
        <div style={{ color: '#4b5563', lineHeight: '1.8', fontSize: '1rem' }}>
          <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
          
          <div style={{
            background: '#f0fdf4',
            border: '2px solid #10b981',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginBottom: '2rem'
          }}>
            <p style={{ color: '#166534', margin: 0, fontWeight: '600' }}>
              Important: Contributions on FeelingsShare are voluntary and help support our peer support platform. 
              They are NOT payments for professional services.
            </p>
          </div>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Our Contribution Model</h2>
          <p>FeelingsShare operates on a voluntary contribution model where:</p>
          <ul>
            <li>You receive peer support BEFORE deciding to contribute</li>
            <li>Contribution amount is entirely your choice (including zero)</li>
            <li>Contributions support platform maintenance and volunteer coordination</li>
            <li>No obligation to contribute if you cannot afford it</li>
          </ul>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Ending Conversations</h2>
          <p>You may end a conversation at any time for any reason. There are no penalties or fees for ending early.</p>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Contribution Refunds</h2>
          <p>Since contributions are made voluntarily after receiving peer support:</p>
          <ul>
            <li>You only contribute after experiencing the platform</li>
            <li>Contribution amount is entirely your choice</li>
            <li>If unsatisfied, you may choose to contribute nothing</li>
            <li>Refunds for voluntary contributions will be considered case-by-case</li>
          </ul>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Refund Request Process</h2>
          <p>If you believe you deserve a refund after making a voluntary contribution:</p>
          <ol>
            <li>Contact support@feelingsshare.com within 7 days</li>
            <li>Explain your concerns and reasons for the refund request</li>
            <li>We will review your case and respond within 3-5 business days</li>
            <li>Approved refunds will be processed within 7-10 business days</li>
          </ol>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Technical Issues</h2>
          <p>If technical problems prevent conversation completion:</p>
          <ul>
            <li>We will attempt immediate resolution</li>
            <li>Alternative communication methods may be offered</li>
            <li>Conversations may be rescheduled at your convenience</li>
            <li>No contribution expected for incomplete conversations due to technical failures</li>
          </ul>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Volunteer Conduct Issues</h2>
          <p>If you experience inappropriate behavior or ethical violations:</p>
          <ul>
            <li>Report immediately to support@feelingsshare.com</li>
            <li>We will investigate all complaints thoroughly</li>
            <li>Appropriate corrective actions will be taken</li>
            <li>Full refunds may be provided for verified misconduct</li>
          </ul>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Account Termination</h2>
          <p>You may terminate your account at any time:</p>
          <ul>
            <li>Your data will be handled per our Privacy Policy</li>
            <li>Conversation records retained as required by law</li>
            <li>Pending refund requests will be processed</li>
          </ul>
          
          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Contact Information</h2>
          <p>For refund requests or questions:<br />
          Email: support@feelingsshare.com<br />
          Response time: 24-48 hours</p>
        </div>
      </div>
    </div>
  );
}

// Contact Page Component - UPDATED
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
            We're here to help with questions about our peer support platform
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
                Get help with your account, conversations, or technical issues
              </p>
              <a 
                href="mailto:support@feelingsshare.com" 
                style={{
                  color: '#3b82f6',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
              >
                support@feelingsshare.com
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
                href="mailto:privacy@feelingsshare.com" 
                style={{
                  color: '#10b981',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
              >
                privacy@feelingsshare.com
              </a>
            </div>
          </div>

          {/* Emergency Notice */}
          <div style={{
            background: '#fef2f2',
            borderRadius: '0.75rem',
            padding: '2rem',
            marginBottom: '2rem',
            border: '2px solid #dc2626'
          }}>
            <h3 style={{
              color: '#dc2626',
              fontSize: '1.3rem',
              marginBottom: '1rem',
              textAlign: 'center',
              fontWeight: 'bold'
            }}>
              🆘 In Crisis? Get Immediate Help
            </h3>
            <p style={{
              color: '#991b1b',
              textAlign: 'center',
              marginBottom: '1.5rem',
              fontWeight: '600'
            }}>
              This is a peer support platform, NOT for emergencies. If you're in crisis, contact:
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              <button
                onClick={() => window.open('tel:112')}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                📞 Call 112 (Emergency)
              </button>
              <button
                onClick={() => window.open('tel:18005990019')}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                📞 KIRAN: 1800-599-0019
              </button>
            </div>
          </div>

          {/* Peer Support Access */}
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
              Need Someone to Listen?
            </h3>
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => window.location.href = '/'}
                style={{
                  padding: '0.75rem 2rem',
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Connect with a Listener
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
                  How quickly can I connect with someone?
                </h4>
                <p style={{ color: '#6b7280', margin: 0, lineHeight: '1.6' }}>
                  Our volunteer listeners typically respond within minutes during active hours. 
                  Start a conversation immediately by visiting our homepage.
                </p>
              </div>

              <div style={{
                background: '#f9fafb',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb'
              }}>
                <h4 style={{ color: '#374151', marginBottom: '0.5rem' }}>
                  Is this professional therapy?
                </h4>
                <p style={{ color: '#6b7280', margin: 0, lineHeight: '1.6' }}>
                  No. FeelingsShare is a peer support platform with volunteer listeners, not licensed therapists. 
                  For professional therapy, please consult a licensed mental health professional.
                </p>
              </div>

              <div style={{
                background: '#f9fafb',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb'
              }}>
                <h4 style={{ color: '#374151', marginBottom: '0.5rem' }}>
                  Is my information confidential?
                </h4>
                <p style={{ color: '#6b7280', margin: 0, lineHeight: '1.6' }}>
                  Yes. All conversations are confidential and encrypted. We follow strict privacy standards 
                  and will never share your information without your consent.
                </p>
              </div>

              <div style={{
                background: '#f9fafb',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb'
              }}>
                <h4 style={{ color: '#374151', marginBottom: '0.5rem' }}>
                  What if I can't afford to contribute?
                </h4>
                <p style={{ color: '#6b7280', margin: 0, lineHeight: '1.6' }}>
                  That's completely okay. Contributions are voluntary and optional. 
                  You can access peer support regardless of your financial situation.
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
              For immediate peer support, connect with a listener directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}