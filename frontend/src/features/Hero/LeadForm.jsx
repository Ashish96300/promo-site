import React from 'react';

const LeadForm = () => {
  return (
    <div className="bg-brand-blue p-8 rounded-lg shadow-xl w-full max-w-md">
      <h3 className="text-white text-2xl font-bold mb-6">Get a Free Consultation</h3>
      <form className="space-y-4">
        <input 
          type="text" 
          placeholder="Full Name" 
          className="w-full p-3 rounded border-none focus:ring-2 focus:ring-brand-orange outline-none"
        />
        <input 
          type="email" 
          placeholder="Email Address" 
          className="w-full p-3 rounded border-none focus:ring-2 focus:ring-brand-orange outline-none"
        />
        <input 
          type="text" 
          placeholder="Phone No." 
          className="w-full p-3 rounded border-none focus:ring-2 focus:ring-brand-orange outline-none"
        />
        <button 
          type="submit" 
          className="w-full bg-brand-orange text-white font-bold py-3 rounded hover:bg-orange-600 transition-colors uppercase tracking-wider"
        >
          Get Started
        </button>
      </form>
    </div>
  );
};

export default LeadForm;