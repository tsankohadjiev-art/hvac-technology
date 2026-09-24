"use client";

import { useRef } from "react";

const MAX_TILT_DEG = 10;

export default function TiltCard({ children, className = "" }) {
  const cardRef = useRef(null);

  function handleMouseMove(e) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * MAX_TILT_DEG * 2;
    const rotateX = (0.5 - py) * MAX_TILT_DEG * 2;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ease-out will-change-transform [transform-style:preserve-3d] ${className}`}
    >
      {children}
    </div>
  );
}
