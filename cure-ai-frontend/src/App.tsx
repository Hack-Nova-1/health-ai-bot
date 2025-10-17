import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Pages
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import DoctorsPage from './pages/DoctorsPage';
import EmergencyPage from './pages/EmergencyPage';
import SubscriptionPage from './pages/SubscriptionPage';

// 3D Components
import Scene3D from './components/3D/Scene3D';
import LoadingSpinner from './components/3D/LoadingSpinner';

// UI Components
import Navigation from './components/UI/Navigation';
import Footer from './components/UI/Footer';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Navigation />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
        </Routes>
        
        <Footer />
        
        {/* Global 3D Scene */}
        <div className="fixed-scene">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <Scene3D />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </Router>
  );
}

export default App;
