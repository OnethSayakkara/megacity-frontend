import { useState, useEffect } from 'react';
import { PlusIcon, SearchIcon, MoreVerticalIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import axios from 'axios';

export const ManageAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newAdmin, setNewAdmin] = useState({ userName: '', adminEmail: '', role: '' });

  // Fetch admins from backend on component mount
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get('http://localhost:8080/getAllAdmins', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAdmins(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch admins');
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  // Handle adding a new admin (mock implementation)
  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/addAdmin', newAdmin, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdmins([...admins, response.data]);
      setShowAddModal(false);
      setNewAdmin({ userName: '', adminEmail: '', role: '' });
    } catch (err) {
      setError('Failed to add admin');
    }
  };

  // Filter admins based on search term
  const filteredAdmins = admins.filter(
    (admin) =>
      admin.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.adminEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadgeColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'super admin':
        return 'bg-purple-100 text-purple-800';
      case 'admin':
        return 'bg-blue-100 text-blue-800';
      case 'moderator':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="flex items-center font-grotesk justify-center h-screen text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 font-grotesk">Admin Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-Orangepeel text-white px-4 py-2 rounded-md flex items-center gap-2 font-grotesk"
        >
          <PlusIcon className="h-5 w-5" />
          Add Admin
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow">
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200 font-grotesk">
            <div className="relative w-full md:w-96">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search admins..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-Orangepeel"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Admin Table */}
          <div className="overflow-x-auto font-grotesk">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Admin
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>

                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAdmins.map((admin) => (
                  <tr key={admin.adminId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          {admin.adminImage ? (
                            <img
                              src={admin.adminImage}
                              alt={admin.userName}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-lg font-medium text-gray-600">
                              {admin.userName.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{admin.userName}</div>
                          <div className="text-sm text-gray-500">{admin.adminEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {admin.adminId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {admin.adminEmail}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVerticalIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center font-grotesk">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Admin</h2>
            <form onSubmit={handleAddAdmin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  value={newAdmin.userName}
                  onChange={(e) => setNewAdmin({ ...newAdmin, userName: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  value={newAdmin.adminEmail}
                  onChange={(e) => setNewAdmin({ ...newAdmin, adminEmail: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="Moderator">Moderator</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-Orangepeel text-white rounded-md"
                >
                  Add Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};