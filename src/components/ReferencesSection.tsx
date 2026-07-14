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

export function ReferencesSection() {
    const [current, setCurrent] = useState(0);
    const [partner, setPartner] = useState(0);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % references.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + references.length) % references.length);
    const nextPartner = () => setPartner((prev) => (prev + 1) % partners.length);
    const prevPartner = () => setPartner((prev) => (prev - 1 + partners.length) % partners.length);

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
                <div className="md:col-start-2 col-span-2">
                    <h3 className="mb-4">References</h3>
                    <h2>
                        <span className="text-white">SAFE SPACES</span><br />
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

                {/* Video Carousel — spans 2 cols / 2 rows (top-right) */}
                <div className="lg:col-span-2 lg:row-span-2 relative aspect-video bg-bento-bg border border-border rounded-[15px] overflow-hidden">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <iframe
                                src={references[current]}
                                className="w-full h-full border-0"
                                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                                allowFullScreen
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Controls (always visible, like Webflow slider arrows) */}
                    <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                         <button onClick={prevSlide} aria-label="Previous video" className="pointer-events-auto bg-black/40 p-2 rounded-full hover:bg-white/20 transition-colors">
                             <ChevronLeft className="text-white" />
                         </button>
                         <button onClick={nextSlide} aria-label="Next video" className="pointer-events-auto bg-black/40 p-2 rounded-full hover:bg-white/20 transition-colors">
                             <ChevronRight className="text-white" />
                         </button>
                    </div>
                </div>

                {/* Partner Logo Slider — spans 2 cols / 1 row (bottom-right) */}
                <div className="lg:col-span-2 lg:row-span-1 relative bg-bento-bg border border-border rounded-[15px] py-2.5 flex items-center">
                    <button onClick={prevPartner} aria-label="Previous partner" className="absolute left-3 z-10 p-2 text-white hover:opacity-70 transition-opacity">
                        <ChevronLeft />
                    </button>

                    <div className="flex-1 flex items-center justify-center px-12 min-h-[80px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={partner}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="relative h-[60px] w-full"
                            >
                                <Image
                                    src={partners[partner]}
                                    alt="Partner logo"
                                    fill
                                    className="object-contain"
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <button onClick={nextPartner} aria-label="Next partner" className="absolute right-3 z-10 p-2 text-white hover:opacity-70 transition-opacity">
                        <ChevronRight />
                    </button>
                </div>

            </div>
        </SectionWrapper>
    );
}
