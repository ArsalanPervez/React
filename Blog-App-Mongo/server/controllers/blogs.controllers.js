import mongoose from "mongoose";
import Blogs from "../models/blog.models.js"

const addBlog = async (req , res) => {
    const { title, description, uid, author_name, author_image } = req.body;

    if (!title) return res.status(400).json({
        message: "Blog title is required"
    })
    if (!description) return res.status(400).json({
        message: "Blog description is required"
    })

    try {
        const blog = new Blogs({ 
            blogTitle: title, 
            blogDescription: description, 
            authorName:author_name,  
            authorImage: author_image, 
            authorId: uid,
            user: req.userId, 
        });
        await blog.save();

        res.status(201).json({
            message: "Blog saved successfully",
            blog,
        });
    } catch (err) {
        console.error('Error adding blog:', err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
}

const getAllBlog = async (req, res) => {
    try {
        const blogs = await Blogs.find()
        .populate('user' , 'firstName')
            .populate('likes', 'firstName')
            
        res.status(200).json({
            message: "Blogs fetched successfully",
            blogs,
        });
    } catch (err) {
        console.error('Error fetching blogs:', err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
}

const getUserBlog = async (req, res) => {
    const { id } = req.params; // Assuming 'id' is passed as a route parameter (e.g., /api/v1/blogs/:id)

    if (!id) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        // Find blogs authored by the specific user ID
        const blogs = await Blogs.find({ authorId: id })
            .populate('user', 'firstName') // Populate 'user' field to get only 'firstName'
            .populate('likes', 'firstName') // Populate 'likes' field to get only 'firstName'
            .populate({
                path: "comments",
                select: "text",
                populate: {
                    path: "user",
                    select: "firstName",
                },
            })

        if (!blogs || blogs.length === 0) {
            return res.status(404).json({
                message: "No blogs found for this user",
            });
        }

        res.status(200).json({
            message: "Blogs fetched successfully",
            blogs,
        });
    } catch (err) {
        console.error('Error fetching blogs:', err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};


const getSingleBlog = async (req , res) => {
    const { id } = req.params; // Assuming id is passed as a query parameter
    try {
        const blogs = await Blogs.find({ _id: id })
        .populate('user' , 'firstName')
        .populate('likes', 'firstName')
        .populate({
            path: "comments",
            select: "text",
            populate: {
                path: "user",
                select: "firstName",
            },
        })
        res.status(200).json({
            message: "Blog fetched successfully",
            blogs,
        });
    } catch (err) {
        console.error('Error fetching blog:', err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
}

const deleteBlog = async (req , res) => {
    const {id} = req.params;
    // Class code
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            message: "Not a valid Id",
        })
    }
    try {
        const blog = await Blogs.findByIdAndDelete(id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found",
            });
        }

        res.status(200).json({
            message: "Blog deleted successfully",
        });
    } catch (err) {
        console.error('Error deleting blog:', err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
}

const editBlog = async (req , res) => {
    const { title, description, uid, author_name, author_image } = req.body;
    const {id} = req.params;

    if (!title) return res.status(400).json({
        message: "Blog title is required"
    })
    if (!description) return res.status(400).json({
        message: "Blog description is required"
    })

    // Class code
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            message: "Not a valid Id",
        })
    }
    

    try {
        const blog = await Blogs.findByIdAndUpdate(
            id,
            { blogTitle: title, blogDescription: description, authorName: author_name,  authorImage: author_image, authorId: uid },
            { new: true }
        );

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found",
            });
        }

        res.status(200).json({
            message: "Blog updated successfully",
            blog,
        });
    } catch (err) {
        console.error('Error editing blog:', err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
}


export {addBlog, getAllBlog, deleteBlog, editBlog, getUserBlog, getSingleBlog}