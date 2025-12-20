import React from 'react';

const ProjectCard = ({ image, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
      
      {/* Project Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-2">
          PROJECT
        </p>

        <h4 className="text-brand-blue text-xl font-bold mb-2">
          {title}
        </h4>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <button className="text-brand-blue font-semibold text-sm border-b-2 border-brand-orange pb-1 hover:text-brand-orange transition-colors">
          VIEW PROJECT
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
