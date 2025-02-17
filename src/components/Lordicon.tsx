"use client";
import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

interface LordiconProps {
  src: string;
  width?: number;
  height?: number;
}

const Lordicon: React.FC<LordiconProps> = ({ src, width = 100, height = 100 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const animation = lottie.loadAnimation({
        container: containerRef.current, // The DOM element to render the animation
        renderer: 'svg', // Render as SVG
        loop: true, // Loop the animation
        autoplay: true, // Autoplay the animation
        path: src, // Path to the Lottie JSON file
      });

      return () => {
        animation.destroy(); // Clean up the animation on unmount
      };
    }
  }, [src]);

  return <div ref={containerRef} style={{ width, height }}></div>;
};

export default Lordicon;