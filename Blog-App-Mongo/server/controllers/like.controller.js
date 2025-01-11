import Like from '../models/like.models.js';
import Blog from '../models/blog.models.js';

// Like a blog
const likeBlog = async (req, res) => {
  const { blogId } = req.body;
  try {
    const existingLike = await Like.findOne({ user: req.userId, blog: blogId });
    if (existingLike) {
      return res.status(400).json({ message: 'You have already liked this blog' });
    }

    const like = await Like.create({ user: req.userId, blog: blogId });
    const blog = await Blog.findByIdAndUpdate(
        blogId,
      { $push: { likes: req.userId } },
      { new: true } 
    );

    res.status(201).json(like);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {likeBlog}