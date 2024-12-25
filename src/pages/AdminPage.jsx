import React, { useState } from "react";
import { createTheme, createWall, getImageURL, uploadImage } from "../lib/appwrite"
import { useParams } from "react-router-dom";
import conf from "../conf/conf";

const AdminPage = () => {
  const [image, setImage] = useState(null);
  const {adminId} = useParams();

  if (adminId !== conf.adminId) {
    
    alert('You are not authenicated!')
    window.location.replace('/')
  }

  const [wall, setWall] = useState({
    theme: [],
    title: "",
    description: "",
    tags: [],
  });
  const [theme, setTheme] = useState({
    theme: "",
    tags: [],
  });

  const handleImageUpload = async () => {
    try {
      const file = await uploadImage(image);
      if (file.$id) {
        const imageURL = getImageURL(file.$id);
        
        setWall((prev) => ({ ...prev, imageId: file.$id, imageURL }));
      }
      alert('image uploaded')
      setImage(null)
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };

  const handleWallSubmit = async () => {
    try {
      await createWall(wall)
      alert("Wall added successfully");
      setWall({ theme: [], title: "", description: "", tags: [] }); 
    } catch (error) {
      console.error("Failed to add wall", error);
    }
  };

  const handleThemeSubmit = async () => {
    try {
      await createTheme(theme)
      alert("Theme added successfully");
      setTheme({ theme: "", tags: [] });
    } catch (error) {
      console.error("Failed to add theme", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>

      {/* Image Upload Section */}
      <div className="mb-6 p-3">
        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mt-2 block w-full border-gray-300 rounded-md shadow-sm"
        />
        <button
          onClick={handleImageUpload}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Upload Image
        </button>
      </div>

      {/* Wall Form */}
      <div className="mb-6 p-3">
        <h2 className="text-xl font-semibold mb-2">Add Wall</h2>
        <input
          type="text"
          placeholder="Title"
          value={wall.title}
          onChange={(e) => setWall({ ...wall, title: e.target.value })}
          className="mt-2 block w-full border-gray-300 rounded-md shadow-sm p-2"
        />
        <textarea
          placeholder="Description"
          value={wall.description}
          onChange={(e) => setWall({ ...wall, description: e.target.value })}
          className="mt-2 block w-full border-gray-300 rounded-md shadow-sm p-2"
        ></textarea>
        {/* <input
          type="text"
          placeholder="imageId"
          value={wall.imageId}
          onChange={(e) => setWall({ ...wall, imageId: e.target.value })}
          className="mt-2 block w-full border-gray-300 rounded-md shadow-sm p-2"
        />
        <input
          type="text"
          placeholder="imageURL"
          value={wall.imageURL}
          onChange={(e) => setWall({ ...wall, imageURL: e.target.value })}
          className="mt-2 block w-full border-gray-300 rounded-md shadow-sm p-2"
        /> */}
        <input
          type="text"
          placeholder="Theme (comma-separated)"
          value={wall.theme.join(", ")}
          onChange={(e) => setWall({ ...wall, theme: e.target.value.split(",").map((theme) => theme.trim()) })}
          className="mt-2 block w-full border-gray-300 rounded-md shadow-sm p-2"
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={wall.tags.join(", ")}
          onChange={(e) =>
            setWall({ ...wall, tags: e.target.value.split(",").map((tag) => tag.trim()) })
          }
          className="mt-2 block w-full border-gray-300 rounded-md shadow-sm p-2"
        />
        <button
          onClick={handleWallSubmit}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Add Wall
        </button>
      </div>

      {/* Theme Form */}
      <div className="p-3">
        <h2 className="text-xl font-semibold mb-2">Add Theme</h2>
        <input
          type="text"
          placeholder="Theme"
          value={theme.theme}
          onChange={(e) => setTheme({ ...theme, theme: e.target.value })}
          className="mt-2 block w-full border-gray-300 rounded-md shadow-sm p-2"
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={theme.tags.join(", ")}
          onChange={(e) =>
            setTheme({ ...theme, tags: e.target.value.split(",").map((tag) => tag.trim()) })
          }
          className="mt-2 block w-full border-gray-300 rounded-md shadow-sm p-2"
        />
        <button
          onClick={handleThemeSubmit}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Add Theme
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
