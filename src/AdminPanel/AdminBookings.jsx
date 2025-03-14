import { useState, useEffect } from 'react';
import {
  SearchIcon,
  CalendarIcon,
  ClockIcon,
  CheckIcon,
  XIcon,
  CheckCircleIcon,
  EyeIcon,
  AlertCircleIcon,
} from 'lucide-react';

export const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('All'); // Default to 'All'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve JWT token from localStorage
  const getJwtToken = () => {
    return localStorage.getItem('token') || '';
  };

  const fetchBookings = async () => {
    try {
      const token = getJwtToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('http://localhost:8080/auth/getallbookings', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const data = await response.json();
      setBookings(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Filter bookings based on active tab, search term, and selected date
  const filteredBookings = bookings.filter((booking) => {
    const matchesTab = activeTab === 'All' || booking.status === activeTab;
    const matchesSearch =
      (booking.customerName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (booking.bookingId?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesDate = !selectedDate || (booking.bookingDate?.includes(selectedDate) || false);
    return matchesTab && matchesSearch && matchesDate;
  });

  const stats = [
    {
      id: 'Pending',
      name: 'Pending',
      count: bookings.filter((b) => b.status === 'Pending').length,
      icon: <ClockIcon className="h-6 w-6 text-yellow-500" />,
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700',
    },
    {
      id: 'Confirmed',
      name: 'Confirmed',
      count: bookings.filter((b) => b.status === 'Confirmed').length,
      icon: <CheckIcon className="h-6 w-6 text-blue-500" />,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    {
      id: 'Canceled',
      name: 'Canceled',
      count: bookings.filter((b) => b.status === 'Canceled').length,
      icon: <XIcon className="h-6 w-6 text-red-500" />,
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
    },
    {
      id: 'Completed',
      name: 'Completed',
      count: bookings.filter((b) => b.status === 'Completed').length,
      icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
    },
  ];

  const tabs = [
    { id: 'All', label: 'All' },
    { id: 'Pending', label: 'Pending' },
    { id: 'Confirmed', label: 'Confirmed' },
    { id: 'Canceled', label: 'Canceled' },
    { id: 'Completed', label: 'Completed' },
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'Canceled':
        return 'bg-red-100 text-red-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <AlertCircleIcon className="h-4 w-4" />;
      case 'Confirmed':
        return <CheckIcon className="h-4 w-4" />;
      case 'Canceled':
        return <XIcon className="h-4 w-4" />;
      case 'Completed':
        return <CheckCircleIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="flex h-screen items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-6 overflow-auto transition-all duration-300">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 font-grotesk">Booking Dashboard</h1>
          <p className="text-gray-600 font-grotesk">Manage and monitor all booking activities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className={`${stat.bgColor} p-4 rounded-lg shadow-sm border border-gray-200`}
            >
              <div className="flex items-center">
                <div className="p-2 rounded-md bg-white">{stat.icon}</div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 font-grotesk">{stat.name}</p>
                  <p className={`text-2xl font-bold font-grotesk ${stat.textColor}`}>{stat.count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search bookings..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64 font-grotesk"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 font-grotesk" />
                <input
                  type="date"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-md">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`px-3 py-1 text-sm font-medium rounded-md font-grotesk ${
                      activeTab === tab.id
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {filteredBookings.length === 0 ? (
              <div className="p-8 text-center text-gray-500 font-grotesk">
                No bookings found matching your criteria.
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 font-grotesk">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.bookingId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {booking.bookingId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{booking.bookingDate}</div>
                        <div className="text-sm text-gray-500">{booking.bookingTime}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(
                            booking.status
                          )}`}
                        >
                          <span className="mr-1">{getStatusIcon(booking.status)}</span>
                          {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900">
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
      </div>
    </div>
  );
};