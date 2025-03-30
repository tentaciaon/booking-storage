import React from 'react';
import '../styles/LanguageSelection.css'; // Add a CSS file for styling

const LanguageSelection = ({ setLanguage }) => {
  const handleLanguageSelect = (lang) => {
    localStorage.setItem('language', lang);
    setLanguage(lang);
  };

  return (
    <div className="language-selection-overlay">
      <div className="language-selection-box">
        <h2>Select Language / भाषा चुनें</h2>
        <button onClick={() => handleLanguageSelect('en')} className="language-btn">English</button>
        <button onClick={() => handleLanguageSelect('hi')} className="language-btn">हिन्दी</button>
      </div>
    </div>
  );
};

export default LanguageSelection;
