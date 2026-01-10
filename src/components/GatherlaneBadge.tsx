import React from 'react';

export const GatherlaneBadge = () => {
  return (
    <a 
      href="https://gatherlane.com" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 px-3 py-1.5 bg-black/90 backdrop-blur-md border border-white/10 rounded-full shadow-sm hover:shadow-md hover:bg-black transition-all duration-300 group no-underline"
      aria-label="Made with Gatherlane"
    >
      <div className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-400"></span>
      </div>
      <span className="text-[10px] tracking-wider font-semibold text-white/90 group-hover:text-white">
        Built with Gatherlane
      </span>
    </a>
  );
};
