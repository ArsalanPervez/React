import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// import Products from './pages/Products';
// import ProductDetails from './pages/ProductDetails';
// import Cart from './pages/Cart';
import Header from './components/Header';
import Footer from './components/Footer';

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;