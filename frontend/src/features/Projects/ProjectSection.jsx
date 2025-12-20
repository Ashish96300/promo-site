import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProjectCard from './ProjectCard';
import api from '../../utils/Apiinstance';
import 'swiper/css';
import 'swiper/css/navigation';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/project/get-all-project');
        setProjects(res.data.projects || []);
      } catch (error) {
        console.error('Failed to fetch projects', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="py-20 bg-[#F7FAFC]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A365D] mb-4">
            Our Projects
          </h2>
          <div className="w-20 h-1 bg-[#FF7A00] mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We know what buyers are looking for and suggest projects that will bring home top dollar.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-gray-400 py-20">
            Loading projects...
          </div>
        ) : (
          <div className="relative px-4">
            {projects.length > 0 ? (
              <Swiper
                modules={[Navigation]}
                spaceBetween={30}
                slidesPerView={1}
                navigation={{ nextEl: '.project-next', prevEl: '.project-prev' }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 4 },
                }}
              >
                {projects.map((project) => (
                  <SwiperSlide key={project._id}>
                    <ProjectCard
                      image={project.projectImage}
                      title={project.projectName}
                      description={project.projectDescription}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p className="text-center text-gray-400">No projects to display yet.</p>
            )}

            {/* Navigation Arrows */}
            <button className="project-prev absolute -left-4 md:-left-10 top-1/2 -translate-y-1/2 z-20 text-blue-600 hover:text-blue-800 transition-transform active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <button className="project-next absolute -right-4 md:-right-10 top-1/2 -translate-y-1/2 z-20 text-blue-600 hover:text-blue-800 transition-transform active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;