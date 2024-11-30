import React from 'react'
import { Link } from 'react-router-dom'
import CatgoryImg1 from '@/assets/img/Mask-Group.png'
import CatgoryImg2 from '@/assets/img/Image-living room.png'
import CatgoryImg3 from '@/assets/img/catgory-img.png'


const BrowseTheRange = () => {
    const categories = [
        { src: CatgoryImg1, lable: `Men's Clothing`, link: '/men-clothing'},
        { src: CatgoryImg2, lable: `Women's Clothing`, link: '/women-clothing'},
        { src: CatgoryImg3, lable: `jewelery`, link: '/jewelery'},
    ]
    return (
    <div className='container text-center py-14'>
        <div className='pb-16'>
            <h2 className='text-3xl font-bold'>Browse The Range</h2>
            <p className='text-paragraph-color text-xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className='flex items-center justify-center'>
            {categories.map((catgory, index) => (
                <div className='mr-5 relative group cursor-pointer' key={index}>
                    <Link to={catgory.link} className='absolute inset-0 z-1'></Link>
                    <div className='overflow-hidden rounded-xl'> <img src={catgory.src} className='group-hover:scale-110 transition-all duration-500' alt="" /></div>
                    <div className='text-xl font-semibold mt-5'>{catgory.lable}</div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default BrowseTheRange