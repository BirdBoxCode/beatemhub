'use client';

import Image from 'next/image';
import { useState } from 'react';

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
    <section id="contact" className="relative w-full py-20 overflow-hidden">
        <div className="max-w-[1300px] mx-auto px-5">
             
             <div className="grid md:grid-cols-2 gap-10">
                 
                 {/* Left Column (Image) */}
                 <div className="flex flex-col items-center justify-center gap-10 relative">
                     <Image src="/images/boo.png" alt="" width={400} height={400} className="object-contain max-w-full" />
                     <div className="hidden md:block absolute bottom-0 right-20">
                         <Image src="/images/down-triangle-side-green.svg" alt="" width={40} height={40} />
                     </div>
                 </div>

                 {/* Right Column (Form) */}
                 <div className="bg-bento-background border border-border rounded-[20px] p-10 flex flex-col gap-6">
                     <h3 className="text-2xl font-bold font-kode-mono text-white">Contact Us</h3>
                     
                     <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                         <div className="flex flex-col gap-2">
                             <label htmlFor="name" className="text-white font-roboto font-bold">Name</label>
                             <input 
                                type="text" 
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="bg-white border border-[#cccccc] rounded-none p-2 h-[38px] text-sm text-[#333] focus:border-[#3898EC] outline-none transition-colors"
                             />
                         </div>

                         <div className="flex flex-col gap-2">
                             <label htmlFor="email" className="text-white font-roboto font-bold">Email Address</label>
                             <input 
                                type="email" 
                                id="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                required
                                className="bg-white border border-[#cccccc] rounded-none p-2 h-[38px] text-sm text-[#333] focus:border-[#3898EC] outline-none transition-colors"
                             />
                         </div>

                         <div className="flex flex-col gap-2">
                             <label htmlFor="message" className="text-white font-roboto font-bold">Enquiry</label>
                             <textarea 
                                id="message"
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                placeholder="Hi there Beat Em Hub.."
                                className="bg-white border border-[#cccccc] rounded-none p-2 min-h-[120px] text-sm text-[#333] focus:border-[#3898EC] outline-none transition-colors resize-y"
                             />
                         </div>

                         <button 
                            type="submit" 
                            className="bg-[#3898EC] text-white font-bold py-2 px-4 hover:bg-[#3898EC]/90 transition-colors self-start"
                         >
                            Submit
                         </button>
                     </form>
                 </div>

             </div>
        </div>
    </section>
  );
}
