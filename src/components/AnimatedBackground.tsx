
import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Vibrant gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50/30 to-pink-50/20 animate-background-pan opacity-80"
      />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top-right decorative shape */}
        <div 
          className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/3 animate-float"
        />
        
        {/* Bottom-left decorative shape */}
        <div 
          className="absolute bottom-0 left-0 w-80 h-80 bg-purple-200/40 rounded-full filter blur-3xl translate-y-1/3 -translate-x-1/4 animate-float"
          style={{ animationDelay: '2s' }}
        />
        
        {/* Center decorative shape */}
        <div 
          className="absolute top-1/3 left-1/2 w-64 h-64 bg-pink-200/20 rounded-full filter blur-3xl -translate-x-1/2 animate-pulse-soft"
        />
        
        {/* Extra decorative shape */}
        <div 
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-teal-200/20 rounded-full filter blur-3xl animate-float"
          style={{ animationDelay: '3s' }}
        />
        
        {/* Small floating elements */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-6 h-6 bg-blue-200/60 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${6 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.4 + Math.random() * 0.6,
              transform: `scale(${0.5 + Math.random() * 1.5})`,
              background: `rgba(${100 + Math.random() * 155}, ${100 + Math.random() * 155}, ${200 + Math.random() * 55}, ${0.3 + Math.random() * 0.3})`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
