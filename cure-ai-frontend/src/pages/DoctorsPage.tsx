import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  experience: number;
  avatar: string;
  isOnline: boolean;
  price: number;
  description: string;
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: 1,
      name: "Dr. Sarah Chen",
      specialty: "Cardiology",
      rating: 4.9,
      experience: 15,
      avatar: "👩‍⚕️",
      isOnline: true,
      price: 150,
      description: "Expert in cardiovascular diseases with 15 years of experience"
    },
    {
      id: 2,
      name: "Dr. Michael Rodriguez",
      specialty: "Neurology",
      rating: 4.8,
      experience: 12,
      avatar: "👨‍⚕️",
      isOnline: true,
      price: 180,
      description: "Specialist in neurological disorders and brain health"
    },
    {
      id: 3,
      name: "Dr. Emily Johnson",
      specialty: "Pediatrics",
      rating: 4.9,
      experience: 10,
      avatar: "👩‍⚕️",
      isOnline: false,
      price: 120,
      description: "Caring pediatrician with expertise in child development"
    },
    {
      id: 4,
      name: "Dr. David Kim",
      specialty: "Orthopedics",
      rating: 4.7,
      experience: 18,
      avatar: "👨‍⚕️",
      isOnline: true,
      price: 200,
      description: "Orthopedic surgeon specializing in sports medicine"
    },
    {
      id: 5,
      name: "Dr. Lisa Wang",
      specialty: "Dermatology",
      rating: 4.8,
      experience: 8,
      avatar: "👩‍⚕️",
      isOnline: true,
      price: 140,
      description: "Dermatologist with focus on cosmetic and medical dermatology"
    },
    {
      id: 6,
      name: "Dr. James Wilson",
      specialty: "Psychiatry",
      rating: 4.9,
      experience: 20,
      avatar: "👨‍⚕️",
      isOnline: false,
      price: 160,
      description: "Psychiatrist specializing in mental health and therapy"
    }
  ]);

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('All');
  const doctorsRef = useRef<HTMLDivElement>(null);

  const specialties = ['All', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Psychiatry'];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = filterSpecialty === 'All' || doctor.specialty === filterSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  useEffect(() => {
    // Animate doctor cards on mount
    gsap.fromTo('.doctor-card', 
      { y: 100, opacity: 0, rotationX: 45 },
      { 
        y: 0, 
        opacity: 1, 
        rotationX: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.doctors-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const handleDoctorClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    // Animate modal entrance
    gsap.fromTo('.doctor-modal', 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );
  };

  const closeModal = () => {
    gsap.to('.doctor-modal', {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => setSelectedDoctor(null)
    });
  };

  return (
    <div className="doctors-page" style={{
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
            3D DOCTOR AVATARS
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#ccc' }}>
            Connect with real doctors through immersive 3D experiences
          </p>
        </div>

        {/* Search and Filter */}
        <div className="row mb-5">
          <div className="col-lg-6 mb-3">
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '15px 20px',
                border: '2px solid rgba(200, 175, 255, 0.3)',
                borderRadius: '25px',
                background: 'rgba(0, 0, 0, 0.3)',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#C8AFFF';
                e.target.style.boxShadow = '0 0 20px rgba(200, 175, 255, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(200, 175, 255, 0.3)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          <div className="col-lg-6 mb-3">
            <select
              value={filterSpecialty}
              onChange={(e) => setFilterSpecialty(e.target.value)}
              style={{
                width: '100%',
                padding: '15px 20px',
                border: '2px solid rgba(200, 175, 255, 0.3)',
                borderRadius: '25px',
                background: 'rgba(0, 0, 0, 0.3)',
                color: 'white',
                fontSize: '1rem',
                outline: 'none'
              }}
            >
              {specialties.map(specialty => (
                <option key={specialty} value={specialty} style={{ background: '#1A1A2E' }}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Doctors Grid */}
        <div ref={doctorsRef} className="doctors-grid">
          <div className="row">
            {filteredDoctors.map((doctor, index) => (
              <div key={doctor.id} className="col-lg-4 col-md-6 mb-4">
                <div 
                  className="doctor-card card-3d"
                  style={{
                    height: '100%',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onClick={() => handleDoctorClick(doctor)}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { 
                      scale: 1.05, 
                      rotationY: 5,
                      duration: 0.3 
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { 
                      scale: 1, 
                      rotationY: 0,
                      duration: 0.3 
                    });
                  }}
                >
                  {/* 3D Avatar Container */}
                  <div style={{
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'radial-gradient(circle, rgba(200, 175, 255, 0.1) 0%, transparent 70%)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {/* 3D Avatar Effect */}
                    <div style={{
                      fontSize: '6rem',
                      filter: 'drop-shadow(0 0 20px rgba(200, 175, 255, 0.5))',
                      transform: 'perspective(1000px) rotateX(10deg)',
                      transition: 'all 0.3s ease'
                    }}>
                      {doctor.avatar}
                    </div>
                    
                    {/* Online Status Indicator */}
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      width: '15px',
                      height: '15px',
                      borderRadius: '50%',
                      background: doctor.isOnline ? '#69C181' : '#ccc',
                      boxShadow: doctor.isOnline ? '0 0 10px #69C181' : 'none',
                      animation: doctor.isOnline ? 'pulse-glow 2s infinite' : 'none'
                    }} />
                    
                    {/* Floating Particles */}
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        style={{
                          position: 'absolute',
                          width: '4px',
                          height: '4px',
                          background: '#00FFFF',
                          borderRadius: '50%',
                          top: `${20 + i * 15}%`,
                          left: `${10 + i * 20}%`,
                          animation: `float ${3 + i}s ease-in-out infinite`,
                          opacity: 0.7
                        }}
                      />
                    ))}
                  </div>

                  <div style={{ padding: '25px' }}>
                    <h4 style={{ 
                      color: '#C8AFFF', 
                      marginBottom: '10px',
                      fontSize: '1.3rem'
                    }}>
                      {doctor.name}
                    </h4>
                    
                    <p style={{ 
                      color: '#D97DD9', 
                      marginBottom: '15px',
                      fontWeight: '600',
                      fontSize: '1.1rem'
                    }}>
                      {doctor.specialty}
                    </p>
                    
                    <p style={{ 
                      color: '#ccc', 
                      marginBottom: '20px',
                      fontSize: '0.9rem',
                      lineHeight: '1.4'
                    }}>
                      {doctor.description}
                    </p>
                    
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '20px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ color: '#FFD700' }}>⭐</span>
                        <span style={{ color: '#fff' }}>{doctor.rating}</span>
                      </div>
                      <div style={{ color: '#ccc', fontSize: '0.9rem' }}>
                        {doctor.experience} years exp.
                      </div>
                    </div>
                    
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center'
                    }}>
                      <span style={{ 
                        color: '#C8AFFF', 
                        fontSize: '1.2rem', 
                        fontWeight: 'bold' 
                      }}>
                        ${doctor.price}/hr
                      </span>
                      <button 
                        className="btn btn-futuristic"
                        style={{
                          padding: '8px 20px',
                          fontSize: '0.9rem',
                          border: 'none',
                          borderRadius: '20px'
                        }}
                      >
                        {doctor.isOnline ? 'Chat Now' : 'Schedule'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Modal */}
        {selectedDoctor && (
          <div 
            className="doctor-modal"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              backdropFilter: 'blur(10px)'
            }}
            onClick={closeModal}
          >
            <div 
              className="card-3d"
              style={{
                maxWidth: '500px',
                width: '90%',
                background: 'rgba(234, 244, 242, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(200, 175, 255, 0.3)',
                borderRadius: '20px',
                padding: '40px',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'none',
                  border: 'none',
                  color: '#C8AFFF',
                  fontSize: '1.5rem',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
              
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div style={{ fontSize: '5rem', marginBottom: '20px' }}>
                  {selectedDoctor.avatar}
                </div>
                <h3 style={{ color: '#C8AFFF', marginBottom: '10px' }}>
                  {selectedDoctor.name}
                </h3>
                <p style={{ color: '#D97DD9', fontSize: '1.2rem' }}>
                  {selectedDoctor.specialty}
                </p>
              </div>
              
              <div style={{ marginBottom: '30px' }}>
                <p style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '20px' }}>
                  {selectedDoctor.description}
                </p>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: '20px'
                }}>
                  <div>
                    <strong style={{ color: '#C8AFFF' }}>Rating:</strong>
                    <span style={{ color: '#fff', marginLeft: '10px' }}>
                      {selectedDoctor.rating} ⭐
                    </span>
                  </div>
                  <div>
                    <strong style={{ color: '#C8AFFF' }}>Experience:</strong>
                    <span style={{ color: '#fff', marginLeft: '10px' }}>
                      {selectedDoctor.experience} years
                    </span>
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: '30px'
                }}>
                  <div>
                    <strong style={{ color: '#C8AFFF' }}>Price:</strong>
                    <span style={{ color: '#fff', marginLeft: '10px' }}>
                      ${selectedDoctor.price}/hour
                    </span>
                  </div>
                  <div>
                    <strong style={{ color: '#C8AFFF' }}>Status:</strong>
                    <span style={{ 
                      color: selectedDoctor.isOnline ? '#69C181' : '#ccc',
                      marginLeft: '10px'
                    }}>
                      {selectedDoctor.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '15px' }}>
                <button 
                  className="btn btn-futuristic"
                  style={{
                    flex: 1,
                    padding: '15px',
                    border: 'none',
                    borderRadius: '25px',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}
                >
                  {selectedDoctor.isOnline ? 'Start Chat' : 'Schedule Appointment'}
                </button>
                <button 
                  style={{
                    flex: 1,
                    padding: '15px',
                    border: '2px solid #C8AFFF',
                    borderRadius: '25px',
                    background: 'transparent',
                    color: '#C8AFFF',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
