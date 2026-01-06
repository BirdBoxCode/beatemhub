import Image from 'next/image';

const defaultClients = [
  '/images/prime.png',
  '/images/medianet_Logo_zugeschnitten.png',
  '/images/huxleys.png',
  '/images/animemesse.png',
  '/images/bcg.png',
  '/images/civo.png',
  '/images/games-ground.svg',
];

interface MarqueeProps {
    items?: string[];
}

export function Marquee({ items = defaultClients }: MarqueeProps) {
  return (
    <div className="relative w-full overflow-hidden mask-gradient">
       <div className="flex w-max animate-marquee gap-10 items-center">
          {[...items, ...items].map((src, i) => (
             <div key={i} className="relative h-[60px] w-auto shrink-0 flex items-center">
                <Image src={src} alt="Client Logo" width={150} height={60} className="object-contain h-full w-auto max-w-[150px]" />
             </div>
          ))}
       </div>
    </div>
  );
}
