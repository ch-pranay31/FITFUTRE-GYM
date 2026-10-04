import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/team.css';

// 1. IMPORTING HIGH-END STOCK TRAINER IMAGES (HIDING IDENTITY)
import pavanImage from '../assets/images/trainer_pavan_stock.jpg';
import charanImage from '../assets/images/trainer_charan_stock.jpg';

gsap.registerPlugin(ScrollTrigger);

const teamData = [
  {
    id: 1,
    name: 'PAVAN GOUD',
    title: 'LEAD TRAINER',
    image: pavanImage,
    bio: 'Pavan brings a highly analytical approach to strength and conditioning. With a focus on structural integrity and progressive overload, he engineers tailored training protocols designed to break plateaus and maximize human performance.',
    email: 'pavan@fitfuture.com',
    social: '@pavan_goud'
  },
  {
    id: 2,
    name: 'Y CHARAN KUMAR',
    title: 'PROFESSIONAL TRAINER',
    image: charanImage,
    bio: 'Charan specializes in functional biomechanics and elite physical preparation. His methodology bridges the gap between raw power and meticulous recovery, ensuring athletes move flawlessly while building sustainable, long-term resilience.',
    email: 'charan@fitfuture.com',
    social: '@charan_kumar'
  }
];

const TrainerCard = ({ data, isActive, onToggle }) => {
  return (
    <div className="trainer-card-container" onClick={onToggle}>
      <div className={`trainer-card-inner ${isActive ? 'is-flipped' : ''}`}>
        
        {/* FRONT OF CARD - IMAGE & OVERLAY */}
        <div 
          className="trainer-card-face trainer-front"
          style={{ backgroundImage: `url(${data.image})` }}
        >
          <div className="trainer-gradient-overlay"></div>
          
          {/* Top-Right Premium Hover Element */}
          <div className="trainer-hover-indicator">
            <span className="trainer-icon-cross">
              <i></i><i></i><i></i><i></i>
            </span>
            <span className="trainer-icon-text">SHOW DETAILS</span>
          </div>

          <div className="trainer-info-front">
            <h3 className="trainer-name">{data.name}</h3>
            <p className="trainer-title">{data.title}</p>
          </div>
        </div>

        {/* BACK OF CARD - BIO & CONTACT */}
        <div className="trainer-card-face trainer-back">
          <div className="trainer-info-back">
            <div className="bio-header">
              <h3 className="trainer-name-small">{data.name}</h3>
              <p className="trainer-title-small">{data.title}</p>
            </div>
            
            <p className="trainer-bio-text">{data.bio}</p>
            
            <div className="trainer-contact">
              <span className="contact-label">CONTACT</span>
              <a href={`mailto:${data.email}`} className="contact-link">{data.email}</a>
              <a href="#" className="contact-link">{data.social}</a>
            </div>
            
            <button className="close-bio-btn">Close Details</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default function Team() {
  const [activeCardId, setActiveCardId] = useState(null);
  const sectionRef = useRef(null);
  const streaksRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      gsap.to(streaksRef.current, {
        scaleX: 0,
        transformOrigin: 'center',
        stagger: 0.1, 
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom', 
          end: 'top 20%',      
          scrub: 0.5,          
        }
      });

      gsap.fromTo('.team-content-wrapper', 
        { opacity: 0, y: 60 },
        { 
          opacity: 1, 
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'top 20%',
            scrub: 0.5,
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert(); 
  }, []);

  const handleToggle = (id) => {
    setActiveCardId(prev => prev === id ? null : id);
  };

  return (
    <section className="team-section" id="trainers" ref={sectionRef}>
      
      <div className="transition-streaks-horizontal">
        {[0, 1, 2, 3, 4].map((i) => (
          <div 
            key={i} 
            className="streak-horizontal" 
            ref={el => streaksRef.current[i] = el}
          ></div>
        ))}
      </div>

      <div className="team-content-wrapper">
        <div className="team-header">
          <span className="section-number">03</span>
          <h2>TEAM</h2>
          <p style={{ 
            color: '#8A8A93', 
            fontSize: '0.9rem', 
            letterSpacing: '0.05em', 
            marginTop: '1rem',
            textTransform: 'uppercase',
            fontWeight: '600'
          }}>
            Click on any trainer card to view their contact details.
          </p>
        </div>
        
        <div className="team-grid">
          {teamData.map((trainer) => (
            <TrainerCard 
              key={trainer.id} 
              data={trainer} 
              isActive={activeCardId === trainer.id}
              onToggle={() => handleToggle(trainer.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}