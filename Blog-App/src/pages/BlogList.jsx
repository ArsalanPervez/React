// Body.js
import React, { useEffect, useState } from 'react';
import { Link, useParams  } from 'react-router-dom';
import { collection, addDoc, getDocs, query, where, deleteDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from '../config/firebaseconfig';
import person from '../assets/person.png';
import Elon from '../assets/elon.png';

function Allblog() {
    const [blogs, setBlogs] = useState(null);
    const [loading, setLoading] = useState(true)
    const fetchBlogs = async () => {
        try {    
            const querySnapshot = await getDocs(collection(db, 'blogs'));     
            const blogs = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
              }));
            //   console.log(blogs)
              setBlogs(blogs)
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

                    <h1 className="font-inter text-2xl font-semibold leading-[33.89px] text-left py-10">All Blogs</h1>
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
                                        <img src={blog?.author_image} alt="Profile" className="object-cover size-20 rounded-md" />
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800">{blog?.title}</h2>
                                            <p className="text-sm font-semibold text-gray-500">{blog?.author_name} - {new Date(blog?.createdAt).toDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <p className="text-gray-500 font-inter text-cust leading-7 break-words">{blog?.description}</p>
                                    </div>
                                    <div className="flex gap-4 mt-4">
                                        {
                                            auth?.currentUser?.email ? 
                                                <Link to={`/blogs/${auth.currentUser.uid}`} className="text-[#7749F8] font-inter btn-cust text-sm leading-7 hover:underline">
                                                    see all from this user
                                                </Link>
                                            :
                                                <Link to={`/login`} className="text-[#7749F8] font-inter btn-cust text-sm leading-7 hover:underline">
                                                    see all from this user
                                                </Link>

                                        }
                                        {/* <a href="#" className="text-[#7749F8] font-inter btn-cust text-sm leading-7 hover:underline">see all from this user</a> */}
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
