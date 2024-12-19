import express from 'express';
import { addBlog, getBlogs, getBlog, updateBlog, deleteBlog } from '../controllers/blogController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, addBlog);
router.get('/', getBlogs);
router.get('/:id', getBlog);
router.put('/:id', authMiddleware, updateBlog);
router.delete('/:id', authMiddleware, deleteBlog);

export default router;
