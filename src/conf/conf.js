const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteThemeId: String(import.meta.env.VITE_APPWRITE_THEME_COLLECTION_ID),
    appwriteWallsId: String(import.meta.env.VITE_APPWRITE_WALLS_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    adminId:String(import.meta.env.VITE_ADMIN_ID)
}

export default conf