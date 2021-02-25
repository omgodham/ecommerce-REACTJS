import React,{useEffect, useState} from 'react';
import {Link,Redirect} from 'react-router-dom';
import "./Navbar.css";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import SearchIcon from '@material-ui/icons/Search';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {isAuthenticated,signout} from '../auth/helper/index';

export default function Navbar() {

const [boolean,setBoolean] = useState({
    cart:false,
    account:false,
    logout:false,
    accountBlock:false
});
const [redirect,setRedirect] = useState(false);
const {cart,account,accountBlock,logout} = boolean;
// const [auth,setAuth] = useState(false);
// useEffect(()=>{
//     setAuth(isAuthenticated());
//     // console.log(auth);
// },[]);

const handleMouseOver = (name) =>{
    setBoolean({...boolean,[name]:true});
}
const handleMouseOut = (name) =>{
    setBoolean({...boolean,[name]:false});
}
  
const handleClick = () =>{
    setBoolean({...boolean,accountBlock: !accountBlock});
}

const doLogout = () =>{
    signout(isAuthenticated().token).then(data => {
        console.log(data);
        if(data.error){
            alert(data.error);
        }else{
            setRedirect(true);
            }
    });
}

const performRedirect = (redirect) => {
    return redirect && (<Redirect to ='/' />) 
}
// console.log(isAuthenticated());
    return (
        <div className='navbar'>
            <div className='left-content'>
                <ul className='nav-container'>
                    <li className='nav-links nav-logo'>wookie</li>
                    <li><Link to='/' className='nav-links'>HOME</Link></li>
                    <li><Link to='/' className='nav-links'>MEN</Link></li>
                    <li><Link to='/' className='nav-links'>WOMEN</Link></li>
                </ul>
            </div>
            <div className='right-content'>
           <div className='logo-info search'>
           <input type='search' className='form-control' placeholder='Search' />
           <SearchIcon className="i" onMouseOver={() => handleMouseOver('search')} onMouseOut={() => handleMouseOut('search')} />
            </div>
            <div  className='logo-info'>
            <ShoppingCartIcon className="i" onMouseOver={() => handleMouseOver('cart')} onMouseOut={() => handleMouseOut('cart')} />
            <span style={{display: !cart ? "none" : "" }}>Cart</span>
            </div>
            {!isAuthenticated() && <div  className='logo-info user-info'>
            <PermIdentityIcon className="i" onClick={handleClick} onMouseOver={() => handleMouseOver('account')} onMouseOut={() => handleMouseOut('account')} />
            {account && <span>My Account</span>}
        </div>}
            {isAuthenticated() && <div  className='logo-info user-info'>
            <h6 style={{textTransform:'capitalize'}}>Welcome {isAuthenticated().user.name}</h6>
        </div>}
        {isAuthenticated() && <div  className='logo-info user-info'>
            <ExitToAppIcon className="i" onClick={doLogout} onMouseOver={() => handleMouseOver('logout')} onMouseOut={() => handleMouseOut('logout')} />
            {logout && <span>logout</span>}
        </div>}
        { accountBlock && <div className='info-popup'>
                <span><PermIdentityIcon style={{marginRight:"2px"}} /><Link to='/signin'>Sign In</Link></span>
                <span><PersonAddIcon style={{marginRight:"2px"}} /><Link to='/signup'>Register</Link></span>
            </div>}
        </div>
        {performRedirect(redirect)}
        </div>
    )
}
