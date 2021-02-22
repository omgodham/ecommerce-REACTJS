import "./Card.css";
import React,{useEffect, useState} from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export default function Card({name,price}) {

 useEffect(()=>{
     console.log('under useeffect');
    const card = document.getElementById('card');
    const ele = document.getElementById('card-body');
    const ele2 = document.getElementsByClassName('btn-section');
    card.addEventListener('mouseover',() =>{
        console.log('over');
        ele.classList.add('change-card');
        ele2[0].classList.add('chage-btn-section');
    
    });
    card.addEventListener('mouseout',() =>{
        console.log('out');
        ele.classList.remove('change-card');
        ele2[0].classList.remove('chage-btn-section');
    });
 },[]);
        

    return (
        <div className="card" id='card' style={{width: "18rem"}} >
        <img src="https://images.pexels.com/photos/2562992/pexels-photo-2562992.png?auto=compress&cs=tinysrgb&dpr=1&w=500" className="card-img-top" alt="" height='300px' width='50px'/>
        <div className="card-body" id='card-body'>
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{price}</p>
        </div>
        <div className='btn-section'>
          <a href="#" className="btn btn-primary"><ShoppingCartIcon/>ADD TO CART</a>
        </div>
      </div>
    )
}
