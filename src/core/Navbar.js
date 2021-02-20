import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import "./Navbar.css";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import SearchIcon from '@material-ui/icons/Search';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

export default function Navbar() {
const [boolean,setBoolean] = useState({
    search:false,
    cart:false,
    account:false,
    accountBlock:false
});

const {search,cart,account,accountBlock} = boolean;


const handleMouseOver = (name) =>{
    setBoolean({...boolean,[name]:true});
}
const handleMouseOut = (name) =>{
    setBoolean({...boolean,[name]:false});
}
  
const handleClick = () =>{
    setBoolean({...boolean,accountBlock: !accountBlock});
}

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
            <div  className='logo-info user-info'>
            <PermIdentityIcon className="i" onClick={handleClick} onMouseOver={() => handleMouseOver('account')} onMouseOut={() => handleMouseOut('account')} />
            {account && <span>My Account</span>}
        </div>
        { accountBlock && <div className='info-popup'>
                <span><PermIdentityIcon style={{marginRight:"2px"}} /><Link to='/signin'>Sign In</Link></span>
                <span><PersonAddIcon style={{marginRight:"2px"}} /><Link to='/signup'>Register</Link></span>
            </div>}
        </div>
        </div>
    )
}
