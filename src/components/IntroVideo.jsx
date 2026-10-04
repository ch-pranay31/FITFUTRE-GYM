import { useEffect, useRef, useState } from "react";
import { useIntro } from "../hooks/useIntro";

function IntroVideo() {
  const videoRef = useRef(null);

  const [hide, setHide] = useState(false);

  const { setIntroFinished } = useIntro();

  useEffect(() => {
    const video = videoRef.current;

    const handleEnd = () => {
      setHide(true);

      setTimeout(() => {
        setIntroFinished(true);
      }, 800);
    };

    video.addEventListener("ended", handleEnd);

    return () => {
      video.removeEventListener("ended", handleEnd);
    };
  }, []);

  return (
    <div className={`intro ${hide ? "hide-intro" : ""}`}>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
      >
        <source
          src={new URL("../assets/videos/intro-desktop.mp4", import.meta.url)}
          type="video/mp4"
        />
      </video>
    </div>
  );
}

export default IntroVideo;