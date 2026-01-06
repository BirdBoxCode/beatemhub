'use client';

import Image from 'next/image';
import { Marquee } from '@/components/Marquee';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

    const nextSlide = () => setCurrent((prev) => (prev + 1) % references.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + references.length) % references.length);

    return (
        <section id="references" className="relative w-full py-20 overflow-hidden">
            <div className="max-w-[1300px] mx-auto px-5">
                
                {/* Header */}
                <div className="grid md:grid-cols-2 gap-10 mb-20">
                     {/* Decoration */}
                     <div className="hidden md:flex flex-col items-center w-[100px] shrink-0 gap-6">
                        <Image src="/images/green-char-side.png" alt="" width={80} height={200} className="object-contain" />
                        <div className="h-20 w-px bg-white/10" />
                    </div>
                    
                    <div>
                        <h3 className="text-xl font-bold font-roboto text-white mb-4">References</h3>
                        <h2 className="text-4xl md:text-6xl font-kode-mono font-bold leading-tight uppercase">
                            <span className="text-white">SAFE SPACES</span><br />
                            <span className="text-white">FOR DEATH MATCHES</span>
                        </h2>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-4 gap-6">
                    
                    {/* Text Box */}
                    <div className="bg-bento-background border border-border rounded-[20px] p-8 flex flex-col justify-between">
                         <p className="text-lg text-font-gray leading-relaxed">
                            <strong className="text-white">Our team of industry experts</strong> ensure an unforgettable experience at your event. From parties & festivals to conferences, we bring nostalgia, and excitement with our cutting-edge gaming setups, retro arcades, and immersive entertainment.
                         </p>
                    </div>

                    {/* Video Carousel */}
                    <div className="lg:col-span-2 relative aspect-video bg-black rounded-[20px] overflow-hidden group">
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

                        {/* Controls */}
                        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                             <button onClick={prevSlide} className="pointer-events-auto bg-black/50 p-2 rounded-full hover:bg-white/20 transition-colors">
                                 <ChevronLeft className="text-white" />
                             </button>
                             <button onClick={nextSlide} className="pointer-events-auto bg-black/50 p-2 rounded-full hover:bg-white/20 transition-colors">
                                 <ChevronRight className="text-white" />
                             </button>
                        </div>
                    </div>

                    {/* Visual/Partner Box */}
                    <div className="bg-bento-background border border-border rounded-[20px] p-8 flex items-center justify-center">
                         <div className="w-full">
                             <Marquee items={partners} />
                         </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
