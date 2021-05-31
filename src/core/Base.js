
import React,{useEffect} from 'react'
import Navbar from './Navbar';
import './Base.css';
export default function Base({children,title='This is the title' , reload , setReload = f => f}) {
 
    

    return (
        <div className='text-center'>
        <Navbar reload={reload} setReload={setReload}/>
            <div>
            <h1 className="text-black">{title}</h1>
            </div>
            <div>{children}</div>
            <footer>
               <div className='footer'>
                   <h5>Contact us at: wookiestores@yahoo.in</h5>
                   <h5>Telephone no: +125332253</h5>
               </div>
            </footer>
        </div>
    )
}
