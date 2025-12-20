import React, { useEffect, useState } from 'react';
import api from '../../utils/Apiinstance';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.projectName || !formData.projectDescription || !formData.image) {
      alert('All fields are required');
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append('projectName', formData.projectName);
      data.append('projectDescription', formData.projectDescription);
      data.append('projectImage', formData.image);

      await api.post('/project/add-project', data);

      setFormData({
        projectName: '',
        projectDescription: '',
        image: null,
      });

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
      {/* Add Project Form */}
      <h3 className="text-xl font-bold mb-6 text-[#1A365D]">Add New Project</h3>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 mb-10 border-b pb-10"
      >
        <input
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Project Name"
          value={formData.projectName}
          onChange={(e) =>
            setFormData({ ...formData, projectName: e.target.value })
          }
        />

        <textarea
          className="p-3 border rounded h-32 focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Project Description"
          value={formData.projectDescription}
          onChange={(e) =>
            setFormData({ ...formData, projectDescription: e.target.value })
          }
        />

        <div className="flex flex-col">
          <label className="text-sm text-gray-500 mb-1 font-semibold">Select Project Image</label>
          <input
            type="file"
            className="p-2 border rounded bg-gray-50"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="bg-orange-500 text-white py-3 rounded font-bold hover:bg-orange-600 transition-colors w-max px-12 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'UPLOADING...' : 'ADD PROJECT'}
        </button>
      </form>

      {/* Projects Table */}
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
            {projects.length > 0 ? (
              projects.map((p) => (
                <tr key={p._id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-semibold text-gray-800">
                    {p.projectName}
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleDelete(p._id)}
                      className="text-red-500 hover:text-red-700 font-bold text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="p-10 text-center text-gray-400 italic">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectManager;