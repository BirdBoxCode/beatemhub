'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// A marker (character / triangle) that sits on the spine line
export interface SpineMarker {
  src: string;
  size: number;        // rendered width in px
  top: string;         // CSS top within the section rail (e.g. '0px', '40%')
  glow?: string;       // rgba() for the radial glow behind the marker; omit for none
}

// Per-section line gradients (top -> bottom), matching the Webflow div-blocks
const lineGradients = {
  intro: 'linear-gradient(180deg, #df0edb 0%, #a3d3ff 100%)',   // medium-orchid -> blue
  services: 'linear-gradient(180deg, #a3faff 0%, #a3ffc3 100%)',// cyan -> green
  green: 'linear-gradient(180deg, #a3ffc3 0%, #a3ffc3 100%)',   // green
  gg: 'linear-gradient(180deg, #a3ffc3 25%, #a3d3ff 100%)',     // green -> blue
  blue: 'linear-gradient(180deg, #a3d3ff 0%, #a3d3ff 100%)',    // blue
} as const;

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  line?: keyof typeof lineGradients;
  markers?: SpineMarker[];
  noLine?: boolean;
}

export function SectionWrapper({
  id,
  className,
  children,
  line = 'green',
  markers = [],
  noLine = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full py-24 overflow-hidden",
        className
      )}
    >
      <div className="max-w-[1240px] mx-auto px-5 relative h-full">

        {/* Left spine (line + character markers) — sits behind content */}
        {!noLine && (
          <div className="absolute left-[64px] top-0 bottom-0 w-0 z-0 hidden md:block pointer-events-none">
            {/* The line — reveals downward as it scrolls into view */}
            <motion.div
              className="absolute left-0 top-0 -translate-x-1/2 w-[4px] h-full rounded-[6px] origin-top"
              style={{ backgroundImage: lineGradients[line] }}
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />

            {/* Character / triangle markers */}
            {markers.map((m, i) => (
              <motion.div
                key={i}
                className="absolute left-0 -translate-x-1/2 -translate-y-1/2"
                style={{ top: m.top, width: m.size, height: m.size }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
              >
                {m.glow && (
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
                    style={{
                      width: m.size * 1.8,
                      height: m.size * 1.8,
                      background: `radial-gradient(circle, ${m.glow} 0%, transparent 70%)`,
                    }}
                  />
                )}
                <Image
                  src={m.src}
                  alt=""
                  width={m.size}
                  height={m.size}
                  className="relative block"
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Content — above the spine */}
        <div className="relative z-10 md:pl-[100px]">
          {children}
        </div>
      </div>
    </section>
  );
}
