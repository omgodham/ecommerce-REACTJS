import React,{useState,useEffect} from 'react';
import Base from './Base';
import '../styles.css';
import "./Home.css";
import Card from './Card';
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../home/img1.jpg';
import img2 from '../home/img2.jpg';
import video from "../home/video.mp4";
import {getAllProducts} from "../admin/helper/index";
import {isAuhtenticated} from "../auth/helper/index";
export default function Home() {
const [products,setProducts] = useState([]);
//const {user,token} = isAuthenticated();
const [error,setError] = useState(false);
useEffect(() => {
getProducts();
},[]);


const getProducts = () => {
getAllProducts().then(data =>{
  if(data.error)
  setError(data.error);
  else
  setProducts(data);
}).catch(err => console.log(err))
}

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
          <div className='container-fluid pb-5' style={{backgroundColor:"white",width:'95%',margin:"20px auto"}}>
          <div className='row'>
        {
            products.map((item,index) => {
                return <Card key={index} id={item._id} name={item.name} className='col-md-4' price={item.price}/>
            })
        }
          </div>   
        </div>
        </Base>
    )
}
