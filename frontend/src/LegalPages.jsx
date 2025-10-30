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
          <p>For questions about these terms, contact: ehteshamhusain00@gmail.com</p>

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
export default function PrivacyPolicy() {
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
              <strong>Note:</strong> This is a peer support platform. We provide emotional support conversations
              and do not offer professional medical, mental health, or counseling services. This platform is not a
              substitute for professional care.
            </p>
          </div>

          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Information We Collect</h2>
          <p>We collect information you provide directly to us:</p>
          <ul>
            <li><strong>Account information:</strong> Name, email address, phone number (for payment processing), and password</li>
            <li><strong>Conversation content:</strong> Messages, text, and chat history between you and peer support volunteers</li>
            <li><strong>Media files:</strong> Photos, images, and videos you choose to share in conversations (stored locally on your device)</li>
            <li><strong>Payment information:</strong> Processed by third-party payment providers (we do not store complete payment card details)</li>
            <li><strong>Technical data:</strong> IP address, browser type, device information, operating system, and app usage data</li>
            <li><strong>Optional information:</strong> Demographic information you choose to provide</li>
          </ul>

          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>How We Use Your Information</h2>
          <ul>
            <li>To provide peer support connections and platform services</li>
            <li>To facilitate real-time messaging and communication</li>
            <li>To process voluntary contributions (if you choose to make them)</li>
            <li>To communicate about your conversations and platform updates</li>
            <li>To improve our platform and user experience</li>
            <li>To ensure platform security, prevent abuse, and maintain safety</li>
            <li>To moderate user-generated content and enforce community guidelines</li>
            <li>To comply with legal obligations and respond to legal requests</li>
          </ul>

          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Information Sharing</h2>
          <p>We do NOT sell your personal information to third parties. We may share information only in the following circumstances:</p>
          <ul>
            <li><strong>With your explicit consent:</strong> When you authorize sharing</li>
            <li><strong>With peer support volunteers:</strong> Conversation content only (not personal details like email or phone number)</li>
            <li><strong>With service providers:</strong> Third-party companies under strict confidentiality agreements who help us operate the platform</li>
            <li><strong>For legal compliance:</strong> When required by law, court order, or government request</li>
            <li><strong>To protect safety:</strong> To prevent harm, protect user safety, or investigate violations of our terms</li>
            <li><strong>In business transfers:</strong> If we are involved in a merger, acquisition, or sale of assets</li>
          </ul>

          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Payment Processing</h2>
          <p>When you choose to make a voluntary contribution, payment processing is handled by third-party providers:</p>
          <ul>
            <li><strong>Cashfree Payments</strong> (for UPI/GPay payments in India) - collects name, email, phone number, and payment method details</li>
            <li><strong>PayPal</strong> (for international payments) - collects name, email, and payment information per their privacy policy</li>
          </ul>
          <p>We do NOT store your complete credit card numbers or bank account details. Payment processors are PCI-DSS compliant and have their own privacy policies:</p>
          <ul>
            <li>Cashfree Privacy Policy: <a href="https://www.cashfree.com/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6' }}>https://www.cashfree.com/privacy-policy</a></li>
            <li>PayPal Privacy Policy: <a href="https://www.paypal.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6' }}>https://www.paypal.com/privacy</a></li>
          </ul>

          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Media Files</h2>
          <p>Users can optionally share:</p>
          <ul>
            <li>Photos and images (stored locally on your device)</li>
            <li>Videos with audio (stored locally on your device)</li>
            <li>Media files shared in conversations (temporarily stored for message delivery)</li>
          </ul>
          <p>Media files are stored securely and only accessible to conversation participants. Users can delete shared media at any time. We do not use your media files for any purpose other than delivering them within your conversations.</p>

          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Real-Time Messaging Technology</h2>
          <p>We use Socket.IO technology for instant message delivery. This requires maintaining an active connection while you're using the app. Connection data (IP address, device type) is used solely for delivering messages in real-time and is not stored long-term for tracking purposes.</p>

          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Location Information</h2>
          <p>We do NOT collect, track, or share your precise physical location. Your approximate location (city/country) may be inferred from your IP address for service improvement purposes only, such as optimizing server performance and understanding regional usage patterns.</p>

          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Data Security Measures</h2>
          <p>We take your security seriously and protect your information using:</p>
          <ul>
            <li>TLS/SSL encryption for all data transmission over the internet</li>
            <li>Encrypted storage for passwords using industry-standard bcrypt hashing</li>
            <li>Secure authentication tokens (JWT) with expiration</li>
            <li>Regular security audits and software updates</li>
            <li>Access controls limiting staff access to user data on a need-to-know basis</li>
            <li>Secure server infrastructure with firewalls and intrusion detection</li>
          </ul>
          <p>However, no method of transmission over the internet or electronic storage is 100% secure. While we implement appropriate security measures to protect your information, we cannot guarantee absolute security against all potential threats.</p>

          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>User-Generated Content</h2>
          <p>Messages and content you share in conversations:</p>
          <ul>
            <li>Are visible to your conversation partner (peer support volunteer)</li>
            <li>May be retained for quality assurance, safety, and platform improvement purposes</li>
            <li>Can be reported if they violate our community guidelines or terms of service</li>
            <li>Are subject to moderation to ensure user safety and platform integrity</li>
            <li>Should not include sensitive personal information like social security numbers or complete payment card details</li>
          </ul>
          <p>You retain ownership of your content but grant us a limited, non-exclusive license to transmit, display, and store it as necessary to provide our services.</p>

          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Data Retention</h2>
          <p>We retain your information only as long as necessary to:</p>
          <ul>
            <li>Provide our services to you</li>
            <li>Comply with legal obligations and resolve disputes</li>
            <li>Enforce our agreements and protect our rights</li>
          </ul>
          <p>Conversation records may be retained for up to 90 days after conversation completion for quality assurance. Account information is retained until you request deletion. You may request deletion of your account and associated data at any time by contacting us.</p>

          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Your Rights</h2>
          <p>Depending on your location, you have the right to:</p>
          <ul>
            <li><strong>Access:</strong> Request a copy of your personal information</li>
            <li><strong>Correction:</strong> Correct inaccurate or incomplete information</li>
            <li><strong>Deletion:</strong> Request deletion of your information (subject to legal retention requirements)</li>
            <li><strong>Withdraw consent:</strong> Withdraw consent for data processing where consent is the legal basis</li>
            <li><strong>Data portability:</strong> Export your data in a machine-readable format</li>
            <li><strong>Object:</strong> Object to processing of your information for certain purposes</li>
            <li><strong>Restrict processing:</strong> Request restriction of processing under certain circumstances</li>
          </ul>
          <p>To exercise these rights, contact us at ehteshamhusain00@gmail.com. We will respond within 30 days.</p>

          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Cookies and Tracking</h2>
          <p>We use essential cookies and local storage to:</p>
          <ul>
            <li>Maintain your logged-in session</li>
            <li>Remember your preferences</li>
            <li>Enable core platform functionality</li>
          </ul>
          <p>We do NOT use tracking cookies for advertising or third-party analytics. You can control cookie preferences through your browser settings, though disabling cookies may affect platform functionality.</p>

          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Third-Party Services</h2>
          <p>We integrate with third-party services to provide certain features:</p>
          <ul>
            <li><strong>Payment processing:</strong> Cashfree (UPI/GPay), PayPal - for voluntary contributions only</li>
            <li><strong>Video calling:</strong> Google Meet, Zoom - optional, user choice for video conversations</li>
            <li><strong>Cloud hosting:</strong> For secure infrastructure and data storage</li>
            <li><strong>Email services:</strong> For account verification and important notifications</li>
          </ul>
          <p>These third-party services have their own privacy policies governing how they collect and use data. We encourage you to review their policies.</p>

          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>International Data Transfers</h2>
          <p>Your information may be transferred to, stored, and processed in countries other than your country of residence. These countries may have different data protection laws. When we transfer data internationally, we ensure appropriate safeguards are in place to protect your information in accordance with this privacy policy and applicable law.</p>

          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Children's Privacy</h2>
          <p>Our platform is intended for users aged 13 and above. Users between 13 and 18 should have parental or guardian consent before using our services. We do not knowingly collect information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.</p>
          <p>If you are a parent or guardian and believe your child under 13 has provided us with personal information, please contact us immediately.</p>

          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Account Deletion and Data Removal</h2>
          <p>To request account deletion:</p>
          <ul>
            <li>Email us at ehteshamhusain00@gmail.com with subject "Account Deletion Request"</li>
            <li>Or use the in-app account deletion feature (Settings → Account → Delete Account)</li>
          </ul>
          <p>We will process deletion requests within 30 days. Please note:</p>
          <ul>
            <li>Some information may be retained as required by law or for legitimate business purposes</li>
            <li>Backup copies may persist for a limited time before permanent deletion</li>
            <li>Information shared in conversations may be retained for the other participant's records</li>
          </ul>

          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Changes to This Privacy Policy</h2>
          <p>We may update this privacy policy from time to time to reflect changes in our practices or for legal, regulatory, or operational reasons. We will notify you of any material changes by:</p>
          <ul>
            <li>Posting the new policy on this page with an updated "Last updated" date</li>
            <li>Sending an email notification to your registered email address for significant changes</li>
            <li>Displaying a prominent notice in the app</li>
          </ul>
          <p>Your continued use of the platform after changes are posted constitutes your acceptance of the updated policy. We encourage you to review this policy periodically.</p>

          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Legal Basis for Processing (GDPR)</h2>
          <p>For users in the European Economic Area (EEA), we process your personal information based on:</p>
          <ul>
            <li><strong>Contract:</strong> To provide services you've requested</li>
            <li><strong>Consent:</strong> When you've given explicit consent</li>
            <li><strong>Legitimate interests:</strong> To improve our services, ensure security, and prevent fraud</li>
            <li><strong>Legal obligation:</strong> To comply with applicable laws and regulations</li>
          </ul>

          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>California Privacy Rights (CCPA)</h2>
          <p>California residents have additional rights under the California Consumer Privacy Act:</p>
          <ul>
            <li>Right to know what personal information is collected</li>
            <li>Right to know if personal information is sold or disclosed</li>
            <li>Right to opt-out of sale of personal information (we do not sell personal information)</li>
            <li>Right to deletion of personal information</li>
            <li>Right to non-discrimination for exercising privacy rights</li>
          </ul>

          <h2 style={{ color: '#1f2937', marginTop: '2rem' }}>Contact Us</h2>
          <p>If you have questions, concerns, or requests regarding this privacy policy or our data practices, please contact us:</p>
          <p>
            <strong>Email:</strong> ehteshamhusain00@gmail.com<br />
            <strong>Response time:</strong> We aim to respond within 48 hours
          </p>

          <div style={{
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid #e5e7eb',
            fontSize: '0.875rem',
            color: '#6b7280'
          }}>
            <p><strong>FeelingsShare</strong> - Peer Support Platform</p>
            <p>This privacy policy was last updated on {new Date().toLocaleDateString()} and is effective immediately.</p>
          </div>
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
            <li>Contact ehteshamhusain00@gmail.com within 7 days</li>
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
            <li>Report immediately to ehteshamhusain00@gmail.com</li>
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
            Email: ehteshamhusain00@gmail.com<br />
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
                href="mailto:ehteshamhusain00@gmail.com"
                style={{
                  color: '#3b82f6',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
              >
                ehteshamhusain00@gmail.com
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
                href="mailto:ehteshamhusain00@gmail.com"
                style={{
                  color: '#10b981',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
              >
                ehteshamhusain00@gmail.com
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