import React, { useState } from 'react';
import { FOOTER_CONTENT } from '../../utils/Constants';
import api from '../../utils/Apiinstance';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      // Calling the subscriber API with the email field
      await api.post('/subscribers/add-sub', { email });
      alert("Successfully subscribed!");
      setEmail(''); // Clear input after success
    } catch (error) {
      console.error("Subscription error:", error);
      alert(error.response?.data?.message || "Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="w-full">
      {/* 1. CTA Banner Section with Background Image */}
      <div className="relative py-20 bg-cover bg-center text-center" 
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80')" }}>
        <div className="absolute inset-0 bg-black/50"></div> {/* Overlay */}
        <div className="relative z-10 container mx-auto px-6">
          <h2 className="text-white text-2xl md:text-3xl font-bold max-w-3xl mx-auto mb-8 leading-tight">
            {FOOTER_CONTENT.ctaText}
          </h2>
          <button className="bg-white text-black px-10 py-3 rounded-sm font-bold tracking-widest hover:bg-gray-200 transition-colors uppercase text-sm">
            {FOOTER_CONTENT.ctaButton}
          </button>
        </div>
      </div>

      {/* 2. Blue Navigation Bar */}
      <div className="bg-blue-600 py-6">
        <div className="container mx-auto px-6 flex flex-wrap items-center justify-between gap-6">
          <nav className="flex gap-6 text-white font-semibold text-sm">
            {FOOTER_CONTENT.navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-blue-200 transition-colors">
                {link}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <span className="text-white font-semibold text-sm">Subscribe Us</span>
            {/* Subscription Form */}
            <form onSubmit={handleSubscribe} className="flex">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address" 
                className="bg-transparent border border-white/30 text-white px-4 py-2 text-sm focus:outline-none placeholder:text-white/60 w-48 md:w-64"
              />
              <button 
                type="submit"
                disabled={loading}
                className="bg-white text-blue-600 px-6 py-2 text-sm font-bold hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {loading ? '...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 3. Dark Bottom Bar */}
      <div className="bg-[#1A1A1A] py-8 text-white/60">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs">{FOOTER_CONTENT.copyright}</p>
          
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 bg-blue-600 rounded-sm flex items-center justify-center">
               <span className="text-white font-bold text-xs">RT</span>
             </div>
             <span className="text-white font-bold tracking-tighter">Real <span className="font-light">trust</span></span>
          </div>

          <div className="flex gap-4">
            {['twitter', 'instagram', 'facebook', 'linkedin'].map((social) => (
              <a key={social} href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                <span className="sr-only">{social}</span>
                <div className="w-4 h-4 bg-white/60 rounded-full"></div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;