import Image from 'next/image';
import Link from 'next/link';
import { Marquee } from '@/components/Marquee';
import { SectionWrapper } from '@/components/SectionWrapper';

export function Introduction() {
  return (
    <SectionWrapper id="intro" lineColor="pinkToBlue" className="-mt-[100px] relative z-10">
      <div className="flex flex-col gap-10">
        
        {/* Main Heading */}
        <div>
           <h1 className="text-violet">
             INSPIRE THE WORLD<br />
             <span className="text-white">TO PLAY TOGETHER</span>
           </h1>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col gap-6">
            <p className="p3 max-w-2xl">Create your ultimate gaming space.</p>
            
            <Link href="#contact" className="inline-flex items-center gap-2 bg-violet rounded-[6px] px-4 py-2 w-fit hover:opacity-90 transition-opacity">
                <Image src="/images/black-button-line.png" alt="" width={4} height={4} />
                <span className="text-black font-bold font-roboto text-[18px] tracking-wider">Get in touch with us!</span>
            </Link>
        </div>

        {/* Client Wrapper */}
        <div className="mt-10">
            <p className="p2 mb-6">Trusted by industry leaders:</p>
            <Marquee />
        </div>

        {/* New Sub-section */}
        <div className="mt-[200px] grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left: Text */}
            <div className="md:pr-10">
                <p className="font-roboto text-[24px] leading-relaxed text-white">
                    Your friendly team of nerds and industry professionals.
                    <span className="text-font-gray"> We bring our knowledge of gaming setups with care and consideration for your space and clients.</span>
                </p>
            </div>
            
            {/* Right: Image */}
            <div className="relative w-full">
               <Image 
                 src="/images/Hero-Radial-p-1080.png" 
                 alt="Hero Radial" 
                 width={1080} 
                 height={1080} 
                 className="w-full h-auto object-cover"
               />
            </div>
        </div>

      </div>
    </SectionWrapper>
  );
}
