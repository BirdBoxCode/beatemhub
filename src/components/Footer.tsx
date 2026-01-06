import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="border-t border-[#e4ebf3]/10 bg-bento-background pt-20 pb-10 px-5 text-white">
      <div className="max-w-[1148px] mx-auto flex flex-col gap-10">
        
        {/* Top Section */}
        <div className="flex flex-wrap justify-between items-start gap-10">
            <Link href="#" className="block">
                <Image src="/images/beh_logo.png" alt="Beat Em Hub" width={150} height={50} className="w-[150px]" />
            </Link>

            <div className="flex flex-col gap-4">
                <Link href="#home" className="text-font-gray hover:text-white transition-colors">Home</Link>
                <Link href="#" className="text-font-gray hover:text-white transition-colors">About Us</Link>
            </div>

            <div className="flex flex-col gap-4">
                <Link href="#" className="text-font-gray hover:text-white transition-colors">Services</Link>
                <Link href="#references" className="text-font-gray hover:text-white transition-colors">References</Link>
            </div>

            <div className="flex flex-col gap-4">
                <Link href="#contact" className="text-font-gray hover:text-white transition-colors">Contact</Link>
                <Link href="#" className="text-font-gray hover:text-white transition-colors">Data Protection</Link>
            </div>

            <div className="flex flex-col gap-4">
                <Link href="#" className="text-font-gray hover:text-white transition-colors">Impressum</Link>
            </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 w-full" />

        {/* Bottom Section */}
        <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="text-sm text-font-gray">© 2022 Beat Em Hub. All rights reserved.</div>
            
            <div className="flex gap-4">
                 <Link href="#" className="hover:opacity-80"><Image src="/images/discord.svg" alt="Discord" width={24} height={24} /></Link>
                 <Link href="#" className="hover:opacity-80"><Image src="/images/insta.svg" alt="Instagram" width={24} height={24} /></Link>
                 <Link href="#" className="hover:opacity-80"><Image src="/images/linkedin.svg" alt="LinkedIn" width={24} height={24} /></Link>
            </div>
        </div>

      </div>
    </footer>
  );
}
