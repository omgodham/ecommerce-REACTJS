import React, { useState ,useEffect } from 'react'
import Base from './Base';
import './Cart.css';
import { loadStripe } from "@stripe/stripe-js";
//http:localhost:3000?success=true

// import {getCartItems,removerAllProductFromCart} from './helper';
import {getCart,deleteAllProductsFormCart} from '../user/helper';
import {isAuthenticated} from '../auth/helper';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CartItem from './CartItem';
import {makePayment } from './helper';

export default function Cart() {
  const [products,setProducts] = useState([]);
  const [reload,setReload] = useState(false);
  const [total,setTotal] = useState(0);
  // const [redirect,setRedirect] = useState(false);
  const {user,token} = isAuthenticated();

  useEffect(()=>{
    getCart(user._id,token).then(data => {
      console.log(data);
      if(data.error) console.log(data.error)
      else setProducts(data);
    });   
  },[reload]);

  const removeAllProductsFromCart = () => {
    deleteAllProductsFormCart(user._id,token).then(data => {
      if(data.error) console.log(data.error);
      else {
        setReload(!reload);
      }
    });
  }
 
  const getTotal = (number) =>{
    setTotal(total + number);
  }

  const handleClick = async () => {
    const stripe = await loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);
    const data = await makePayment(products);
    // setTransactionId(data.id);
    console.log(data);
    localStorage.setItem('order',JSON.stringify({
      products:products,
      amount:total,
      transaction_id:data.id,
      user:user._id
    }));
  
       const result = await stripe.redirectToCheckout({
          sessionId: data.id
        });
      }

    return (<Base title = 'SHOPPING CART'>
          {products.length !== 0  ? products.map((thisProduct,index) => {
            return <CartItem key={index} reload={reload} setReload={setReload} id={thisProduct.product} productQuantity={thisProduct.quantity} total={total} getTotal={getTotal}/>
          }) : <h1 className='text-danger'>No Products In Cart</h1>}
          { products.length !== 0 && <div className='delete-section' >
          <DeleteOutlineIcon className='ml-4'  />
          <span onClick={() => removeAllProductsFromCart()}>Delete All Products</span>
          </div>} 
          { products.length !== 0 && <div className='checkout'>
          <div className='checkout-section'>
          <span className='mr-4'>SUBTOTAL</span>
          <span>${total}.00</span>
          </div>
          <button className='btn btn-outline-primary mt-4' onClick={handleClick}>PROCEED TO CHECKOUT</button>
          </div>}
          {/* {doRedirect(redirect)} */}
        </Base>
    )} 
