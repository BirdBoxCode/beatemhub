import Image from 'next/image';

export function GamesGroundSection() {
  return (
    <section id="gg" className="relative w-full py-20 overflow-hidden">
        <div className="max-w-[1300px] mx-auto px-5">
            
            <div className="grid md:grid-cols-[100px_1fr] gap-10">
                {/* Left Decoration */}
                <div className="hidden md:flex flex-col items-center w-[100px] shrink-0 gap-6">
                    <Image src="/images/triangle-side-green.svg" alt="" width={40} height={40} />
                    <div className="h-20 w-px bg-white/10" />
                </div>

                {/* Content */}
                <div className="grid md:grid-cols-2 gap-10">
                    <div className="flex flex-col gap-6">
                        <strong className="text-xl font-bold font-kode-mono text-white">Games Ground</strong>
                        <p className="text-lg font-roboto text-font-gray leading-relaxed">
                            <strong className="text-white">We are proud co-organizers of Games Ground Berlin</strong>, the premier gaming industry and community festival, backed by the Berlin Senate & Medienboard Berlin-Brandenburg. With over 4,500 attendees from around the world, Games Ground is a vibrant hub for gamers, creators, and industry leaders.
                        </p>
                    </div>

                    <div className="relative aspect-video bg-black rounded-[20px] overflow-hidden">
                        <iframe 
                            src="https://www.youtube.com/embed/LC0Viyt97rQ?rel=0&controls=1&autoplay=0&mute=0" 
                            className="w-full h-full border-0"
                            allow="autoplay; encrypted-media" 
                            allowFullScreen
                            title="Games Ground Berlin 2024 Aftermovie"
                        />
                    </div>
                </div>
            </div>

        </div>
    </section>
  );
}
