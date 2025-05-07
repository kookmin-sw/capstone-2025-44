import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { scalingState } from "@/recoil/atoms/scaling-state";
import { colorTheme } from "@/style/color-theme";

export const ScalingControl = () => {
  const [scaling, setScaling] = useRecoilState(scalingState);
  const [startDistance, setStartDistance] = useState<number | null>(null);
  const [startScale, setStartScale] = useState<number>(1.0);
  const [showIndicator, setShowIndicator] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  //멀티터치 줌 제스처 처리
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const distance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        setStartDistance(distance);
        setStartScale(scaling.scale);
        setShowIndicator(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && startDistance) {
        const distance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        
        const newScale = Math.min(
          Math.max(startScale * (distance / startDistance), 1.0),
          2.0
        );
        
        setScaling({ scale: newScale });
        
        e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      setStartDistance(null);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        setShowIndicator(false);
      }, 1500);
    };

    document.addEventListener("touchstart", handleTouchStart, { passive: false });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [scaling, startDistance, startScale, setScaling]);

  const scalePercentage = Math.round(scaling.scale * 100);

  return (
    <>
      {showIndicator && (
        <ScaleIndicator>
          {scalePercentage}%
        </ScaleIndicator>
      )}
    </>
  );
};

const ScaleIndicator = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 1.2rem;
  z-index: 2000;
  pointer-events: none;
`;
