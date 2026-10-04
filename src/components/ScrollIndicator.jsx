import React, { useState, useEffect } from 'react';

export default function ScrollIndicator() {
  const [isIdle, setIsIdle] = useState(false);
  const [scrollState, setScrollState] = useState('top'); // Tracks if we are at 'top', 'middle', or 'bottom'

  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      // Immediately hide indicators when scrolling starts
      setIsIdle(false);
      clearTimeout(timeoutId);

      // Determine current scroll position
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      // 50px threshold buffer for top and bottom detection
      if (scrollY <= 50) {
        setScrollState('top');
      } else if (scrollY >= maxScroll - 50) {
        setScrollState('bottom');
      } else {
        setScrollState('middle');
      }

      // Set new timer to show the indicator after 2 seconds of inactivity
      timeoutId = setTimeout(() => {
        setIsIdle(true);
      }, 2000);
    };

    // Trigger calculation initially on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Re-calculate on window resize in case the document height changes
    window.addEventListener('resize', handleScroll, { passive: true }); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Reusable structure for both Left and Right indicators
  const IndicatorGroup = ({ position }) => {
    const isLeft = position === 'left';
    
    return (
      <div style={{
        position: 'fixed',
        [isLeft ? 'left' : 'right']: '4%',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '180px', // Fixed height to prevent layout shifts as elements fade
        opacity: isIdle ? 1 : 0,
        transition: 'opacity 0.8s ease-in-out',
        pointerEvents: 'none',
        zIndex: 9998
      }}>
        
        {/* UP INDICATOR */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: (scrollState === 'middle' || scrollState === 'bottom') ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to top, #ff3a00, transparent)' }}></div>
          <span style={{
            writingMode: 'vertical-rl',
            color: '#FFFFFF',
            fontSize: '0.55rem',
            letterSpacing: '0.25em',
            fontWeight: '700',
            transform: 'rotate(180deg)' // Flips the text to read properly going UP
          }}>UP</span>
        </div>

        {/* SUBTLE CENTER DOT (for visual anchor) */}
        <div style={{
          width: '3px',
          height: '3px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          opacity: scrollState === 'middle' ? 1 : 0,
          transition: 'opacity 0.5s ease'
        }}></div>

        {/* DOWN INDICATOR */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: (scrollState === 'top' || scrollState === 'middle') ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}>
          <span style={{
            writingMode: 'vertical-rl',
            color: '#FFFFFF',
            fontSize: '0.55rem',
            letterSpacing: '0.25em',
            fontWeight: '700'
          }}>DOWN</span>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #ff3a00, transparent)' }}></div>
        </div>

      </div>
    );
  };

  return (
    <>
      <IndicatorGroup position="left" />
      <IndicatorGroup position="right" />
    </>
  );
}