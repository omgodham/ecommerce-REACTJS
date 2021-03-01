import React, { useState ,useEffect } from 'react'
import Base from './Base';
import './Cart.css';
import {getCartItems,removerProductFromCart} from './helper';

import CartItem from './CartItem';
export default function Cart() {
  const [products,setProducts] = useState([]);
 const [reload,setReload] = useState(false);

  useEffect(()=>{
   setProducts(getCartItems());
  },[reload]);


    return (
        <Base title='SHOPPING CART'>
          {products!==null && products.map((product,index) => {
            return <CartItem key={index} reload={reload} setReload={setReload} id={product.id} name={product.name} price={product.price}/>
          })}
        </Base>
    )
}
