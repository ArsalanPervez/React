import React, { useEffect, useState } from 'react';
import { Link, useParams  } from 'react-router-dom';
import axios from 'axios';
import avatar from '../assets/avatar.png';

function Singleblog() {
    const [blogData, setBlogData] = useState([]);
    const [userInfo, setUserInfo] = useState(null); 
    const { id: blogId } = useParams();

    const getUserInfo = async () => {
        const userData = JSON.parse(localStorage.getItem('userData'));
            if (userData) {
                setUserInfo(userData);
            }
      };

    useEffect(() => {
        getUserInfo();
        getSingleBlog();
        
    }, []);

    const getSingleBlog = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            
            if(userData){
                const response = await axios.get(`https://blog-app-mongo.vercel.app/api/v1/user-blog-list/${userData.user_id}`);
                const sortedBlogs = response.data.blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setBlogData(sortedBlogs);
            }
            
        } catch (error) {
            console.error("Error fetching blogs:", error);
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

                    {userInfo ? <h1 className="font-inter text-2xl font-semibold leading-[33.89px] text-left py-10">All from {userInfo?.firstName} {userInfo?.lastName}</h1> : <h1></h1>}
                    
                    <div className='flex lg:flex-nowrap flex-wrap justify-between gap-10'>
                    <div className='w-[80%] flex flex-col lg:flex-nowrap flex-wrap gap-5 justify-between'>
                        {
                            blogData.map((blog, index) => (
                                <div key={index} className="w-full p-6 bg-white border border-gray-300 rounded-lg font-sans">
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
                                </div>
                            ))
                        }
                    </div>
                    <div className=' w-[20%] text-right custom-txt'>
                            <a href='#'>{userInfo?.email}</a>
                            {userInfo ? <div><h2>{userInfo?.firstName} {userInfo?.lastName}</h2> <img src={userInfo?.authorImage} alt="" className='w-[400px] pt-[12px]' /></div> : <h2></h2>
                            
                            }
                    </div>
                    </div>
                    
                </div>
            </section>
        </main>

    );
}

export default Singleblog;
