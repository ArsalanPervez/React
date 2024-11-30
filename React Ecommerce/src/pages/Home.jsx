import React, {useState, useEffect} from 'react';
import HeroBanner from '@/components/HeroBanner';
import BrowseTheRange from '@/components/BrowseTheRange';
import OurProducts from '@/components/OurProducts';
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { getAllproduct } from '../config/store/reducers/productSlice';
const Home = () => {
  const [products, setProducts] = useState([]);
  const [groceriesProduct, setGroceriesProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  async function getData() {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      let groceriesData = data.products.filter((item)=> item.category == "groceries")
      console.log(data.products);
      setProducts(data.products);
      dispatch(getAllproduct(products))
      setGroceriesProduct(groceriesData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
}
useEffect(() => {
    getData()
}, [])
  return (
    <>
      <HeroBanner />
      <BrowseTheRange />
      <OurProducts productsData={products} isLoading={loading} />
    </>
  )
}

export default Home