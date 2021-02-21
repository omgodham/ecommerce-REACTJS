import React,{useEffect} from 'react'
import Navbar from './Navbar';
export default function Base({children,title='This is the title'}) {

    return (
        <div className='text-center'>
        <Navbar />
            <div>
            <h1 className="text-black">{title}</h1>
            </div>
            <div>{children}</div>
            <footer>
                <h1 className="text-black">This is footer</h1>
            </footer>
        </div>
    )
}
