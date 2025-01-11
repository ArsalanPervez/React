// Body.js
import React, { useEffect, useState } from 'react';
import { Link, useParams  } from 'react-router-dom';
import axios from 'axios';
import avatar from '../assets/avatar.png';

function Singleblog() {
    const [blogData, setBlogData] = useState([]);
    const [user, setUser] = useState(null); 
    const { id: blogId } = useParams(); 

    const getUserInfo = async () => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            setUser(userData);
        }
    };

    useEffect(() => {
        getSingleBlog();
        getUserInfo();
    }, []);

    const getSingleBlog = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/single-blog/${blogId}`);
            setBlogData(response.data.blogs);
        } catch (error) {
            console.error("Error fetching blog:", error);
        }
    };

    return (
        <main>
            <div className="bg-white border-b border-dotted border-gray-300">
                <div className="w-full max-w-custom px-[10px] mx-auto py-8 font-bold text-4xl font-inter leading-[48.41px] tracking-tight text-left">
                    <Link to={'/'} className="text-gray-800 hover:text-[#7749F8]">
                        &lt; Back to all blogs
                    </Link>
                </div>
            </div>

            <section className="bg-gray-100 px-[10px]">
                <div className="w-full max-w-custom mx-auto py-7 bg-gray-100">

                    <div className='w-full flex lg:flex-nowrap flex-wrap justify-between'>
                        {
                            blogData && blogData.map((blog, index) => (
                                <div key={index} className="w-full max-w-[881px] p-6 bg-white border border-gray-300 rounded-lg font-sans">
                                    <div className="flex items-center gap-4">
                                        <img src={blog?.authorImage != "" ? blog?.authorImage : avatar} alt="Profile" className="size-20" />
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800">{blog?.blogTitle}</h2>
                                            <p className="text-sm font-semibold text-gray-500">{blog?.authorName} - {new Date(blog?.createdAt).toDateString()}</p> {/* {new Date(blog.createdAt).toDateString()}*/}
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <p className="text-gray-500 font-inter text-cust leading-7 break-words">{blog?.blogDescription}</p>
                                    </div>

                                    {/* Comments and Likes Section */}
                    <div className="pt-4 border-t mt-4">
                      {/* Likes */}
                      <div className="flex items-center gap-2">
                        <span
                          
                          className="text-[#7749F8] font-inter text-sm leading-7 hover:underline"
                        >
                          {blog?.likes?.length || 0} {blog?.likes?.length === 1 ? "Like" : "Likes"}
                        </span>
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
                        </div>
                    </div>

                </div>    
                            ))
                        }
                    </div>
                </div>
            </section>
        </main>

    );
}

export default Singleblog;
