import { Client, Databases, Storage, ID, Query} from 'appwrite';
export const client = new Client();

import conf from '../conf/conf';
const storage = new Storage(client);
const databases = new Databases(client);


client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId); // Replace with your project ID


// Create a Theme Document
async function createTheme(themeData) {
    try {
        const response = await databases.createDocument(
            conf.appwriteDatabaseId, // Replace with your Database ID
            conf.appwriteThemeId,
            ID.unique(), // Auto-generate a unique ID
            themeData
        );
        // console.log('Theme Created:', response);
        return response
    } catch (error) {
        console.error('Error creating theme:', error);
    }
}

async function getThemes () {
    try {
      const response = await databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteThemeId);
      // console.log("Themes fetched:", response.documents);
      return response.documents;
    } catch (error) {
      console.error("Error fetching themes:", error);
      throw error;
    }
  };

async function getThemeByName(themeName) {
    try {
        const response = await databases.listDocuments(
            conf.appwriteDatabaseId, // Replace with your Database ID
            conf.appwriteThemeId,
            [Query.equal('theme', themeName)] // Filter by the "theme" field
        );

        if (response.documents.length > 0) {
            // console.log('Theme Found:', response.documents[0]);
            return response.documents[0];
        } else {
            console.log('No theme found with the name:', themeName);
            return null;
        }
    } catch (error) {
        console.error('Error fetching theme:', error);
    }
}


// Create a Wall Document
async function createWall(wallData) {
    try {
        const response = await databases.createDocument(
            conf.appwriteDatabaseId, // Replace with your Database ID
            conf.appwriteWallsId,
            ID.unique(), // Auto-generate a unique ID
            wallData
        );
        // Call updateThemeTags with the theme ID and new tags
        // console.log('Wall Created:', response);
        return response
    } catch (error) {
        console.error('Error creating wall:', error);
    }
}


// Upload Image
async function uploadImage(file) {
    try {
        const response = await storage.createFile(
            conf.appwriteBucketId, // Replace with your Bucket ID
            ID.unique(), // Auto-generate a unique file ID
            file // The file to upload
        );
        // console.log('Image Uploaded:', response);
        return response;
    } catch (error) {
        console.error('Error uploading image:', error);
    }
}

// Get Image URL
function getImageURL(fileId) {
    try {
        //store preview url to load faster
        const imageURL = storage.getFilePreview(conf.appwriteBucketId, fileId);

        // console.log('Image URL:', imageURL);

        return imageURL;
    } catch (error) {
        console.error('Error generating image URL:', error);
    }
}

async function downloadImage (fileId) {
    try {
      const downloadURL = storage.getFileDownload(conf.appwriteBucketId, fileId); // Replace with your storage bucket ID
      // console.log("Generated download URL:", downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("Error generating download URL:", error);
      throw error;
    }
  };

async function getWallById(wallId) {
    try {
      const response = await databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteWallsId,
        wallId
      );
    //   console.log("Fetched wall:", response);
      return response;

    } catch (error) {
      console.error("Error fetching wall by ID:", error);
    //   throw error;
    }
  }

async function getWallsByTheme(theme) {
    try {
        const response = await databases.listDocuments(
            conf.appwriteDatabaseId, // Replace with your Database ID
            conf.appwriteWallsId, // Replace with your Walls collection ID
            [Query.equal('theme', theme)] // Filter by theme
        );

        // console.log('Walls with theme:', theme, response.documents);
        return response.documents;
    } catch (error) {
        console.error('Error fetching walls by theme:', error);
        return [];
    }
}

async function getWallsByTags(tags) {
    try {
        const response = await databases.listDocuments(
            conf.appwriteDatabaseId, // Replace with your Database ID
            conf.appwriteWallsId, // Replace with your Walls collection ID
            [Query.search('tags', tags)] // Search for any of the tags
        );

        // console.log('Walls with tags:', tags, response.documents);
        return response.documents;
    } catch (error) {
        console.error('Error fetching walls by tags:', error);
        return [];
    }
}

  
async function getTopRecentWalls () {
    try {
      const response = await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteWallsId,
        [
          Query.orderDesc('$createdAt'), // Sort by creation date in descending order
          Query.limit(3),               // Limit the result to 3 documents
        ]
      );
      // console.log("Top 3 recent walls:", response.documents);
      return response.documents;
    } catch (error) {
      console.error("Error fetching top recent walls:", error);
      throw error;
    }
  };
  

export { getThemeByName, getWallsByTags, getWallsByTheme, getImageURL , getThemes,getWallById,uploadImage,createTheme,createWall,getTopRecentWalls,downloadImage}