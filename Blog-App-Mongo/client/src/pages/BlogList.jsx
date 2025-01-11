// Body.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import avatar from '../assets/avatar.png';

function Allblog() {
    const [blogs, setBlogs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const fetchBlogs = async () => {

        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (userData) {
                setUser(userData)
            }
            const response = await axios.get(`http://localhost:3000/api/v1/all-blogs`);
            const sortedBlogs = response.data.blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setBlogs(sortedBlogs);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchBlogs();
    }, [])
    return (
        <main>
            <div className="bg-white border-b border-dotted border-gray-300">
                <div className="w-full max-w-custom px-[10px] mx-auto py-8 font-bold text-4xl font-inter leading-[48.41px] tracking-tight text-left">
                    <h2 className="text-gray-800">Good Morning Readers!</h2>
                </div>
            </div>

            <section className="bg-gray-100 px-[10px]">
                <div className="w-full max-w-custom mx-auto py-7 bg-gray-100">

                    <div className='py-10 flex items-center gap-2.5'>
                        <h1 className="font-inter text-2xl font-semibold leading-[33.89px] text-left">All Blogs</h1>
                        {
                            (user?.email) ? 
                            <span>
                            - <Link to={'/dashboard'} className='underline hover:text-indigo-500'>Dashboard</Link>
                            </span>
                            : ''
                        }
                    </div>
                    <div>
                        {
                            loading 
                            ? 
                            <p>Loading blogs...</p>
                            : blogs?.length == 0 ? <p>No Blog Uploaded Yet</p> : ""
                        }
                            {blogs && blogs?.map((blog, index) => (
                                <div key={index} className="max-w-[881px] mb-4 p-6 bg-white border border-gray-300 rounded-lg font-sans">
                                    <div className="flex items-center gap-4">
                                        <img src={blog?.authorImage != "" ? blog?.authorImage : avatar} alt="Profile" className="object-cover size-20 rounded-md" />
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800">{blog?.blogTitle}</h2>
                                            <p className="text-sm font-semibold text-gray-500">{blog?.authorName} - {new Date(blog?.createdAt).toDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <p className="text-gray-500 font-inter text-cust leading-7 break-words">{blog?.blogDescription}</p>
                                    </div>
                                    <div className="flex gap-4 mt-4">
                                        {
                                            user?.user_id ? 
                                                <Link to={`/blogs/${user?.user_id}`} className="text-[#7749F8] font-inter btn-cust text-sm leading-7 hover:underline">
                                                    see all from this user
                                                </Link>
                                            :
                                                <Link to={`/login`} className="text-[#7749F8] font-inter btn-cust text-sm leading-7 hover:underline">
                                                    see all from this user 
                                                </Link>

                                        }
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

export default Allblog;
