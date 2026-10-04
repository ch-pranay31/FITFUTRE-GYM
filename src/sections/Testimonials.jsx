import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/testimonials.css';

gsap.registerPlugin(ScrollTrigger);

const testimonialsData = [
  {
    id: 1,
    name: "ALEX CARTER",
    milestone: "Mastered 3-Minute Plank & Advanced Core Stability",
    quote: "The elite conditioning here doesn't just build muscle; it engineers resilience. The focused core protocols fundamentally changed my alignment.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "SAMANTHA REYES",
    milestone: "Perfected Weighted Dead Hangs & Grip Endurance",
    quote: "A completely different echelon of training. The attention to volumetric recovery and structural flexibility is something you only find in world-class facilities.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "DAVID CHEN",
    milestone: "Advanced Cobra Stretch & Postural Correction",
    quote: "This isn't a gym; it's a high-performance laboratory. The curated programs strip away the noise and focus entirely on measurable, elite results.",
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=800&auto=format&fit=crop"
  }
];

export default function Testimonials() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const quotes = gsap.utils.toArray('.quote-block');
      const images = gsap.utils.toArray('.testimonial-image');

      quotes.forEach((quote, index) => {
        ScrollTrigger.create({
          trigger: quote,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => gsap.to(images[index], { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }),
          onLeave: () => {
            if (index < quotes.length - 1) {
              gsap.to(images[index], { opacity: 0, scale: 1.05, duration: 0.8, ease: "power2.out" });
            }
          },
          onEnterBack: () => gsap.to(images[index], { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }),
          onLeaveBack: () => {
            if (index > 0) {
              gsap.to(images[index], { opacity: 0, scale: 1.05, duration: 0.8, ease: "power2.out" });
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="testimonials-section" id="proof" ref={sectionRef}>
      
      {/* LEFT COLUMN - STICKY IMAGES */}
      <div className="testimonials-left">
        {testimonialsData.map((data, index) => (
          <div 
            key={data.id} 
            className="testimonial-image" 
            style={{ 
              backgroundImage: `url(${data.image})`,
              opacity: index === 0 ? 1 : 0, // First image visible by default
              transform: index === 0 ? 'scale(1)' : 'scale(1.05)'
            }}
          >
            <div className="image-overlay"></div>
          </div>
        ))}
      </div>

      {/* RIGHT COLUMN - SCROLLING TYPOGRAPHY */}
      <div className="testimonials-right">
        <div className="testimonials-header">
          <span className="section-number">04</span>
          <h2>THE PROOF</h2>
        </div>

        <div className="quotes-container">
          {testimonialsData.map((data) => (
            <div key={data.id} className="quote-block">
              <p className="quote-text">"{data.quote}"</p>
              <div className="quote-author-block">
                <h4 className="quote-author">{data.name}</h4>
                <span className="quote-milestone">{data.milestone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}