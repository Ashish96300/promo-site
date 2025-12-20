import React, { useEffect, useState } from 'react';
import api from '../../utils/Apiinstance';
import ImageCropper from '../../components/ImageCropper';
import { getCroppedImg } from '../../utils/cropImage';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null); 
  const [isCropping, setIsCropping] = useState(false);

  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    image: null, 
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/project/get-all-project');
      setProjects(res.data.projects || []);
    } catch (error) {
      console.error('Failed to fetch projects', error);
    }
  };

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

  // Step 2: Handle Successful Crop
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

    if (!formData.projectName || !formData.projectDescription || !formData.image) {
      alert('All fields including a cropped image are required');
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append('projectName', formData.projectName);
      data.append('projectDescription', formData.projectDescription);
      data.append('projectImage', formData.image, 'project.jpg');

      await api.post('/project/add-project', data);

      setFormData({
        projectName: '',
        projectDescription: '',
        image: null,
      });

      setSelectedImage(null);
      e.target.reset();
      fetchProjects();
      alert("Project added successfully!");
    } catch (error) {
      console.error('Failed to add project:', error.response?.data || error);
      alert(error.response?.data?.message || "Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await api.delete(`/project/delete-project/${id}`);
        fetchProjects();
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  return (
    <div className="w-full">
      {/*  Cropper Modal */}
      {isCropping && (
        <ImageCropper 
          image={selectedImage} 
          onCropComplete={onCropComplete} 
          onCancel={() => setIsCropping(false)} 
        />
      )}

      <h3 className="text-xl font-bold mb-6 text-[#1A365D]">Add New Project</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-10 border-b pb-10">
        <input
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Project Name"
          value={formData.projectName}
          onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
        />

        <textarea
          className="p-3 border rounded h-32 focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Project Description"
          value={formData.projectDescription}
          onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
        />

        <div className="flex flex-col">
          <label className="text-sm text-gray-500 mb-1 font-semibold">
            {formData.image ? "✅ Image Cropped (450x350)" : "Select Project Image"}
          </label>
          <input
            type="file"
            className="p-2 border rounded bg-gray-50"
            accept="image/*"
            onChange={onFileChange}
          />
          {/*preview of the cropped image */}
          {formData.image && (
             <p className="text-xs text-green-600 mt-1">Image ready for upload.</p>
          )}
        </div>

        <button
          disabled={loading}
          type="submit"
          className="bg-orange-500 text-white py-3 rounded font-bold hover:bg-orange-600 transition-colors w-max px-12 disabled:opacity-50"
        >
          {loading ? 'UPLOADING...' : 'ADD PROJECT'}
        </button>
      </form>
      
      <h3 className="text-xl font-bold mb-4 text-[#1A365D]">Existing Projects</h3>
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-xs font-bold">
              <th className="p-4 border-b">Project Name</th>
              <th className="p-4 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-semibold text-gray-800">{p.projectName}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:text-red-700 font-bold">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectManager;