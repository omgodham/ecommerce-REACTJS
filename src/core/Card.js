import "./Card.css";
import React,{useEffect, useState} from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { getProductPhoto } from "../admin/helper";

export default function Card({id,name='Name',price='$10'}) {

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
            setBtnStyle({ position: "absolute",
            bottom:"-50px",
            right: "0px",
            left: "0px",
            zIndex:"-1",
            marginTop:"0px",
            transition:"all 0.3s ease-in-out"});
    }

    return (
        <div className="card" id='card' style={{width: "18rem"}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <img src={getProductPhoto(id)} height='300px' className="card-img-top" alt="" />
        <var id={name}>  {/*we can use div also no worry*/}
       <div className="card-body" id='card-body'>
          <h5 className="card-title" style={{textTransform:'capitalize'}}>{name}</h5>
          <p className="card-text">${price}</p>
        </div>
        </var>
       <div style={btnStyle}>
          <a href="#" className="btn btn-primary"><ShoppingCartIcon/>ADD TO CART</a>
        </div>
      </div>     
    )
}
