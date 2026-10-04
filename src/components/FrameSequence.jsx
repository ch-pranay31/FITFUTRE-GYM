import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import frames from "../utils/loadFrames";
import segments from "../utils/segments";

gsap.registerPlugin(ScrollTrigger);

function FrameSequence() {
  const [frame, setFrame] = useState(0);
  const currentIndex = useRef(0);
  const playhead = useRef({ frame: 0 });
  const isAnimating = useRef(false);

  useEffect(() => {
    const handleNativeScroll = (e) => {
      if (isAnimating.current) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener("wheel", handleNativeScroll, { passive: false });
    window.addEventListener("touchmove", handleNativeScroll, { passive: false });

    const cards = gsap.utils.toArray(".feature-card");
    gsap.set(cards, { autoAlpha: 0, y: 40 });

    const dynamicSegments = segments.map((seg) => ({
      ...seg,
      end: seg.end === -1 ? frames.length - 1 : seg.end,
    }));

    const stops = [
      { frame: 0, activeCard: -1 },
      { frame: dynamicSegments[0].end, activeCard: 0 },
      { frame: dynamicSegments[1].end, activeCard: 1 },
      { frame: dynamicSegments[2].end, activeCard: 2 },
      { frame: dynamicSegments[3].end, activeCard: 3 },
      { frame: dynamicSegments[4].end, activeCard: 4 },
    ];

    const animateToStop = (index) => {
      isAnimating.current = true;

      const target = stops[index];

      gsap.to(playhead.current, {
        frame: target.frame,
        duration: 1.2,
        ease: "power2.inOut",
        onUpdate: () => setFrame(Math.round(playhead.current.frame)),
        onComplete: () => {
          isAnimating.current = false;
        },
      });

      cards.forEach((card, i) => {
        gsap.to(card, {
          autoAlpha: i === target.activeCard ? 1 : 0,
          y: i === target.activeCard ? 0 : 40,
          duration: 0.6,
          ease: "power2.out",
          overwrite: true,
        });
      });
    };

    ScrollTrigger.create({
      trigger: ".sticky-stage",
      start: "top top",
      end: "+=5000",
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        if (isAnimating.current) return;

        let targetIndex = Math.floor(self.progress * stops.length);
        targetIndex = Math.min(targetIndex, stops.length - 1);

        if (targetIndex > currentIndex.current + 1) {
          targetIndex = currentIndex.current + 1;
        } else if (targetIndex < currentIndex.current - 1) {
          targetIndex = currentIndex.current - 1;
        }

        if (targetIndex !== currentIndex.current) {
          currentIndex.current = targetIndex;
          animateToStop(targetIndex);
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener("wheel", handleNativeScroll);
      window.removeEventListener("touchmove", handleNativeScroll);
    };
  }, []);

  return (
    <div className="frame-sequence">
      <img
        src={frames[Math.round(frame)]}
        alt="Fit Future Cinematic Barbell Sequence"
      />
    </div>
  );
}

export default FrameSequence;