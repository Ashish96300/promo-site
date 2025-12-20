import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-white/70 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        <div className="text-2xl font-black text-brand-blue tracking-tighter">
          Real<span className="text-brand-orange">Trust</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-brand-blue font-semibold hover:text-brand-orange transition-colors">HOME</a>
          <a href="#about" className="text-brand-blue font-semibold hover:text-brand-orange transition-colors">ABOUT</a>
          <a href="#projects" className="text-brand-blue font-semibold hover:text-brand-orange transition-colors">PAST PROJECTS</a>
          <a href="#testimonial" className="text-brand-blue font-semibold hover:text-brand-orange transition-colors">TESTIMONIALS</a>
          
          <button className="bg-orange-500/45 text-white px-6 py-2 rounded font-bold hover:bg-orange-600 transition-all shadow-md">
            CONTACT
          </button>
        </div>

        <div className="md:hidden text-brand-blue">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;