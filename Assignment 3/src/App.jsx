import { useState } from 'react'
import Card from './components/Card'

function App() {
  return (
    <>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: '50px', paddingRight: '50px' }}>

    <Card 
        details={{ 
          category: 'Women, bag', 
          name: 'Women leather bag', 
          previous_price: 'Rs 5000', 
          new_price: 'Rs 3000', 
          image: 'https://i.imgur.com/xdbHo4E.png'
        }} 
      />

      <Card 
        details={{ 
          category: 'Accessories, Headphones', 
          name: 'Noiceless Headphones', 
          previous_price: 'Rs 4000', 
          new_price: 'Rs 2000',
          image: 'https://static.vecteezy.com/system/resources/thumbnails/024/841/285/small_2x/wireless-headphone-isolated-on-transparent-background-high-quality-bluetooth-headphone-for-advertising-and-product-catalogs-generative-ai-png.png' 
        }} 
      />

      <Card 
        details={{ 
          category: 'Women, perfume', 
          name: 'Women Perfume', 
          previous_price: 'Rs 10,000', 
          new_price: 'Rs 7500',
          image: 'https://static.vecteezy.com/system/resources/previews/039/630/793/non_2x/ai-generated-transparent-bottle-of-perfume-empty-perfume-bottle-mockup-isolated-transparent-background-free-png.png' 
        }} 
      />

    </div>
    </>
  )
}

export default App
