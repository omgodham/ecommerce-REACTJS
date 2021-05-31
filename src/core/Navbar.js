import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import "./Navbar.css";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import SearchIcon from '@material-ui/icons/Search';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import { isAuthenticated, signout } from '../auth/helper/index';

export default function Navbar({ reload, setReload = f => f}) {

    const [searchQuery, setSearchQuery] = useState('');
    const [boolean, setBoolean] = useState({
        cart: false,
        account: false,
        logout: false,
        accountBlock: false
    });
    const [redirect, setRedirect] = useState(false);
    const [isEnter, setIsEnter] = useState(false);
    const { cart, account, accountBlock, logout, search } = boolean;

    useEffect(() => {

        const sidebar = document.querySelector('.sidebar');
        const toggleBtn = document.querySelector('.toggle-btn');
        const searchBar = document.getElementById('input-search');
        const links = document.getElementsByTagName('a');

        sidebar.style.display = 'none';
        toggleBtn.addEventListener('click' , ()=>{
            sidebar.style.display = "block";
        });
        const closeBtn = document.querySelector('.close-btn');
        
        closeBtn.addEventListener('click' , ()=>{
            sidebar.style.display = 'none';
            toggleBtn.style.display = 'none';
        });
        
        window.addEventListener('resize' , ()=>{
            if(window.outerWidth >= '780')
            sidebar.style.display = 'none';
        });
        searchBar.addEventListener('keyup' , (e)=>{
            if(e.code == 'Enter'){
                setReload(!reload);
            }   
        });       
    },[]);

    // const doRedirectAfterEnter = (isEnter) => {
    //     return isEnter && (<Redirect to={`/products?q=${searchQuery}`} />);
    //   }

    const onSubmit = () => {
        setReload(!reload);
    }

    const handleChange = (event) => {
        setIsEnter(false);
        setSearchQuery(event.target.value);
    }

    const handleMouseOver = (name) => {
        setBoolean({ ...boolean, [name]: true });
    }
    const handleMouseOut = (name) => {
        setBoolean({ ...boolean, [name]: false });
    }

    const handleClick = () => {
        setBoolean({ ...boolean, accountBlock: !accountBlock });
    }

    const doLogout = () => {
        signout(isAuthenticated().token).then(data => {
            console.log(data);
            if (data.error) {
                alert(data.error);
            } else {
                setRedirect(true);
            }
        });
    }

    const performRedirect = (redirect) => {
        return redirect && (<Redirect to='/' />)
    }
    // console.log(isAuthenticated());
    return (
        <div className='navbar-container'>
          <MenuRoundedIcon className='toggle-btn' id='toggle-btn'/>
            <div className='navbar'>
                <div className='left-content'>
                <Link to='/' className='nav-logo'>Wokiee</Link>
                    <ul className='nav-container'>
                        <li><Link to='/collections/men' className='nav-links'>MEN</Link></li>
                        <li><Link to='/collections/women' className='nav-links'>WOMEN</Link></li>
                    </ul>
                </div>
                <div className='right-content'>
                    <div className='logo-info search'>
                        <input type='search' className='form-control' id="input-search" value={searchQuery} placeholder='Search' onChange={handleChange} />
                        <Link to={`/products?q=${searchQuery}`} id='link' style={{ color: "black", textDecoration: 'none' }} >
                            <button onClick={onSubmit} className='search-btn'><SearchIcon className="icon" onMouseOver={() => handleMouseOver('search')} onMouseOut={() => handleMouseOut('search')}/>
                            </button>
                        </Link>
                    </div>
                    <div className='logo-info'>
                        <Link to='/cart' style={{ color: "black", textDecoration: 'none' }} > <ShoppingCartIcon className="icon" onMouseOver={() => handleMouseOver('cart')} onMouseOut={() => handleMouseOut('cart')} /></Link>
                        <span style={{ display: !cart ? "none" : "" }}>Cart</span>
                    </div>
                    {!isAuthenticated() && <div className='logo-info user-info'>
                        <PermIdentityIcon className="icon" onClick={handleClick} onMouseOver={() => handleMouseOver('account')} onMouseOut={() => handleMouseOut('account')} />
                        {account && <span>My Account</span>}
                    </div>}
                    {isAuthenticated() && <div className='logo-info user-info'>
                        <Link to={isAuthenticated().user.role === 1 ? '/admin/dashboard' : '/user/dashboard'} style={{ textDecoration: 'none' }}><h6 style={{ textTransform: 'capitalize' }}>Welcome {isAuthenticated().user.name}</h6></Link>
                    </div>}
                    {isAuthenticated() && <div className='logo-info user-info'>
                        <ExitToAppIcon className="icon" onClick={doLogout} onMouseOver={() => handleMouseOver('logout')} onMouseOut={() => handleMouseOut('logout')} />
                        {logout && <span>logout</span>}
                    </div>}
                    {accountBlock && <div className='info-popup'>
                        <span><PermIdentityIcon style={{ marginRight: "2px" }} /><Link to='/signin'>Sign In</Link></span>
                        <span><PersonAddIcon style={{ marginRight: "2px" }} /><Link to='/signup'>Register</Link></span>
                    </div>}
                </div>
                {performRedirect(redirect)}
                {/* {doRedirectAfterEnter(isEnter)} */}
            </div>
            <div className='sidebar' id='sidebar'>
                <div className='close-btn'>X Close</div>
                <ul className='sidebar-list'>
                    <li><Link to='/collections/men' className='sidebar-item'>MEN</Link></li>
                    <li><Link className='sidebar-item' to='/collections/women' >WOMEN</Link></li>
                    {!isAuthenticated() && <li><PermIdentityIcon style={{ marginRight: "2px" }} /><Link to='/signin' className='sidebar-item'>Sign In</Link></li>}
                    {!isAuthenticated() && <li><PersonAddIcon style={{ marginRight: "2px" }} /><Link className='sidebar-item' to='/signup'>Register</Link></li>}
                    {isAuthenticated() && <li><ShoppingCartIcon style={{ marginRight: "2px" }} /><Link className='sidebar-item' to='/cart'>Shopping Cart</Link></li>}
                    {isAuthenticated() && <li><ExitToAppIcon className="icon" onClick={doLogout} onMouseOver={() => handleMouseOver('logout')} onMouseOut={() => handleMouseOut('logout')} />Logout</li>}
                </ul>
            </div>
        </div>
    )
}
