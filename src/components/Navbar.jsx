import React, { useState, useEffect } from 'react';

function Navbar() {
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    // Listens for the custom event to show the premium message
    const handleShowToast = () => {
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 5000); // Fades out after 5 seconds
    };

    window.addEventListener('show-contact-message', handleShowToast);
    return () => window.removeEventListener('show-contact-message', handleShowToast);
  }, []);

  const scrollToSection = (e, selector) => {
    e.preventDefault();
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = (e) => {
    scrollToSection(e, '.team-section');
    window.dispatchEvent(new CustomEvent('show-contact-message'));
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <a href="#home" className="nav-logo" onClick={(e) => scrollToSection(e, '.hero')}>
            FIT<span className="logo-accent">FUTURE</span>
          </a>

          <ul className="nav-menu">
            <li className="nav-item">
              <a href="#facility" className="nav-link" onClick={(e) => scrollToSection(e, '.features-section')}>
                Facility
              </a>
            </li>
            <li className="nav-item">
              <a href="#programs" className="nav-link" onClick={(e) => scrollToSection(e, '.programs-section')}>
                Programs
              </a>
            </li>
            <li className="nav-item">
              <a href="#trainers" className="nav-link" onClick={(e) => scrollToSection(e, '.team-section')}>
                Trainers
              </a>
            </li>
            <li className="nav-item">
              {/* New Contact Option triggering the scroll and message */}
              <a href="#contact" className="nav-link" onClick={handleContactClick}>
                Contact
              </a>
            </li>
          </ul>

          <button className="nav-btn" onClick={(e) => scrollToSection(e, '.programs-section')}>
            <span>Join Now</span>
          </button>
        </div>
      </nav>

      {/* Subtle Premium Notification Overlay */}
      <div style={{
        position: 'fixed',
        bottom: '50px',
        left: '50%',
        transform: toastVisible ? 'translate(-50%, 0)' : 'translate(-50%, 20px)',
        background: 'rgba(3, 3, 3, 0.95)',
        color: '#FFFFFF',
        padding: '1rem 2rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderBottom: '2px solid #ff3a00',
        opacity: toastVisible ? 1 : 0,
        pointerEvents: toastVisible ? 'auto' : 'none',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 9999,
        fontSize: '0.85rem',
        letterSpacing: '0.05em',
        textAlign: 'center',
        backdropFilter: 'blur(10px)'
      }}>
        Click on any trainer card to view contact details and get started.
      </div>
    </>
  );
}

export default Navbar;