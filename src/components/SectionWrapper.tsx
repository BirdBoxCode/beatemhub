'use client';

import { cn } from '@/lib/utils';


interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  lineColor?: 'pink' | 'blue' | 'green' | 'purple' | 'pinkToBlue'; // Preset gradients
  noLine?: boolean;
}

const gradients = {
  pink: 'linear-gradient(to bottom, transparent 0%, rgb(223, 14, 219) 20%, rgb(223, 14, 219) 80%, transparent 100%)',
  pinkToBlue: 'linear-gradient(to bottom, transparent 0%, rgb(223, 14, 219) 10%, rgb(223, 14, 219) 40%, rgb(163, 211, 255) 100%)',
  blue: 'linear-gradient(to bottom, transparent 0%, rgb(163, 211, 255) 20%, rgb(163, 211, 255) 80%, transparent 100%)',
  green: 'linear-gradient(to bottom, transparent 0%, rgb(163, 255, 195) 20%, rgb(163, 255, 195) 80%, transparent 100%)',
  purple: 'linear-gradient(to bottom, transparent 0%, rgb(198, 163, 255) 20%, rgb(198, 163, 255) 80%, transparent 100%)',
};

export function SectionWrapper({ 
  id, 
  className, 
  children, 
  lineColor = 'pink',
  noLine = false 
}: SectionWrapperProps) {
  return (
    <section 
      id={id} 
      className={cn(
        "relative w-full py-20 overflow-hidden", // Base padding consistent with site rhythm
        className
      )}
    >
      <div className="max-w-[1240px] mx-auto px-5 relative h-full">
        
        {/* Left Vertical Line Graphic */}
        {!noLine && (
          <div 
            className="absolute left-[20px] md:left-[64px] top-0 bottom-0 w-[4px] z-0 hidden md:block" // Hidden on mobile if it clashes, or adjust left
            style={{ background: gradients[lineColor] }}
          />
        )}
        
        {/* Content Container - Pushed to right of line on desktop */}
        <div className="relative z-10 md:pl-[100px]">
            {children}
        </div>
      </div>
    </section>
  );
}
