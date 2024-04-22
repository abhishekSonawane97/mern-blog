import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, getPosts, deletePost, updatePost } from '../controller/post.controller.js';


const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getPosts', getPosts);
router.delete('/deletePost/:postId/:userId', verifyToken, deletePost);
router.put('/updatePost/:postId/:userId', verifyToken, deletePost);

export default router;