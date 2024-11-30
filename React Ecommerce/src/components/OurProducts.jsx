import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GlobalButton from '@/components/GlobalButton'
import { useDispatch } from 'react-redux';
import { addItem } from '../config/store/reducers/cartSlice'
import { toast } from 'react-toastify'

function OurProducts({productsData, isLoading}) {
    
    const dispatch = useDispatch();
    const addItemToCart = (product) => {
        dispatch(addItem(product))
        toast.success('Product added to cart!')
    }
    
  return (
    <div className='container py-14'>
        <div className='pb-16 text-center'>
            <h2 className='text-3xl font-bold'>Our Products</h2>
        </div>
        <div className='flex items-center justify-center text-start flex-wrap gap-5 gap-y-20'>
            {isLoading ? <p>Loading...</p>  : productsData && productsData.slice(0, 8).map((product, index) => (
                <div key={index} className='w-[23%] relative group cursor-pointer'>
                    <div className='overflow-hidden rounded-t-xl bg-secondary'>
                        <img src={product?.thumbnail} alt=""  className='w-full h-full hover:scale-110 transition-all duration-500'/>
                    </div>
                    <div className='bg-[#F4F5F7] py-3.5 px-2'>
                        <h4 className='text-lg font-semibold text-text-color'>{product?.title}</h4>
                        <p className='text-paragraph-color text-sm my-1.5'>{product?.desc}</p>
                        <div className='flex items-center'>
                            <span className='text-sm mr-1.5 font-medium text-primary'>${product.price}</span>
                            <span className='text-paragraph-color line-through text-[11px] font-medium'>${(product.price + product.discountPercentage)?.toFixed(2)}</span>
                        </div>  
                        <div className='flex items-center mt-4 text-sm'>
                            <button onClick={()=> addItemToCart(product)} className='transition-all duration-300 px-6 py-2 mr-3.5 !bg-primary !border-primary !hover:bg-white rounded-md hover:!bg-secondary text-white !border hover:!border-primary hover:!text-primary'>Add to cart</button>
                            <Link to={`/shop/${product.id}`} className='relative before:bg-black before:h-[1px] before:absolute before:w-0 before:left-0 before:bottom-0 hover:before:w-full before:transition-all duration-200'>View Product</Link>
                        </div>
                    </div>
                </div>
            ))}
            <GlobalButton label='Show More' link={'/shop'} />
        </div>
    </div>
    )
}

export default OurProducts