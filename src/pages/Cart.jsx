import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CookiesProvider, useCookies } from 'react-cookie';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState();
  const [cookies, setCookie] = useCookies('');

  useEffect(() => {
    // const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const savedCart = cookies.cart.split(',') || '[]'
    setCartItems(savedCart)
    console.log(savedCart)
    
    const getCartProductDetails = async (id) => {
        // Replace with API call to fetch product details by id
        // return { name: `Product ${id}`, price: 29.99, image: `/images/product${id}.jpg` };
        const response = await fetch(`${import.meta.env.VITE_APP_HOST}/products/${id}`)
        const jsonData = await response.json()
        return jsonData    
    };

    const uniqueCartItems = [...new Set(cartItems)];
    const cartProductDetails = uniqueCartItems.map(id => getCartProductDetails(id));
    setCartItems(cartProductDetails)

    setSubtotal(cartProductDetails.reduce((total, item) => total + item.cost, 0))

  }, []);


  return (
    <div>
      <h2>Your Cart</h2>
      <div>
        {cartItems.map((item, index) => (
          <div key={index}>
            <img src={import.meta.env.VITE_APP_HOST + '/images/' + item.image_filename} alt={item.name} />
            <h3>{item.name}</h3>
            <p>${item.cost}</p>
            {/* Quantity management can be added here */}
          </div>
        ))}
      </div>
      <p>Subtotal: ${subtotal}</p>
      <Link to="/">Continue shopping</Link>
      <Link to="/checkout">Complete purchase</Link>
    </div>
  );
}

export default Cart;
