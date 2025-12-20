import React, { useState } from 'react';
import api from '../../utils/Apiinstance';

const LeadForm = () => {
  // Fields matched exactly to backend requirements
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    city: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // POST request to the specified endpoint
      const response = await api.post('/contact/add-contact', formData);
      console.log("Response:", response.data);
      alert("Contact added successfully!");
      
      // Reset form fields
      setFormData({
        fullName: '',
        email: '',
        mobileNumber: '',
        city: ''
      });
    } catch (error) {
      console.error("Error adding contact:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to submit contact");
    }
  };

  return (
    <div className="bg-purple-900/50 p-8 rounded-lg shadow-xl w-full max-w-md my-11">
      <h3 className="text-white text-2xl font-bold mb-6">Get a Free Consultation</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          placeholder="Full Name" 
          value={formData.fullName}
          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
          className="w-full p-3 rounded-2xl focus:ring-1 focus:ring-brand-orange bg-purple-100/20 text-white outline-none"
          required
        />
        <input 
          type="email" 
          placeholder="Email Address" 
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full p-3 rounded-2xl focus:ring-2 focus:ring-brand-orange bg-purple-100/20 text-white outline-none"
          required
        />
        <input 
          type="text" 
          placeholder="Phone No." 
          value={formData.mobileNumber}
          onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
          className="w-full p-3 rounded-2xl focus:ring-2 focus:ring-brand-orange bg-purple-100/20 text-white outline-none"
          required
        />
        <input 
          type="text" 
          placeholder="City" 
          value={formData.city}
          onChange={(e) => setFormData({...formData, city: e.target.value})}
          className="w-full p-3 rounded-2xl focus:ring-2 focus:ring-brand-orange bg-purple-100/20 text-white outline-none"
          required
        />
        <button 
          type="submit" 
          className="w-full bg-orange-700/50 text-white font-bold py-3 rounded-2xl my-3.5 hover:bg-orange-600 transition-colors uppercase tracking-wider"
        >
          Get Quick Quote
        </button>
      </form>
    </div>
  );
};

export default LeadForm;