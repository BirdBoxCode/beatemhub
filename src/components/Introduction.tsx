import Image from 'next/image';
import Link from 'next/link';
import { Marquee } from '@/components/Marquee';

export function Introduction() {
  return (
    <section className="relative w-full max-w-[1300px] mx-auto px-5 py-20 flex flex-col md:flex-row gap-10">
      
      {/* Left Column (Decorations) */}
      <div className="hidden md:flex flex-col items-center w-[100px] shrink-0 gap-6">
         <Image src="/images/triangle.svg" alt="" width={40} height={40} />
         <div className="h-20 w-px bg-white/10" />
         <Image src="/images/pink-char-side.png" alt="" width={80} height={200} className="object-contain" />
         <div className="h-20 w-px bg-white/10" />
      </div>

      {/* Right Column (Content) */}
      <div className="flex-1 flex flex-col gap-10">
        
        {/* Main Heading */}
        <div>
           <h1 className="font-mono font-bold text-5xl md:text-7xl leading-tight text-violet">
             INSPIRE THE WORLD<br />
             <span className="text-white">TO PLAY TOGETHER</span>
           </h1>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col gap-6">
            <p className="text-xl font-roboto text-font-gray">Create your ultimate gaming space.</p>
            
            <Link href="#contact" className="inline-flex items-center gap-4 bg-violet rounded-[10px] px-4 py-3 w-fit hover:opacity-90 transition-opacity">
                <Image src="/images/black-button-line.png" alt="" width={24} height={24} />
                <span className="text-black font-bold font-roboto text-lg tracking-wider">Get in touch with us!</span>
            </Link>
        </div>

        {/* Client Wrapper */}
        <div className="mt-10">
            <p className="text-lg font-roboto text-font-gray mb-6">Trusted by industry leaders:</p>
            <Marquee />
        </div>

      </div>
    </section>
  );
}
