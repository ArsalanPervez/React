import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import SingleProduct from './SingleProduct';

const About = () => {
  const [products, setProducts] = useState([])
  useEffect(()=> {
    getProductData();
  }, [])
  const getProductData = async ()=> {
    try {
      const data = await fetch("https://dummyjson.com/products")
      const response = await data.json();
      setProducts([...response.products]);
    } catch (error) {
        console.log(error)
    }
  }

  const navigate = useNavigate()

  const singleProduct = (product)=> {
    navigate(`/product/${product.id}`)
  }
  
  return (
    <div className='flex items-end justify-center gap-5 flex-wrap mt-20'>
      {products?.length > 0 ? 
        products?.map((product) => (
          <div key={product?.id} className="card bg-base-100 w-96 shadow-xl mb-10">
          <figure>
            <img
              src={product?.thumbnail}
              alt={product?.brand} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              <p className='cursor-pointer hover:underline' onClick={()=>singleProduct(product)}>{product?.title}</p>
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <div className="card-actions justify-end">
              {product?.tags?.length > 0 ? product?.tags?.map((tag) => (<div className="badge badge-outline capitalize">{tag}</div>)) : <div className="badge badge-outline">Tag</div>}
            </div>
          </div>
        </div> 
        ))
      : <h3>Loading.....</h3>}
        
    </div>
  )
}

export default About
