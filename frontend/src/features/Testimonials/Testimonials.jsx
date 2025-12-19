import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TestimonialsSection = () => {
  // DUMMY DATA: Replace this array with your backend state tomorrow
  const testimonials = [
    {
      id: 1,
      name: "Davan Smith",
      role: "Home Seller",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "Working with the team was a fantastic experience. They got us a price we never expected!",
      rating: 5
    },
        {
      id: 1,
      name: "Davan Smith",
      role: "Home Seller",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "Working with the team was a fantastic experience. They got us a price we never expected!",
      rating: 5
    },
        {
      id: 1,
      name: "Davan Smith",
      role: "Home Seller",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "Working with the team was a fantastic experience. They got us a price we never expected!",
      rating: 5
    },
    {
      id: 2,
      name: "David Chen",
      role: "Buyer",
      image: "https://randomuser.me/api/portraits/men/44.jpg",
      text: "The marketing plan they put together was sophisticated and reached so many people.",
      rating: 5
    },
    {
      id: 3,
      name: "John LaPorte",
      role: "Investor",
      image: "https://randomuser.me/api/portraits/men/85.jpg",
      text: "Professional photography and video made all the difference in our luxury listing.",
      rating: 5
    },
    {
      id: 4,
      name: "Lucy Rodriguez",
      role: "First Time Buyer",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      text: "They walked us through the potential ROI for our fixer-upper. Truly experts.",
      rating: 5
    },
    {
      id: 5,
      name: "Sarah Jenkins",
      role: "Seller",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "Excellent communication and customer service throughout the entire process.",
      rating: 5
    }
  ];
  return (
    <section className="py-20 bg-white relative">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#1A365D] mb-2">Happy Clients</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Swiper Container */}
        <div className="relative px-12"> 
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
              <SwiperSlide key={item.id}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-white shadow-lg">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex text-orange-400 mb-4 text-xs">
                    {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                  </div>
                  <p className="text-gray-500 text-sm italic mb-4">"{item.text}"</p>
                  <h4 className="text-[#1A365D] font-bold text-sm">{item.name}</h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows (Blue arrows from your reference) */}
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