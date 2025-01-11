import Comment from '../models/comment.models.js';
import Blog from '../models/blog.models.js';

// Comment on a blog
export const commentOnBlog = async (req, res) => {
  const { blogId, text } = req.body;

  try {
    const comment = await Comment.create({
      user: req.userId,
      blog: blogId,
      text,
    });
    
    const blog = await Blog.findByIdAndUpdate(  
      blogId,
      { $push: { comments: comment._id } },
    );

    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};