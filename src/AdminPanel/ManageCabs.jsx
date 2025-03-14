import { useState, useEffect } from 'react';
import { SearchIcon, EyeIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import axios from 'axios';

export const ManageCabs = () => {
  const [cabs, setCabs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // Filter for Available/Unavailable table
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCab, setSelectedCab] = useState(null);

  // Fetch cabs from backend on component mount
  useEffect(() => {
    const fetchCabs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get('http://localhost:8080/auth/getallCabs', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        setCabs(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch cabs');
        setLoading(false);
      }
    };

    fetchCabs();
  }, []);

  // Filter cabs with companyStatus = "Pending" and search term
  const filteredPendingCabs = cabs.filter(
    (cab) =>
      cab.companyStatus === 'Pending' &&
      (cab.cabModel?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cab.Numberplate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cab.ownerName?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Filter cabs for Available/Unavailable table
  const filteredOperationalCabs = cabs
    .filter((cab) => cab.companyStatus !== 'Pending') // Exclude Pending cabs
    .filter((cab) =>
      statusFilter === 'All'
        ? true
        : cab.availabilityStatus === statusFilter
    );

  // Handle approving a cab
  const handleApproveCab = async (cabId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:8080/auth/approveCab/${cabId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setCabs(cabs.map((cab) => (cab.cabId === cabId ? { ...cab, companyStatus: 'Approved' } : cab)));
      setSelectedCab(null);
    } catch (err) {
      setError('Failed to approve cab');
    }
  };

  // Handle rejecting a cab
  const handleRejectCab = async (cabId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:8080/auth/rejectCab/${cabId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setCabs(cabs.map((cab) => (cab.cabId === cabId ? { ...cab, companyStatus: 'Rejected' } : cab)));
      setSelectedCab(null);
    } catch (err) {
      setError('Failed to reject cab');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="p-6">
        <h1 className="text-3xl font-semibold text-gray-800 font-grotesk">Cab Management Dashboard</h1>
        <p className="text-gray-600 mt-1 font-grotesk">Oversee and Administer Cab Registrations</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Search Bar */}
        <div className="bg-white p-4  font-grotesk">
          <div className="relative w-full md:w-[450px]">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search pending cabs by model, plate, or owner..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Pending Cabs Table */}
        <div className="bg-white shadow-md mb-6 border border-gray-200 font-grotesk">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Pending Cab Registrations</h2>
          </div>
          <div className="overflow-x-auto">
            {filteredPendingCabs.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No pending cabs found.</div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cab Model
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Number Plate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Owner Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Owner Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPendingCabs.map((cab) => (
                    <tr key={cab.cabId} className="hover:bg-gray-50 transition duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {cab.cabModel}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cab.Numberplate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cab.ownerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cab.ownerEmail}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => setSelectedCab(cab)}
                          className="text-indigo-600 hover:text-indigo-800 transition duration-150"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Operational Cabs Table (Available/Unavailable) */}
        <div className="bg-white rounded-lg shadow-md mb-6 border border-gray-200 font-grotesk">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Operational Cabs</h2>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
            >
              <option value="All">All</option>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            {filteredOperationalCabs.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No operational cabs found.</div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cab Model
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Number Plate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Owner Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Owner Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOperationalCabs.map((cab) => (
                    <tr key={cab.cabId} className="hover:bg-gray-50 transition duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {cab.cabModel}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cab.Numberplate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cab.ownerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cab.ownerEmail}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cab.contactNumber || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            cab.availabilityStatus === 'Available'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {cab.availabilityStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      {/* Cab Details Modal (Formal Profile Style) */}
      {selectedCab && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 hover:scale-100 border border-gray-200">
            {/* Header Section */}
            <div className="relative bg-gradient-to-r from-indigo-600 to-blue-700 rounded-t-2xl p-8 text-white">
              <button
                onClick={() => setSelectedCab(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-200 focus:outline-none transition duration-150"
              >
                <XCircleIcon className="h-7 w-7" />
              </button>
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  {selectedCab.imgUrl ? (
                    <img
                      src={selectedCab.imgUrl}
                      alt={selectedCab.cabModel}
                      className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="h-28 w-28 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-3xl shadow-lg">
                      {selectedCab.cabModel?.charAt(0) || 'C'}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-4xl font-semibold tracking-tight">{selectedCab.cabModel}</h2>
                  <p className="text-xl font-medium mt-1">{selectedCab.Numberplate}</p>
                  <p className="text-sm font-light mt-2 bg-indigo-800 inline-block px-3 py-1 rounded-full">
                    Pending Registration Review
                  </p>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-8 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Owner Details */}
                <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-300 pb-3">
                    Owner Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-600 w-28">Full Name:</span>
                      <p className="text-md font-semibold text-gray-900">{selectedCab.ownerName}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-600 w-28">Email:</span>
                      <p className="text-md font-semibold text-gray-900">{selectedCab.ownerEmail}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-600 w-28">Contact:</span>
                      <p className="text-md font-semibold text-gray-900">
                        {selectedCab.contactNumber || 'Not Provided'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-300 pb-3">
                    Submitted Documents
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <span className="text-sm font-medium text-gray-600">License Image:</span>
                      {selectedCab.licenseImage ? (
                        <img
                          src={selectedCab.licenseImage}
                          alt="License"
                          className="mt-2 h-48 w-full object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200"
                        />
                      ) : (
                        <p className="text-gray-500 mt-2 italic">No License Image Available</p>
                      )}
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Driver Image:</span>
                      {selectedCab.driverImage ? (
                        <img
                          src={selectedCab.driverImage}
                          alt="Driver"
                          className="mt-2 h-48 w-full object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200"
                        />
                      ) : (
                        <p className="text-gray-500 mt-2 italic">No Driver Image Available</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Approve/Reject Buttons */}
              <div className="mt-10 flex justify-end gap-6">
                <button
                  onClick={() => handleRejectCab(selectedCab.cabId)}
                  className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl font-medium"
                >
                  <XCircleIcon className="h-5 w-5" />
                  Reject Registration
                </button>
                <button
                  onClick={() => handleApproveCab(selectedCab.cabId)}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl font-medium"
                >
                  <CheckCircleIcon className="h-5 w-5" />
                  Approve Registration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};