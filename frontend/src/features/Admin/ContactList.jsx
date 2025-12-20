import React, { useEffect, useState } from 'react';
import api from '../../utils/Apiinstance';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await api.get('/contact/get-all-contact');
        setContacts(res.data.contacts);
      } catch (error) {
        console.error('Failed to fetch contacts', error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-[#1A365D] text-white">
          <tr>
            <th className="p-4 text-left">Full Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Mobile</th>
            <th className="p-4 text-left">City</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c._id} className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium">{c.fullName}</td>
              <td className="p-4">{c.email}</td>
              <td className="p-4">{c.mobileNumber}</td>
              <td className="p-4">{c.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
