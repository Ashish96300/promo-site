import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import api from '../../utils/Apiinstance';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await api.get('/client/get-all-client');
        // Check if your data is nested. Try response.data.clients or response.data.testimonials
        const dataArray = response.data.clients || response.data.testimonials || response.data;
        
        setTestimonials(Array.isArray(dataArray) ? dataArray : []); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching clients:", error);
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) return <div className="text-center py-20">Loading Testimonials...</div>;

  return (
    <section className="py-20 bg-white relative">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#1A365D] mb-2">Happy Clients</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Swiper Container */}
        <div className="relative px-12"> 
          {testimonials.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 5 },
              }}
              className="mySwiper"
            >
              {testimonials.map((item) => (
                <SwiperSlide key={item._id || item.id}>
                  <div className="flex flex-col items-center text-center">
                    {/* Image from Backend */}
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-white shadow-lg">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover" 
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150' }}
                      />
                    </div>
                    {/* Star Rating */}
                    <div className="flex text-orange-400 mb-4 text-xs">
                      {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                    </div>
                    {/* Description from Backend */}
                    <p className="text-gray-500 text-sm italic mb-4">"{item.description}"</p>
                    {/* Name from Backend */}
                    <h4 className="text-[#1A365D] font-bold text-sm">{item.name}</h4>
                    {/* Designation from Backend */}
                    <p className="text-gray-400 text-xs mt-1 uppercase tracking-tighter">
                      {item.designation}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-center text-gray-400">No testimonials found.</p>
          )}

          {/* Custom Navigation Arrows */}
          <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 text-blue-600 hover:text-blue-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 text-blue-600 hover:text-blue-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;