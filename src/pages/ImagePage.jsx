
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { downloadImage, getImageURL, getWallById, getWallsByTags } from "../lib/appwrite";

export default function ImagePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null); // Manage error state
  const [loading, setLoading] = useState(true); // Manage loading state

  
  const { wallID } = useParams();
  const [wallpaper, setWallpaper] = useState({});
  const [tags, setTags] = useState([]);
  const [similarImages, setsimilarImages] = useState([]);

  useEffect(() => {
    // Fetch images and filters from the backend
    const fetchData = async () => {
      try {
        const data = await getWallById(wallID);
        setWallpaper(data); // Store images from the response
        setTags(data.tags);
        setError(null); // Clear any previous errors if the request is successful

      } catch (err) {
        setError("Error fetching data. Please try again later."); // Set error message
        console.error("Error fetching data:", err); // Log the error for debugging
      } finally {
        setLoading(false); // Set loading to false after the fetch is complete
      }
    };

    fetchData();
  }, [wallID]);

  useEffect(() => {
    // Fetch images and filters from the backend
    const fetchData = async () => {
      try {
        const data = await getWallsByTags(tags);
        setsimilarImages(data); // Store images from the response
      } catch (error) {
        console.error("Error fetching data:", error); // Log the error for debugging
      }
    };

    if (tags.length) {
    fetchData();
    }
  }, [tags]);

  const handleDownload = async () => {
    try {
      const imgID = wallpaper.imageId;
      
      const downloadURL = await downloadImage(imgID);
      const filename = `${String(wallpaper.title).replace(/\s+/g, '').toLowerCase()}.jpeg`;  
      // Trigger file download in the browser
      const a = document.createElement("a");
      a.href = downloadURL;
  
      // Ensure filename customization is correct
      
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send to server)
    alert("Form submitted!");
  };


  if (loading) return <div className="my-20 text-center">Loading...</div>; // Show loading indicator
  if (error) return <div className="my-20">{error}</div>; // Show error message


  return (
    <div className="mx-auto py-8 ">
      {/* Wallpaper Section */}
      <section className=" flex-col justify-items-center bg-gray-400 text-gray-700 ">
        <div className="p-4 my-2 md:text-4xl sm:text-2xl">
          {wallpaper.title}
        </div>
        <div className="relative">
          <img
            src={wallpaper.imageURL}
            alt="Wallpaper"
            className="w-auto h-screen object-cover px-2"
          />
          <button
            onClick={handleDownload}
            className="md:text-sm sm:text-xs absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-2 py-1 rounded-md shadow-lg hover:bg-blue-700 transition"
          >
            Download Wallpaper
          </button>
        </div>

        {/* <div className="max-w-screen-md mx-auto text-center  p-3 my-4 md:text-sm sm:text-xs">
          {wallpaper.description}
        </div> */}

        {/* Filter Tags Section */}
        <div className="flex flex-wrap justify-center gap-3 py-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`px-4 py-2 rounded-full border text-sm transition-all bg-blue-500 text-white hover:bg-blue-400`}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>
      <br />

      {/* Similar Images Section */}
      <section className="p-6 bg-slate-400 max-w-screen-lg mx-auto rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Similar Wallpapers
        </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {similarImages && similarImages.map((image,index) => (
                  <Link to={`/wallpaper/${image.$id}`} key={index} onClick={() => {
                    window.scrollTo(0, 0);
                  }}>
                    <div className="relative group ">
                      <img
                        src={image.imageURL}
                        alt={image.title || "Image"}
                        className=" h-2/3  rounded-lg shadow-md transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center rounded-lg">
                        <span className="text-white text-xl">{image.title}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
      </section>

      {/* Form Section */}
      <section className="my-12 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Leave Your Details
        </h2>
        <form
          onSubmit={handleFormSubmit}
          className="max-w-lg mx-auto space-y-4"
        >
          <div>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              placeholder="Name"
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              placeholder="Email"
            />
          </div>
          <button
            type="submit"
            className="w-1/4 mx-auto bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </section>

      <br />
      {/* Comment Box Section */}
      <section className="max-w-screen-md mx-auto my-10 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Leave a Comment
        </h2>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="5"
          placeholder="Write your comment here..."
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
        ></textarea>
        <button
          onClick={() => alert("Comment Submitted!")}
          className="w-1/4 mx-auto bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition mt-4 sm:mt-6"
        >
          Submit Comment
        </button>
      </section>
    </div>
  );
}
