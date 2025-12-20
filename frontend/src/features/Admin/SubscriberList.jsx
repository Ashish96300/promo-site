import React, { useEffect, useState } from 'react';
import api from '../../utils/Apiinstance';

const SubscriberList = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await api.get('/subscribers/get-all-sub');
        setSubscribers(res.data.subscribers);
      } catch (error) {
        console.error('Failed to fetch subscribers', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-400">
        Loading subscribers...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg">
      <h3 className="text-xl font-bold text-[#1A365D] mb-6 px-2">
        Subscribed Users
      </h3>

      <div className="border rounded-md overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600">
                Email Address
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600 text-right">
                Date Joined
              </th>
            </tr>
          </thead>

          <tbody>
            {subscribers.length > 0 ? (
              subscribers.map((sub) => (
                <tr
                  key={sub._id}
                  className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 text-gray-700">
                    {sub.email}
                  </td>
                  <td className="p-4 text-gray-400 text-sm text-right">
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="2"
                  className="p-10 text-center text-gray-400 italic"
                >
                  No subscribers found yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriberList;
