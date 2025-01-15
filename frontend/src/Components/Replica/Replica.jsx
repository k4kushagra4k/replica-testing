import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import _ from "lodash"; // Import lodash
import "./Replica.css";

const Replica = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [replicas, setReplicas] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filteredReplicas, setFilteredReplicas] = useState([]); // State for filtered replicas

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    fetchReplicas();
    return () => unsubscribe();
  }, []);

  const fetchReplicas = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/replicas");
      if (response.data && response.status === 200) {
        setReplicas(response.data || []);
        setFilteredReplicas(response.data || []); // Initialize filtered replicas
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Error fetching replicas:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this replica?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/replicas/${id}`
      );
      if (response.status === 200) {
        alert("Replica deleted successfully!");
        setReplicas((prevReplicas) =>
          prevReplicas.filter((replica) => replica._id !== id)
        );
        setFilteredReplicas((prevReplicas) =>
          prevReplicas.filter((replica) => replica._id !== id)
        );
      } else {
        alert("Failed to delete replica. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting replica:", error);
      alert("An error occurred while deleting the replica.");
    }
  };

  const handleStaticCardClick = () => {
    if (isLoggedIn) {
      navigate("/CreateReplica");
    } else {
      navigate("/auth");
    }
  };

  // Debounced function to handle search
  const debouncedSearch = useMemo(
    () =>
      _.debounce((query) => {
        const filtered = replicas.filter((replica) =>
          replica.name?.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredReplicas(filtered);
      }, 1000),
    [replicas]
  );

  // Handle search input change
  const handleSearchChange = useCallback(
    (e) => {
      const query = e.target.value;
      setSearchQuery(query);
      debouncedSearch(query); // Call the debounced search function
    },
    [debouncedSearch]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel(); // Clean up debounced function on component unmount
    };
  }, [debouncedSearch]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Digital Replicas
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start your journey to create a personalized AI-powered digital
            replica.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange} // Use the debounced search handler
            placeholder="Search by name..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-12">
          {/* Create New Replica Card */}
          <div
            onClick={handleStaticCardClick}
            className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <img
                  src="/replica.jpg"
                  alt="Create Your Digital Replica"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-8 md:w-2/3">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Create Your Digital Replica
                </h3>
                <p className="text-gray-600 mb-6">
                  Start your journey to create a personalized digital replica.
                </p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Existing Replicas Grid */}
          {filteredReplicas && filteredReplicas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredReplicas.map((replica) => (
                <div
                  key={replica._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Image Section */}
                  {replica.image && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={replica.image}
                        alt={replica.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {/* Replica Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {replica.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{replica.description}</p>
                    <div className="flex justify-between gap-4">
                      <button
                        onClick={() =>
                          navigate("/chatbot", {
                            state: {
                              replicaName: replica.name,
                              replicaDescription: replica.description,
                              replicaPersona: replica.persona,
                            },
                          })
                        }
                        className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Start Chat
                      </button>

                      <button
                        onClick={() => handleDelete(replica._id)}
                        className="w-full bg-red-100 text-red-800 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No replicas found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Replica;
