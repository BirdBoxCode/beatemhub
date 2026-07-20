'use client';

import { useState, useRef } from 'react';
import { SectionWrapper, SPINE_LEAD_IN } from '@/components/SectionWrapper';

// Web3Forms access key — generate a free one at https://web3forms.com by entering
// the inbox you want submissions delivered to. Safe to hardcode/expose: it can only
// send to the address it's registered against, and NEXT_PUBLIC_ vars end up in the
// client bundle anyway. Env override still supported if you ever want to rotate it.
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? 'ae5d3ba0-cd68-413c-be8f-75eb77a67956';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactSection() {
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: ''
  });
  const [status, setStatus] = useState<Status>('idle');
  const [botField, setBotField] = useState('');
  // Timestamp of when the form mounted — used to reject near-instant bot submits.
  const mountedAt = useRef(Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      // Spam guard 1: honeypot. Real users can't see/fill this field.
      if (botField) return;
      // Spam guard 2: reject submissions faster than any human could plausibly type.
      if (Date.now() - mountedAt.current < 2000) return;

      setStatus('submitting');

      try {
          const res = await fetch('https://api.web3forms.com/submit', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
              body: JSON.stringify({
                  access_key: WEB3FORMS_ACCESS_KEY,
                  subject: 'New enquiry from Beat Em Hub',
                  name: formData.name,
                  email: formData.email,
                  message: formData.message,
              }),
          });
          const data = await res.json();

          if (data.success) {
              setStatus('success');
              setFormData({ name: '', email: '', message: '' });
          } else {
              setStatus('error');
          }
      } catch {
          setStatus('error');
      }
  };

  return (
    <SectionWrapper
      id="contact"
      spine={[
        { kind: 'line', background: '#a3d3ff', h: SPINE_LEAD_IN },
        { kind: 'icon', src: '/images/boo.png', glow: 'rgba(163,211,255,0.5)' },
        { kind: 'line', background: '#a3d3ff' },
        { kind: 'icon', src: '/images/down-triangle-side-green.svg', glow: 'rgba(163,255,195,0.45)' },
      ]}
    >
         <div className="flex flex-col md:flex-row gap-10">

             {/* Form — sits directly on the dark background, no card */}
             <div className="flex flex-col gap-6 w-full max-w-[460px]">
                 <h3>Contact Us</h3>

                 <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                     {/* Honeypot — hidden from humans, catches naive bots. */}
                     <input
                        type="text"
                        name="botcheck"
                        tabIndex={-1}
                        autoComplete="off"
                        value={botField}
                        onChange={(e) => setBotField(e.target.value)}
                        aria-hidden="true"
                        className="absolute left-[-9999px] w-0 h-0 opacity-0"
                     />

                     <div className="flex flex-col gap-2">
                         <label htmlFor="name" className="p2">Name</label>
                         <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
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
                        disabled={status === 'submitting'}
                        className="bg-violet text-black rounded-[10px] font-roboto font-bold text-[18px] tracking-[0.5px] px-5 py-2 self-start hover:opacity-90 transition-opacity disabled:opacity-60"
                     >
                        {status === 'submitting' ? 'Sending…' : 'Submit'}
                     </button>

                     {status === 'success' && (
                         <p className="p2 text-[#a3ffc3]">Thanks for getting in touch — we&apos;ll be in contact soon.</p>
                     )}
                     {status === 'error' && (
                         <p className="p2 text-[#ff9a9a]">Something went wrong. Please try again or email us directly.</p>
                     )}
                 </form>
             </div>

         </div>
    </SectionWrapper>
  );
}
