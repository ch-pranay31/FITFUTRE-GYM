import React from 'react';
import '../styles/footer.css';
import logo from '../assets/images/logo.png'; // Make sure this path matches your project structure

export default function Footer() {
  const handleBeginJourney = () => {
    const programsSection = document.querySelector('.programs-section');
    if (programsSection) {
      programsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-section">
      
      {/* Premium Background Logo - Full Visibility */}
      <div className="footer-bg-logo" style={{ backgroundImage: `url(${logo})` }}></div>

      <div className="footer-content">
        
        <div className="footer-top">
          <div className="footer-brand">
            <h3>Ready to engineer resilience?</h3>
            <p>Join the elite tier of functional strength and recovery.</p>
            <button className="footer-cta" onClick={handleBeginJourney}>BEGIN YOUR JOURNEY</button>
          </div>
          
          <div className="footer-links-grid">
            <div className="link-column">
              <h4>NAVIGATION</h4>
              <a href="#facility" onClick={(e) => {
                e.preventDefault();
                document.querySelector('.features-section')?.scrollIntoView({ behavior: 'smooth' });
              }}>Facility</a>
              <a href="#programs" onClick={(e) => { e.preventDefault(); handleBeginJourney(); }}>Programs</a>
              <a href="#trainers" onClick={(e) => {
                e.preventDefault();
                document.querySelector('.team-section')?.scrollIntoView({ behavior: 'smooth' });
              }}>The Team</a>
            </div>
            <div className="link-column">
              <h4>CONNECT</h4>
              <a href="#">Instagram</a>
              <a href="#">Twitter</a>
              <a href="#">YouTube</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <h1 className="footer-massive-text">FITFUTURE</h1>
          <div className="footer-copyright">
            <span>© {new Date().getFullYear()} FITFUTURE. ALL RIGHTS RESERVED.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}