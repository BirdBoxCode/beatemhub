import Image from 'next/image';

export function Hero() {
  return (
    <section id="home" className="relative w-full overflow-hidden pt-[115px]"> 
      {/* 115px top padding to account for fixed navbar (95px + 20px gap) */}
      
      <div 
        className="w-full max-w-[1300px] mx-auto h-[600px] flex items-center justify-center bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: "url('/images/section-landing-radial.png')" }}
      >
        <div className="relative w-[150px] h-[150px]">
          <Image 
            src="/images/Logo-colors.png" 
            alt="Beat Em Hub Logo" 
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
