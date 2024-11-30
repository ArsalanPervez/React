import React from 'react'
import GlobalButton from './GlobalButton'

const HeroBanner = () => {
  return (
    <div className='hero-banner-background py-[155px]'>
        <div className='container flex items-center justify-between'>
            <div className='w-1/2'></div>
            <div className='bg-secondary w-1/2 max-w-[680px] py-16 px-10 rounded-xl shadow-sm'>
                <h2 className='font-semibold'>New Arrival</h2>
                <h3 className='text-primary font-bold text-5xl py-4'>Discover Our New Collection</h3>
                <p className='text-lg mb-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
                <GlobalButton label={'Buy Now'} link={'/shop'} />
            </div>
        </div>
    </div>
  )
}

export default HeroBanner