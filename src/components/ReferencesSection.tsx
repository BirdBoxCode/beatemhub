'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionWrapper, SPINE_LEAD_IN } from '@/components/SectionWrapper';

const references = [
   "https://customer-ui5gikvnytrm15ts.cloudflarestream.com/2d2dd44597b94de6653594f14b2bde9d/iframe?poster=https%3A%2F%2Fcustomer-ui5gikvnytrm15ts.cloudflarestream.com%2F2d2dd44597b94de6653594f14b2bde9d%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600",
   "https://customer-ui5gikvnytrm15ts.cloudflarestream.com/a92a765cef4f47ab979e4e0eb4daa116/iframe?poster=https%3A%2F%2Fcustomer-ui5gikvnytrm15ts.cloudflarestream.com%2Fa92a765cef4f47ab979e4e0eb4daa116%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600",
   "https://customer-ui5gikvnytrm15ts.cloudflarestream.com/7ed1709dfc77b052bc48b18af81e701a/iframe?poster=https%3A%2F%2Fcustomer-ui5gikvnytrm15ts.cloudflarestream.com%2F7ed1709dfc77b052bc48b18af81e701a%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600",
   "https://customer-ui5gikvnytrm15ts.cloudflarestream.com/9488aa77a5d2e5649bc6923fb9854140/iframe?poster=https%3A%2F%2Fcustomer-ui5gikvnytrm15ts.cloudflarestream.com%2F9488aa77a5d2e5649bc6923fb9854140%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600",
   "https://customer-ui5gikvnytrm15ts.cloudflarestream.com/309b628dd62251b26d56e877b7833d62/iframe?poster=https%3A%2F%2Fcustomer-ui5gikvnytrm15ts.cloudflarestream.com%2F309b628dd62251b26d56e877b7833d62%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
];

const partners = [
    '/images/huxleys-logo.png',
    '/images/AM-Logo.png',
    '/images/prime-logo.png',
    '/images/OG-tag-share-1594811621390-2.png',
    '/images/Civo-Logo.png'
];

// Video and logo run the same variants off the same direction, so the pair
// moves as one unit.
const slideVariants = {
    enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -40 : 40 }),
};

const SLIDE_TRANSITION = { duration: 0.45, ease: [0.4, 0, 0.2, 1] as const };

export function ReferencesSection() {
    // One index drives both the video and the partner logo — references[i] is
    // that partner's event, matching the slide order of the original sliders.
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);

    const paginate = (step: number) => {
        setDirection(step);
        setCurrent((prev) => (prev + step + references.length) % references.length);
    };

    const goTo = (index: number) => {
        setDirection(index > current ? 1 : -1);
        setCurrent(index);
    };

    return (
        <SectionWrapper
            id="references"
            spine={[
                { kind: 'line', background: '#a3ffc3', h: SPINE_LEAD_IN },
                { kind: 'icon', src: '/images/green-char-side.png', glow: 'rgba(163,255,195,0.5)' },
                { kind: 'line', background: '#a3ffc3' },
            ]}
        >

            {/* Header */}
            <div className="grid md:grid-cols-2 gap-10 mb-20">
                <div>
                    <h3 className="mb-4">References</h3>
                    <h2>
                        <span className="text-green">SAFE SPACES</span><br />
                        <span className="text-white">FOR DEATH MATCHES</span>
                    </h2>
                </div>
            </div>

            {/* Bento Grid — matches Webflow .main_design_grid.col4 (4 cols x 3 rows).
                Bleeds left past the spine, so the line runs under it. */}
            <div className="md:-ml-[93px] grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-3 gap-5">

                {/* Text Box — spans 2 cols / 3 rows (tall left half) */}
                <div className="lg:col-span-2 lg:row-span-3 bg-bento-bg border border-border rounded-[15px] px-10 py-5 flex flex-col justify-center">
                     <p className="text-lg text-font-gray leading-relaxed">
                        <strong className="text-white">Our team of industry experts</strong> ensure an unforgettable experience at your event. From parties & festivals to conferences, we bring nostalgia, and excitement with our cutting-edge gaming setups, retro arcades, and immersive entertainment.
                     </p>
                </div>

                {/* Reference Carousel — spans 2 cols / 3 rows (tall right half).
                    Video and partner logo share one card and one index. */}
                <div className="lg:col-span-2 lg:row-span-3 flex flex-col bg-bento-bg border border-border rounded-[15px] overflow-hidden">

                    {/* Video */}
                    <div className="relative aspect-video w-full overflow-hidden">
                        <AnimatePresence initial={false} mode="popLayout" custom={direction}>
                            <motion.div
                                key={current}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={SLIDE_TRANSITION}
                                className="absolute inset-0"
                            >
                                <iframe
                                    src={references[current]}
                                    className="w-full h-full border-0"
                                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                                    allowFullScreen
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-border shrink-0" />

                    {/* Partner logo + shared controls */}
                    <div className="relative flex flex-1 items-center gap-2 px-3 pt-4 pb-8">
                        <button
                            onClick={() => paginate(-1)}
                            aria-label="Previous reference"
                            className="shrink-0 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <ChevronLeft />
                        </button>

                        <div className="relative flex-1 h-[60px] overflow-hidden">
                            <AnimatePresence initial={false} mode="popLayout" custom={direction}>
                                <motion.div
                                    key={current}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={SLIDE_TRANSITION}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={partners[current]}
                                        alt={`Partner ${current + 1} logo`}
                                        fill
                                        className="object-contain"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <button
                            onClick={() => paginate(1)}
                            aria-label="Next reference"
                            className="shrink-0 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <ChevronRight />
                        </button>

                        {/* Dots */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                            {references.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    aria-label={`Go to reference ${i + 1}`}
                                    aria-current={i === current}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        i === current ? 'w-5 bg-green' : 'w-1.5 bg-white/25 hover:bg-white/50'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </SectionWrapper>
    );
}
