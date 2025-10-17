import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animations
    const tl = gsap.timeline();
    
    tl.fromTo('.hero-title', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' }
    )
    .fromTo('.hero-subtitle', 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo('.hero-buttons', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.3'
    );

    // Features animation on scroll
    gsap.fromTo('.feature-card', 
      { y: 100, opacity: 0, rotationX: 45 },
      { 
        y: 0, 
        opacity: 1, 
        rotationX: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.features-section',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Stats counter animation
    gsap.fromTo('.stat-number', 
      { innerText: 0 },
      { 
        innerText: (index: number, target: any) => {
          const finalValue = parseInt(target.getAttribute('data-target') || '0');
          return finalValue;
        },
        duration: 2,
        ease: 'power2.out',
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: '.stats-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Parallax effect for hero background
    gsap.to('.hero-bg', {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" ref={heroRef} style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A2E 50%, #16213E 100%)'
      }}>
        {/* Animated Background */}
        <div className="hero-bg" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '120%',
          background: 'radial-gradient(circle at 30% 20%, rgba(200, 175, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(217, 125, 217, 0.1) 0%, transparent 50%)',
          zIndex: 1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="hero-title" style={{
                fontSize: '4rem',
                fontWeight: 'bold',
                marginBottom: '30px',
                background: 'linear-gradient(135deg, #C8AFFF 0%, #A47CF3 50%, #D8C4FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 50px rgba(200, 175, 255, 0.5)',
                lineHeight: '1.1'
              }}>
                REVOLUTIONARY
                <br />
                <span style={{ color: '#00FFFF' }}>HEALTHCARE</span>
                <br />
                AI ASSISTANT
              </h1>
              
              <p className="hero-subtitle" style={{
                fontSize: '1.3rem',
                color: '#ccc',
                marginBottom: '40px',
                lineHeight: '1.6'
              }}>
                Experience the future of healthcare with our AI-powered platform. 
                Connect with doctors, get instant medical advice, and access 
                emergency services through immersive 3D technology.
              </p>
              
              <div className="hero-buttons" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <Link to="/chat" className="btn btn-futuristic" style={{
                  padding: '20px 40px',
                  fontSize: '1.1rem',
                  textDecoration: 'none'
                }}>
                  Start AI Chat
                </Link>
                <Link to="/doctors" className="btn btn-outline-light" style={{
                  padding: '20px 40px',
                  fontSize: '1.1rem',
                  textDecoration: 'none',
                  border: '2px solid #C8AFFF',
                  color: '#C8AFFF',
                  borderRadius: '50px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#C8AFFF';
                  e.currentTarget.style.color = '#000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#C8AFFF';
                }}
                >
                  Find Doctors
                </Link>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div style={{
                position: 'relative',
                height: '500px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* 3D Brain Visualization Placeholder */}
                <div style={{
                  width: '300px',
                  height: '300px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(200, 175, 255, 0.3) 0%, rgba(164, 124, 243, 0.1) 50%, transparent 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  animation: 'pulse-glow 3s ease-in-out infinite'
                }}>
                  <div style={{
                    fontSize: '4rem',
                    color: '#C8AFFF',
                    textShadow: '0 0 30px rgba(200, 175, 255, 0.8)'
                  }}>
                    🧠
                  </div>
                  
                  {/* Orbiting particles */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        position: 'absolute',
                        width: '8px',
                        height: '8px',
                        background: '#00FFFF',
                        borderRadius: '50%',
                        boxShadow: '0 0 20px #00FFFF',
                        transform: `rotate(${i * 45}deg) translateX(200px)`,
                        animation: `orbit ${8 + i}s linear infinite`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" ref={featuresRef} style={{
        padding: '100px 0',
        background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)'
      }}>
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-12">
              <h2 style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                marginBottom: '20px',
                background: 'linear-gradient(135deg, #C8AFFF 0%, #A47CF3 50%, #D8C4FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                REVOLUTIONARY FEATURES
              </h2>
              <p style={{ fontSize: '1.2rem', color: '#ccc' }}>
                Experience healthcare like never before with our cutting-edge technology
              </p>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="feature-card card-3d" style={{ height: '100%' }}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🤖</div>
                <h4 style={{ color: '#C8AFFF', marginBottom: '15px' }}>AI-Powered Chat</h4>
                <p style={{ color: '#ccc' }}>
                  Get instant medical advice from our advanced AI assistant 
                  trained on millions of medical cases and research papers.
                </p>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="feature-card card-3d" style={{ height: '100%' }}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>👨‍⚕️</div>
                <h4 style={{ color: '#C8AFFF', marginBottom: '15px' }}>3D Doctor Avatars</h4>
                <p style={{ color: '#ccc' }}>
                  Connect with real doctors through immersive 3D avatars 
                  that provide personalized consultations and care.
                </p>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="feature-card card-3d" style={{ height: '100%' }}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🚨</div>
                <h4 style={{ color: '#C8AFFF', marginBottom: '15px' }}>Emergency Response</h4>
                <p style={{ color: '#ccc' }}>
                  Instant emergency services with GPS tracking and 
                  real-time connection to nearby medical facilities.
                </p>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="feature-card card-3d" style={{ height: '100%' }}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🧬</div>
                <h4 style={{ color: '#C8AFFF', marginBottom: '15px' }}>Health Analytics</h4>
                <p style={{ color: '#ccc' }}>
                  Advanced health monitoring with predictive analytics 
                  and personalized health insights powered by AI.
                </p>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="feature-card card-3d" style={{ height: '100%' }}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🌐</div>
                <h4 style={{ color: '#C8AFFF', marginBottom: '15px' }}>Global Network</h4>
                <p style={{ color: '#ccc' }}>
                  Access to a worldwide network of medical professionals 
                  and healthcare facilities 24/7.
                </p>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="feature-card card-3d" style={{ height: '100%' }}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔮</div>
                <h4 style={{ color: '#C8AFFF', marginBottom: '15px' }}>Future Tech</h4>
                <p style={{ color: '#ccc' }}>
                  Cutting-edge 3D visualization, VR consultations, 
                  and next-generation medical technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" ref={statsRef} style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A2E 50%, #16213E 100%)',
        borderTop: '1px solid rgba(200, 175, 255, 0.2)',
        borderBottom: '1px solid rgba(200, 175, 255, 0.2)'
      }}>
        <div className="container">
          <div className="row text-center">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="stat-item">
                <h3 className="stat-number" data-target="1000000" style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: '#C8AFFF',
                  marginBottom: '10px'
                }}>
                  0
                </h3>
                <p style={{ color: '#ccc', fontSize: '1.1rem' }}>Patients Helped</p>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="stat-item">
                <h3 className="stat-number" data-target="50000" style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: '#C8AFFF',
                  marginBottom: '10px'
                }}>
                  0
                </h3>
                <p style={{ color: '#ccc', fontSize: '1.1rem' }}>Doctors Connected</p>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="stat-item">
                <h3 className="stat-number" data-target="99" style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: '#C8AFFF',
                  marginBottom: '10px'
                }}>
                  0
                </h3>
                <p style={{ color: '#ccc', fontSize: '1.1rem' }}>Accuracy Rate %</p>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="stat-item">
                <h3 className="stat-number" data-target="24" style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: '#C8AFFF',
                  marginBottom: '10px'
                }}>
                  0
                </h3>
                <p style={{ color: '#ccc', fontSize: '1.1rem' }}>Hours Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '100px 0',
        background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '30px',
            background: 'linear-gradient(135deg, #C8AFFF 0%, #A47CF3 50%, #D8C4FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            READY TO EXPERIENCE THE FUTURE?
          </h2>
          <p style={{ fontSize: '1.3rem', color: '#ccc', marginBottom: '40px' }}>
            Join millions of users who have revolutionized their healthcare experience
          </p>
          <Link to="/subscription" className="btn btn-futuristic" style={{
            padding: '25px 50px',
            fontSize: '1.2rem',
            textDecoration: 'none'
          }}>
            Get Started Now
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(200px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(200px) rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}
