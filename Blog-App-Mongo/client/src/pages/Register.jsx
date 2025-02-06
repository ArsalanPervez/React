import { useState, useRef } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = () => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

 
  const handleRegister = async (e) => {
      e.preventDefault();
      // Validate passwords
      if (password.current.value !== confirmPassword.current.value) {
          setErrorMessage('Passwords do not match');
          return;
      }

      // if (!image) {
      //   setErrorMessage('Please upload a profile picture');
      //    return;
      // }

      try {
          const userData = {
              firstName: firstName.current.value.trim(),
              lastName: lastName.current.value.trim(),
              email: email.current.value.trim(),
              password: password.current.value.trim()
          };


          const response = await axios.post('https://blog-app-mongo.vercel.app/api/v1/add-user', userData);

          if(response.status == 200){
              // Success Alert
              Swal.fire({
                title: 'Registration Successful!',
                text: 'You have been registered successfully.',
                icon: 'success',
            }).then(() => {
                navigate('/login');
            });
          }
          else{
            Swal.fire({
              title: 'Registration Failed',
              text: "Something went wrong, try again",
              icon: 'error',
            });
            setErrorMessage('Something went wrong, try again');
          }
      } catch (error) {
          console.error('Error during registration:', error);
          Swal.fire({
              title: 'Registration Failed',
              text: error.message,
              icon: 'error',
          });
          setErrorMessage(error.message);
      }
  };

  const handleImageChange = (e) => {
      if (e.target.files[0]) {
          setImage(e.target.files[0]);
      }
  };
  return (
    <main>
      <div className="bg-white border-b border-dotted border-[#DEE2E6]">
        <div className="w-full max-w-custom px-[10px] mx-auto py-8">
          <h2 className="text-[#343A40] font-bold text-[40px] leading-[48.41px] tracking-[-0.02em] text-left">
            Signup
          </h2>
        </div>
      </div>

      <section className="h-[83.5vh] px-[10px] bg-[#f8f9fa] flex justify-center items-center">
        <form
          onSubmit={handleRegister}
          className="w-full max-w-custom-small bg-white py-[65px] px-[108px] on-response flex flex-col gap-[20px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.12)] rounded-md"
        >
          <input
            type="text"
            required
            minLength="3"
            maxLength="20"
            placeholder="First Name"
            ref={firstName}
            className="w-full max-w-custom-smallinp border border-[#DEE2E6] px-2 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7749F8] focus:ring-opacity-50"
          />
          <input
            type="text"
            required
            minLength="1"
            maxLength="20"
            placeholder="Last Name"
            ref={lastName}
            className="w-full max-w-custom-smallinp border border-[#DEE2E6] px-2 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7749F8] focus:ring-opacity-50"
          />
          <input
            type="email"
            required
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
            placeholder="Email"
            ref={email}
            className="w-full max-w-custom-smallinp border border-[#DEE2E6] px-2 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7749F8] focus:ring-opacity-50"
          />
          <input
            type="password"
            placeholder="Password"
            required
            minLength="8"
            maxLength="20"
            pattern="^(?=.*[a-z])(?=.*[A-Z]).+$"
            title="Password must contain at least one uppercase and one lowercase letter"
            ref={password}
            className="w-full max-w-custom-smallinp border border-[#DEE2E6] px-2 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7749F8] focus:ring-opacity-50"
          />
          <input
            type="password"
            placeholder="Repeat Password"
            required
            ref={confirmPassword}
            className="w-full max-w-custom-smallinp border border-[#DEE2E6] px-2 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7749F8] focus:ring-opacity-50"
          />
          <input
                type="file"
                onChange={handleImageChange}
                className="w-full max-w-custom-smallinp border border-[#DEE2E6] px-2 py-1.5 rounded-md focus:outline-none"
              />
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <button
            type="submit"
            className="w-[84px] mx-auto bg-[#7749F8] text-white font-semibold text-[16px] leading-[18px] text-center py-2 rounded-md"
          >
            Signup
          </button>
        </form>
      </section>
    </main>
  );
}

export default Register;
