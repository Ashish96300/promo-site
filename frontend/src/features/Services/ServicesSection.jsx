import React from 'react';
import { SERVICES_CONTENT } from '../../utils/Constants';

const ServicesSection = () => {
  const { realtorSection, whyChooseUs } = SERVICES_CONTENT;

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* --- PART 1: Not Your Average Realtor --- */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-32">
          {/* Left: Text Content */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A365D] mb-6">
              {realtorSection.title}
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed max-w-md">
              {realtorSection.description}
            </p>
          </div>

          {/* Right: Circular Image Composition */}
          <div className="w-full lg:w-1/2 relative flex justify-center items-center h-[400px]">
            {/* Main Center Image */}
            <div className="w-64 h-64 rounded-full border-4 border-white shadow-2xl overflow-hidden z-20">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" alt="Realtor" className="w-full h-full object-cover" />
            </div>
            
            {/* Top Right Small Circle */}
            <div className="absolute top-0 right-10 w-40 h-40 rounded-full border-4 border-white shadow-xl overflow-hidden z-10">
              <img src="https://images.unsplash.com/photo-1556745753-b2904692b3cd?auto=format&fit=crop&q=80" alt="Team" className="w-full h-full object-cover" />
            </div>

            {/* Bottom Right Medium Circle */}
            <div className="absolute bottom-4 right-4 w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden z-30">
              <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80" alt="Success" className="w-full h-full object-cover" />
            </div>

            {/* Decorative Blue Dot and Rings */}
            <div className="absolute top-1/2 left-0 w-4 h-4 bg-blue-600 rounded-full"></div>
            <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-orange-500 rounded-full"></div>
            <div className="absolute inset-0 border-[1px] border-blue-100 rounded-full scale-110 opacity-50"></div>
          </div>
        </div>

        {/* --- PART 2: Why Choose Us --- */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#1A365D] mb-2">{whyChooseUs.title}</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-16"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {whyChooseUs.items.map((item, index) => (
              <div key={index} className="flex flex-col items-center group">
                {/* Icon Circle */}
                <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-2xl mb-6 group-hover:bg-blue-50 transition-colors border border-gray-100">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1A365D] mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm px-4">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;