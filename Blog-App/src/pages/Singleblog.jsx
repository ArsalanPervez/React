// Body.js
import React, { useEffect, useState } from 'react';
import { Link, useParams  } from 'react-router-dom';
import { getDocs, query, collection, where } from "firebase/firestore";
import { auth, db } from '../config/firebaseconfig';

function Singleblog() {
    const [blogData, setBlogData] = useState([]);
    const [userData, setUserData] = useState(null); 
    const { id: blogId } = useParams(); 

    const getUserInfo = async (userId) => {
        const q = query(collection(db, "users"), where("uid", "==", userId));
        const querySnapshot = await getDocs(q);
        const userData = querySnapshot.docs.map(doc => ({
            ...doc.data(),
        }));
    
        if (userData) {
          setUserData(userData);
        }
      };

    useEffect(() => {
        getSingleBlog();
        getUserInfo(auth.currentUser.uid);
    }, []);

    const getSingleBlog = async () => {
        try {
            const q = query(collection(db, "blogs"), where("docid", "==", blogId));
            const querySnapshot = await getDocs(q);
            const blogsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setBlogData(blogsData);
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
                                        <img src={blog?.author_image} alt="Profile" className="size-20" />
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800">{blog?.title}</h2>
                                            <p className="text-sm font-semibold text-gray-500">{blog?.author_name} - {new Date(blog?.createdAt).toDateString()}</p> {/* {new Date(blog.createdAt).toDateString()}*/}
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <p className="text-gray-500 font-inter text-cust leading-7 break-words">{blog?.description}</p>
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
