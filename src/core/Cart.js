import React, { useState ,useEffect } from 'react'
import Base from './Base';
import './Cart.css';
// import {getCartItems,removerAllProductFromCart} from './helper';
import {getCart} from '../user/helper';
import {isAuthenticated} from '../auth/helper';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CartItem from './CartItem';
export default function Cart() {
  const [products,setProducts] = useState([]);
 const [reload,setReload] = useState(false);
  const {user,token} = isAuthenticated();


  useEffect(()=>{
    getCart(user._id,token).then(data => {
      // console.log(data);
      if(data.error) console.log(data.error)
      else setProducts(data);
    });    
  },[reload]);

 
    return (
        <Base title='SHOPPING CART'>
          {products!==null ? products.map((thisProduct,index) => {
            return <CartItem key={index} reload={reload} setReload={setReload} id={thisProduct.product} quantity={thisProduct.quantity}/>
          }) : <h1 className='text-danger'>No Products In Cart</h1>}
         {/* { products!==null && <div className='delete-section' >
          <DeleteOutlineIcon className='ml-4'  />
          <span onClick={() => removerAllProductFromCart(()=>{
              alert('successfully removed all products from cart');
              setReload(!reload);
          })}>Delete All Products</span>
          </div>} */}
          <div className='checkout'>
          <div className='checkout-section'>
          <span className='mr-4'>SUBTOTAL</span>
          <span>$24343.00</span>
          </div>
          <button className='btn btn-outline-primary mt-4'>PROCEED TO CHECKOUT</button>
          </div>
        </Base>
    )
}
