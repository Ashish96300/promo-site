import React from 'react';
import LeadForm from './LeadForm';

const HeroSection = () => {
  return (
    <section className="relative min-h-150px flex items-center pt-20 pb-12">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-6 relative z-10 flex flex-wrap lg:flex-nowrap items-center justify-between gap-12">
        
        {/* Left Side: Text */}
        <div className="text-white max-w-xl">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Consultation, <br />
            <span className="text-brand-orange">Design,</span> <br />
            & Marketing
          </h1>
          <p className="text-lg text-gray-200 mb-8">
            The secret to selling your home for the best price is out there. 
            We provide the expertise to make it happen.
          </p>
        </div>
        
        <div className="w-full lg:w-auto flex justify-center">
          <LeadForm />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;