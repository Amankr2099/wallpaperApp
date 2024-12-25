import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getWallsByTheme, getThemeByName } from "../lib/appwrite";

const ThemePage = () => {
  const { theme } = useParams(); // Extract category from the URL
  // const [images, setImages] = useState([
  //   {
  //     "url": "https://cdn.pixabay.com/photo/2022/12/25/09/52/winter-forest-7677111_1280.jpg",
  //     "tags": ["winter", "sad", "depressive"]
  //   },
  //   {
  //     "url": "https://cdn.pixabay.com/photo/2021/01/08/07/52/trees-5899195_1280.jpg",
  //     "tags": ["winter", "peaceful", "calm"]
  //   },
  //   {
  //     "url": "https://cdn.pixabay.com/photo/2022/07/06/07/52/grasses-7304572_1280.jpg",
  //     "tags": ["summer", "bright", "happy"]
  //   },
  //   {
  //     "url": "https://cdn.pixabay.com/photo/2013/05/15/06/10/autumn-111315_1280.jpg",
  //     "tags": ["autumn", "cozy", "melancholic"]
  //   },
  //   {
  //     "url": "https://cdn.pixabay.com/photo/2023/07/06/15/07/swim-8110683_1280.jpg",
  //     "tags": ["rain", "sad", "reflective"]
  //   },
  //   {
  //     "url": "https://cdn.pixabay.com/photo/2023/05/15/19/51/rain-7995866_1280.jpg",
  //     "tags": ["nature", "adventurous", "peaceful"]
  //   },
  //   {
  //     "url": "https://cdn.pixabay.com/photo/2016/11/06/23/51/buildings-1804481_1280.jpg",
  //     "tags": ["city", "nightlife", "vibrant"]
  //   },
  //   {
  //     "url": "https://cdn.pixabay.com/photo/2021/07/16/09/54/travel-6470467_1280.jpg",
  //     "tags": ["desert", "isolated", "warm"]
  //   },
  //   {
  //     "url": "https://cdn.pixabay.com/photo/2019/03/17/15/10/landscape-4061161_1280.jpg",
  //     "tags": ["beach", "sunny", "relaxing"]
  //   },
  //   {
  //     "url": "https://cdn.pixabay.com/photo/2022/06/25/23/41/ladybug-7284337_1280.jpg",
  //     "tags": ["forest", "mystical", "calm"]
  //   }
  // ]
  // );
  // const [filters, setFilters] = useState(
  //   [
  //       "winter",
  //       "sad",
  //       "depressive",
  //       "peaceful",
  //       "calm",
  //       "summer",
  //       "bright",
  //       "happy",
  //       "autumn",
  //       "cozy",
  //       "melancholic",
  //       "rain",
  //       "reflective",
  //       "nature",
  //       "adventurous",
  //       "city",
  //       "nightlife",
  //       "vibrant",
  //       "desert",
  //       "isolated",
  //       "warm",
  //       "beach",
  //       "sunny",
  //       "relaxing",
  //       "forest",
  //       "mystical"
  //     ]
  // ); // State to store available filter tags

  const [images, setImages] = useState([]);
  const [filters, setFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]); // State to store selected filter tags

  const [loading, setLoading] = useState(true); // Manage loading state
  const [error, setError] = useState(null); // Manage error state

  useEffect(() => {
    // Fetch both images and filters from the backend
    const fetchData = async () => {
      setLoading(true); // Set loading to true when starting the fetch

      try {
        // Fetch images based on the theme
        const imageData = await getWallsByTheme(theme);
        setImages(imageData); // Store images from the response

        // Fetch filters based on the theme
        const filterData = await getThemeByName(theme);
        setFilters(filterData.tags); // Store filters from the response

        setError(null); // Clear any previous errors if the request is successful
      } catch (err) {
        setError("Error fetching data. Please try again later."); // Set error message
        console.error("Error fetching data:", err); // Log the error for debugging
      } finally {
        setLoading(false); // Set loading to false after the fetch is complete
      }
    };

    fetchData();
  }, [theme]); // Dependency array ensures it runs whenever the 'theme' changes

  // Filter images based on selected tags
  const filteredImages =
    selectedFilters.length > 0
      ? images.filter((image) =>
          selectedFilters.some((tag) => image.tags.includes(tag))
        )
      : images;

  // Toggle a filter tag's selection state
  const toggleFilter = (filter) => {
    setSelectedFilters(
      (prevFilters) =>
        prevFilters.includes(filter)
          ? prevFilters.filter((f) => f !== filter) // Remove filter if already selected
          : [...prevFilters, filter] // Add filter if not selected
    );
  };

  if (loading) return <div className="my-20 text-center">Loading...</div>; // Show loading indicator
  if (error) return <div className="my-20">{error}</div>; // Show error message

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* <h1 className="text-3xl font-bold text-center mb-6 capitalize">{category} Images</h1> */}

      {/* Filter Tags Section */}
      <div className="flex flex-wrap justify-center gap-3 my-5">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-full border text-sm transition-all 
              ${
                selectedFilters.includes(filter)
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }
              hover:bg-blue-400 hover:text-white`}
            onClick={() => toggleFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {filteredImages.map((image) => (
          <Link key={image.id} to={`/wallpaper/${image.$id}`}>
            <div className="relative group ">
              <img
                src={image.imageURL}
                alt={image.title || "Image"}
                className="w-full h-full object-cover rounded-lg shadow-md transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center rounded-lg">
                <span className="text-white text-xl">{image.title}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No images found.</p>
      )}
    </div>
  );
};

export default ThemePage;
