import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/features.css';

// Importing high-end stock image assets
import feature1 from '../assets/images/stock_dumbbell_rack.jpg';
import feature2 from '../assets/images/stock_cable_machines.jpg';
import feature3 from '../assets/images/stock_strength_machines.jpg';
import feature4 from '../assets/images/stock_postural_cobra.jpg';
import feature5 from '../assets/images/stock_deadlift_zone.jpg';

gsap.registerPlugin(ScrollTrigger);

const featuresData = [
  {
    id: 1,
    number: "01",
    title: "PREMIUM DUMBBELL RACK",
    subtitle: "Free Weight Training",
    description: "A spacious, fully equipped free weight zone offering a wide range of weights. Perfect for building strength and improving muscle tone at your own pace.",
    image: feature1,
    bgPosition: "center center"
  },
  {
    id: 2,
    number: "02",
    title: "CABLE MACHINES",
    subtitle: "Versatile Controlled Movement",
    description: "Highly adaptable stations that provide smooth, constant tension. Ideal for safe, full-body workouts utilizing controlled and natural movements.",
    image: feature2,
    bgPosition: "center center"
  },
  {
    id: 3,
    number: "03",
    title: "STRENGTH MACHINES",
    subtitle: "Guided Resistance Training",
    description: "A comprehensive selection of modern equipment designed to guide your posture safely, making it highly effective for building strength and isolating muscles.",
    image: feature3,
    bgPosition: "center center"
  },
  {
    id: 4,
    number: "04",
    title: "POSTURAL CORRECTION",
    subtitle: "Advanced Cobra Stretch",
    description: "Precision flexibility programming designed to enhance lower back resilience, open the anterior chain, and correct mechanical imbalances.",
    image: feature4,
    bgPosition: "center center"
  },
  {
    id: 5,
    number: "05",
    title: "DEADLIFT & POWER ZONE",
    subtitle: "Heavy Lifting & Functional Power",
    description: "A reinforced, dedicated area built specifically for heavy lifting. It provides a solid, safe foundation for your most demanding power and functional movements.",
    image: feature5,
    bgPosition: "center center"
  }
];

export default function Features() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // Master Section Entrance (The Cinematic Crossfade)
      gsap.fromTo(sectionRef.current,
        { opacity: 0 }, 
        {
          opacity: 1, 
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%", 
            end: "top 25%",   
            scrub: true,
          }
        }
      );

      // Individual Feature Image Crossfades
      const textBlocks = gsap.utils.toArray('.feature-text-block');
      const images = gsap.utils.toArray('.feature-image');

      textBlocks.forEach((block, index) => {
        ScrollTrigger.create({
          trigger: block,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => gsap.to(images[index], { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }),
          onLeave: () => gsap.to(images[index], { opacity: 0, scale: 1.05, duration: 0.8, ease: "power2.out" }),
          onEnterBack: () => gsap.to(images[index], { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }),
          onLeaveBack: () => gsap.to(images[index], { opacity: 0, scale: 1.05, duration: 0.8, ease: "power2.out" }),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="features-section" id="facility" ref={sectionRef}>
      
      {/* LEFT COLUMN - STICKY IMAGES */}
      <div className="features-left">
        {featuresData.map((data, index) => (
          <div 
            key={data.id} 
            className="feature-image" 
            style={{ 
              backgroundImage: `url('${data.image}')`,
              backgroundPosition: data.bgPosition || 'center',
              filter: data.filter || 'none',
              opacity: index === 0 ? 1 : 0, 
              transform: index === 0 ? 'scale(1)' : 'scale(1.05)'
            }}
          >
            <div className="feature-image-overlay"></div>
          </div>
        ))}
      </div>

      {/* RIGHT COLUMN - SCROLLING TYPOGRAPHY */}
      <div className="features-right">
        <div className="features-header">
          <span className="features-section-number">01</span>
          <h2>FACILITY</h2>
        </div>

        <div className="features-container">
          {featuresData.map((data) => (
            <div key={data.id} className="feature-text-block">
              <p className="feature-description">{data.description}</p>
              
              <div className="feature-title-container">
                <span className="feature-number">{data.number}</span>
                <div className="feature-title-block">
                  <h4 className="feature-title">{data.title}</h4>
                  <span className="feature-subtitle">{data.subtitle}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
