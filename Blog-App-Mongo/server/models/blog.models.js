import mongoose from "mongoose";


const blogSchema = new mongoose.Schema(
    {
        blogTitle: {
            type: String,
            required: true,
        },
        blogDescription: {
            type: String,
            required: true,
        },
        authorName: {
            type: String,
            required: true,
        },
        authorImage: {
            type: String,
        },
        authorId: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
        }],
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }],
    },
    {
        timestamps: true
    }
)


export default mongoose.model("Blogs", blogSchema);