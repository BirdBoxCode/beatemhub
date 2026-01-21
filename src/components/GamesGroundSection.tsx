
import { SectionWrapper } from '@/components/SectionWrapper';

export function GamesGroundSection() {
  return (
    <SectionWrapper id="gg" lineColor="green">
        <div className="grid md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-6">
                <h2 className="text-white">Games Ground</h2>
                <p>
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
    </SectionWrapper>
  );
}
