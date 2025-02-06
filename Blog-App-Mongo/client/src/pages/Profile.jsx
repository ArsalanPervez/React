import avatar from '../assets/avatar.png';
import React, { useEffect, useState, useRef } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null); 
  const firstName = useRef();
  const lastName = useRef();
  const userImage = useRef();
  const oldPassword = useRef();
  const newPassword = useRef();


  
  const getUserInfo = async () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            setUser(userData);
            firstName.current.value = userData?.firstName;
            lastName.current.value = userData?.lastName;
        }
  };

  useEffect(()=> {
    getUserInfo();
  },[])

   const updateUser = async () => {
    if (!user) return; 
    
    const userData = {
      firstName: firstName.current.value.trim(),
      lastName: lastName.current.value.trim(),
      email: user?.email?.trim(),
      password: newPassword.current.value.trim()
    };
     const response = await axios.put(`https://blog-app-mongo.vercel.app/api/v1/user-edit/${user?.user_id}`, userData);
     const existingUserData = localStorage.getItem('userData');
     if (existingUserData) {
        const parsedData = JSON.parse(existingUserData);
        parsedData["firstName"] = response.data.userData.firstName;
        parsedData["lastName"] = response.data.userData.lastName;
        localStorage.setItem('userData', JSON.stringify(parsedData));
     }
     Swal.fire({
      title: 'Profile Updated!',
      icon: 'success',
      text: 'Your profile has been successfully updated.',
    });
  }

  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if((firstName.current.value == null || firstName.current.value == "") || (lastName.current.value == null || lastName.current.value == "") || 
     (newPassword.current.value == null || newPassword.current.value == '') || (oldPassword.current.value == null || oldPassword.current.value == '')){
        Swal.fire({
          title: 'Update Profile Failed',
          text: "Please fill all the fields",
          icon: 'error',
      });
     }
     else{
      try{
        await updateUser();
      } catch (error) {
        console.error("Error updating profile:", error);
        Swal.fire({
          title: 'Update Profile Failed',
          text: 'An error occurred while updating your profile. Please try again.',
          icon: 'error',
        });
      }
        
     }
  };


  return (
      <main>
        <div className="bg-white border-b border-dotted border-gray-300">
          <div className="w-full max-w-custom mx-auto px-[10px] py-8 font-bold text-4xl font-inter leading-[48.41px] tracking-tight text-left">
            <h2 className="text-gray-800">Profile</h2>
          </div>
        </div>

        <section className="bg-gray-100 h-screen">
          <div className="w-full max-w-custom px-[10px] mx-auto pt-7 bg-gray-100">
            <form action="" className="w-full max-w-custom-medium bg-white py-8 px-16 flex flex-col gap-5 shadow-md rounded-md">
              {(user && user?.imageUrl) ? <img src={user?.imageUrl} alt="" className='w-[300px]'/> : <img src={avatar} alt="" className='w-[300px]'/>}
              
              <div className="flex flex-col gap-5">
            <input
                type="text"
                required
                minLength="3"
                maxLength="20"
                placeholder="First Name"
                ref={firstName}
                className="w-full max-w-custom-smallx  appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <input
                type="text"
                required
                minLength="1"
                maxLength="20"
                placeholder="Last Name"
                ref={lastName}
                className="w-full max-w-custom-smallx  appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            <input ref={oldPassword} className="w-full max-w-custom-smallx  appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Old password"/>
            <input ref={newPassword} className="w-full max-w-custom-smallx  appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="New Password"/>
          </div>
            
              <button onClick={handleFormSubmit} className="w-[169px] bg-[#7749F8] text-publish font-semibold text-lg font-inter rounded-md py-2 text-white">
              Update Profile
              </button>
            </form>
          </div>
        </section>
      </main>

    );
}

export default Profile;
