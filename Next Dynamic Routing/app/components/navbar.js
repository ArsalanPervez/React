import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar bg-neutral">
        <div className="navbar-start">
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
            </div>
            <Link href="/" className="btn btn-ghost text-xl text-white">Dynamic Routing</Link>
        </div>
        <div className="navbar-center w-[50%] hidden lg:flex justify-end">
            <ul className="menu menu-horizontal px-1 text-white">
                <li><Link href="/" className='actve:color-white'>Home</Link></li>
                <li><Link href="./about">About</Link></li>
                <li><Link href="./contact">Contact</Link></li>
            </ul>
        </div>
    </div>
    
  )
}

export default Navbar