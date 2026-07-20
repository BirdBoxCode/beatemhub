'use client';

import Image from 'next/image';
import { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
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

// Each segment draws from scroll position rather than a one-shot on-enter reveal:
// its fill tracks a fixed band in the lower-middle of the viewport, so the whole
// spine draws top-to-bottom as one continuous stroke and neighbouring segments
// (across section seams) hand off without gaps or premature fills.
function SpineLine({ background, grow = 1, h }: Extract<SpineItem, { kind: 'line' }>) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // Both edges map to the same viewport line (68% down), so every segment fills
  // exactly as that single "sweep line" crosses it. Everything above the line is
  // full, everything below empty — the whole spine reads as one unbroken stroke,
  // regardless of how tall each segment is.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 68%', 'end 68%'] });

  // Peak-hold: the fill only ever advances, so scrolling back up never retracts
  // the line.
  const peak = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v > peak.get()) peak.set(v);
  });
  // Overdamped spring for the fluid trailing. Soft + a little mass ⇒ the draw
  // lags well behind the scroll and eases down slowly (not a fast 1:1 fill), and
  // keeps easing for a beat after the user stops. Still overdamped ⇒ never
  // overshoots/retracts. The snap-to-1-on-completion below is unaffected, so
  // segments still can't break.
  const springed = useSpring(peak, { stiffness: 32, damping: 20, mass: 1.4 });
  // A segment SNAPS to fully-drawn the instant the sweep passes its bottom
  // (peak === 1), so the next segment can never start before this one is solid —
  // only the single active front segment ever trails, which keeps the whole spine
  // one unbroken line (no "broken / loading-in-two-places" gaps).
  const trailed = useTransform([peak, springed], ([p, s]: number[]) => (p >= 1 ? 1 : s));
  // Fixed-height lead-ins are short — map them straight to the sweep so they never
  // pop; only the tall grow-lines carry the visible trail.
  const scaleY = h != null ? peak : trailed;

  const sizeStyle =
    h != null
      ? { height: h, flex: 'none' as const }
      : { flexGrow: grow, flexBasis: 0, minHeight: 0 };

  return (
    <motion.div
      ref={ref}
      // Square ends (no rounded caps): domed caps pinch inward where two segments
      // meet at a section seam, which reads as a nick/break in the line.
      className="w-[4px] origin-top"
      style={{ background, scaleY: reduceMotion ? 1 : scaleY, ...sizeStyle }}
    />
  );
}

function SpineIcon({ src, w = SPINE_WIDTH, h, glow }: Extract<SpineItem, { kind: 'icon' }>) {
  const width = w;
  const height = h ?? w;

  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // Fade in across a narrow band centred on the same 68% sweep line, so each
  // icon appears just as the drawing stroke reaches its gap.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 71%', 'end 65%'] });
  // Peak-hold, mapped straight to opacity so the icon lights up exactly as the
  // sweep reaches its gap and stays lit on scroll-up (no retract, no lag).
  const peak = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v > peak.get()) peak.set(v);
  });
  const opacity = peak;

  return (
    <motion.div
      ref={ref}
      className="relative shrink-0"
      style={{ width, height, opacity: reduceMotion ? 1 : opacity }}
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
