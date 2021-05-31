import "./Card.css";
import React,{useEffect, useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { getProductPhoto } from "../admin/helper";
//import {addToCart} from './helper';
import {addProductInCart} from '../user/helper';
import {isAuthenticated} from '../auth/helper'
export default function Card({id,name='Name',price='$10',isHome=true}) {
const {user,token} = isAuthenticated();

       const [flag,setFlag] = useState(false);
       const [btnStyle,setBtnStyle] = useState({
        position: "absolute",
        bottom:"-50px",
        right: "0px",
        left: "0px",
        zIndex:"-1"
       });

const handleMouseOver = () => {
    const ele = document.getElementById(name); //idName should be unique on which it is being hover
    ele.classList.add('change-card');
    setBtnStyle({ position: "absolute",
    bottom:"2px",
    right: "0px",
    left: "0px",
    zIndex:"1",
    transition: "all 0.5s ease-in-out"});     
}   

const handleMouseOut = () =>{
        setFlag(!flag);
        const ele = document.getElementById(name);
        ele.classList.remove('change-card');
            setBtnStyle({ 
            position: "absolute",
            bottom:"-50px",
            right: "0px",
            left: "0px",
            zIndex:"-1",
            marginTop:"0px",
            transition:"all 0.3s ease-in-out"});
    }

    const handleAdd = () => {
      addProductInCart(user._id,token,{product:id}).then((data) => {
        if(data.error) console.log(data);
        else alert('Added to cart successfully');
      });
     
    }

    const handleRemove = () =>{
     //
     }

    return (
        <div className="card" id='card' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
       <div className='product-image'> 
       <img src={getProductPhoto(id)}  className="card-img-top" alt="" />
       </div>
       
        <var id={name}>  {/*we can use div also no worry*/}
       <div className="card-body" id='card-body'>
          <h5 className="card-title" style={{textTransform:'capitalize'}}>{name}</h5>
          <p className="card-text">${price}.00</p>
        </div>
        </var>
       <div style={btnStyle}>
         {isHome ? (user ? <button onClick={handleAdd} className="btn btn-primary"><ShoppingCartIcon/>ADD TO CART</button> : <Link to='/signin' className="btn btn-primary"><ShoppingCartIcon/>ADD TO CART</Link>)
          : <button onClick={handleRemove} className="btn btn-primary"><ShoppingCartIcon/>REMPOVE FROM CART</button>
         }</div>
        
      </div>     
    )
}
