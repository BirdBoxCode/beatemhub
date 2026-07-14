'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Width of the left spine column (Webflow's .column-left, 100px, after flex-shrink).
// The line runs down its centre, 46.5px in from the container's content edge.
const SPINE_WIDTH = 93;

// Height of a section's top padding (py-24). A lead-in line of this height drops
// the first icon to the section's content top, level with its heading.
export const SPINE_LEAD_IN = 96;

// The spine is a vertical stack of line segments separated by icons, so an icon
// always occupies the gap between two lines. Lines grow to fill whatever height
// the section has; `grow` sets their relative share of it, or `h` pins them to a
// fixed height.
export type SpineItem =
  // `background` takes any CSS background value — a flat colour or a gradient.
  | { kind: 'line'; background: string; grow?: number; h?: number }
  | { kind: 'icon'; src: string; w?: number; h?: number; glow?: string };

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  spine?: SpineItem[];
}

export function SectionWrapper({
  id,
  className,
  children,
  spine = [],
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn('relative w-full py-24 overflow-hidden', className)}>

      {/* Spine layer — spans the section's full height, padding included, so the
          line meets the neighbouring sections' lines without a break. It sits
          behind the content, which is what lets it pass under the bento boxes. */}
      {spine.length > 0 && (
        <div className="absolute inset-0 z-0 hidden md:block pointer-events-none" aria-hidden>
          <div className="max-w-[1300px] mx-auto px-5 h-full relative">
            <div
              className="absolute left-5 top-0 bottom-0 flex flex-col items-center"
              style={{ width: SPINE_WIDTH }}
            >
              {spine.map((item, i) =>
                item.kind === 'line' ? (
                  <SpineLine key={i} {...item} />
                ) : (
                  <SpineIcon key={i} {...item} />
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content — indented past the spine. Bento grids pull back out with
          -ml-[93px] so the line runs beneath them. */}
      <div className="max-w-[1300px] mx-auto px-5 relative z-10">
        <div className="md:pl-[93px]">{children}</div>
      </div>
    </section>
  );
}

function SpineLine({ background, grow = 1, h }: Extract<SpineItem, { kind: 'line' }>) {
  return (
    <motion.div
      className="w-[4px] rounded-[6px] origin-top"
      style={
        h != null
          ? { background, height: h, flex: 'none' }
          : { background, flexGrow: grow, flexBasis: 0, minHeight: 0 }
      }
      initial={{ scaleY: 0, opacity: 0 }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    />
  );
}

function SpineIcon({ src, w = SPINE_WIDTH, h, glow }: Extract<SpineItem, { kind: 'icon' }>) {
  const width = w;
  const height = h ?? w;

  return (
    <motion.div
      className="relative shrink-0"
      style={{ width, height }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
    >
      {glow && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
          style={{
            width: width * 1.8,
            height: width * 1.8,
            background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
          }}
        />
      )}
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        className="relative block"
        style={{ width, height }}
      />
    </motion.div>
  );
}
