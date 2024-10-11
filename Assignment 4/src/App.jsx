import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  
import Product from './components/Product';

function App() {
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
  return (
    <>
      <Product products={products}/>
    </>
  )
}

export default App
