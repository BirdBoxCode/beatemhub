import { Hero } from "@/components/Hero";
import { Introduction } from "@/components/Introduction";
import { ServicesSection } from "@/components/ServicesSection";
import { ReferencesSection } from "@/components/ReferencesSection";
import { GamesGroundSection } from "@/components/GamesGroundSection";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <Hero />
      <Introduction />
      <ServicesSection />
      <ReferencesSection />
      <GamesGroundSection />
      <ContactSection />
    </main>
  );
}
