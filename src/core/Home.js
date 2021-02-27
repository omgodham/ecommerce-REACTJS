import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
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
        {/* {ShowCarousel()} */}
        <div className='categories mt-4'>
          <div className='left-one'>
              <div className='sale'>
                <img src='https://cdn.shopify.com/s/files/1/0130/5041/3114/files/demo01_03_650x.jpg?v=1542298540' alt=""/>
                 <Link to='/collections/sale' className='btn btn-info btn-lg'>SALE</Link>
              </div>
              <div className='new'>
              <img src='https://cdn.shopify.com/s/files/1/0130/5041/3114/files/demo01_04_325x.jpg?v=1542298540' />
              <Link to='/collections/new' className='btn btn-info btn-lg'>NEW</Link>
              </div>
          </div>
          <div className='center-one women'>
          <img src='https://cdn.shopify.com/s/files/1/0130/5041/3114/files/demo01_06_325x.jpg?v=1542298540' />
          <Link to='/collections/women' className='btn btn-info btn-lg'>WOMEN</Link>
          </div>
          <div className='right-one'>
          <div className='right-top'>
            <div className='men'>
            <img src='https://cdn.shopify.com/s/files/1/0130/5041/3114/files/demo01_05_325x.jpg?v=1542298540' />
            <Link to='/collections/men' className='btn btn-info btn-lg'>MEN</Link>
            </div>
            <div className='accessories'>
            <img src='https://cdn.shopify.com/s/files/1/0130/5041/3114/files/demo01_07_325x.jpg?v=1542298540' />
            <Link to='/collections/accessories' className='btn btn-info btn-lg'>ACCESSORIES</Link>
            </div>
          </div>
          <div className='right-bottom'>
          <img src='https://cdn.shopify.com/s/files/1/0130/5041/3114/files/demo01_08_669x.jpg?v=1542298540' />
          <Link to='/collections/shoe' className='btn btn-info btn-lg'>SHOES</Link>
          </div>
          </div>
        </div>
          <div className='container-fluid pb-5 text-center' style={{backgroundColor:"white",width:'95%',margin:"20px auto"}}>
          <h4>BEST SELLER</h4>
          <h6>TOP PRODUCTS OF THIS WEEK</h6>
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
