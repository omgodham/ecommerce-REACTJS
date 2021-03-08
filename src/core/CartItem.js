import React, { useState , useEffect } from 'react';
import './Cart.css';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { getProductPhoto } from '../admin/helper';
// import { removerProductFromCart} from './helper';
import {getProduct} from '../admin/helper';
export default function CartItem({ reload, setReload, id , quantity}) {

    const [productCount, setProductCount] = useState(1);
    const [values,setValues] = useState({
        name:'',
        price:'',
        error:false
    });
    const {name,price,error} = values;

    useEffect(()=>{
        // console.log(id);
        getProduct(id).then(data => {
            if(data.error) setValues({...values,error:data.error})
            else
            setValues({
               ...values,
                name:data.name,
                price:data.price
            });
        })
    },[]);

    // const removeFromCart = (id) => {
    //     removerProductFromCart(id, () => {
    //         setReload(!reload);
    //         alert('successfully removed');
    //     });
    // }
    const increment = () => {
        setProductCount(productCount + 1)
    }

    const decrement = () => {
        setProductCount(productCount - 1)
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
            {/* <DeleteOutlineIcon className='delete-icon ml-4' onClick={() => removeFromCart(id)} /> */}
        </div>
    </div>
}
