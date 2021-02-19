import React,{useState} from 'react';
import "./Navbar.css";
export default function Navbar() {
const [boolean,setBoolean] = useState(false);



const executeInfo = () => {
    const logo = document.getElementsByTagName('i');
    //    const info = document.getElementsByTagName('span');
        logo.addEventListener('mouseover',() => {
            setBoolean(true);
        });
        logo.addEventListener('mouseout',() => {
            setBoolean(false);
        });
}
  

    return (
        <div className='navbar'>
            <div className='left-content'>
                <ul className='nav-container'>
                    <li className='nav-links nav-logo'>wookie</li>
                    <li className='nav-links'>HOME</li>
                    <li className='nav-links'>SHOP</li>
                    <li className='nav-links'>MEN</li>
                    <li className='nav-links'>WOMEN</li>
                </ul>
            </div>
            <div className='right-content'>
            <i class="fi-xtluxl-magnifying-glass-thin"></i>
            {boolean && <span>Search</span>}
            <i class="fi-xtluxl-handbag-thin"></i>
            {boolean && <span>Cart</span>}
            <i class="fi-xtluxl-user-plus-thin"></i>
            {boolean && <span>My Account</span>}   
        </div>
        {executeInfo}
        </div>
    )
}
