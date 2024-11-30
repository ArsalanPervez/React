import React from 'react'
import { Link } from 'react-router-dom';
import Logo from '@/assets/svg/logo.svg'
import CartIcon from '@/assets/svg/cart-icon.svg'
import WhishListIcon from '@/assets/svg/wishlist-icon.svg'
import { useState } from 'react';
import { useEffect } from 'react';
import Cart from './Cart';
import { useSelector } from 'react-redux';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const selector = useSelector(state => state.cart.cart)
  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.cart-dropdown') && !event.target.closest('.cart-button')) {
        setIsOpen(false);
      }
    };
  
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const closeCart = () => {
    setIsOpen(false);
  };

  return (
    <div className='container flex items-center justify-between py-7'>
        <Link to={'/'} className='flex items-center gap-1.5'>
          <img src={Logo} alt="Furniro Logo" />
          <span className='text-[32px] font-bold'>Furniro</span>
        </Link>

      <nav className='flex items-center'>
        <Link to="/" className='mr-[52px] relative before:bg-black before:h-[1px] before:absolute before:w-0 before:left-0 before:bottom-0 hover:before:w-full before:transition-all duration-200'>Home</Link>
        <Link to="/shop" className='mr-[52px] relative before:bg-black before:h-[1px] before:absolute before:w-0 before:left-0 before:bottom-0 hover:before:w-full before:transition-all duration-200'>Shop</Link>
        <Link to="/about-us" className='mr-[52px] relative before:bg-black before:h-[1px] before:absolute before:w-0 before:left-0 before:bottom-0 hover:before:w-full before:transition-all duration-200'>About</Link>
        <Link to="/contact-us" className='mr-[52px] relative before:bg-black before:h-[1px] before:absolute before:w-0 before:left-0 before:bottom-0 hover:before:w-full before:transition-all duration-200'>Contact</Link>
      </nav>

      <div className='flex items-center'>
        <img src={WhishListIcon} className='mr-[25px]' alt="Cart Icon" />
        <div className='relative flex items-center'>
          <span className='size-5 rounded-full flex items-center justify-center text-[10px] text-white bg-red-600 absolute bottom-2 -right-3'>{selector?.length}</span>
          <button onClick={toggleCart} className="cart-button">
            <img src={CartIcon} alt="Cart Icon" />
          </button>
        </div>

        {/* Render the CartDropdown Component */}
        <Cart isOpen={isOpen}  onClose={closeCart}/>
        {isOpen && <div className="blur-background" onClick={closeCart}></div>}
      </div>
    </div>
  )
}

export default Header