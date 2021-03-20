import React, { useState , useEffect } from 'react';
import './Cart.css';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { getProductPhoto, updateProduct } from '../admin/helper';
// import { removerProductFromCart} from './helper';
import {getProduct} from '../admin/helper';
import {isAuthenticated} from '../auth/helper' 
import {deleteProductFromCart,updateProductInCart} from '../user/helper'

export default function CartItem({  setReload,reload, id , productQuantity ,total , getTotal}) {


    const {user,token} = isAuthenticated();
    
    const [values,setValues] = useState({
        name:'',
        price:'',
        quantity:productQuantity,
        error:false
    });
    const {name,price,error,quantity} = values;

    useEffect(()=>{
        getProduct(id).then(data => {
            if(data.error) setValues({...values,error:data.error})
            else
            setValues({
               ...values,
                name:data.name,
                price:data.price
            });
        });
    },[]);

    useEffect(() => {
        getTotal(quantity*price);
    },[name]);

    useEffect(() => {
        updateProduct(); 
    }, [quantity]) //changes does not reflect in useState hooks hence instead of calling
    //in incr and decr functions we have to call it in useEfffect

    const removeFromCart = (id) => {
        deleteProductFromCart(user._id,id,token).then(data => {
            if(data.error) console.log(data.error)
            else {
                setReload(!reload);
            }
        })
    }
    const increment = () => {
        setValues({...values,quantity:quantity+1});
        getTotal(price);
    }

    const decrement = () => {
        setValues({...values,quantity:quantity-1});
        getTotal(-price);
    }


    const updateProduct = () =>{  
        updateProductInCart(user._id,id,token,{quantity}).then(data => {
            if(data.error) console.log(data.error)
            else {
                setReload(!reload);
            }
        });
    }


    return <div className='cart' >
        <div className='left-block'>
            <img src={getProductPhoto(id)} />
            <p className='ml-2'>{name}</p>
        </div>
        <div className='price'>
            <span>${price}.00</span>
        </div>
        <div className='center-block'>
           {(quantity === 1) ? (<button>-</button>) :  (<button onClick={decrement}>-</button>) }  
            <span>{quantity}</span>
            <button onClick={increment}>+</button>
        </div>
        <div className='right-block'>
            <span>${quantity*price}.00</span>
            <DeleteOutlineIcon className='delete-icon ml-4' onClick={() => removeFromCart(id)} />
        </div>
    </div>
}
