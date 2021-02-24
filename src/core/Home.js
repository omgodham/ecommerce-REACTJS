import React,{useState} from 'react';
import Base from './Base';
import '../styles.css';
import "./Home.css";
import Card from './Card';
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../home/img1.jpg';
import img2 from '../home/img2.jpg';
import video from "../home/video.mp4";
export default function Home() {
const arr = [1,2,33];

const ShowCarousel = () =>{
    return <Carousel className='carousel'>
    <Carousel.Item className='carousel-item'>
      <img
        src={img1} 
        alt="First slide"
      />
      <Carousel.Caption>
        <button className='btn btn-primary'>SHOP NOW</button>
        <p style={{color:'black',fontWeight:'900'}}>BRAND NEW STYLISH PRODUCTS ON SALE</p>
      </Carousel.Caption>
    </Carousel.Item>
    
    <Carousel.Item>
      <img
        src={img2}
        alt="Second slide"
      />  
      <Carousel.Caption>
      <button className='btn btn-light'>SHOP NOW</button>
      <p style={{color:'white',fontWeight:'900'}}>GO AHEAD AND BUY SOMETHING FOR LOVED ONES</p>
      </Carousel.Caption>
    </Carousel.Item>

    <Carousel.Item>
      <div>
      <video autoPlay muted controls loop>
  <source src={video} type="video/mp4" />
  Your browser does not support the video tag.
</video>
  </div>
  <Carousel.Caption>
      <button className='btn btn-warning'>SHOP NOW</button>
      <p style={{color:'white',fontWeight:'900'}}>EXPLORE OUR SHOP IN THIS CITIES</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
} 


    return (
        <Base title=''>
        {ShowCarousel()}
          <div className='container' style={{backgroundColor:"white"}}>
          <div className='row'>
        {
            arr.map((item,index) => {
                return <Card key={index} name={`Adidas Shoes${item}`} className='col-md-3' price={item}/>
            })
        }
          </div>   
        </div>
        </Base>
    )
}
