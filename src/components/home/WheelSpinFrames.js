"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 12;
const FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) => `/home/wheel-frames/f${String(i + 1).padStart(2, "0")}.webp`);
const FPS = 10;

export default function WheelSpinFrames({ className = "" }) {
  const [frame, setFrame] = useState(0);
  const dirRef = useRef(1);
  const rootRef = useRef(null);

  useEffect(() => {
    FRAMES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    let id = null;
    let isVisible = false;

    const tick = () => {
      setFrame((prev) => {
        let next = prev + dirRef.current;
        if (next >= FRAME_COUNT - 1 || next <= 0) {
          dirRef.current *= -1;
        }
        return next;
      });
    };

    const start = () => {
      if (id === null) id = setInterval(tick, 1000 / FPS);
    };
    const stop = () => {
      if (id !== null) {
        clearInterval(id);
        id = null;
      }
    };

    // only animate while this element is actually scrolled into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && document.visibilityState === "visible") start();
        else stop();
      },
      { threshold: 0.1 }
    );
    if (rootRef.current) observer.observe(rootRef.current);

    // and pause whenever the tab itself is backgrounded
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible" && isVisible) start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img ref={rootRef} src={FRAMES[frame]} alt="BMW M3 driving" className={className} />
  );
}
