import React from 'react'
import Link from 'next/link';

const Home = async () => {
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();
  return (
    <>
        <h1 className='text-center text-3xl mt-10'>Home - All Products</h1>
        <div className='flex items-end justify-center gap-5 flex-wrap mt-20'>
        {data.products?.length > 0 ? 
          data?.products?.map((product) => (
            <div key={product?.id} className="card bg-base-100 w-96 shadow-xl mb-10">
            <figure>
              <img
                src={product?.thumbnail}
                alt={product?.brand} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                <Link href={`/${product?.id}`} className='cursor-pointer hover:underline' >{product?.title}</Link>
                <div className="badge badge-secondary">NEW</div>
              </h2>
              <div className="card-actions justify-end">
                {product?.tags?.length > 0 ? product?.tags?.map((tag) => (<div key={tag} className="badge badge-outline capitalize">{tag}</div>)) : <div className="badge badge-outline">Tag</div>}
              </div>
            </div>
          </div> 
          ))
        : <h3>Loading.....</h3>}
          
      </div>
    </>
    
  )
}

export default Home