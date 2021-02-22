import React,{useState} from 'react';
import Base from './Base';
import '../styles.css';
import Card from './Card';
export default function Home() {

    return (
        <Base title='Home'>
          <div className='container' style={{backgroundColor:"white"}}>
          <div className='row'>
          <Card name='Adidas Shoes' className='col-md-3' price='$433.20'/>
            <Card name='Nike Shoes' className='col-md-3' price='$233.00'/>
          </div>   
        </div>
        </Base>
    )
}
