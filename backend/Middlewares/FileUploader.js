import multer from 'multer';
import pkg from 'cloudinary';
const { v2: cloudinary } = pkg; 
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configuring Cloudinary with environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Setting up Cloudinary storage for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        format: async (req, file) => 'png', 
        public_id: (req, file) => file.originalname.split('.')[0], // Generating public_id
    }
});

// Multer middleware for handling file uploads
const cloudinaryFileUploader = multer({ storage: storage });

export default cloudinaryFileUploader;
