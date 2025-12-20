import React, { useState } from 'react';
import ProjectManager from '../features/Admin/ProjectManager';
import ClientManager from '../features/Admin/ClientManager';
import ContactList from '../features/Admin/ContactList';
import SubscriberList from '../features/Admin/SubscriberList';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('projects');

  const menuItems = [
    { id: 'projects', label: 'Manage Projects' },
    { id: 'clients', label: 'Manage Clients' },
    { id: 'contacts', label: 'Contact Responses' },
    { id: 'subscribers', label: 'Subscribed Emails' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-[#1A365D] text-white shadow-xl">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold tracking-tighter">RealTrust <span className="text-orange-500 text-sm">ADMIN</span></h1>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-6 py-4 transition-colors ${
                activeTab === item.id ? 'bg-orange-500 text-white font-bold' : 'hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-10 overflow-y-auto">
        <header className="mb-10 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-[#1A365D] capitalize">{activeTab}</h2>
          <button className="text-sm text-gray-500 hover:text-red-500">Logout</button>
        </header>

        <div className="bg-white rounded-lg shadow-sm p-8 min-h-[500px]">
          {activeTab === 'projects' && <ProjectManager />}
          {activeTab === 'clients' && <ClientManager />}
          {activeTab === 'contacts' && <ContactList />}
          {activeTab === 'subscribers' && <SubscriberList />}
        </div>
      </div>
    </div>
  );
};

export default Admin;