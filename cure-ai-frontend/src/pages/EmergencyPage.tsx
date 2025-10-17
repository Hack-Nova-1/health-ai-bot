import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface EmergencyContact {
  id: number;
  name: string;
  number: string;
  type: 'ambulance' | 'police' | 'fire' | 'poison';
  icon: string;
}

export default function EmergencyPage() {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [location, setLocation] = useState<string>('Location not available');
  const [emergencyContacts] = useState<EmergencyContact[]>([
    { id: 1, name: 'Emergency Services', number: '911', type: 'ambulance', icon: '🚑' },
    { id: 2, name: 'Poison Control', number: '1-800-222-1222', type: 'poison', icon: '☠️' },
    { id: 3, name: 'Suicide Prevention', number: '988', type: 'ambulance', icon: '🆘' },
    { id: 4, name: 'Crisis Text Line', number: 'Text HOME to 741741', type: 'ambulance', icon: '💬' }
  ]);

  const emergencyButtonRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }

    // Animate emergency button
    gsap.fromTo('.emergency-button', 
      { scale: 0, rotation: 180 },
      { scale: 1, rotation: 0, duration: 1, ease: 'back.out(1.7)' }
    );

    // Animate globe
    gsap.fromTo('.globe-container', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' }
    );

    // Animate contact cards
    gsap.fromTo('.contact-card', 
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
    );
  }, []);

  const handleEmergencyClick = () => {
    setIsEmergencyActive(true);
    
    // Animate emergency activation
    gsap.to(emergencyButtonRef.current, {
      scale: 1.2,
      rotation: 360,
      duration: 0.5,
      ease: 'power2.out',
      yoyo: true,
      repeat: 1
    });

    // Simulate emergency response
    setTimeout(() => {
      alert('Emergency services have been notified! Help is on the way.');
      setIsEmergencyActive(false);
    }, 3000);
  };

  const callEmergency = (contact: EmergencyContact) => {
    if (contact.type === 'ambulance' && contact.number === '911') {
      window.open('tel:911');
    } else if (contact.number.includes('Text')) {
      alert(`Text ${contact.number.split(' ')[1]} to ${contact.number.split(' ')[3]}`);
    } else {
      window.open(`tel:${contact.number}`);
    }
  };

  return (
    <div className="emergency-page" style={{
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
            background: 'linear-gradient(135deg, #ff4444 0%, #ff6666 50%, #ff8888 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            EMERGENCY RESPONSE
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#ccc' }}>
            Instant emergency services with 3D location tracking
          </p>
        </div>

        {/* Emergency Button */}
        <div className="text-center mb-5">
          <div
            ref={emergencyButtonRef}
            className="emergency-button"
            onClick={handleEmergencyClick}
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: isEmergencyActive 
                ? 'radial-gradient(circle, #ff4444 0%, #cc0000 100%)'
                : 'radial-gradient(circle, #ff6666 0%, #ff4444 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              cursor: 'pointer',
              boxShadow: isEmergencyActive 
                ? '0 0 50px #ff4444, 0 0 100px #ff4444'
                : '0 0 30px rgba(255, 68, 68, 0.5)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { scale: 1.1, duration: 0.3 });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
            }}
          >
            {/* Pulsing rings */}
            {isEmergencyActive && (
              <>
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: '3px solid #ff4444',
                  animation: 'pulse-ring 1.5s infinite'
                }} />
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: '3px solid #ff4444',
                  animation: 'pulse-ring 1.5s infinite 0.5s'
                }} />
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: '3px solid #ff4444',
                  animation: 'pulse-ring 1.5s infinite 1s'
                }} />
              </>
            )}
            
            <div style={{
              fontSize: '3rem',
              color: 'white',
              textShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
              fontWeight: 'bold',
              zIndex: 1
            }}>
              🚨
            </div>
            
            {/* Emergency text */}
            <div style={{
              position: 'absolute',
              bottom: '-40px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#ff4444',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              {isEmergencyActive ? 'CALLING...' : 'EMERGENCY'}
            </div>
          </div>
        </div>

        {/* Location Display */}
        <div className="text-center mb-5">
          <div className="card-3d" style={{
            display: 'inline-block',
            padding: '20px 40px',
            background: 'rgba(255, 68, 68, 0.1)',
            border: '1px solid rgba(255, 68, 68, 0.3)',
            borderRadius: '25px'
          }}>
            <div style={{ color: '#ff4444', fontWeight: 'bold', marginBottom: '5px' }}>
              📍 Your Location
            </div>
            <div style={{ color: '#fff', fontSize: '1.1rem' }}>
              {location}
            </div>
          </div>
        </div>

        {/* 3D Globe */}
        <div className="globe-container" ref={globeRef} style={{
          textAlign: 'center',
          marginBottom: '60px'
        }}>
          <div style={{
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #4a90e2 0%, #2c5aa0 50%, #1e3a8a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            position: 'relative',
            boxShadow: '0 0 50px rgba(74, 144, 226, 0.5)',
            animation: 'globe-rotate 20s linear infinite'
          }}>
            {/* Globe continents */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: `
                radial-gradient(circle at 20% 30%, #228B22 0%, transparent 15%),
                radial-gradient(circle at 70% 20%, #228B22 0%, transparent 15%),
                radial-gradient(circle at 80% 70%, #228B22 0%, transparent 15%),
                radial-gradient(circle at 30% 80%, #228B22 0%, transparent 15%)
              `,
              borderRadius: '50%'
            }} />
            
            {/* Emergency markers */}
            {[
              { lat: 40.7128, lng: -74.0060, name: 'New York' },
              { lat: 34.0522, lng: -118.2437, name: 'Los Angeles' },
              { lat: 51.5074, lng: -0.1278, name: 'London' },
              { lat: 35.6762, lng: 139.6503, name: 'Tokyo' }
            ].map((city, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  width: '8px',
                  height: '8px',
                  background: '#ff4444',
                  borderRadius: '50%',
                  boxShadow: '0 0 10px #ff4444',
                  left: `${50 + city.lng / 3.6}%`,
                  top: `${50 - city.lat / 3.6}%`,
                  animation: 'pulse-glow 2s infinite'
                }}
                title={city.name}
              />
            ))}
            
            <div style={{
              fontSize: '4rem',
              color: 'rgba(255, 255, 255, 0.8)',
              textShadow: '0 0 20px rgba(0, 0, 0, 0.5)'
            }}>
              🌍
            </div>
          </div>
          
          <p style={{ 
            color: '#ccc', 
            marginTop: '20px',
            fontSize: '1.1rem'
          }}>
            Emergency services worldwide
          </p>
        </div>

        {/* Emergency Contacts */}
        <div className="row">
          <div className="col-12">
            <h3 style={{
              color: '#C8AFFF',
              textAlign: 'center',
              marginBottom: '40px',
              fontSize: '2rem'
            }}>
              Emergency Contacts
            </h3>
          </div>
          
          {emergencyContacts.map((contact, index) => (
            <div key={contact.id} className="col-lg-3 col-md-6 mb-4">
              <div 
                className="contact-card card-3d"
                onClick={() => callEmergency(contact)}
                style={{
                  height: '100%',
                  cursor: 'pointer',
                  textAlign: 'center',
                  padding: '30px 20px',
                  background: 'rgba(255, 68, 68, 0.1)',
                  border: '1px solid rgba(255, 68, 68, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { 
                    scale: 1.05, 
                    y: -10,
                    duration: 0.3 
                  });
                  e.currentTarget.style.background = 'rgba(255, 68, 68, 0.2)';
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { 
                    scale: 1, 
                    y: 0,
                    duration: 0.3 
                  });
                  e.currentTarget.style.background = 'rgba(255, 68, 68, 0.1)';
                }}
              >
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '20px',
                  filter: 'drop-shadow(0 0 10px rgba(255, 68, 68, 0.5))'
                }}>
                  {contact.icon}
                </div>
                
                <h5 style={{
                  color: '#ff4444',
                  marginBottom: '15px',
                  fontSize: '1.2rem',
                  fontWeight: 'bold'
                }}>
                  {contact.name}
                </h5>
                
                <p style={{
                  color: '#fff',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '20px'
                }}>
                  {contact.number}
                </p>
                
                <div style={{
                  padding: '10px 20px',
                  background: 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)',
                  borderRadius: '20px',
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Call Now
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Safety Tips */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="card-3d" style={{
              padding: '40px',
              background: 'rgba(200, 175, 255, 0.1)',
              border: '1px solid rgba(200, 175, 255, 0.3)'
            }}>
              <h4 style={{
                color: '#C8AFFF',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                🛡️ Emergency Safety Tips
              </h4>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                    <div style={{ fontSize: '1.5rem' }}>🚨</div>
                    <div>
                      <strong style={{ color: '#fff' }}>Stay Calm:</strong>
                      <p style={{ color: '#ccc', margin: '5px 0 0 0' }}>
                        Take deep breaths and try to remain calm to think clearly.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 mb-3">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                    <div style={{ fontSize: '1.5rem' }}>📍</div>
                    <div>
                      <strong style={{ color: '#fff' }}>Know Your Location:</strong>
                      <p style={{ color: '#ccc', margin: '5px 0 0 0' }}>
                        Always be aware of your exact location for emergency services.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 mb-3">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                    <div style={{ fontSize: '1.5rem' }}>📞</div>
                    <div>
                      <strong style={{ color: '#fff' }}>Call Immediately:</strong>
                      <p style={{ color: '#ccc', margin: '5px 0 0 0' }}>
                        Don't hesitate to call emergency services if you're in danger.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 mb-3">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                    <div style={{ fontSize: '1.5rem' }}>👥</div>
                    <div>
                      <strong style={{ color: '#fff' }}>Stay Visible:</strong>
                      <p style={{ color: '#ccc', margin: '5px 0 0 0' }}>
                        Make yourself visible to emergency responders if possible.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes globe-rotate {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
      `}</style>
    </div>
  );
}
