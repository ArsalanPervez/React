import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import avatar from '../assets/avatar.png';


function Dashboard() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true)
    const blogTitle = useRef();
    const blogDescription = useRef();
    const commentText = useRef({});
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isOpenModal, setOpenModal] = useState(false);
    const [singleBlogData, setSingleBlogData] = useState({
      title: '',
      description: '',
      updatedAt: null,
    });


    useEffect(()=> {
      fetchBlogs();
    },[])

    const handlePostBlog = async (e) => {
      e.preventDefault();
  
      if (blogTitle.current.value.length === 0) {
          setErrorMessage("Please fill in the title");
          return;
      }
      if (blogDescription.current.value.length === 0) {
          setErrorMessage("Please fill in the description");
          return;
      }
  
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (!userData || !userData.user_id) {
          throw new Error("User ID is missing in localStorage data");
      }
  
      const token = userData.accessToken // Assuming the token is stored in localStorage
      if (!token) {
          throw new Error("Token is missing");
      }
  
      setErrorMessage("");
  
      const blogData = {
          title: blogTitle.current.value,
          description: blogDescription.current.value,
          uid: userData?.user_id,
          author_name: userData?.firstName,
          author_image: ""
      };
  
      try {
          const response = await axios.post('https://blog-app-mongo.vercel.app/api/v1/add-blog', blogData, {
              headers: {
                  Authorization: `Bearer ${token}`, // Sending the token in the Authorization header
                  'Content-Type': 'application/json'
              }
          });
  
          blogTitle.current.value = '';
          blogDescription.current.value = '';
          setSuccessMessage("Blog posted successfully!");
          
          Swal.fire({
              title: "Good job!",
              text: "Blog published successfully",
              icon: "success"
          }).then(() => {
              fetchBlogs();
          }).catch((err) => {
              console.log(err);
          });
      } catch (error) {
          Swal.fire({
              title: "Something went wrong",
              text: error.message,
              icon: "error"
          });
          setErrorMessage("Failed to post blog: " + error.message);
      }
  };
  
    const fetchBlogs = async () => {
      try {
          const userData = JSON.parse(localStorage.getItem('userData'));
          
          if (!userData || !userData.user_id) {
              throw new Error("User ID is missing in localStorage data");
          }
          const response = await axios.get(`https://blog-app-mongo.vercel.app/api/v1/user-blog-list/${userData.user_id}`);
          const sortedBlogs = response.data.blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setBlogs(sortedBlogs);
          setLoading(false);
      } catch (error) {
          console.error("Error fetching blogs:", error);
          setLoading(false);
      }
  };
    const handleEditBlog = async (blog) => {
      setOpenModal(true)
      setSingleBlogData({
        title: blog.blogTitle,
        description: blog.blogDescription,
        autorName: blog.authorName,
        authorImage: blog.authorImage,
        authorId: blog.authorId,
        _id: blog._id
      });
    };
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setSingleBlogData((prevData) => ({
          ...prevData,
          [name]: value,
      }));
    };
    const updateBlog = async () => {
      if (!singleBlogData._id) return;
      try {

        const blogData = {
          title: singleBlogData.title,
          description: singleBlogData.description,
          uid: singleBlogData?.authorId,
          author_name: singleBlogData?.firstName,
          author_image: ""
        };
        
        const response = await axios.put(`https://blog-app-mongo.vercel.app/api/v1/blog-edit/${singleBlogData._id}`, blogData);

          setOpenModal(false);
          Swal.fire({
            title: "Good job!",
            text: "Blog Updated successfully",
            icon: "success"
          }).then(()=> {
            fetchBlogs();
          }).catch((err)=> {
            console.log(err)
          })
      } catch (error) {
          console.error("Error updating blog:", error);
      }
    };
    const handleDeleteBlog = async (blogId) => {
      try {
        Swal.fire({
          title: "Delete Blog!",
          text: "Are you sure you want to delete this blog?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete",
          cancelButtonText: "No, cancel",
          reverseButtons: true,
        }).then(async (result)=> {
            if (result.isConfirmed) {
              const response = await axios.delete(`https://blog-app-mongo.vercel.app/api/v1/blog-delete/${blogId}`);
              fetchBlogs();
              Swal.fire("Deleted!", "Your blog has been deleted.", "success");
          }
        }).catch((err)=> {
          console.log(err)
        })
      } catch (error) {
        console.error(error)
      }
    };

    const handleLikeBlog = async (blogId)=> {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData || !userData.user_id) {
            throw new Error("User ID is missing in localStorage data");
        }
    
        const token = userData.accessToken // Assuming the token is stored in localStorage
        if (!token) {
            throw new Error("Token is missing");
        }
        const response = await axios.post(`https://blog-app-mongo.vercel.app/api/v1//like`, {blogId}, {
          headers: {
              Authorization: `Bearer ${token}`, // Sending the token in the Authorization header
              'Content-Type': 'application/json'
          }});
          fetchBlogs()
      } catch (error) {
        console.error(error)
      }
    }

    const handleAddComment = async (e, blogId)=> {
      e.preventDefault();
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData || !userData.user_id) {
            throw new Error("User ID is missing in localStorage data");
        }
    
        const token = userData.accessToken // Assuming the token is stored in localStorage
        if (!token) {
            throw new Error("Token is missing");
        }
        const response = await axios.post(`https://blog-app-mongo.vercel.app/api/v1/comment`, {blogId, text: commentText.current[blogId]?.value.trim()}, {
          headers: {
              Authorization: `Bearer ${token}`, // Sending the token in the Authorization header
              'Content-Type': 'application/json'
          }});
        commentText.current.value = "";
        fetchBlogs()
      } catch (error) {
        console.error(error)
      }
    }


    return (
      <main>
        <div className="bg-white border-b border-dotted border-gray-300">
          <div className="w-full max-w-custom px-[10px] mx-auto py-8 font-bold text-4xl font-inter leading-[48.41px] tracking-tight text-left">
            <h2 className="text-gray-800">Dashboard</h2>
          </div>
        </div>

        <section className="bg-gray-100 px-[10px]">
          <div className="w-full max-w-custom mx-auto pt-7 bg-gray-100">
            <form
              onSubmit={handlePostBlog} 
              className="w-full max-w-custom-medium bg-white py-8 px-16 flex flex-col gap-5 shadow-md rounded-md">
              <input
                type="text"
                placeholder="Blog Title"
                required
                minLength="5"
                maxLength="50"
                ref={blogTitle}
                className="block w-full border border-gray-300 outline-[#7749F8] p-2 rounded-md focus:border-[#7749F8] focus:ring-[#6610F2] focus:ring-2"
              />
              <textarea
                required
                minLength="100"
                maxLength="3000"
                placeholder="What is in your mind"
                ref={blogDescription}
                className="block w-full border border-gray-300 outline-none p-4 rounded-md h-[124px] resize-none focus:border-[#7749F8] focus:ring-[#6610F2] focus:ring-2"
              ></textarea>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <button className="w-[135px] bg-[#7749F8] text-white font-semibold text-publish font-inter rounded-md py-2">
                Publish blog
              </button>
            </form>

            <h1 className="font-inter text-2xl font-semibold leading-[33.89px] text-left py-10">My Blogs</h1>
            {
              loading ? (
                <p>Loading blogs...</p>
              ) : blogs.length > 0 ? (
                blogs.map((blog, index) => (
                  <div key={index} className="max-w-[881px] mb-4 p-6 bg-white border border-gray-300 rounded-lg font-sans">
                    {/* Blog Header */}
                    <div className="flex items-center gap-4">
                      <div>
                        <img
                          src={blog?.authorImage !== "" ? blog?.authorImage : avatar}
                          alt=""
                          className="size-20"
                        />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">{blog?.blogTitle}</h2>
                        <p className="text-sm font-semibold text-gray-500">
                          Author Name - {blog?.authorName} - {new Date(blog?.createdAt).toDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <p className="text-gray-500 font-inter text-cust leading-7 break-words">
                        {blog.blogDescription}
                      </p>
                    </div>

                    {/* Actions (Edit, Delete, View) */}
                    <div className="flex gap-4 mt-4">
                      <button
                        onClick={() => handleDeleteBlog(blog?._id)}
                        className="text-[#7749F8] font-inter text-sm leading-7 hover:underline"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleEditBlog(blog)}
                        className="text-[#7749F8] font-inter text-sm leading-7 hover:underline"
                      >
                        Edit
                      </button>
                      <Link
                        to={`/${blog?._id}`}
                        className="text-[#7749F8] font-inter text-sm leading-7 hover:underline"
                      >
                        View Full Blog
                      </Link>
                    </div>

                    {/* Comments and Likes Section */}
                    <div className="pt-4 border-t mt-4">
                      {/* Likes */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleLikeBlog(blog?._id)}
                          className="text-[#7749F8] font-inter text-sm leading-7 hover:underline"
                        >
                          {blog?.likes?.length || 0} {blog?.likes?.length === 1 ? "Like" : "Likes"}
                        </button>
                      </div>

                      {/* Comments */}
                      <div className="mt-4">
                        <h3 className="text-md font-semibold text-gray-700">Comments</h3>
                        <div className="mt-2">
                          {blog?.comments?.length > 0 ? (
                            blog.comments.map((comment, commentIndex) => (
                              <div
                                key={commentIndex}
                                className="mb-2 p-2 bg-gray-100 rounded-lg text-sm text-gray-800"
                              >
                                <p className="font-medium">Comment By {comment?.user?.firstName}</p>
                                <p>{comment?.text}</p>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-gray-500">No comments yet.</p>
                          )}
                        </div>

                        {/* Add Comment */}
                        <div className="mt-4">
                          <form
                            onSubmit={(e) => handleAddComment(e, blog?._id)}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="text"
                              placeholder="Write a comment..."
                              className="flex-grow border border-gray-300 rounded-lg p-2 text-sm"
                              required
                              ref={(el)=>(commentText.current[blog?._id] = el)}
                            />
                            <button
                              type="submit"
                              className="bg-[#7749F8] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#5e3ad6]"
                            >
                              Add Comment
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Blogs Found</p>
              )
            }


            {/* Update Blog Modal */}
            {
              isOpenModal ? 
                <div className='fixed inset-0 flex items-center justify-center bg-black/60'>
                  <div className='w-full max-w-[550px] bg-white rounded-md p-2'>
                    <div onClick={() => setOpenModal(false)} className='cursor-pointer flex items-center justify-end text-xl'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
                    </div>
                      <div className='mb-5'>
                        <label className='block font-semibold py-1'>Blog Title:</label>
                        <input 
                          type="text" 
                          name="title"
                          value={singleBlogData.title}
                          onChange={handleInputChange}
                          className='focus:outline-none text-slate-600 border-b border-slate-400 w-full px-2' />
                      </div>
                    <div>
                      <label className='block font-semibold py-1'>Blog Description</label>
                      <textarea 
                        name="description"
                        value={singleBlogData.description}
                        onChange={handleInputChange} 
                        className='focus:outline-none text-slate-600 border-b border-slate-400 w-full px-2'></textarea>
                    </div>
                    <button onClick={updateBlog} className='bg-[#7749F8] text-white font-semibold text-publish font-inter rounded-md p-2'>Update Blog</button>
                  </div>
                </div>
              : ''
            }
          </div>
        </section>
      </main>
    );
}

export default Dashboard;
