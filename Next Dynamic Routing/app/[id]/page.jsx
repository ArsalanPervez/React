import React from 'react'
import Link from 'next/link';

const SingleProduct = async ({ params: { id } }) => {
    const response = await fetch(`https://dummyjson.com/products`);
    const result = await response.json()
    const data = result.products.filter((item)=> item.id == id)
    console.log("Result =====> ", data)
  return (
    <div className='flex items-end justify-center gap-5 flex-wrap mt-20'>
        {data?.length > 0 ? 
        <div className="card lg:card-side bg-base-100 shadow-xl w-[40%]">
            <figure>
                <img
                src={data[0]?.thumbnail}
                alt={data[0]?.brand} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{data[0]?.title}</h2>
                <p>{data[0]?.description}</p>
                <div className="card-actions justify-end mt-5">
                    <button className="btn btn-primary"><Link href={`/`}>Back</Link></button>
                </div>
            </div>
        </div> 
        : <p>Loading.....</p>}
    </div>
  )
}

export default SingleProduct