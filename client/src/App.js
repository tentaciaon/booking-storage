import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Facilities from './pages/Facilities';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import Dashboard from './pages/Dashboard';
import LanguageSelection from './components/LanguageSelection';

function App() {
  const [language, setLanguage] = useState(localStorage.getItem('language') || '');

  useEffect(() => {
    if (!language) {
      // If no language is selected, show the selection modal
      setLanguage(null);
    }
  }, [language]);

  return (
    <div>
      {language === null ? (
        <LanguageSelection setLanguage={setLanguage} />
      ) : (
        <>
          <Navbar language={language} />
          <Routes>
            <Route path="/" element={<Home language={language} />} />
            <Route path="/register" element={<Register language={language} />} />
            <Route path="/login" element={<Login language={language} />} />
            <Route path="/facilities" element={<Facilities language={language} />} />
            <Route path="/booking/:id" element={<Booking language={language} />} />
            <Route path="/payment/:bookingId" element={<Payment language={language} />} />
            <Route path="/dashboard" element={<Dashboard language={language} />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
