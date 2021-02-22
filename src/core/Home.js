import React,{useState} from 'react';
import Base from './Base';
import '../styles.css';
import Card from './Card';
export default function Home() {
const arr = [1,2,33];
    return (
        <Base title='Home'>
          <div className='container' style={{backgroundColor:"white"}}>
          <div className='row'>
        {
            arr.map((item,index) => {
                return <Card key={index} name={`Adidas Shoes${item}`} className='col-md-3' price={item}/>
            })
        }
          
            {/* <Card key={2} name='Nike Shoes' className='col-md-3' price='$233.00'/> */}
          </div>   
        </div>
        </Base>
    )
}
