// Body.js
import React, { useEffect, useState } from 'react';
import { auth, db } from '../config/firebaseconfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDocs, query, where, deleteDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()
  
  const fetchCurrentUser = async (uid) => {
    try {
      const userCollection = collection(db, "users");
      const userQuery = query(userCollection, where("uid", "==", auth.currentUser.uid));
      const userSnapshot = await getDocs(userQuery);
      if (!userSnapshot.empty) {
        const userData = userSnapshot.docs[0].data(); // Get the first matching document's data
        setFirstName(userData?.firstName);
        setLastName(userData?.lastName);
        // console.log("User Data:", userData);
        return userData;
      } else {
        console.log("User not found");
        return null;
      }
    } catch (error) {
      console.log("Error fetching user data:", error)
      
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        title: "Good job!",
        text: "Loggedin successfully",
        icon: "success"
      }).then((result) => {
        if (result.isConfirmed) {
        }
      });
      setErrorMessage('');
      await fetchCurrentUser();
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };


  return (
    <main>
      <div className="bg-white border-b border-dotted border-[#DEE2E6]">
        <div className="w-full max-w-custom px-[10px] mx-auto py-8">
          <h2 className="text-[#343A40] font-bold text-[40px] leading-[48.41px] tracking-[-0.02em] text-left">
            Login
          </h2>
        </div>
      </div>

      <section className="h-[83.5vh] px-[10px] bg-[#f8f9fa] flex justify-center items-center">
        <form
          onSubmit={handleLogin} 
          className="w-full max-w-custom-small bg-white py-[65px] px-[108px] on-response flex flex-col gap-[20px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.12)] rounded-md">
          <input
              required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full max-w-custom-smallinp border border-[#DEE2E6] px-2 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7749F8] focus:ring-opacity-50"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full max-w-custom-smallinp border border-[#DEE2E6] px-2 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7749F8] focus:ring-opacity-50"
          />
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <button
            type='submit' 
            className="w-[84px] mx-auto bg-[#7749F8] text-white font-semibold text-[16px] leading-[18px] text-center py-2 rounded-md">
            Login
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
