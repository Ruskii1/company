
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
        return 'h-10';
      case 'large':
        return 'h-16';
      default:
        return 'h-10';
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <img 
        src="/lovable-uploads/f90e0ae4-277c-44a0-99d3-29f89b50a226.png" 
        alt="TruckIt Logo" 
        className={`${getSizeClass()} w-auto object-contain`}
      />
    </div>
  );
}
