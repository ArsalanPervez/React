import React, { useEffect } from 'react'
import Gallery4 from '@/assets/img/gallery4.png'
import Gallery3 from '@/assets/img/gallery3.png'
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../config/store/reducers/cartSlice'

function Cart({ isOpen, onClose }) {
    const cartItem = useSelector(state => state.cart.cart);
    const totalPrice = cartItem.reduce((acc, product) => acc + product.price, 0)
    const dispatch = useDispatch();
    if (!isOpen) return null;

    const removeItemFromCart = (id) => {
        console.log(cartItem)
        dispatch(removeItem({id}))
        console.log('cart--->',cartItem)
    }

    // useEffect(() => {
    //   console.log('--> cart',cartItem)
    // }, [])
    
    return (
        <div className="cart-dropdown fixed right-2 top-2 h-full overflow-auto custom-scroller max-h-[750px] w-full max-w-[430px] bg-white border border-gray-200 shadow-lg rounded-md pt-7  z-10 transition-all">
            <div className='pr-10 pl-6 flex items-center justify-between border-b pb-[26px]'>
                <h3 className="font-semibold text-2xl ">Shopping Cart</h3>

                <svg onClick={onClose} className='text-[#9F9F9F] hover:text-red-500 cursor-pointer transition-all duration-200' width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.11047 9.6734C6.16563 9.6181 6.23115 9.57424 6.30328 9.5443C6.37542 9.51437 6.45275 9.49896 6.53085 9.49896C6.60894 9.49896 6.68628 9.51437 6.75841 9.5443C6.83055 9.57424 6.89607 9.6181 6.95122 9.6734L8.3121 11.0355L9.67297 9.6734C9.78446 9.56191 9.93568 9.49927 10.0933 9.49927C10.251 9.49927 10.4022 9.56191 10.5137 9.6734C10.6252 9.78489 10.6878 9.9361 10.6878 10.0938C10.6878 10.2514 10.6252 10.4027 10.5137 10.5141L9.15166 11.875L10.5137 13.2359C10.6252 13.3474 10.6878 13.4986 10.6878 13.6563C10.6878 13.8139 10.6252 13.9652 10.5137 14.0766C10.4022 14.1881 10.251 14.2508 10.0933 14.2508C9.93568 14.2508 9.78446 14.1881 9.67297 14.0766L8.3121 12.7146L6.95122 14.0766C6.83973 14.1881 6.68852 14.2508 6.53085 14.2508C6.37318 14.2508 6.22196 14.1881 6.11047 14.0766C5.99898 13.9652 5.93635 13.8139 5.93635 13.6563C5.93635 13.4986 5.99898 13.3474 6.11047 13.2359L7.47253 11.875L6.11047 10.5141C6.05518 10.459 6.01131 10.3935 5.98137 10.3213C5.95144 10.2492 5.93604 10.1719 5.93604 10.0938C5.93604 10.0157 5.95144 9.93834 5.98137 9.86621C6.01131 9.79407 6.05518 9.72855 6.11047 9.6734Z" fill="currentColor" />
                    <path d="M8.3125 1.1875C9.09986 1.1875 9.85497 1.50028 10.4117 2.05703C10.9685 2.61378 11.2812 3.36889 11.2812 4.15625V4.75H5.34375V4.15625C5.34375 3.36889 5.65653 2.61378 6.21328 2.05703C6.77003 1.50028 7.52514 1.1875 8.3125 1.1875ZM12.4688 4.75V4.15625C12.4688 3.05394 12.0309 1.99679 11.2514 1.21734C10.472 0.437889 9.41481 0 8.3125 0C7.21019 0 6.15304 0.437889 5.37359 1.21734C4.59414 1.99679 4.15625 3.05394 4.15625 4.15625V4.75H0V16.625C0 17.2549 0.250223 17.859 0.695621 18.3044C1.14102 18.7498 1.74511 19 2.375 19H14.25C14.8799 19 15.484 18.7498 15.9294 18.3044C16.3748 17.859 16.625 17.2549 16.625 16.625V4.75H12.4688ZM1.1875 5.9375H15.4375V16.625C15.4375 16.9399 15.3124 17.242 15.0897 17.4647C14.867 17.6874 14.5649 17.8125 14.25 17.8125H2.375C2.06006 17.8125 1.75801 17.6874 1.53531 17.4647C1.31261 17.242 1.1875 16.9399 1.1875 16.625V5.9375Z" fill="currentColor" />
                </svg>

            </div>
            <div className='flex flex-col justify-between min-h-[652px]'>
                <div className='pt-[42px] pr-10 pl-6'>
                    {cartItem.map((item, index) => (
                        <div key={index} className="mb-5 flex items-center justify-between"> 
                            <div className='flex items-center gap-4'>
                                <div className='bg-secondary rounded-md border '>
                                    <img src={item.thumbnail} alt="" className='size-24' />
                                </div>
                                <div>
                                    <p className='line-clamp-1'>{item.title}</p>
                                    <span className='text-page-active text-[12px]'>Rs. {item.price}</span>
                                </div>
                            </div>
                            <button onClick={() => {removeItemFromCart(item.id)}}>
                                <svg className='text-[#9F9F9F] hover:text-red-500 cursor-pointer transition-all duration-200' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.47727 0 0 4.47727 0 10C0 15.5227 4.47727 20 10 20C15.5227 20 20 15.5227 20 10C20 4.47727 15.5227 0 10 0ZM13.37 7.91545C13.5356 7.744 13.6272 7.51436 13.6252 7.276C13.6231 7.03764 13.5275 6.80963 13.3589 6.64107C13.1904 6.47252 12.9624 6.37691 12.724 6.37484C12.4856 6.37277 12.256 6.4644 12.0845 6.63L10 8.71455L7.91545 6.63C7.83159 6.54317 7.73128 6.47392 7.62037 6.42627C7.50946 6.37863 7.39016 6.35355 7.26946 6.3525C7.14875 6.35145 7.02904 6.37445 6.91731 6.42016C6.80559 6.46587 6.70409 6.53338 6.61873 6.61873C6.53338 6.70409 6.46587 6.80559 6.42016 6.91731C6.37445 7.02904 6.35145 7.14875 6.3525 7.26946C6.35355 7.39016 6.37863 7.50946 6.42627 7.62037C6.47392 7.73128 6.54317 7.83159 6.63 7.91545L8.71455 10L6.63 12.0845C6.54317 12.1684 6.47392 12.2687 6.42627 12.3796C6.37863 12.4905 6.35355 12.6098 6.3525 12.7305C6.35145 12.8513 6.37445 12.971 6.42016 13.0827C6.46587 13.1944 6.53338 13.2959 6.61873 13.3813C6.70409 13.4666 6.80559 13.5341 6.91731 13.5798C7.02904 13.6255 7.14875 13.6486 7.26946 13.6475C7.39016 13.6465 7.50946 13.6214 7.62037 13.5737C7.73128 13.5261 7.83159 13.4568 7.91545 13.37L10 11.2855L12.0845 13.37C12.256 13.5356 12.4856 13.6272 12.724 13.6252C12.9624 13.6231 13.1904 13.5275 13.3589 13.3589C13.5275 13.1904 13.6231 12.9624 13.6252 12.724C13.6272 12.4856 13.5356 12.256 13.37 12.0845L11.2855 10L13.37 7.91545Z" fill="currentColor" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
                <div className='pr-10 pl-6'>
                    <div className='border-b border-[#D9D9D9] flex justify-start py-[24px]'>
                        <p className='mr-4'>Subtotal</p>
                        <p className='text-page-active'>Rs. {totalPrice.toFixed(2)}</p>
                    </div>
                    <div className='flex gap-[14px] py-6'>
                        <button className="checkout-button bg-transparent hover:bg-black hover:border-white hover:text-white border border-black text-[12px] text-black py-3 px-4 transition-all duration-200 w-full rounded-full">
                            Cart
                        </button>
                        <button className="checkout-button bg-transparent hover:bg-black hover:border-white hover:text-white border border-black text-[12px] text-black py-3 px-4 transition-all duration-200 w-full rounded-full">
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart