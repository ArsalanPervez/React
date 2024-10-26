import React from 'react'

const About = () => {
  return (
    <div className='flex items-end justify-center'>
        <div className="card lg:card-side bg-base-100 shadow-xl mt-4 w-[50%]">
            <figure>
                <img
                src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
                alt="Album" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">About page content</h2>
                <p>Welcome to about page.</p>
            </div>
        </div>
      </div>
  )
}

export default About