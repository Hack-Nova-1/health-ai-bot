import React, { useEffect } from 'react';
import { gsap } from 'gsap';

export default function Footer() {
  useEffect(() => {
    // Animate footer on mount
    gsap.fromTo('.footer', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' }
    );
  }, []);

  return (
    <footer className="footer" style={{
      background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A2E 50%, #16213E 100%)',
      borderTop: '1px solid rgba(200, 175, 255, 0.2)',
      padding: '60px 0 30px',
      marginTop: '100px'
    }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <h5 style={{
              background: 'linear-gradient(135deg, #C8AFFF 0%, #A47CF3 50%, #D8C4FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '20px',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              CURE AI
            </h5>
            <p style={{ color: '#ccc', lineHeight: '1.6' }}>
              Revolutionizing healthcare with AI-powered assistance, 
              connecting patients with doctors through cutting-edge technology 
              and immersive 3D experiences.
            </p>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 style={{ 
              color: '#C8AFFF', 
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Services
            </h6>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '10px' }}>
                <a href="/chat" style={{ 
                  color: '#ccc', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#C8AFFF'}
                onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#ccc'}
                >
                  AI Chat
                </a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="/doctors" style={{ 
                  color: '#ccc', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#C8AFFF'}
                onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#ccc'}
                >
                  Find Doctors
                </a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="/emergency" style={{ 
                  color: '#ccc', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#C8AFFF'}
                onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#ccc'}
                >
                  Emergency
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 style={{ 
              color: '#C8AFFF', 
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Company
            </h6>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '10px' }}>
                <a href="/about" style={{ 
                  color: '#ccc', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#C8AFFF'}
                onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#ccc'}
                >
                  About Us
                </a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="/contact" style={{ 
                  color: '#ccc', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#C8AFFF'}
                onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#ccc'}
                >
                  Contact
                </a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="/privacy" style={{ 
                  color: '#ccc', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#C8AFFF'}
                onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#ccc'}
                >
                  Privacy
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-4 mb-4">
            <h6 style={{ 
              color: '#C8AFFF', 
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Connect With Us
            </h6>
            <div style={{ display: 'flex', gap: '15px' }}>
              <a href="#" style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #C8AFFF, #A47CF3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                color: 'white',
                transition: 'transform 0.3s ease',
                boxShadow: '0 0 20px rgba(200, 175, 255, 0.3)'
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { scale: 1.2, rotation: 360, duration: 0.5 });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { scale: 1, rotation: 0, duration: 0.3 });
              }}
              >
                📧
              </a>
              <a href="#" style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #C8AFFF, #A47CF3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                color: 'white',
                transition: 'transform 0.3s ease',
                boxShadow: '0 0 20px rgba(200, 175, 255, 0.3)'
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { scale: 1.2, rotation: 360, duration: 0.5 });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { scale: 1, rotation: 0, duration: 0.3 });
              }}
              >
                🐦
              </a>
              <a href="#" style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #C8AFFF, #A47CF3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                color: 'white',
                transition: 'transform 0.3s ease',
                boxShadow: '0 0 20px rgba(200, 175, 255, 0.3)'
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { scale: 1.2, rotation: 360, duration: 0.5 });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { scale: 1, rotation: 0, duration: 0.3 });
              }}
              >
                💼
              </a>
            </div>
          </div>
        </div>
        
        <hr style={{ 
          border: 'none', 
          height: '1px', 
          background: 'linear-gradient(90deg, transparent, #C8AFFF, transparent)',
          margin: '30px 0 20px'
        }} />
        
        <div className="row align-items-center">
          <div className="col-md-6">
            <p style={{ color: '#ccc', margin: 0 }}>
              © 2024 Cure AI. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p style={{ color: '#ccc', margin: 0 }}>
              Made with ❤️ for the future of healthcare
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
