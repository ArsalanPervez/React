import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useRef, useState } from 'react'
import { auth } from '../config/firebaseconfig'
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const Login = () => {
    const email = useRef()
    const password = useRef()

    const navigate = useNavigate()

    const loginUser = (event) => {
        event.preventDefault()
        console.log(email.current.value);
        console.log(password.current.value);

        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
            const user = userCredential.user;
            Swal.fire({
                title: "Good job!",
                text: "Logged in successfully",
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/'); 
                }
            });

        })
        .catch((error) => {
            const errorMessage = error.message;
            Swal.fire({
                title: "Something went wrong",
                text: errorMessage,
                icon: "error"
            });
            console.log(errorMessage);
        });


    }
    return(
    <>
        <form className="box" onSubmit={loginUser}>
            <h1>login</h1>
            <input type="text" name="email" id="username" placeholder="Email" autoComplete="off" ref={email}/>
            <input type="password" name="pass" id="pass" placeholder="Password" autoComplete="off" required ref={password}/>
            <input type="submit" id="submit" value="login" />
            <p className='registerPara'>Don't have an account? <Link style={{color: '#0097e6', textDecoration: 'underline'}} to={`/register`}>Register here</Link></p>
        </form>
    </>
  )
}

export default Login