'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '@/components/SectionWrapper';

const services = [
  {
    id: 'retro',
    label: 'Retro Gaming',
    title: 'Retro Gaming',
    description: 'Tickle that nostalgia bone by bringing the much loved retro consoles to your gaming area. Whether it be an N64, PS1, or even Time Crisis on a Light Gun Arcade, our vintage setups guarantee a trip down memory lane!',
    image: '/images/retro.png'
  },
  {
    id: 'highend',
    label: 'High-End Gaming',
    title: 'High End Gaming',
    description: 'Experience premium gaming with top-tier PCs, next-gen consoles, and pro setups.',
    image: '/images/high-end.png'
  },
  {
    id: 'vr',
    label: 'Virtual and Mixed Reality (XR)',
    title: 'Virtual and Mixed Reality (XR)',
    description: 'Immerse your audience with cutting-edge VR and AR experiences.',
    image: '/images/virtual-and-mixed-reality.png'
  },
  {
    id: 'tournaments',
    label: 'Tournaments',
    title: 'Moderated Tournaments',
    description: 'Bring everyone together for an exciting tournament!',
    image: '/images/tournaments.png'
  },
  {
    id: 'chillout',
    label: 'Chillout Areas',
    title: 'Chillout Areas',
    description: 'Cosy chill areas, ambient lighting, and a space designed for unwinding and connecting.',
    image: '/images/chillout-areas.png'
  },
  {
    id: 'deco',
    label: 'Decoration & Infrastructure',
    title: 'Decoration & Infrastructure',
    description: 'Transform your venue with themed decor, seamless setups, and everything needed to create a perfect gaming atmosphere.',
    image: '/images/decoration--infrastructure.png'
  }
];

export function ServicesSection() {
  const [activeId, setActiveId] = useState(services[0].id);
  const activeService = services.find(s => s.id === activeId) || services[0];

  return (
    <SectionWrapper id="services" lineColor="blue">
        
       {/* Background Graphic (Blue Character) - Kept absolute but relative to wrapper */}
       <div className="absolute left-[-40px] top-10 pointer-events-none hidden md:block opacity-50">
          <Image src="/images/blue-char-side.png" alt="" width={80} height={200} className="object-contain" />
       </div>

          
       {/* Header */}
       <div className="grid md:grid-cols-2 gap-10 mb-20">
           <div className="flex flex-col gap-4">
               <h3>Services</h3>
               <h2>
                   <span className="text-blue">CREATE YOUR IMMERSIVE</span><br />
                   <span className="text-white">GAMING AREA</span>
               </h2>
           </div>
           <div className="flex items-center">
               <p className="text-xl">
                   <strong className="text-white">Tailored to your vision,</strong> we create customised gaming environments that elevate your event and bring your venue to life.
               </p>
           </div>
       </div>

       {/* Interactive Bento Grid */}
       <div className="bg-bento-background border border-border rounded-[20px] p-10 grid lg:grid-cols-3 gap-10">
           
           {/* List Column */}
           <div className="flex flex-col gap-4 border-r border-white/10 pr-10">
               {services.map((service) => (
                   <button 
                     key={service.id}
                     onClick={() => setActiveId(service.id)}
                     className={cn(
                         "text-left text-lg font-bold font-mono py-2 transition-all relative",
                         activeId === service.id ? "text-medium-orchid" : "text-white hover:text-white/80"
                     )}
                   >
                       {service.label}
                       {activeId === service.id && (
                           <motion.div 
                             layoutId="underline"
                             className="absolute bottom-0 left-0 w-full h-[2px] bg-medium-orchid shadow-[0_0_6px_rgba(255,255,255,0.6)]"
                           />
                       )}
                   </button>
               ))}
           </div>

           {/* Image Column */}
           <div className="relative aspect-video lg:aspect-auto rounded-xl overflow-hidden bg-black/50">
               <AnimatePresence mode="wait">
                   <motion.div 
                     key={activeService.image}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     transition={{ duration: 0.3 }}
                     className="relative w-full h-full"
                   >
                       <Image 
                         src={activeService.image} 
                         alt={activeService.title}
                         fill
                         className="object-contain p-4"
                       />
                   </motion.div>
               </AnimatePresence>
           </div>

            {/* Description Column */}
            <div className="flex flex-col justify-center gap-6 relative">
                 <AnimatePresence mode="wait">
                      <motion.div
                         key={activeService.id}
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: -10 }}
                         transition={{ duration: 0.3 }}
                      >
                          <h3 className="text-2xl font-bold font-mono text-white mb-4">{activeService.title}</h3>
                          <p className="text-lg font-roboto text-font-gray leading-relaxed">{activeService.description}</p>
                      </motion.div>
                 </AnimatePresence>
                 
                 {/* Decorative Posters Image */}
                 <div className="mt-auto pt-10">
                      <Image src="/images/posters.png" alt="" width={300} height={200} className="object-contain" />
                 </div>
            </div>

       </div>
    </SectionWrapper>
  );
}
