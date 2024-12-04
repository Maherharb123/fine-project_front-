import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(`${import.meta.env.VITE_APP_HOST}/products/all`)
        const jsonData = await response.json()
        setProducts(jsonData)
    }
    fetchData()
  }, []);

  return (
    <div>
      <h2>Our Products</h2>
      <div>
        {products.map(product => (
          <div key={product.product_id}>
            <Link to={`/details/${product.product_id}`}>
             <img src={import.meta.env.VITE_APP_HOST + '/images/' + product.image_filename} alt={product.name} />              
              <h3>{product.name}</h3>
              <p>${product.cost}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
