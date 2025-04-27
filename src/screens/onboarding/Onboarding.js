import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Onboarding.css'; // 👈 Import the CSS

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="onboarding-container">
      <img
        src="./images/onboarding.jpg" // 👈 Put your image in public or use import if from src
        alt="Smart Campus"
        className="onboarding-image"
      />
      <h1 className="onboarding-title">Welcome to Smart Campus Portal</h1>
      <p className="onboarding-description">
        Manage your class schedules, book rooms, report maintenance, and stay updated all in one place.
      </p>
      <button
        onClick={() => navigate('/register')}
        className="onboarding-button"
      >
        Get Started
      </button>
    </div>
  );
};

export default Onboarding;
