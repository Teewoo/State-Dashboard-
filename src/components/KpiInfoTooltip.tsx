import React, { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';

interface KpiInfoTooltipProps {
  content: string;
  title?: string;
}

export const KpiInfoTooltip: React.FC<KpiInfoTooltipProps> = ({ content, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center shrink-0"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        aria-label={title ? `Information about ${title}` : 'Metric information'}
        aria-expanded={isOpen}
        className="p-0.5 text-[#9CA3AF] hover:text-[#4F46E5] focus:text-[#4F46E5] focus:outline-none transition-colors rounded-full"
      >
        <Info className="w-3.5 h-3.5" />
      </button>

      {isOpen && (
        <div
          role="tooltip"
          className="absolute right-0 top-full mt-1.5 z-50 w-64 p-3 bg-[#111827] text-white text-[11px] leading-relaxed rounded-lg shadow-xl border border-gray-700/80 pointer-events-auto select-text"
          onClick={(e) => e.stopPropagation()}
        >
          {title && (
            <div className="font-semibold text-gray-200 mb-1 border-b border-gray-700 pb-1 text-[11px]">
              {title}
            </div>
          )}
          <p className="text-gray-300 font-normal">{content}</p>
        </div>
      )}
    </div>
  );
};
