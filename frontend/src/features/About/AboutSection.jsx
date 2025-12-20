import React from 'react';
import { ABOUT_CONTENT } from '../../utils/Constants';

const AboutSection = () => {
  return (
    <section className="py-24 bg-gray-100 relative overflow-hidden">
      {/* Soft Background Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-60 z-0"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60 z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Image Collage Container */}
        <div className="flex flex-row justify-center items-end gap-3 md:gap-6 mb-16">
          
          {/* Left Image - Medium height */}
          <div className="relative">
            {/* Orange Corner Accent */}
            <div className="absolute -left-2 -bottom-2 w-8 h-8 border-l-4 border-b-4 border-orange-500 z-20"></div>
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=300" 
              alt="Real Estate Team" 
              className="w-24 md:w-40 h-32 md:h-52 object-cover rounded shadow-lg"
            />
          </div>

          {/* Center Image - Largest/Focus */}
          <div className="relative -mb-4">
            {/* Blue Corner Accent */}
            <div className="absolute -top-4 -right-4 w-12 h-12 border-t-4 border-r-4 border-blue-700 z-20"></div>
            {/* Blue Small Square Accent */}
            <div className="absolute -top-8 -left-4 w-6 h-6 bg-blue-600 rounded-sm"></div>
            
            <img 
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=500" 
              alt="Consultation" 
              className="w-48 md:w-80 h-56 md:h-96 object-cover rounded shadow-2xl border-4 border-white relative z-10"
            />
          </div>

          {/* Right Image - Smallest */}
          <div className="relative">
            {/* Orange Corner Accent */}
            <div className="absolute -right-2 -bottom-2 w-6 h-6 border-r-4 border-b-4 border-orange-500 z-20"></div>
            <img 
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=300" 
              alt="Meeting" 
              className="w-20 md:w-36 h-24 md:h-40 object-cover rounded shadow-md"
            />
          </div>
        </div>

        {/* Text Content Area */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1A365D] mb-2">
            {ABOUT_CONTENT.title}
          </h2>
          {/* The Blue Underline */}
          <div className="w-16 h-1 bg-[#1A365D] mx-auto mb-8"></div>
          
          <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-10 px-4">
            {ABOUT_CONTENT.description}
          </p>

          <button className="px-12 py-2 border-2 border-[#1A365D] text-[#1A365D] font-bold rounded-sm tracking-widest hover:bg-[#1A365D] hover:text-white transition-all duration-300 text-sm uppercase">
            {ABOUT_CONTENT.buttonText}
          </button>
        </div>
      </div>
      
      {/* Floating Arrows / Chevron Decoration (Optional) */}
      <div className="absolute right-10 bottom-40 opacity-10 hidden lg:block">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M20 20L50 50L20 80" stroke="currentColor" strokeWidth="8"/>
           <path d="M50 20L80 50L50 80" stroke="currentColor" strokeWidth="8"/>
        </svg>
      </div>
    </section>
  );
};

export default AboutSection;