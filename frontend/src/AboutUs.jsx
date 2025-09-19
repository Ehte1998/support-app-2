import React from 'react';

function AboutUs() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      {/* Header Section */}
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
          About EhteCounseling
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: 'rgba(255,255,255,0.9)',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Providing compassionate, confidential mental health support when you need it most
        </p>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gap: '2rem'
      }}>
        {/* Mission Section */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '3rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            Our Mission
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#4b5563',
            lineHeight: '1.8',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            At EhteCounseling, we believe that everyone deserves access to quality mental health support. 
            Our platform connects you with experienced counselors who provide personalized, confidential sessions 
            tailored to your unique needs. We're committed to breaking down barriers to mental health care 
            and making support accessible, affordable, and convenient.
          </p>
        </div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {/* Feature 1 */}
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '2rem',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: '1.5rem'
            }}>
              🔒
            </div>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              100% Confidential
            </h3>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.6'
            }}>
              Your privacy is our top priority. All conversations are encrypted and completely confidential, 
              ensuring a safe space for you to share and heal.
            </p>
          </div>

          {/* Feature 2 */}
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '2rem',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: '1.5rem'
            }}>
              💬
            </div>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Chat & Video Support
            </h3>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.6'
            }}>
              Connect through text chat or video calls based on your comfort level. 
              Our flexible platform adapts to your communication preferences.
            </p>
          </div>

          {/* Feature 3 */}
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '2rem',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: '1.5rem'
            }}>
              💰
            </div>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Pay What You Can
            </h3>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.6'
            }}>
              Mental health support shouldn't be limited by financial barriers. 
              Our pay-what-you-feel-it's-worth model makes counseling accessible to everyone.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '3rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            How It Works
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            {/* Step 1 */}
            <div style={{ textAlign: 'center' }}>
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
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}>
                1
              </div>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '0.5rem'
              }}>
                Share Your Feelings
              </h3>
              <p style={{
                color: '#6b7280',
                fontSize: '0.9rem',
                lineHeight: '1.5'
              }}>
                Tell us what's on your mind in a safe, judgment-free environment
              </p>
            </div>

            {/* Step 2 */}
            <div style={{ textAlign: 'center' }}>
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
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}>
                2
              </div>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '0.5rem'
              }}>
                Connect with Counselor
              </h3>
              <p style={{
                color: '#6b7280',
                fontSize: '0.9rem',
                lineHeight: '1.5'
              }}>
                Get matched with an experienced counselor who understands your needs
              </p>
            </div>

            {/* Step 3 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: '#8b5cf6',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}>
                3
              </div>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '0.5rem'
              }}>
                Start Your Journey
              </h3>
              <p style={{
                color: '#6b7280',
                fontSize: '0.9rem',
                lineHeight: '1.5'
              }}>
                Begin your path to healing through personalized counseling sessions
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '3rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            Our Values
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#059669',
                marginBottom: '0.5rem'
              }}>
                Compassion
              </h3>
              <p style={{
                color: '#6b7280',
                fontSize: '0.9rem',
                lineHeight: '1.5'
              }}>
                We approach every interaction with empathy and understanding
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#3b82f6',
                marginBottom: '0.5rem'
              }}>
                Accessibility
              </h3>
              <p style={{
                color: '#6b7280',
                fontSize: '0.9rem',
                lineHeight: '1.5'
              }}>
                Mental health support should be available to everyone, regardless of circumstances
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#8b5cf6',
                marginBottom: '0.5rem'
              }}>
                Privacy
              </h3>
              <p style={{
                color: '#6b7280',
                fontSize: '0.9rem',
                lineHeight: '1.5'
              }}>
                Your trust is sacred to us, and we protect your privacy absolutely
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '1rem',
          padding: '2rem',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '600',
            color: 'white',
            marginBottom: '1rem'
          }}>
            Ready to Start Your Journey?
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Take the first step towards better mental health. We're here to support you every step of the way.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            style={{
              padding: '1rem 2rem',
              background: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Start Counseling Session
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;