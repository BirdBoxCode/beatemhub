'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const NAV_SECTIONS = [
  { href: '#home', id: 'home', label: 'Home' },
  { href: '#services', id: 'services', label: 'Services' },
  { href: '#references', id: 'references', label: 'References' },
  { href: '#contact', id: 'contact', label: 'Contact' },
] as const;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeId, setActiveId] = useState<string>('home');
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const { scrollY } = useScroll();

  // Scroll-spy: highlight the nav item whose section is currently in view.
  useEffect(() => {
    const sections = NAV_SECTIONS
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      // Thin band in the vertical middle of the viewport — the section
      // crossing it is the "active" one.
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Treat top of page as not scrolling (idle)
    if (latest < 10) {
      if (isScrolling) setIsScrolling(false);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      return;
    }

    if (!isScrolling) setIsScrolling(true);

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 200); // 200ms debounce
  });

  const navVariants = {
    idle: {
      y: 0,
      scale: 1,
      transition: {
        y: { duration: 0.3, ease: "easeInOut" },
        scale: { delay: 0.3, duration: 0.3, ease: "easeInOut" }
      } as const
    },
    active: {
      scale: 0.95,
      y: -40,
      transition: {
        scale: { duration: 0.3, ease: "easeInOut" },
        y: { delay: 0.3, duration: 0.3, ease: "easeInOut" }
      } as const
    }
  };

  return (
    <>
      {/* Mobile Nav Toggle (Visible on small screens) */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-bento-bg md:hidden border-b border-sidebar-border">
         <Link href="#home" className="text-white font-mono font-bold text-lg">
            BEAT EM HUB
         </Link>
         <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
         </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-bento-bg/95 backdrop-blur-sm flex flex-col items-center justify-center gap-8 md:hidden"
        >
            {NAV_SECTIONS.map(({ href, id, label }) => (
              <NavLink key={id} href={href} active={activeId === id} onClick={() => setIsOpen(false)}>
                {label}
              </NavLink>
            ))}
        </motion.div>
      )}
      </AnimatePresence>

      {/* Desktop Navbar (Split Layout) — full-width with a 1300px inner wrap, so the
          left block lines up with the section containers (Webflow .navbar.left) */}
      <div className="hidden md:block fixed top-[40px] left-0 right-0 z-50 pointer-events-none px-5">
       <div className="max-w-[1300px] mx-auto flex justify-between items-start">

        {/* Left Nav Block (Links + white underline) */}
        <motion.nav
          variants={navVariants}
          animate={isScrolling ? "active" : "idle"}
          initial="idle"
          className="pointer-events-auto bg-[#131314] border-2 border-[#9e9e9e80] rounded-[20px] px-4 py-3 flex flex-col items-center shadow-lg will-change-transform"
        >
          {/* Links */}
          <div className="flex items-center">
            {NAV_SECTIONS.map(({ href, id, label }) => (
              <DesktopNavLink key={id} href={href} active={activeId === id}>
                {label}
              </DesktopNavLink>
            ))}
          </div>

          {/* White underline (Webflow nav-line-white.svg) */}
          <div className="w-full px-[15px]">
            <Image src="/images/nav-line-white.svg" alt="" width={300} height={4} className="w-full h-auto" />
          </div>
        </motion.nav>

        {/* Right Nav Block (Logo + pink line + stacked socials) */}
        <motion.div
          variants={navVariants}
          animate={isScrolling ? "active" : "idle"}
          initial="idle"
          className="pointer-events-auto bg-[#131314] border-2 border-[#9e9e9e80] rounded-[20px] w-[100px] px-4 py-4 flex flex-col items-center gap-[15px] shadow-lg will-change-transform"
        >
           {/* Logo */}
           <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image src="/images/beh-white.svg" alt="Beat Em Hub" width={68} height={68} className="w-[68px] h-auto" />
           </Link>

           {/* Pink line divider (Webflow nav-line-pink.png) */}
           <div className="w-full">
              <Image src="/images/nav-line-pink.png" alt="" width={80} height={4} className="w-full h-auto" />
           </div>

           <SocialLink href="https://www.instagram.com/beatemhub/" icon="/images/insta.svg" />
           <SocialLink href="https://discord.com/invite/Sd22pa438Q" icon="/images/discord.svg" />
           <SocialLink href="https://de.linkedin.com/company/beat-em-hub" icon="/images/linkedin.svg" />
        </motion.div>
       </div>
      </div>
    </>
  );
}

function NavLink({ href, children, active = false, onClick }: { href: string; children: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${active ? 'text-medium-orchid' : 'text-white'} font-mono font-bold text-2xl hover:text-medium-orchid transition-colors uppercase tracking-widest`}
    >
      {children}
    </Link>
  );
}

function DesktopNavLink({ href, children, active = false }: { href: string; children: React.ReactNode; active?: boolean }) {
    return (
      <Link
        href={href}
        className={`${active ? 'text-medium-orchid' : 'text-white'} font-mono font-semibold text-[16px] hover:text-medium-orchid transition-colors uppercase tracking-[1px] whitespace-nowrap px-[15px] pb-[10px]`}
      >
        {children}
      </Link>
    );
}

function SocialLink({ href, icon }: { href: string; icon: string }) {
    return (
        <Link href={href} target="_blank" className="hover:opacity-80 transition-opacity">
            <Image src={icon} alt="Social Icon" width={28} height={28} />
        </Link>
    )
}
