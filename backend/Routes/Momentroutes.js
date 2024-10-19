import express from 'express';
import { createMemory, deleteMemoryById, getAllMemories, getMemoryById, updateMemoryById } from '../controllers/MemoryController.js'; // Use named import
import cloudinaryFileUploader from '../Middlewares/FileUploader.js';

const router = express.Router();

// Define routes
router.post("/", cloudinaryFileUploader.single('picture'), createMemory);
router.put("/:id",cloudinaryFileUploader.single('picture'),updateMemoryById);
router.get("/", getAllMemories);
router.get("/:id",getMemoryById);
router.delete("/:id",deleteMemoryById)

// Export the router as default
export default router;
