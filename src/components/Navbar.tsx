'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const { scrollY } = useScroll();

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
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-bento-background md:hidden border-b border-sidebar-border">
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
          className="fixed inset-0 z-40 bg-bento-background/95 backdrop-blur-sm flex flex-col items-center justify-center gap-8 md:hidden"
        >
            <NavLink href="#home" onClick={() => setIsOpen(false)}>Home</NavLink>
            <NavLink href="#services" onClick={() => setIsOpen(false)}>Services</NavLink>
            <NavLink href="#references" onClick={() => setIsOpen(false)}>References</NavLink>
            <NavLink href="#contact" onClick={() => setIsOpen(false)}>Contact</NavLink>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Desktop Navbar (Split Layout) */}
      <div className="hidden md:flex fixed top-[40px] left-0 right-0 max-w-[1148px] mx-auto z-50 justify-between items-start pointer-events-none px-5">
        
        {/* Left Nav Block (Logo + Links) */}
        <motion.nav 
          variants={navVariants}
          animate={isScrolling ? "active" : "idle"}
          initial="idle"
          className="pointer-events-auto bg-[#131314] border-2 border-[#9e9e9e80] rounded-[20px] px-6 py-2 flex items-center gap-6 h-[70px] shadow-lg will-change-transform"
        >
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:opacity-80 transition-opacity">
               <Image src="/images/beh-white.svg" alt="Beat Em Hub" width={40} height={40} className="w-auto h-[40px]" />
            </Link>
            
            {/* Divider */}
            <div className="relative w-[2px] h-[30px]">
                 <Image src="/images/nav-line-pink.png" alt="" fill className="object-cover" />
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <DesktopNavLink href="#home">Home</DesktopNavLink>
            <DesktopNavLink href="#services">SERVICES</DesktopNavLink>
            <DesktopNavLink href="#references">References</DesktopNavLink>
            <DesktopNavLink href="#contact">CONTACT</DesktopNavLink>
          </div>
        </motion.nav>

        {/* Right Nav Block (Socials) */}
        <motion.div 
          variants={navVariants}
          animate={isScrolling ? "active" : "idle"}
          initial="idle"
          className="pointer-events-auto bg-[#131314] border-2 border-[#9e9e9e80] rounded-[20px] px-5 flex items-center gap-4 h-[70px] shadow-lg will-change-transform"
        >
           <SocialLink href="https://www.instagram.com/beatemhub/" icon="/images/insta.svg" />
           <SocialLink href="https://discord.com/invite/Sd22pa438Q" icon="/images/discord.svg" />
           <SocialLink href="https://de.linkedin.com/company/beat-em-hub" icon="/images/linkedin.svg" />
        </motion.div>
      </div>
    </>
  );
}

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="text-white font-mono font-bold text-2xl hover:text-medium-orchid transition-colors uppercase tracking-widest"
    >
      {children}
    </Link>
  );
}

function DesktopNavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
      <Link 
        href={href} 
        className="text-white font-mono font-bold text-base hover:text-medium-orchid transition-colors uppercase tracking-wider whitespace-nowrap"
      >
        {children}
      </Link>
    );
}

function SocialLink({ href, icon }: { href: string; icon: string }) {
    return (
        <Link href={href} target="_blank" className="hover:opacity-80 transition-opacity">
            <Image src={icon} alt="Social Icon" width={24} height={24} />
        </Link>
    )
}
