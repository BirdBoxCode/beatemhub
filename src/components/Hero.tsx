'use client';

import Image from 'next/image';
import { useMemo, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

/* Deterministic PRNG so the starfield is identical on server + client (no hydration mismatch). */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Star = { x: number; y: number; size: number; delay: number; duration: number; bright: boolean };

function useStarfield(count: number): Star[] {
  return useMemo(() => {
    const rand = mulberry32(1337);
    return Array.from({ length: count }, () => {
      const bright = rand() > 0.9;
      return {
        x: rand() * 100,
        y: rand() * 100,
        size: bright ? 2 + rand() * 2 : 0.6 + rand() * 1.4,
        delay: rand() * 6,
        duration: 2.5 + rand() * 4,
        bright,
      };
    });
  }, [count]);
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  const stars = useStarfield(90);

  // Normalised cursor position within the hero: -0.5 (left/top) .. 0.5 (right/bottom).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  // Raw cursor position as a percentage, driving the light "spotlight".
  const lightX = useMotionValue(50);
  const lightY = useMotionValue(38);

  const spring = { stiffness: 55, damping: 18, mass: 0.9 };
  const sx = useSpring(mx, spring);
  const sy = useSpring(my, spring);
  const lx = useSpring(lightX, { stiffness: 120, damping: 22 });
  const ly = useSpring(lightY, { stiffness: 120, damping: 22 });

  // 3D tilt of the whole diorama toward the cursor.
  const rotateY = useTransform(sx, [-0.5, 0.5], [-13, 13]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [9, -9]);

  // Per-layer parallax drift — deeper layers move less, the logo moves most.
  const starX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const starY = useTransform(sy, [-0.5, 0.5], [-10, 10]);
  const portalX = useTransform(sx, [-0.5, 0.5], [-30, 30]);
  const portalY = useTransform(sy, [-0.5, 0.5], [-24, 24]);
  const logoX = useTransform(sx, [-0.5, 0.5], [-60, 60]);
  const logoY = useTransform(sy, [-0.5, 0.5], [-48, 48]);

  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${lx}% ${ly}%, rgba(52,231,228,0.045), rgba(223,14,219,0.022) 38%, transparent 60%)`;

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const rect = sceneRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    mx.set(px - 0.5);
    my.set(py - 0.5);
    lightX.set(px * 100);
    lightY.set(py * 100);
  }

  function handlePointerLeave() {
    mx.set(0);
    my.set(0);
    lightX.set(50);
    lightY.set(38);
  }

  const floatIdle = reduceMotion
    ? undefined
    : { y: [0, -14, 0], rotateZ: [-1.2, 1.2, -1.2] };

  return (
    <section
      id="home"
      ref={sceneRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full overflow-hidden flex items-center justify-center min-h-[640px] h-screen"
    >
      {/* Deep-space backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 22%, #1b0f2e 0%, #120a1f 42%, #0b0710 72%, #0e090e 100%)',
        }}
      />
      {/* Nebula bloom behind the portal */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(50% 42% at 50% 40%, rgba(94,15,189,0.35), transparent 70%), radial-gradient(38% 34% at 62% 48%, rgba(223,14,219,0.18), transparent 70%)',
        }}
      />

      {/* Starfield layer (parallax) */}
      <motion.div className="absolute inset-0" style={{ x: starX, y: starY }} aria-hidden>
        {stars.map((s, i) => (
          <span
            key={i}
            className="beh-star absolute rounded-full"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              background: s.bright ? '#c6a3ff' : '#fcfaff',
              boxShadow: s.bright
                ? '0 0 6px 1px rgba(198,163,255,0.9)'
                : '0 0 3px rgba(252,250,255,0.6)',
              animation: `beh-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </motion.div>

      {/* Drifting embers for a touch of life */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        {[12, 28, 44, 61, 78, 90].map((left, i) => (
          <span
            key={i}
            className="beh-ember absolute bottom-[-20px] rounded-full"
            style={{
              left: `${left}%`,
              width: 3 + (i % 3),
              height: 3 + (i % 3),
              background: i % 2 ? '#34e7e4' : '#df0edb',
              boxShadow: `0 0 8px 2px ${i % 2 ? 'rgba(52,231,228,0.7)' : 'rgba(223,14,219,0.7)'}`,
              animation: `beh-drift ${9 + i * 1.4}s linear ${i * 1.6}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Cursor-tracked spotlight */}
      <motion.div
        className="absolute inset-0 mix-blend-screen pointer-events-none"
        style={{ background: spotlight }}
        aria-hidden
      />

      {/* 3D stage */}
      <div className="relative w-full h-full [perspective:1200px]" style={{ transformStyle: 'preserve-3d' }}>
        <motion.div
          className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d]"
          style={{ rotateX, rotateY }}
        >
          {/* Portal (mid plane) */}
          <motion.div
            className="absolute w-[92vw] max-w-[1040px] [transform-style:preserve-3d]"
            style={{ x: portalX, y: portalY, aspectRatio: '500 / 303', translateZ: -60 }}
          >
            <motion.div
              className="relative w-full h-full"
              animate={reduceMotion ? undefined : { rotate: 360, scale: [1, 1.035, 1] }}
              transition={
                reduceMotion
                  ? undefined
                  : {
                      rotate: { duration: 150, ease: 'linear', repeat: Infinity },
                      scale: { duration: 11, ease: 'easeInOut', repeat: Infinity },
                    }
              }
            >
              <Image
                src="/images/section-landing-radial.png"
                alt=""
                fill
                sizes="(max-width: 768px) 92vw, 1040px"
                className="object-contain select-none"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Logo (front plane) */}
          <motion.div
            className="relative [transform-style:preserve-3d]"
            style={{ x: logoX, y: logoY, translateZ: 80 }}
          >
            <motion.div
              className="relative w-[220px] h-[220px] md:w-[320px] md:h-[320px]"
              animate={floatIdle}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 7, ease: 'easeInOut', repeat: Infinity }
              }
              style={{
                filter:
                  'drop-shadow(0 0 18px rgba(52,231,228,0.55)) drop-shadow(0 0 42px rgba(223,14,219,0.45))',
              }}
            >
              <Image
                src="/images/Logo-colors.png"
                alt="Beat Em Hub"
                fill
                sizes="(max-width: 768px) 220px, 320px"
                className="object-contain select-none"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Vignette for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(14,9,14,0.85) 100%)' }}
        aria-hidden
      />

      {/* Bottom blend into the next section (#0e090e) for a seamless seam */}
      <div
        className="absolute inset-x-0 bottom-0 h-[38%] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(14,9,14,0) 0%, rgba(14,9,14,0.7) 55%, #0e090e 100%)' }}
        aria-hidden
      />

      {/* Scroll cue */}
      {!reduceMotion && (
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity }}
          aria-hidden
        >
          <span className="text-[11px] tracking-[3px] font-mono text-font-gray uppercase">Scroll</span>
          <span className="block w-5 h-8 rounded-full border border-white/30 relative">
            <span className="absolute left-1/2 top-1.5 -translate-x-1/2 w-1 h-1.5 rounded-full bg-[#34e7e4]" />
          </span>
        </motion.div>
      )}
    </section>
  );
}
