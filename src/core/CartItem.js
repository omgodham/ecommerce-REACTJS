import React, { useState } from 'react';
import './Cart.css';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { getProductPhoto } from '../admin/helper';
import { removerProductFromCart } from './helper';

export default function CartItem({ reload, setReload, id, name, price }) {

    const [productCount, setProductCount] = useState(1);
      
    const removeFromCart = (id) => {
        removerProductFromCart(id, () => {
            setReload(!reload);
            alert('successfully removed');
        });
    }
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
           {(productCount === 1) ? (<button>-</button>) :  (<button onClick={decrement}>-</button>) }  
            <span>{productCount}</span>
            <button onClick={increment}>+</button>
        </div>
        <div className='right-block'>
            <span>${productCount*price}.00</span>
            <DeleteOutlineIcon className='delete-icon ml-4' onClick={() => removeFromCart(id)} />
        </div>
    </div>
}
