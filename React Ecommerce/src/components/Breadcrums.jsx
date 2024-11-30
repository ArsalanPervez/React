import React from 'react'
import Hero from '../assets/img/shophero.png'
import { Link } from 'react-router-dom'

function Breadcrums({ title, navigation }) {
  return (
    <>
        <div className="relative text-white h-[316px] overflow-hidden flex justify-center">
            <div className="absolute inset-0">
                <img src={Hero} alt="Background Image" className="object-cover object-center w-full h-full	" />
                <div className="absolute inset-0"></div>
            </div>

            <div className="relative z-10 flex flex-col justify-center items-center text-center">
                <h1 className="text-5xl font-medium leading-tight mb-1 text-black">{title}</h1>
                <ul className='flex items-center text-black capitalize'>
                    {navigation.map((item, index) => (
                    <li key={index} className={item.active ? 'active ml-1.5' : ''}>
                        {!item.active ? (
                        <Link to={`${item.link}`} className='flex items-center gap-1.5'>
                            {item.label} 
                            <svg className='size-3.5' viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 15L11 10L6 5L7 3L14 10L7 17L6 15Z" fill="black" />
                            </svg>
                        </Link>
                        ) : (
                        item.label
                        )}
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    </>
  )
}

export default Breadcrums