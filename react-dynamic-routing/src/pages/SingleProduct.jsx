import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { useParams } from 'react-router-dom'

const SingleProduct = () => {
    const {id} = useParams()
    const [singleProduct, setSingleProduct] = useState([])
  useEffect(()=> {
    getProductData();
  }, [])
  const getProductData = async ()=> {
    try {
      const data = await fetch(`https://dummyjson.com/product/${id}`)
      const response = await data.json();
      setSingleProduct([response]);
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div className='flex items-end justify-center gap-5 flex-wrap mt-20'>
        {singleProduct?.length > 0 ? 
        <div className="card lg:card-side bg-base-100 shadow-xl w-[40%]">
            <figure>
                <img
                src={singleProduct[0]?.thumbnail}
                alt={singleProduct[0]?.brand} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{singleProduct[0]?.title}</h2>
                <p>{singleProduct[0]?.description}</p>
                <div className="card-actions justify-end mt-5">
                    <button className="btn btn-primary"><Link to={`/products`}>Back</Link></button>
                </div>
            </div>
        </div> 
        : <p>Loading.....</p>}
    </div>
  )
}

export default SingleProduct