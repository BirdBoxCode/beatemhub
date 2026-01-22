import Image from 'next/image';
import Link from 'next/link';
import { Marquee } from '@/components/Marquee';
import { SectionWrapper } from '@/components/SectionWrapper';

export function Introduction() {
  return (
    <SectionWrapper id="intro" lineColor="pink" className="-mt-[100px] relative z-10">
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

      </div>
    </SectionWrapper>
  );
}
