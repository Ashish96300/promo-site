import React, { useEffect, useState } from 'react';
import api from '../../utils/Apiinstance';
import ImageCropper from '../../components/ImageCropper';
import { getCroppedImg } from '../../utils/cropImage';

const ClientManager = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isCropping, setIsCropping] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    description: '',
    image: null, 
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await api.get('/client/get-all-client');
      setClients(res.data.clients || []);
    } catch (error) {
      console.error('Failed to fetch clients', error);
    }
  };

  // Step 1: Open Cropper when file is selected
  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setSelectedImage(reader.result);
        setIsCropping(true);
      };
    }
  };

  // Step 2: Process the crop into the final 450x350 blob
  const onCropComplete = async (croppedAreaPixels) => {
    try {
      const croppedBlob = await getCroppedImg(selectedImage, croppedAreaPixels);
      setFormData({ ...formData, image: croppedBlob });
      setIsCropping(false);
    } catch (error) {
      console.error("Cropping failed:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.designation || !formData.description || !formData.image) {
      alert('All fields including a cropped image are required');
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append('name', formData.name);
      data.append('designation', formData.designation);
      data.append('description', formData.description);
      data.append('image', formData.image, 'client-avatar.jpg');

      await api.post('/client/add-client', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setFormData({
        name: '',
        designation: '',
        description: '',
        image: null,
      });

      setSelectedImage(null);
      fetchClients();
      alert("Client testimonial added successfully!");
    } catch (error) {
      console.error('Failed to add client', error);
      alert("Error adding client. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Step 3: Cropper Modal*/}
      {isCropping && (
        <ImageCropper 
          image={selectedImage} 
          onCropComplete={onCropComplete} 
          onCancel={() => setIsCropping(false)} 
        />
      )}

      <h3 className="text-xl font-bold mb-6 text-[#1A365D]">Add New Testimonial</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-8">
        <input
          className="p-3 border rounded focus:ring-2 focus:ring-[#1A365D] outline-none"
          placeholder="Client Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <input
          className="p-3 border rounded focus:ring-2 focus:ring-[#1A365D] outline-none"
          placeholder="Designation (e.g. CEO)"
          value={formData.designation}
          onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
        />

        <div className="col-span-2">
          <label className="text-sm text-gray-500 mb-1 block font-semibold">
            {formData.image ? "✅ Profile Image Cropped" : "Select Client Profile Image"}
          </label>
          <input
            type="file"
            className="p-3 border rounded w-full bg-gray-50"
            accept="image/*"
            onChange={onFileChange}
          />
        </div>

        <textarea
          className="p-3 border rounded col-span-2 h-24 focus:ring-2 focus:ring-[#1A365D] outline-none"
          placeholder="Testimonial Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        <button
          disabled={loading}
          className="bg-[#1A365D] text-white py-3 px-12 rounded font-bold disabled:opacity-50 w-max"
        >
          {loading ? 'ADDING...' : 'ADD CLIENT'}
        </button>
      </form>

      {/* Client List */}
      <h3 className="text-xl font-bold mb-4 text-[#1A365D]">Existing Testimonials</h3>
      <div className="space-y-3">
        {clients.length > 0 ? (
          clients.map((client) => (
            <div
              key={client._id}
              className="p-4 border rounded-lg bg-white shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={client.image}
                  alt={client.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#1A365D]"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{client.name}</h4>
                  <p className="text-sm text-gray-500">{client.designation}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic">No clients added yet.</p>
        )}
      </div>
    </div>
  );
};

export default ClientManager;