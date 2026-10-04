import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/programs.css';

gsap.registerPlugin(ScrollTrigger);

const plansData = [
  { id: 1, name: 'Monthly Plan', price: '₹1,500', subtitle: 'per person / 30 Days', features: ['Validity: 30 Days', 'No Personal Training', 'Gym access anytime during operating hours'] },
  { id: 2, name: 'Quarterly Plan', price: '₹4,000', subtitle: 'per person / 3 Months', features: ['Validity: 3 Months', '₹500 Savings compared to the monthly plan', 'No Personal Training', 'Gym access anytime during operating hours'] },
  { id: 3, name: 'Premium Coaching', price: '₹8,000', subtitle: 'per month', features: ['Personal Training included', 'Personalized Diet Plan', 'Workout program tailored to individual fitness goals', 'Gym access anytime during operating hours'], highlight: true },
  { id: 4, name: 'Elite Recovery & Core', price: '₹10,500', subtitle: 'per month', features: ['All Premium Coaching benefits', 'Specialized post-workout mobility protocols', 'Guided dead hangs & cobra stretch clinics', 'Advanced plank variations and core conditioning'] },
  { id: 5, name: 'Annual VIP Pass', price: '₹35,000', subtitle: 'per person / 12 Months', features: ['Validity: 12 Months', 'Priority booking for equipment and classes', 'Two complimentary guest passes per month', 'Gym access anytime during operating hours'] }
];

const ProgramCard = ({ data, index, isActive, onToggle }) => {
  
  const handleSelectPlan = (e) => {
    e.stopPropagation(); // Prevents the card from flipping back when clicking the button
    const teamSection = document.querySelector('.team-section');
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: 'smooth' });
    }
    // Fire event to show the toast message from the Navbar
    window.dispatchEvent(new CustomEvent('show-contact-message'));
  };

  return (
    <div className={`card-container ${data.highlight ? 'highlight' : ''}`} onClick={onToggle}>
      <div className={`card-inner ${isActive ? 'is-flipped' : ''}`}>
        
        {/* FRONT OF CARD */}
        <div className="card-face card-front">
          <div className="hover-indicator">
            <span className="icon-grid"><i></i><i></i><i></i><i></i></span>
            <span className="icon-text">FLIP</span>
          </div>
          <div className="card-content">
            <h3 className="plan-name">{data.name}</h3>
            <div className="price-block">
              <span className="price">{data.price}</span>
              <span className="subtitle">{data.subtitle}</span>
            </div>
            <p className="cta-text">{isActive ? 'Close Details' : 'View Details'}</p>
          </div>
        </div>

        {/* BACK OF CARD */}
        <div className="card-face card-back">
          <div className="card-content">
            <h3 className="plan-name-small">{data.name}</h3>
            <ul className="feature-list">
              {data.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <button className="select-btn" onClick={handleSelectPlan}>Select Plan</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default function Programs() {
  const [activeCardId, setActiveCardId] = useState(null);
  const sectionRef = useRef(null);
  const bandsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(bandsRef.current, {
        scaleY: 0, transformOrigin: 'bottom', stagger: 0.05, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'top 15%', scrub: 0.5 }
      });
      gsap.fromTo('.programs-content-wrapper', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', end: 'top 15%', scrub: 0.5 } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleToggle = (id) => {
    setActiveCardId(prev => prev === id ? null : id);
  };

  return (
    <section className="programs-section" id="programs" ref={sectionRef}>
      <div className="transition-bands">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="band" ref={el => bandsRef.current[i] = el}></div>
        ))}
      </div>
      <div className="programs-content-wrapper">
        <div className="programs-header">
          <span className="section-number">02</span>
          <h2>PLANS & PROGRAMS</h2>
          <p>Select a discipline that aligns with your pursuit of strength.</p>
        </div>
        <div className="programs-grid">
          {plansData.map((plan, index) => (
            <ProgramCard 
              key={plan.id} data={plan} index={index} 
              isActive={activeCardId === plan.id} 
              onToggle={() => handleToggle(plan.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}