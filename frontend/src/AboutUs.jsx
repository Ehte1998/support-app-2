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
          About FeelingsShare
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: 'rgba(255,255,255,0.9)',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          A safe, judgment-free space where you can share your feelings with caring listeners
        </p>
      </div>

      {/* CRITICAL DISCLAIMER BANNER */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto 2rem auto',
        background: '#fef2f2',
        border: '2px solid #dc2626',
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 4px 12px rgba(220, 38, 38, 0.2)'
      }}>
        <h3 style={{
          color: '#dc2626',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          marginBottom: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          justifyContent: 'center'
        }}>
          ⚠️ IMPORTANT: This is NOT Professional Therapy
        </h3>
        <p style={{
          color: '#991b1b',
          textAlign: 'center',
          lineHeight: '1.6',
          margin: 0
        }}>
          FeelingsShare is a <strong>peer support platform</strong> with volunteer listeners, not licensed therapists. 
          This is NOT professional mental health care or medical advice. For crisis situations, call <strong>112</strong> or 
          crisis helplines: KIRAN <strong>1800-599-0019</strong>, AASRA <strong>91-22-27546669</strong>
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
            At FeelingsShare, we believe that everyone deserves a safe space to express their feelings. 
            Our platform connects you with caring volunteer listeners who provide compassionate peer support 
            in a judgment-free environment. We're committed to making emotional support accessible, 
            affordable, and convenient for everyone who needs someone to listen.
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
              Anonymous & Safe
            </h3>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.6'
            }}>
              Your privacy is our top priority. All conversations are confidential, 
              ensuring a safe space for you to share openly and honestly.
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
              Chat & Video Options
            </h3>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.6'
            }}>
              Connect through text chat or optional video calls based on your comfort level. 
              Our flexible platform adapts to your preferences.
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
              💙
            </div>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Pay What Feels Right
            </h3>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.6'
            }}>
              Emotional support shouldn't be limited by financial barriers. 
              Our voluntary contribution model makes peer support accessible to everyone.
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
                Connect with Listener
              </h3>
              <p style={{
                color: '#6b7280',
                fontSize: '0.9rem',
                lineHeight: '1.5'
              }}>
                Get matched with a caring volunteer listener who will support you
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
                Feel Supported
              </h3>
              <p style={{
                color: '#6b7280',
                fontSize: '0.9rem',
                lineHeight: '1.5'
              }}>
                Experience empathetic peer support through caring conversation
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
                Empathy
              </h3>
              <p style={{
                color: '#6b7280',
                fontSize: '0.9rem',
                lineHeight: '1.5'
              }}>
                We approach every conversation with genuine understanding and care
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
                Peer support should be available to everyone, regardless of circumstances
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

        {/* What We Are NOT */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '3rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          border: '2px solid #fbbf24'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: '#92400e',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            What We Are NOT
          </h2>
          
          <div style={{
            display: 'grid',
            gap: '1rem',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <div style={{
              background: '#fef3c7',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #fbbf24'
            }}>
              <p style={{
                color: '#78350f',
                margin: 0,
                lineHeight: '1.6'
              }}>
                ❌ <strong>NOT professional therapy</strong> or medical treatment
              </p>
            </div>
            <div style={{
              background: '#fef3c7',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #fbbf24'
            }}>
              <p style={{
                color: '#78350f',
                margin: 0,
                lineHeight: '1.6'
              }}>
                ❌ <strong>NOT licensed therapists</strong> - our listeners are trained volunteers
              </p>
            </div>
            <div style={{
              background: '#fef3c7',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #fbbf24'
            }}>
              <p style={{
                color: '#78350f',
                margin: 0,
                lineHeight: '1.6'
              }}>
                ❌ <strong>NOT for crisis situations</strong> - please call emergency services
              </p>
            </div>
            <div style={{
              background: '#fef3c7',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #fbbf24'
            }}>
              <p style={{
                color: '#78350f',
                margin: 0,
                lineHeight: '1.6'
              }}>
                ❌ <strong>NOT a substitute</strong> for professional mental health care
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
            Ready to Share?
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Connect with a caring listener who will support you. We're here to listen.
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
            Share Your Feelings
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;