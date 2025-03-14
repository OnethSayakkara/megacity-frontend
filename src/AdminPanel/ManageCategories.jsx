import { useState, useEffect } from 'react';
import { PlusIcon, SearchIcon, MoreVerticalIcon, EditIcon } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling

export const ManageCategories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCategory, setNewCategory] = useState({
    categoryName: '',
    pricePerKm: '',
    categorypic: null,
  });
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories from backend on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get('http://localhost:8080/auth/getallcategories', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle adding a new category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const formData = new FormData();
      formData.append('categoryName', newCategory.categoryName);
      formData.append('pricePerKm', newCategory.pricePerKm);
      formData.append('categorypic', newCategory.categorypic);

      const response = await axios.post('http://localhost:8080/addcategory', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setCategories([...categories, response.data]);
      setShowAddModal(false);
      setNewCategory({ categoryName: '', pricePerKm: '', categorypic: null });
      toast.success('Category added successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (err) {
      setError('Failed to add category');
      toast.error('Failed to add category: ' + (err.message || 'Unknown error'), {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  // Handle updating a category
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const updatedCategory = {
        categoryName: selectedCategory.categoryName,
        pricePerKm: selectedCategory.pricePerKm,
        categorypic: selectedCategory.categorypic,
      };

      const response = await axios.put(
        `http://localhost:8080/updatecategory/${selectedCategory.categoryId}`,
        updatedCategory,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setCategories(
        categories.map((cat) =>
          cat.categoryId === selectedCategory.categoryId ? response.data : cat
        )
      );
      setShowUpdateModal(false);
      setSelectedCategory(null);
      toast.success('Category updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (err) {
      setError('Failed to update category');
      toast.error('Failed to update category: ' + (err.message || 'Unknown error'), {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Toast Container */}
      <ToastContainer />

      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 font-montserrat font-grotesk">Category Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-md flex font-grotesk items-center gap-2 font-montserrat hover:bg-orange-600 mr-2"
        >
          <PlusIcon className="h-5 w-5" />
          Add Category
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow font-grotesk">
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative w-full md:w-96">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search categories..."
                className="pl-10 pr-4 py-2 border font-montserrat border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Categories Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium font-montserrat text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium font-montserrat text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium font-montserrat text-gray-500 uppercase tracking-wider">
                    Price/Km
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium font-montserrat text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium font-montserrat text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCategories.map((category) => (
                  <tr key={category.categoryId} className="hover:bg-gray-50 font-montserrat">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 font-montserrat">
                        {category.categoryName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-montserrat">
                      {category.categoryId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-montserrat">
                      Rs.{category.pricePerKm.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {category.categorypic ? (
                        <img
                          src={category.categorypic}
                          alt={category.categoryName}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-sm text-gray-500">No Image</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedCategory(category);
                            setShowUpdateModal(true);
                          }}
                          className="text-orange-500 hover:text-orange-700"
                        >
                          <EditIcon className="h-5 w-5" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVerticalIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center font-grotesk">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-6 text-gray-800 font-montserrat">Add New Category</h2>
            <form onSubmit={handleAddCategory}>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                  Category Name
                </label>
                <input
                  type="text"
                  className="block w-full border border-gray-300 rounded-md p-3 text-sm font-montserrat focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                  value={newCategory.categoryName}
                  onChange={(e) => setNewCategory({ ...newCategory, categoryName: e.target.value })}
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                  Price Per Km
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="block w-full border border-gray-300 rounded-md p-3 text-sm font-montserrat focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                  value={newCategory.pricePerKm}
                  onChange={(e) => setNewCategory({ ...newCategory, pricePerKm: e.target.value })}
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                  Category Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full border border-gray-300 rounded-md p-3 text-sm font-montserrat file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-montserrat file:bg-orange-50 file:text-orange-500 hover:file:bg-orange-100"
                  onChange={(e) => setNewCategory({ ...newCategory, categorypic: e.target.files[0] })}
                  required
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-montserrat transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 font-montserrat transition duration-200"
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Category Modal */}
      {showUpdateModal && selectedCategory && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center font-grotesk">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-6 text-gray-800 font-montserrat">Update Category</h2>
            <form onSubmit={handleUpdateCategory}>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                  Category Name
                </label>
                <input
                  type="text"
                  className="block w-full border border-gray-300 rounded-md p-3 text-sm font-montserrat focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                  value={selectedCategory.categoryName}
                  onChange={(e) =>
                    setSelectedCategory({ ...selectedCategory, categoryName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                  Price Per Km
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="block w-full border border-gray-300 rounded-md p-3 text-sm font-montserrat focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                  value={selectedCategory.pricePerKm}
                  onChange={(e) =>
                    setSelectedCategory({ ...selectedCategory, pricePerKm: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                  Current Image
                </label>
                {selectedCategory.categorypic ? (
                  <img
                    src={selectedCategory.categorypic}
                    alt={selectedCategory.categoryName}
                    className="h-16 w-16 rounded-full object-cover mb-2"
                  />
                ) : (
                  <span className="text-sm text-gray-500">No Image</span>
                )}
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="px-5 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-montserrat transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 font-montserrat transition duration-200"
                >
                  Update Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};