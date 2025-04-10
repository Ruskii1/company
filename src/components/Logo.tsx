
import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function Logo({ className = '', showText = true, size = 'medium' }: LogoProps) {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'h-8';
      case 'medium':
        return 'h-12';
      case 'large':
        return 'h-20';
      default:
        return 'h-12';
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/42765535-98d3-42b9-b5f3-a02b2fa4cd3c.png" 
        alt="TruckIt Logo" 
        className={`${getSizeClass()} w-auto object-contain brightness-110 contrast-110`}
      />
      {showText && (
        <span className="ml-2 font-bold text-xl text-primary hidden md:block">TruckIt</span>
      )}
    </div>
  );
}
