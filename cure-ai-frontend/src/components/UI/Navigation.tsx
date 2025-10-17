import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Animate navigation on mount
    gsap.fromTo('.navbar', 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    if (!isMenuOpen) {
      gsap.fromTo('.nav-menu', 
        { x: '100%', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
    } else {
      gsap.to('.nav-menu', { x: '100%', opacity: 0, duration: 0.3 });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top" style={{ 
      background: 'rgba(10, 10, 10, 0.9)', 
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(200, 175, 255, 0.2)',
      zIndex: 1000
    }}>
      <div className="container">
        <Link className="navbar-brand glow-text" to="/" style={{ 
          fontSize: '1.8rem', 
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #C8AFFF 0%, #A47CF3 50%, #D8C4FF 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 30px rgba(200, 175, 255, 0.5)'
        }}>
          CURE AI
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleMenu}
          style={{ border: 'none', background: 'transparent' }}
        >
          <span className="navbar-toggler-icon" style={{ 
            background: 'linear-gradient(135deg, #C8AFFF, #A47CF3)',
            width: '30px',
            height: '3px',
            display: 'block',
            margin: '5px 0',
            borderRadius: '2px'
          }}></span>
        </button>

        <div className={`nav-menu collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
                to="/"
                style={{ 
                  color: location.pathname === '/' ? '#C8AFFF' : 'white',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { scale: 1.1, duration: 0.3 });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
                }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/chat' ? 'active' : ''}`} 
                to="/chat"
                style={{ 
                  color: location.pathname === '/chat' ? '#C8AFFF' : 'white',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { scale: 1.1, duration: 0.3 });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
                }}
              >
                AI Chat
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/doctors' ? 'active' : ''}`} 
                to="/doctors"
                style={{ 
                  color: location.pathname === '/doctors' ? '#C8AFFF' : 'white',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { scale: 1.1, duration: 0.3 });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
                }}
              >
                Doctors
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/emergency' ? 'active' : ''}`} 
                to="/emergency"
                style={{ 
                  color: location.pathname === '/emergency' ? '#C8AFFF' : 'white',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { scale: 1.1, duration: 0.3 });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
                }}
              >
                Emergency
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/subscription' ? 'active' : ''}`} 
                to="/subscription"
                style={{ 
                  color: location.pathname === '/subscription' ? '#C8AFFF' : 'white',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { scale: 1.1, duration: 0.3 });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
                }}
              >
                Subscribe
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
