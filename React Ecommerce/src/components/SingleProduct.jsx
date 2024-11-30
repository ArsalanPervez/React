import React, { useState, useEffect } from 'react'
import ProdImg1 from '@/assets/img/image-3.png'
import ProdImg3 from '@/assets/img/image-8.png'
import ProdImg2 from '@/assets/img/image-6.png'
import ProdImg4 from '@/assets/img/image-3.png'
import PlaceHolderImg from '../assets/img/product-placeholder-img.jpeg'
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getAllproduct } from '../config/store/reducers/productSlice'

function SingleProduct() {
    const { id } = useParams();
    const [isSingleProduct, setSingleProduct] = useState();
    const [relatedProducts, setRelatedProducts] = useState();
    const [isOpen, setIsOpen] = useState(true);
    const products = [
        { src: ProdImg1, title: `Syltherine`, desc: 'Stylish cafe chair', salePrice: 'Rp 2.500.000', defaultPrice: 'Rp 3.500.000', link: '/men-clothing' },
        { src: ProdImg2, title: `Leviosa`, desc: 'Stylish cafe chair', salePrice: 'Rp 2.500.000', defaultPrice: '', link: '/women-clothing' },
        { src: ProdImg3, title: `Lolito`, desc: 'Luxury big sofa', salePrice: 'Rp 7.000.000', defaultPrice: 'Rp 14.000.000', link: '/jewelery' },
        { src: ProdImg4, title: `Respira`, desc: 'Outdoor bar table and stool', salePrice: 'Rp 500.000', defaultPrice: '', link: '/jewelery' },
    ]

    async function getSingleProduct(params) {
        try {
            const response = await fetch(`https://dummyjson.com/products`);
            const data = await response.json();
            const singleProductdata = data?.products?.filter((item)=> item.id == id)
            setSingleProduct(singleProductdata[0])
            let categoryFind = singleProductdata[0].category;
            let relatedData = data?.products?.filter((item)=> item.category == categoryFind)
            console.log("Related Products =====> ", relatedData)
            setRelatedProducts(relatedData)
        } catch (error) {
            console.log(error)
        }
    }

    const toggleAccordion = (value) => {
        setIsOpen(value)
    }

    useEffect(() => {
        getSingleProduct()
    }, [])

    return (
        <div>
            <div className='py-3 bg-pagination-color'>
                <div className='container flex items-center justify-between'>
                    <div className='flex items-center gap-8'>
                        <p className='text-footer-xt'>Home</p>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 15L11 10L6 5L7 3L14 10L7 17L6 15Z" fill="black" />
                        </svg>
                        <p className='text-footer-xt'>Shop</p>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 15L11 10L6 5L7 3L14 10L7 17L6 15Z" fill="black" />
                        </svg>

                        <svg width="2" height="37" viewBox="0 0 2 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="1" x2="1" y2="37" stroke="#9F9F9F" strokeWidth="2" />
                        </svg>
                        Asgaard sofa

                    </div>
                </div>
            </div>
            <section className="text-gray-600 body-font overflow-hidden border-b">
                <div className="container px-5 py-32 mx-auto">
                    <div className="w-full mx-auto flex gap-4">
                        <div className=''>
                            {isSingleProduct?.images?.map((item, index) => (
                                <div key={index} className='bg-secondary rounded-md border h-fit mb-8'>
                                    <img src={item} className='size-20' alt="" />
                                </div>
                            ))}
                        </div>
                        <img
                            alt="ecommerce"
                            className="lg:w-1/2 w-full max-h-[590px] object-cover bg-[#F9F1E7] rounded-[10px] object-center"
                            src={isSingleProduct?.thumbnail}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                {isSingleProduct?.title}
                            </h1>
                            <div className='flex items-center gap-2.5'>
                                <span className="text-primary title-font font-medium text-2xl">${isSingleProduct?.price}</span>
                                <span className='text-footer-xt line-through'>${(isSingleProduct?.price + isSingleProduct?.discountPercentage)?.toFixed(2)}</span>

                            </div>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    <svg
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 text-[#FFC700]"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 text-[#FFC700]"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 text-[#FFC700]"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 text-[#FFC700]"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 text-[#FFC700]"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>

                                </span>
                                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                    <span className="text-footer-xt ml-3">{isSingleProduct?.rating} Rating</span>
                                </span>
                            </div>
                            <p className="leading-relaxed mb-5 pb-5 text-black">
                                {isSingleProduct?.description}
                            </p>
                            <div className="leading-relaxed mb-5 pb-2 ">
                                <p className='text-footer-xt'>Size</p>
                                <div className='flex items-center gap-4 pb-6 text-[13px]'>
                                    <div className='size-7 bg-page-active text-white flex items-center justify-center rounded-[5px]'>L</div>
                                    <div className='size-7 bg-white text-black flex items-center justify-center rounded-[5px]'>XL</div>
                                    <div className='size-7 bg-white text-black flex items-center justify-center rounded-[5px]'>XS</div>
                                </div>
                            </div>
                            <div className="leading-relaxed mb-5 pb-5 ">
                                <p className='text-footer-xt'>Color</p>
                                <div className='flex items-center gap-4 pb-6 text-[13px]'>
                                    <div className='size-7 bg-[#816DFA] text-white flex items-center justify-center rounded-full'></div>
                                    <div className='size-7 bg-[#000000] text-black flex items-center justify-center rounded-full'></div>
                                    <div className='size-7 bg-[#B88E2F] text-black flex items-center justify-center rounded-full'></div>
                                </div>
                            </div>

                            <div className="flex ">

                                <button onClick={() => addCart(products)} className="w-[123px] h-[64px] flex  items-center justify-center text-black bg-transparent border border-black py-2 px-6 focus:outline-none rounded-[15px]">
                                    - 1 +
                                </button>
                                <button onClick={() => addCart(products)} className="w-[215px] h-[64px] flex ml-auto items-center justify-center text-black bg-transparent border border-black py-2 px-6 focus:outline-none rounded-[15px]">
                                    Add To Cart
                                </button>
                                {/* <button onClick={() => addCart(products)} className="w-[215px] h-[64px] flex ml-auto items-center justify-center text-black bg-transparent border border-black py-2 px-6 focus:outline-none rounded-[15px]">
                                    +  Compare
                                </button> */}
                            </div>
                            <div className='border-t mt-14 pt-10 text-footer-xt'>
                                <div className='flex pb-[12px]'><p className='w-[92px]'>SKU</p>:<p className='ml-[12px]'>{isSingleProduct?.sku}</p></div>
                                <div className='flex pb-[12px]'><p className='w-[92px]'>Category</p>:<p className='ml-[12px]'>{isSingleProduct?.category}</p></div>
                                <div className='flex pb-[12px]'><p className='w-[92px]'>Tags</p>:
                                    <p className='ml-[12px]'>
                                        <span >{isSingleProduct?.tags.join(', ')}</span>
                                    </p>
                                </div>
                                <div className='flex pb-[12px]'><p className='w-[92px]'>Share</p>:<p className='ml-[12px] flex gap-6'>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0 10.0558C0 15.0275 3.61083 19.1617 8.33333 20V12.7775H5.83333V10H8.33333V7.7775C8.33333 5.2775 9.94417 3.88917 12.2225 3.88917C12.9442 3.88917 13.7225 4 14.4442 4.11083V6.66667H13.1667C11.9442 6.66667 11.6667 7.2775 11.6667 8.05583V10H14.3333L13.8892 12.7775H11.6667V20C16.3892 19.1617 20 15.0283 20 10.0558C20 4.525 15.5 0 10 0C4.5 0 0 4.525 0 10.0558Z" fill="black" />
                                    </svg>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0.833252 2.365C0.833252 1.95877 0.994624 1.56919 1.28187 1.28195C1.56911 0.994702 1.9587 0.83333 2.36492 0.83333H17.6333C17.8346 0.833001 18.034 0.872383 18.22 0.949219C18.4061 1.02606 18.5752 1.13884 18.7176 1.28111C18.8601 1.42338 18.973 1.59235 19.0501 1.77834C19.1271 1.96433 19.1667 2.16368 19.1666 2.365V17.6333C19.1668 17.8347 19.1273 18.0341 19.0504 18.2202C18.9735 18.4063 18.8606 18.5753 18.7183 18.7178C18.5759 18.8602 18.4069 18.9731 18.2209 19.0502C18.0348 19.1272 17.8354 19.1668 17.6341 19.1667H2.36492C2.16371 19.1667 1.96447 19.127 1.77858 19.05C1.5927 18.973 1.42381 18.8601 1.28157 18.7178C1.13933 18.5754 1.02653 18.4065 0.949604 18.2206C0.87268 18.0346 0.833143 17.8354 0.833252 17.6342V2.365ZM8.08992 7.82333H10.5724V9.07C10.9308 8.35333 11.8474 7.70833 13.2249 7.70833C15.8658 7.70833 16.4916 9.13583 16.4916 11.755V16.6067H13.8191V12.3517C13.8191 10.86 13.4608 10.0183 12.5508 10.0183C11.2883 10.0183 10.7633 10.9258 10.7633 12.3517V16.6067H8.08992V7.82333ZM3.50659 16.4925H6.17992V7.70833H3.50659V16.4917V16.4925ZM6.56242 4.84333C6.56746 5.07222 6.52673 5.29982 6.44262 5.51276C6.35851 5.7257 6.23271 5.91969 6.07261 6.08336C5.91251 6.24702 5.72133 6.37706 5.5103 6.46584C5.29926 6.55461 5.07262 6.60035 4.84367 6.60035C4.61472 6.60035 4.38808 6.55461 4.17704 6.46584C3.966 6.37706 3.77483 6.24702 3.61473 6.08336C3.45463 5.91969 3.32883 5.7257 3.24472 5.51276C3.16061 5.29982 3.11988 5.07222 3.12492 4.84333C3.13481 4.39404 3.32024 3.96649 3.64149 3.65224C3.96274 3.33798 4.39427 3.16201 4.84367 3.16201C5.29307 3.16201 5.7246 3.33798 6.04585 3.65224C6.3671 3.96649 6.55253 4.39404 6.56242 4.84333Z" fill="black" />
                                    </svg>
                                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.5 0.5625C5.45996 0.5625 0.5625 5.45996 0.5625 11.5C0.5625 17.54 5.45996 22.4375 11.5 22.4375C17.54 22.4375 22.4375 17.54 22.4375 11.5C22.4375 5.45996 17.54 0.5625 11.5 0.5625ZM16.7563 8.80713C16.7637 8.92188 16.7637 9.0415 16.7637 9.15869C16.7637 12.7427 14.0342 16.8711 9.04639 16.8711C7.5083 16.8711 6.08252 16.4243 4.88135 15.6553C5.10107 15.6797 5.31104 15.6895 5.53565 15.6895C6.80518 15.6895 7.97217 15.2598 8.90234 14.5322C7.71094 14.5078 6.70996 13.7266 6.36816 12.6523C6.78564 12.7134 7.16162 12.7134 7.59131 12.6035C6.97785 12.4789 6.42645 12.1457 6.0308 11.6606C5.63515 11.1755 5.41964 10.5684 5.4209 9.94238V9.9082C5.77979 10.1108 6.20215 10.2354 6.64404 10.2524C6.27256 10.0049 5.96792 9.66946 5.75711 9.27595C5.5463 8.88244 5.43585 8.443 5.43555 7.99658C5.43555 7.49121 5.56738 7.02979 5.8042 6.62939C6.48511 7.46762 7.33479 8.15318 8.29801 8.64152C9.26123 9.12986 10.3164 9.41004 11.395 9.46387C11.0117 7.62061 12.3887 6.12891 14.0439 6.12891C14.8252 6.12891 15.5283 6.45605 16.0239 6.9834C16.6367 6.86865 17.2227 6.63916 17.7451 6.33154C17.5425 6.95898 17.1177 7.48877 16.5537 7.82324C17.1006 7.76465 17.6279 7.61328 18.1162 7.40088C17.7476 7.94287 17.2861 8.42383 16.7563 8.80713Z" fill="black" />
                                    </svg>


                                </p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className=' border-b '>
                <div className='container flex justify-center gap-[52px] pt-[48px]'>
                    <h2 onClick={() => { toggleAccordion(true) }} className='text-black'>Description</h2>
                    <h2 onClick={() => { toggleAccordion(false) }} className='text-footer-xt'>Reviews [{isSingleProduct?.reviews.length}]</h2>
                </div>
                {isOpen ? (
                    <div className='max-w-[1026px] container mx-auto'>
                        <p className='text-left py-[37px] text-footer-xt'>{isSingleProduct?.description}</p>
                    </div>
                ) :
                    (
                        <div className='container flex gap-[29px] justify-center py-[65px]'>
                            {isSingleProduct?.reviews.map((item, index) => (
                                <div key={index} className='w-[25%] border rounded-xl bg-secondary p-4'>
                                    <h4 className='font-semibold'>{item?.reviewerName}</h4>
                                    <div className='flex items-center'>
                                        <svg
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            className="w-4 h-4 text-[#FFC700]"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                        <svg
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            className="w-4 h-4 text-[#FFC700]"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                        <svg
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            className="w-4 h-4 text-[#FFC700]"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                        <svg
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            className="w-4 h-4 text-[#FFC700]"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            className="w-4 h-4 text-[#FFC700]"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    </div>
                                    <p>{item?.comment}</p>
                                    <div className='border-t'>
                                        {item?.date.toDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )

                }
                
            </section>
            <section className='container'>
                <h2 className='text-[36px] font-semibold text-center pt-[55px]'>Related Products</h2>
                <div className='container py-14'>
                    <div className='flex items-center justify-center text-start flex-wrap gap-5'>
                        {relatedProducts && relatedProducts?.slice(0, 4)?.map((product, index) => (
                            <div key={index} className='w-[23%] relative group cursor-pointer'>
                                <div className='overflow-hidden rounded-t-xl bg-secondary'>
                                {product.thumbnail ? 
                                        <img src={product.thumbnail} alt=""  className='w-full h-full hover:scale-110 transition-all duration-500'/>:  
                                        <img src={PlaceHolderImg} alt=""  className='w-full h-full hover:scale-110 transition-all duration-500' />
                                    }
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
                    </div>
                    {/* <div className='flex justify-center'>
                        <button className='w-[245px] font-semibold text-page-active border border-page-active h-[48px]'>Show More</button>
                    </div> */}
                </div>

            </section>
        </div>
    )
}

export default SingleProduct