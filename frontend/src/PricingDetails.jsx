import React from 'react';

function PricingDetails() {
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
          Pricing That Works For You
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: 'rgba(255,255,255,0.9)',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Mental health support shouldn't be limited by financial barriers
        </p>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gap: '2rem'
      }}>
        {/* Main Pricing Philosophy */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '3rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
            fontSize: '2rem'
          }}>
            💚
          </div>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '1rem'
          }}>
            Pay What You Feel It's Worth
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#4b5563',
            lineHeight: '1.7',
            maxWidth: '700px',
            margin: '0 auto 2rem'
          }}>
            We believe everyone deserves access to mental health support, regardless of their financial situation. 
            After your counseling session, you decide what the experience was worth to you.
          </p>
          
          <div style={{
            background: '#f0fdf4',
            border: '2px solid #bbf7d0',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '600',
              color: '#166534',
              marginBottom: '0.5rem'
            }}>
              No Fixed Fees • No Insurance Required • No Financial Stress
            </h3>
            <p style={{
              color: '#15803d',
              fontSize: '1rem',
              margin: 0
            }}>
              Focus on healing, not on costs
            </p>
          </div>
        </div>

        {/* How It Works */}
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
            How Our Pricing Works
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {/* Step 1 */}
            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.75rem'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: '#3b82f6',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}>
                1
              </div>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                Get Your Counseling
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                Receive professional counseling support through chat or video call. 
                Focus entirely on your mental health without worrying about costs.
              </p>
            </div>

            {/* Step 2 */}
            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.75rem'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: '#8b5cf6',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}>
                2
              </div>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                Rate Your Experience
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                After your session, rate your experience and provide feedback. 
                Your input helps us improve our services.
              </p>
            </div>

            {/* Step 3 */}
            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.75rem'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: '#10b981',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}>
                3
              </div>
              <h3 style={{
                fontSize: '1.2rem',
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
                Choose an amount that feels right for you based on the value you received. 
                Every contribution helps us continue providing this service.
              </p>
            </div>
          </div>
        </div>

        {/* Suggested Amounts */}
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
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            Payment Guidance
          </h2>
          <p style={{
            textAlign: 'center',
            color: '#6b7280',
            fontSize: '1.1rem',
            marginBottom: '2rem'
          }}>
            While you're free to pay any amount, here are some guidelines to help you decide:
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* Low Budget */}
            <div style={{
              background: '#fef3c7',
              border: '1px solid #fbbf24',
              borderRadius: '0.75rem',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '600',
                color: '#92400e',
                marginBottom: '1rem'
              }}>
                Tight Budget
              </h3>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#f59e0b',
                marginBottom: '1rem'
              }}>
                ₹100 - ₹500
              </div>
              <p style={{
                color: '#78350f',
                fontSize: '0.9rem',
                lineHeight: '1.5'
              }}>
                Every contribution helps, no matter how small. Your mental health matters more than the amount.
              </p>
            </div>

            {/* Moderate */}
            <div style={{
              background: '#dbeafe',
              border: '1px solid #3b82f6',
              borderRadius: '0.75rem',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '600',
                color: '#1e40af',
                marginBottom: '1rem'
              }}>
                Moderate Support
              </h3>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#3b82f6',
                marginBottom: '1rem'
              }}>
                ₹1000 - ₹3000
              </div>
              <p style={{
                color: '#1e3a8a',
                fontSize: '0.9rem',
                lineHeight: '1.5'
              }}>
                A comfortable contribution that helps sustain our counseling services for others.
              </p>
            </div>

            {/* Generous */}
            <div style={{
              background: '#dcfce7',
              border: '1px solid #10b981',
              borderRadius: '0.75rem',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '600',
                color: '#059669',
                marginBottom: '1rem'
              }}>
              
                Generous Support
              </h3>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#10b981',
                marginBottom: '1rem'
              }}>
                ₹5000+
              </div>
              <p style={{
                color: '#065f46',
                fontSize: '0.9rem',
                lineHeight: '1.5'
              }}>
                Your generosity enables us to provide free or low-cost sessions to those in need.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits of This Model */}
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
            Why This Pricing Model Works
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              background: '#f9fafb',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '1rem'
              }}>
                Removes Financial Barriers
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                You can access mental health support immediately without worrying about upfront costs or insurance coverage.
              </p>
            </div>

            <div style={{
              background: '#f9fafb',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '1rem'
              }}>
                Values-Based Payment
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                You pay based on the value you received, ensuring fair compensation for quality service.
              </p>
            </div>

            <div style={{
              background: '#f9fafb',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '1rem'
              }}>
              
                Community Support
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                Those who can afford more help subsidize sessions for those who cannot, creating a supportive community.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
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
            Common Questions
          </h2>
          
          <div style={{
            display: 'grid',
            gap: '1.5rem'
          }}>
            <div style={{
              background: '#f9fafb',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                What if I can't afford to pay anything?
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6',
                margin: 0
              }}>
                That's completely okay. Your mental health is more important than payment. 
                Access the counseling you need, and if your situation improves in the future, you can always contribute then.
              </p>
            </div>

            <div style={{
              background: '#f9fafb',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Is there a minimum or maximum payment amount?
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6',
                margin: 0
              }}>
                There's no minimum payment required. The maximum payment is ₹1,00,000 per session, 
                though most contributions range from ₹100 to ₹5,000.
              </p>
            </div>

            <div style={{
              background: '#f9fafb',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                How do I know what amount is appropriate?
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6',
                margin: 0
              }}>
                Consider factors like the value you received, your financial situation, 
                and what you'd be comfortable paying for similar professional services. Trust your instincts.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
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
            Ready to Get Started?
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Don't let financial concerns prevent you from getting the mental health support you deserve.
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
            Start Your Counseling Session
          </button>
        </div>
      </div>
    </div>
  );
}

export default PricingDetails;