// Body.js
import avatar from '../assets/avatar.png';
import React, { useEffect, useState, useRef } from 'react';
import { updatePassword  } from 'firebase/auth';
import { getDocs, query, collection, where, updateDoc } from "firebase/firestore";
import { auth, db } from '../config/firebaseconfig';
import Swal from 'sweetalert2';

function Profile() {
  const [userData, setUserData] = useState(null); 
  const firstName = useRef();
  const lastName = useRef();
  const userImage = useRef();
  const oldPassword = useRef();
  const newPassword = useRef();


  const getUserInfo = async (userId) => {
    const q = query(collection(db, "users"), where("uid", "==", userId));
    const querySnapshot = await getDocs(q);
    const userData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
    }));

    if (userData) {
      setUserData(userData);
      firstName.current.value = userData[0]?.firstName;
      lastName.current.value = userData[0]?.lastName;
    }
  };

  useEffect(()=> {
    getUserInfo(auth.currentUser.uid);
  },[])

   const updateUserNameInFirestore = async () => {
    if (!userData) return; 
    const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const docRef = querySnapshot.docs[0].ref;
    await updateDoc(docRef, {
      firstName: firstName.current.value,
      lastName: lastName.current.value
    });

  };
}

  const updatePasswordInFirestore = async () => {
    const user = auth.currentUser;
    if (oldPassword.current.value && newPassword.current.value && user) {
      const credential = await updatePassword(user, newPassword.current.value);
      
    }
  };

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
        await updateUserNameInFirestore();
        await updatePasswordInFirestore();
  
        Swal.fire({
          title: 'Profile Updated!',
          icon: 'success',
          text: 'Your profile has been successfully updated.',
        });
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
              {userData && userData.length > 0 ? <img src={userData[0]?.imageUrl} alt="" className='w-[300px]'/> : <img src={avatar} alt="" className='w-[300px]'/>}
              
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
