import React, { useEffect, useState } from 'react';
import api from '../../utils/Apiinstance';

const ClientManager = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

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
      setClients(res.data.clients);
    } catch (error) {
      console.error('Failed to fetch clients', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.designation || !formData.description || !formData.image) {
      alert('All fields are required');
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append('name', formData.name);
      data.append('designation', formData.designation);
      data.append('description', formData.description);
      data.append('image', formData.image);

      await api.post('/client/add-client', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setFormData({
        name: '',
        designation: '',
        description: '',
        image: null,
      });

      fetchClients();
    } catch (error) {
      console.error('Failed to add client', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Add Client Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 mb-8"
      >
        <input
          className="p-3 border rounded"
          placeholder="Client Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />

        <input
          className="p-3 border rounded"
          placeholder="Designation (e.g. CEO)"
          value={formData.designation}
          onChange={(e) =>
            setFormData({ ...formData, designation: e.target.value })
          }
        />

        <input
          type="file"
          className="p-3 border rounded col-span-2"
          accept="image/*"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
        />

        <textarea
          className="p-3 border rounded col-span-2"
          placeholder="Testimonial Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <button
          disabled={loading}
          className="bg-[#1A365D] text-white py-3 px-8 rounded font-bold disabled:opacity-50 col-span-2 w-max"
        >
          {loading ? 'ADDING...' : 'ADD CLIENT'}
        </button>
      </form>

      {/* Client List */}
      <div className="space-y-3">
        {clients.map((client) => (
          <div
            key={client._id}
            className="p-4 border rounded flex items-center justify-between"
          >
            <div>
              <h4 className="font-bold">{client.name}</h4>
              <p className="text-sm text-gray-500">{client.designation}</p>
            </div>
            <img
              src={client.image}
              alt={client.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientManager;
