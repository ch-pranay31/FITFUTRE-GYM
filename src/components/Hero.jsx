import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/hero.css';
import heroImage from '../assets/images/hero-image.png';

// Import the intro video
import introVideoSrc from '../assets/videos/intro-desktop.mp4'; 

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);
  const brandingRef = useRef(null);
  const enterBtnRef = useRef(null);
  
  const [introState, setIntroState] = useState(() => {
    return sessionStorage.getItem('fitfuture_intro_played') ? 'finished' : 'branding';
  });

  // --- Scroll Lock Utilities ---
  const preventDefault = (e) => e.preventDefault();
  const preventScrollKeys = (e) => {
    const keys = ['Space', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'];
    if (keys.includes(e.code)) {
      e.preventDefault();
    }
  };

  const lockScroll = () => {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', preventScrollKeys, { passive: false });
    window.addEventListener('wheel', preventDefault, { passive: false });
    window.addEventListener('touchmove', preventDefault, { passive: false });
  };

  const unlockScroll = () => {
    document.body.style.overflow = '';
    window.removeEventListener('keydown', preventScrollKeys);
    window.removeEventListener('wheel', preventDefault);
    window.removeEventListener('touchmove', preventDefault);
  };

  // --- Core Lifecycle ---
  useEffect(() => {
    if (introState === 'finished') {
      unlockScroll();
      document.body.classList.remove('intro-active');
      
      let ctx = gsap.context(() => {
        gsap.to(heroRef.current, {
          opacity: 0,
          y: 30, 
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top", 
            end: "bottom 30%", 
            scrub: true,
          }
        });
      }, heroRef);

      ScrollTrigger.getAll().forEach(st => st.enable());
      ScrollTrigger.refresh();

      return () => ctx.revert();
    } else {
      lockScroll();
      document.body.classList.add('intro-active');
      ScrollTrigger.getAll().forEach(st => st.disable());
    }

    return () => {
        unlockScroll();
        document.body.classList.remove('intro-active');
    };
  }, [introState]);

  // --- Premium Loading Screen Sequence ---
  useEffect(() => {
    if (introState === 'branding') {
      gsap.to(brandingRef.current, { opacity: 1, duration: 1.2, ease: 'power2.out' });

      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.volume = 1; 
          const playPromise = videoRef.current.play();
          
          if (playPromise !== undefined) {
            playPromise.then(() => {
              gsap.to(brandingRef.current, {
                opacity: 0, 
                duration: 1, 
                onComplete: () => setIntroState('playing')
              });
            }).catch(() => {
              gsap.to(enterBtnRef.current, { 
                autoAlpha: 1, 
                duration: 0.6,
                ease: 'power2.out'
              });
            });
          }
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [introState]);

  const handleUserStart = () => {
    if (videoRef.current) {
      videoRef.current.volume = 1;
      videoRef.current.play();
      gsap.to(brandingRef.current, {
        opacity: 0, 
        duration: 1, 
        onComplete: () => setIntroState('playing')
      });
    }
  };

  // --- Cinematic Transition to Website ---
  const handleVideoEnd = () => {
    // ROOT CAUSE FIX 2: Layout Repositioning
    // Restore the scrollbar immediately while the screen is still covered by the video.
    // This allows the browser to calculate the final layout width behind the scenes, 
    // eliminating the layout shift entirely before the fade-in begins.
    document.body.style.overflow = '';

    const navbar = document.querySelector('nav, .navbar, .header');
    const scrollIndicators = document.querySelectorAll('.scroll-indicator');

    const tl = gsap.timeline({
      onComplete: () => {
        // ROOT CAUSE FIX 1: Navbar Flicker
        // Synchronously strip the CSS hide class BEFORE clearProps and React render cycles run.
        document.body.classList.remove('intro-active');
        
        sessionStorage.setItem('fitfuture_intro_played', 'true');
        setIntroState('finished'); 
      }
    });

    if (navbar) gsap.set(navbar, { y: -20, opacity: 0 });

    tl.to(videoContainerRef.current, {
      opacity: 0,
      duration: 1.5,
      ease: "power2.inOut"
    }, 0)
    .to('.hero-background', { 
      opacity: 1, 
      duration: 1.5, 
      ease: "power2.inOut" 
    }, 0)
    .to('.hero-content', {
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      clearProps: "opacity" 
    }, 0.2);

    if (navbar) {
        tl.to(navbar, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            clearProps: "all" 
        }, 0.2); 
    }

    if (scrollIndicators.length) {
        tl.to(scrollIndicators, {
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            clearProps: "opacity"
        }, 0.5); 
    }
  };

  const handleStartJourney = () => {
    window.scrollBy({ top: window.innerHeight * 0.45, left: 0, behavior: 'smooth' });
  };

  const renderIntroPortal = () => {
    if (introState === 'finished') return null;

    return createPortal(
      <div className="intro-video-container" ref={videoContainerRef}>
        <video 
          ref={videoRef}
          className="intro-video"
          onEnded={handleVideoEnd}
          playsInline
          muted={false} 
        >
          <source src={introVideoSrc} type="video/mp4" />
        </video>

        <div className="premium-loading-screen" ref={brandingRef}>
          <h1>FIT<span className="highlight">FUTURE</span></h1>
          <button 
            ref={enterBtnRef}
            className="audio-unlock-btn" 
            onClick={handleUserStart}
          >
            ENTER EXPERIENCE
          </button>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      {renderIntroPortal()}

      <section className="hero" ref={heroRef}>
        <div className="hero-background" style={{ opacity: introState === 'finished' ? 1 : 0 }}>
          <img src={heroImage} alt="Fit Future Hero" className="hero-image" />
        </div>

        <div className="hero-content" style={{ opacity: introState === 'finished' ? 1 : 0 }}>
          <span className="hero-tag">PREMIUM FITNESS EXPERIENCE</span>
          <h1>
            BUILD YOUR<br/>
            <span className="highlight">FUTURE.</span>
          </h1>
          <p>
            A training environment built for discipline, performance, and the relentless pursuit of strength.
          </p>
          
          <button className="primary-btn" onClick={handleStartJourney}>
            <span>START YOUR JOURNEY</span>
          </button>
        </div>
      </section>
    </>
  );
};

export default Hero;