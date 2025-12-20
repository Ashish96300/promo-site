import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import api from '../../utils/Apiinstance';
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
    <section className="py-24 bg-[#F8FAFC] relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A365D] mb-4">Happy Clients</h2>
          <div className="w-20 h-1 bg-[#FF7A00] mx-auto mb-6"></div>
          <p className="text-gray-500 max-w-xl mx-auto">We take pride in our work and the relationships we build with our clients.</p>
        </div>

        {/* Swiper Container */}
        <div className="relative px-4">
          {testimonials.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              navigation={{
                nextEl: '.testimonial-next',
                prevEl: '.testimonial-prev',
              }}
              pagination={{ clickable: true, el: '.custom-pagination' }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="pb-16"
            >
              {testimonials.map((item) => (
                <SwiperSlide key={item._id || item.id} className="h-auto">
                  {/* Card Container */}
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                    
                    {/* Client Image Card Header */}
                    <div className="relative mb-6">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md relative z-10">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/150' }}
                        />
                      </div>
                      {/* Decorative quote icon */}
                      <div className="absolute -bottom-2 -right-2 bg-[#FF7A00] text-white p-2 rounded-full z-20 shadow-sm">
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.895 14.912 16 16.017 16H19.017C19.569 16 20.017 15.552 20.017 15V9C20.017 8.448 19.569 8 19.017 8H16.017C15.465 8 15.017 8.448 15.017 9V12C15.017 12.552 14.569 13 14.017 13H11.017V21H14.017ZM3.017 21H6.017L6.017 18C6.017 16.895 6.912 16 8.017 16H11.017V13H8.017C7.465 13 7.017 12.552 7.017 12V9C7.017 8.448 7.465 8 8.017 8H11.017V5H8.017C6.912 5 6.017 5.895 6.017 7V9C6.017 10.105 5.122 11 4.017 11H3.017V21ZM14.017 13H11.017V5H14.017V13Z"/></svg>
                      </div>
                    </div>

                    {/* Content */}
                    <p className="text-gray-600 text-sm leading-relaxed italic mb-8 flex-grow">
                      "{item.description}"
                    </p>

                    <div className="mt-auto">
                      <h4 className="text-[#1A365D] font-bold text-lg mb-1">{item.name}</h4>
                      <p className="text-[#FF7A00] text-xs font-semibold uppercase tracking-widest">
                        {item.designation}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-center text-gray-400">No testimonials found.</p>
          )}

          {/* Custom Navigation Arrows */}
          <button className="testimonial-prev absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="testimonial-next absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Custom Pagination (Optional) */}
        <div className="custom-pagination mt-8 flex justify-center gap-2"></div>
      </div>
    </section>
  );
};

export default TestimonialsSection;