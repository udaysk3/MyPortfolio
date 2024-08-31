import React, { useState, useEffect } from "react";
import ReactGA from "react-ga";
import { FaEye, FaTimes } from "react-icons/fa"; // Icons for eye and cross

const ViewerCountLabel = () => {
  const [isOpen, setIsOpen] = useState(true); // To toggle the label's visibility
  const [viewCount, setViewCount] = useState(0); // State to store the viewer count

  useEffect(() => {
    // Initialize React GA
    ReactGA.initialize("UA-XXXXX-Y"); // Replace with your GA tracking ID

    // Fetch viewer count from Google Analytics
    const fetchViewerCount = async () => {
      try {
        
        
        const mockCount = 150; // Example viewer count
        setViewCount(mockCount);
      } catch (error) {
        console.error("Error fetching viewer count:", error);
      }
    };

    fetchViewerCount();
  }, []);

  return (
    <div className="relative">
      {isOpen ? (
        <div className="flex items-center space-x-2 p-2 bg-gray-200 text-gray-700 rounded-md shadow-md">
          <FaEye className="text-gray-600" />
          <span>{viewCount} Views</span>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes />
          </button>
        </div>
      ) : (
        <button
          className="flex items-center p-2 bg-gray-200 text-gray-700 rounded-md shadow-md"
          onClick={() => setIsOpen(true)}
        >
          <FaEye className="text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default ViewerCountLabel;
