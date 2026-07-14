'use client';

import { useState } from 'react';
import { SectionWrapper } from '@/components/SectionWrapper';

export function ContactSection() {
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Handle form submission logic here
      alert('Thanks for getting in touch! (Demo)');
  };

  return (
    <SectionWrapper
      id="contact"
      line="blue"
      markers={[
        { src: '/images/boo.png', size: 82, top: '22%', glow: 'rgba(163,211,255,0.5)' },
        { src: '/images/down-triangle-side-green.svg', size: 44, top: '100%', glow: 'rgba(163,255,195,0.45)' },
      ]}
    >
         <div className="flex flex-col md:flex-row gap-10">

             {/* Form — sits directly on the dark background, no card */}
             <div className="flex flex-col gap-6 w-full max-w-[460px]">
                 <h3>Contact Us</h3>

                 <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                     <div className="flex flex-col gap-2">
                         <label htmlFor="name" className="p2">Name</label>
                         <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-transparent border-2 border-border rounded-[15px] px-4 py-2 h-[44px] text-font-gray font-roboto outline-none focus:border-violet transition-colors"
                         />
                     </div>

                     <div className="flex flex-col gap-2">
                         <label htmlFor="email" className="p2">Email Address</label>
                         <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                            className="w-full bg-transparent border-2 border-border rounded-[15px] px-4 py-2 h-[44px] text-font-gray font-roboto outline-none focus:border-violet transition-colors"
                         />
                     </div>

                     <div className="flex flex-col gap-2">
                         <label htmlFor="message" className="p2">Enquiry</label>
                         <textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            placeholder="Hi there Beat Em Hub.."
                            className="w-full bg-transparent border-2 border-border rounded-[15px] px-4 py-2 min-h-[120px] text-font-gray font-roboto outline-none focus:border-violet transition-colors resize-y"
                         />
                     </div>

                     <button
                        type="submit"
                        className="bg-violet text-black rounded-[10px] font-roboto font-bold text-[18px] tracking-[0.5px] px-5 py-2 self-start hover:opacity-90 transition-opacity"
                     >
                        Submit
                     </button>
                 </form>
             </div>

         </div>
    </SectionWrapper>
  );
}
