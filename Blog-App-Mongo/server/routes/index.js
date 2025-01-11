import express from "express";
import { addBlog, deleteBlog, editBlog, getAllBlog, getUserBlog, getSingleBlog } from "../controllers/blogs.controllers.js";
import { addUser, deleteUser, editUser, getAllUser, loginUser, logoutUser, regenerateAccessToken } from "../controllers/users.controllers.js";
import { likeBlog } from '../controllers/like.controller.js';
import { commentOnBlog } from '../controllers/comment.controller.js';
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

//User Routes
router.post('/add-user', addUser);
router.post('/login-user', loginUser);
router.post('/logout-user', logoutUser);
router.get('/user-list', getAllUser);
router.delete('/user-delete/:id', deleteUser);
router.put('/user-edit/:id', editUser);
router.post('/logout', logoutUser);
router.post('/generatetoken', regenerateAccessToken)

router.get('/userdata', authMiddleware, (req, res) => {
    const id = req.userId
    res.json({
        message: "you are getting all user detail",
        id
    })
})


//Blog Routes
router.post('/add-blog', authMiddleware, addBlog);
router.get('/user-blog-list/:id', getUserBlog);
router.get('/all-blogs', getAllBlog);
router.delete('/blog-delete/:id', deleteBlog);
router.put('/blog-edit/:id', editBlog);
router.get('/single-blog/:id', getSingleBlog)


//Blog Like Controller
router.post('/like', authMiddleware, likeBlog);

//Blog comment Controller
router.post('/comment', authMiddleware, commentOnBlog);

export default router;