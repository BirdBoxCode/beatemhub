'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Nav Toggle (Visible on small screens) */}
      <div className="fixed top-0 left-0 right-0 z-100 flex justify-between items-center p-4 bg-bento-background md:hidden border-b border-sidebar-border">
         <Link href="#home" className="text-white font-mono font-bold text-lg">
            BEAT EM HUB
         </Link>
         <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
         </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-99 bg-bento-background flex flex-col items-center justify-center gap-8 md:hidden">
            <NavLink href="#home" onClick={() => setIsOpen(false)}>Home</NavLink>
            <NavLink href="#services" onClick={() => setIsOpen(false)}>Services</NavLink>
            <NavLink href="#references" onClick={() => setIsOpen(false)}>References</NavLink>
            <NavLink href="#contact" onClick={() => setIsOpen(false)}>Contact</NavLink>
        </div>
      )}

      {/* Desktop Navbar (Split Layout) */}
      <div className="hidden md:flex fixed top-[40px] left-0 right-0 max-w-[1148px] mx-auto z-100 justify-between items-start pointer-events-none px-5">
        
        {/* Left Nav Block */}
        <nav className="pointer-events-auto bg-bento-background border-2 border-[#9e9e9e4f] rounded-[20px] px-8 py-3 flex items-center gap-6 h-[95px]">
          <DesktopNavLink href="#home">Home</DesktopNavLink>
          {/* About Us hidden in source but present */}
          <DesktopNavLink href="#services">SERVICES</DesktopNavLink>
          <DesktopNavLink href="#references">References</DesktopNavLink>
          <DesktopNavLink href="#contact">CONTACT</DesktopNavLink>
          
          <div className="w-full h-[2px] bg-white/20 absolute bottom-3 left-0 mx-4" /> 
        </nav>

        {/* Right Nav Block (Socials + Logo) */}
        <div className="pointer-events-auto bg-bento-background border-2 border-[#9e9e9e4f] rounded-[20px] p-4 flex flex-col gap-4 items-center w-[100px] h-auto">
           <Link href="/" className="mb-2">
             <Image src="/images/beh-white.svg" alt="Beat Em Hub" width={60} height={60} className="w-full" />
           </Link>
           
           {/* Pink line decoration */}
           <div className="relative w-full h-[2px] mb-2">
                <Image src="/images/nav-line-pink.png" alt="" fill className="object-cover" />
           </div>

           <SocialLink href="https://www.instagram.com/beatemhub/" icon="/images/insta.svg" />
           <SocialLink href="https://discord.com/invite/Sd22pa438Q" icon="/images/discord.svg" />
           <SocialLink href="https://de.linkedin.com/company/beat-em-hub" icon="/images/linkedin.svg" />
        </div>
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
        className="text-white font-mono font-bold text-base hover:text-medium-orchid transition-colors uppercase tracking-wider"
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
