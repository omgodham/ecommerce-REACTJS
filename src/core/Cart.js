import React, { useState ,useEffect } from 'react'
import Base from './Base';
import './Cart.css';
import {getCartItems,removerProductFromCart} from './helper';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { getProductPhoto } from '../admin/helper';
export default function Cart() {
  const [products,setProducts] = useState([]);
 const [reload,setReload] = useState(false);
 const [productCount,setProductCount] = useState(1);
  useEffect(()=>{
   setProducts(getCartItems());
  },[reload]);

  const removeFromCart = (id) =>{
       removerProductFromCart(id,()=>{
         setReload(!reload);
         alert('successfully removed');
       });
  } 


  const cartItem = (id,name,price) => {
      return <div className='cart'> 
      <div className='left-block'> 
          <img src={getProductPhoto(id)} />
          <p className='ml-2'>{name}</p>
      </div>
      <div className='price'>
      <span>${price}</span>
      </div>
      <div className='center-block'>
      <button onClick={()=> setProductCount(productCount-1)}>-</button>
      {productCount}
      <button onClick={() => setProductCount(productCount+1)}>+</button>
      </div>
      <div className='right-block'>
      <span>${price}</span>
      <DeleteOutlineIcon className='delete-icon' onClick={() => removeFromCart(id)}/>
      </div>
      </div>
  }
    return (
        <Base title='SHOPPING CART'>
          {products.map((product,index) => {
           return cartItem(index,product.id,product.name,product.price);
          })}
        </Base>
    )
}
