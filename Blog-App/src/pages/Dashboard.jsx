// Body.js
import React, { useRef, useState, useEffect } from 'react';
import { auth, db } from '../config/firebaseconfig';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'


function Dashboard() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true)
    const blogTitle = useRef();
    const blogDescription = useRef();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isOpenModal, setOpenModal] = useState(false);
    const [userData, setUserData] = useState(null); 
    const [singleBlogData, setSingleBlogData] = useState({
      title: '',
      description: '',
      updatedAt: null,
    });

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

    useEffect(()=> {
      getUserInfo(auth.currentUser.uid);
    },[])

    const handlePostBlog = async (e) => {
      e.preventDefault();
      if(blogTitle.current.value.length == 0) {
        setErrorMessage("please fill title");
        return;
      }
      if(blogDescription.current.value.length == 0) {
        setErrorMessage("please fill description");
        return;
      }
      setErrorMessage("");
      
      const newDocRef = doc(collection(db, "blogs"));
      const blogData = {
        title: blogTitle.current.value,
        description: blogDescription.current.value,
        createdAt: new Date().toISOString(),
        docid: newDocRef.id,
        uid: auth.currentUser.uid,
        author_name: userData[0]?.firstName,
        author_image: userData[0]?.imageUrl
      };

      try {
        await addDoc(collection(db, "blogs"), blogData);
  
        blogTitle.current.value = '';
        blogDescription.current.value = '';
        setSuccessMessage("Blog posted successfully!");
          Swal.fire({
            title: "Good job!",
            text: "Blog published successfully",
            icon: "success"
          }).then(()=> {
            fetchBlogs();
          }).catch((err)=> {
            console.log(err)
          })
      } catch (error) {
        Swal.fire({
          title: "Something went wrong",
          text: error.message,
          icon: "error"
        });
        setErrorMessage("Failed to post blog: " + error.message);
      }
    }
    const fetchBlogs = async () => {
      try {
        //, orderBy("createdAt", "desc")
        const q = query(collection(db, "blogs"), where("uid", "==", auth.currentUser.uid));

        const querySnapshot = await getDocs(q);        
        const blogsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        const sortedBlogs = blogsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
        id: blog.id,
        title: blog.title,
        description: blog.description,
        docid: blog.docid,
        createdAt: blog.createdAt,
        uid: blog.uid,
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
      if (!singleBlogData.id) return;
      try {
          const blogRef = doc(db, "blogs", singleBlogData.id);
          const updatedData = {
              ...singleBlogData,
              updatedAt: new Date().toISOString()
          };

          await updateDoc(blogRef, updatedData);
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
        const blogRef = doc(db, "blogs", blogId)
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
              await deleteDoc(blogRef);
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

    useEffect(() => {
      fetchBlogs();
    }, []);

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
                placeholder="First Name"
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
              loading ? <p>Loading blogs...</p>
              :
              blogs.length > 0 ? (
                blogs.map((blog, index) => (
                  <div key={index} className="max-w-[881px] mb-4 p-6 bg-white border border-gray-300 rounded-lg font-sans">
                    <div className="flex items-center gap-4">
                      <div>
                        <img src={blog?.author_image} alt="" className='size-20' />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">{blog?.title}</h2>
                        <p className="text-sm font-semibold text-gray-500"> Author Name - {blog?.author_name} - {new Date(blog?.createdAt).toDateString()}</p>
                      </div>
                    </div>
                    <div className="pt-4">
                      <p className="text-gray-500 font-inter text-cust leading-7 break-words">{blog.description}</p>
                    </div>
                    <div className="flex gap-4 mt-4">
                      <button onClick={() => handleDeleteBlog(blog?.id)} className="text-[#7749F8] font-inter text-sm leading-7 hover:underline">Delete</button>
                      <button onClick={() => handleEditBlog(blog)} className="text-[#7749F8] font-inter text-sm leading-7 hover:underline">Edit</button>
                      <Link to={`/${blog?.docid}`} className="text-[#7749F8] font-inter text-sm leading-7 hover:underline">View Full Blog</Link>
                    </div>
                  </div>
                ))
              ) : ( <p>No Blogs Found</p> )
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
