import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PricingPlan {
  id: number;
  name: string;
  price: number;
  period: string;
  features: string[];
  popular: boolean;
  color: string;
  icon: string;
}

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [isSubscribing, setIsSubscribing] = useState(false);

  const pricingPlans: PricingPlan[] = [
    {
      id: 1,
      name: 'Basic',
      price: 9,
      period: 'month',
      features: [
        'AI Health Chat',
        'Basic Health Tracking',
        'Email Support',
        'Mobile App Access'
      ],
      popular: false,
      color: '#C8AFFF',
      icon: '🩺'
    },
    {
      id: 2,
      name: 'Professional',
      price: 29,
      period: 'month',
      features: [
        'Everything in Basic',
        '3D Doctor Consultations',
        'Advanced Health Analytics',
        'Priority Support',
        'Emergency Services',
        'Health Reports'
      ],
      popular: true,
      color: '#A47CF3',
      icon: '👨‍⚕️'
    },
    {
      id: 3,
      name: 'Enterprise',
      price: 99,
      period: 'month',
      features: [
        'Everything in Professional',
        'Unlimited Consultations',
        'Custom Health Plans',
        '24/7 Dedicated Support',
        'Family Plans (up to 6)',
        'Advanced AI Features',
        'API Access'
      ],
      popular: false,
      color: '#D97DD9',
      icon: '🏥'
    }
  ];

  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate pricing cards
    gsap.fromTo('.pricing-card', 
      { y: 100, opacity: 0, rotationX: 45 },
      { 
        y: 0, 
        opacity: 1, 
        rotationX: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.pricing-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const handleSubscribe = async (plan: PricingPlan) => {
    setSelectedPlan(plan.id);
    setIsSubscribing(true);

    // Animate subscription process
    gsap.to('.subscription-overlay', {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out'
    });

    // Simulate subscription process
    setTimeout(() => {
      alert(`Successfully subscribed to ${plan.name} plan! Welcome to the future of healthcare.`);
      setIsSubscribing(false);
      setSelectedPlan(null);
      gsap.to('.subscription-overlay', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in'
      });
    }, 3000);
  };

  return (
    <div className="subscription-page" style={{
      minHeight: '100vh',
      padding: '120px 0 80px',
      background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A2E 50%, #16213E 100%)'
    }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #C8AFFF 0%, #A47CF3 50%, #D8C4FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            SUBSCRIPTION PLANS
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#ccc' }}>
            Choose your perfect healthcare experience
          </p>
        </div>

        {/* Pricing Cards */}
        <div ref={cardsRef} className="pricing-section">
          <div className="row justify-content-center">
            {pricingPlans.map((plan, index) => (
              <div key={plan.id} className="col-lg-4 col-md-6 mb-4">
                <div 
                  className="pricing-card card-3d"
                  style={{
                    height: '100%',
                    position: 'relative',
                    background: plan.popular 
                      ? 'rgba(164, 124, 243, 0.1)' 
                      : 'rgba(234, 244, 242, 0.05)',
                    border: plan.popular 
                      ? '2px solid #A47CF3' 
                      : '1px solid rgba(200, 175, 255, 0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { 
                      scale: 1.05, 
                      y: -10,
                      duration: 0.3 
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { 
                      scale: 1, 
                      y: 0,
                      duration: 0.3 
                    });
                  }}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div style={{
                      position: 'absolute',
                      top: '-15px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #A47CF3 0%, #7B2CBF 100%)',
                      color: 'white',
                      padding: '8px 20px',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      boxShadow: '0 5px 15px rgba(164, 124, 243, 0.4)'
                    }}>
                      Most Popular
                    </div>
                  )}

                  <div style={{ padding: '40px 30px', textAlign: 'center' }}>
                    {/* Plan Icon */}
                    <div style={{
                      fontSize: '4rem',
                      marginBottom: '20px',
                      filter: `drop-shadow(0 0 20px ${plan.color}40)`
                    }}>
                      {plan.icon}
                    </div>

                    {/* Plan Name */}
                    <h3 style={{
                      color: plan.color,
                      marginBottom: '10px',
                      fontSize: '1.8rem',
                      fontWeight: 'bold'
                    }}>
                      {plan.name}
                    </h3>

                    {/* Price */}
                    <div style={{ marginBottom: '30px' }}>
                      <span style={{
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        color: '#fff',
                        textShadow: `0 0 20px ${plan.color}`
                      }}>
                        ${plan.price}
                      </span>
                      <span style={{
                        color: '#ccc',
                        fontSize: '1.2rem',
                        marginLeft: '5px'
                      }}>
                        /{plan.period}
                      </span>
                    </div>

                    {/* Features */}
                    <div style={{ marginBottom: '40px' }}>
                      {plan.features.map((feature, featureIndex) => (
                        <div 
                          key={featureIndex}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '15px',
                            color: '#ccc',
                            fontSize: '1rem'
                          }}
                        >
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: plan.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '15px',
                            fontSize: '0.8rem'
                          }}>
                            ✓
                          </div>
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Subscribe Button */}
                    <button
                      onClick={() => handleSubscribe(plan)}
                      disabled={isSubscribing}
                      style={{
                        width: '100%',
                        padding: '15px 30px',
                        background: `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}CC 100%)`,
                        border: 'none',
                        borderRadius: '25px',
                        color: 'white',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        cursor: isSubscribing ? 'not-allowed' : 'pointer',
                        opacity: isSubscribing ? 0.7 : 1,
                        transition: 'all 0.3s ease',
                        boxShadow: `0 5px 20px ${plan.color}40`
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubscribing) {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = `0 10px 30px ${plan.color}60`;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubscribing) {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = `0 5px 20px ${plan.color}40`;
                        }
                      }}
                    >
                      {isSubscribing && selectedPlan === plan.id ? 'Processing...' : 'Subscribe Now'}
                    </button>
                  </div>

                  {/* 3D Hover Effect Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(45deg, transparent 30%, ${plan.color}20 50%, transparent 70%)`,
                    borderRadius: 'inherit',
                    pointerEvents: 'none',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Comparison */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="card-3d" style={{
              padding: '40px',
              background: 'rgba(200, 175, 255, 0.1)',
              border: '1px solid rgba(200, 175, 255, 0.3)'
            }}>
              <h3 style={{
                color: '#C8AFFF',
                textAlign: 'center',
                marginBottom: '40px',
                fontSize: '2rem'
              }}>
                Why Choose Cure AI?
              </h3>
              
              <div className="row">
                <div className="col-md-4 mb-4">
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🤖</div>
                    <h5 style={{ color: '#C8AFFF', marginBottom: '15px' }}>AI-Powered</h5>
                    <p style={{ color: '#ccc' }}>
                      Advanced artificial intelligence trained on millions of medical cases
                    </p>
                  </div>
                </div>
                
                <div className="col-md-4 mb-4">
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🌐</div>
                    <h5 style={{ color: '#C8AFFF', marginBottom: '15px' }}>Global Network</h5>
                    <p style={{ color: '#ccc' }}>
                      Access to doctors and healthcare facilities worldwide
                    </p>
                  </div>
                </div>
                
                <div className="col-md-4 mb-4">
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔒</div>
                    <h5 style={{ color: '#C8AFFF', marginBottom: '15px' }}>Secure & Private</h5>
                    <p style={{ color: '#ccc' }}>
                      End-to-end encryption and HIPAA compliant data protection
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="row mt-5">
          <div className="col-12">
            <h3 style={{
              color: '#C8AFFF',
              textAlign: 'center',
              marginBottom: '40px',
              fontSize: '2rem'
            }}>
              Frequently Asked Questions
            </h3>
            
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card-3d" style={{ padding: '25px' }}>
                  <h6 style={{ color: '#C8AFFF', marginBottom: '15px' }}>
                    Can I cancel anytime?
                  </h6>
                  <p style={{ color: '#ccc', margin: 0 }}>
                    Yes, you can cancel your subscription at any time. No hidden fees or long-term commitments.
                  </p>
                </div>
              </div>
              
              <div className="col-md-6 mb-4">
                <div className="card-3d" style={{ padding: '25px' }}>
                  <h6 style={{ color: '#C8AFFF', marginBottom: '15px' }}>
                    Is my data secure?
                  </h6>
                  <p style={{ color: '#ccc', margin: 0 }}>
                    Absolutely. We use end-to-end encryption and are HIPAA compliant to protect your health data.
                  </p>
                </div>
              </div>
              
              <div className="col-md-6 mb-4">
                <div className="card-3d" style={{ padding: '25px' }}>
                  <h6 style={{ color: '#C8AFFF', marginBottom: '15px' }}>
                    Do you offer family plans?
                  </h6>
                  <p style={{ color: '#ccc', margin: 0 }}>
                    Yes, our Enterprise plan includes family coverage for up to 6 members.
                  </p>
                </div>
              </div>
              
              <div className="col-md-6 mb-4">
                <div className="card-3d" style={{ padding: '25px' }}>
                  <h6 style={{ color: '#C8AFFF', marginBottom: '15px' }}>
                    What payment methods do you accept?
                  </h6>
                  <p style={{ color: '#ccc', margin: 0 }}>
                    We accept all major credit cards, PayPal, and cryptocurrency payments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Overlay */}
      <div 
        className="subscription-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          opacity: 0,
          pointerEvents: 'none'
        }}
      >
        <div style={{
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '20px',
            animation: 'pulse-glow 1s infinite'
          }}>
            ⚡
          </div>
          <h3 style={{ color: '#C8AFFF', marginBottom: '10px' }}>
            Processing Your Subscription...
          </h3>
          <p style={{ color: '#ccc' }}>
            Please wait while we set up your account
          </p>
        </div>
      </div>
    </div>
  );
}
