import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CookiesProvider, useCookies } from 'react-cookie';

function Details() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [cookies, setCookie] = useCookies('');


  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(`${import.meta.env.VITE_APP_HOST}/products/${productId}`)
        const jsonData = await response.json()
        setProduct(jsonData)
    }
    fetchData()

  }, [productId]);

  const addToCart = (id) => {
    // const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    // currentCart.push(id);
    // localStorage.setItem('cart', JSON.stringify(currentCart));

    let cartData = ""
    if(cookies.cart) {
        cartData = cookies.cart + ',' + id 
    } else {
        cartData = id
    }
    setCookie('cart', cartData, { path: '/' }) // Save data to cart cookiee
  };

  return (
    <div>
      {product && (
        <>
          <h2>{product.name}</h2>
          <img src={import.meta.env.VITE_APP_HOST + '/images/' + product.image_filename} alt={product.name} />
          <p>{product.description}</p>
          <p>${product.cost}</p>
          <button onClick={() => addToCart(product.product_id)}>Add to Cart</button>
          <button onClick={() => navigate('/')}>Go Back</button>
        </>
      )}
    </div>
  );
}

export default Details;
