import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Base from './Base';
import '../styles.css';
import "./Home.css";
import Card from './Card';
import Carousel from 'react-bootstrap/Carousel';
import {getAllProducts} from "../admin/helper/index";
import {deleteAllProductsFormCart} from "../user/helper";
import {isAuthenticated} from "../auth/helper/index";
import {createOrder} from "./helper";
import { Redirect } from 'react-router';

export default function Home() {
const [products,setProducts] = useState([]);
const {user,token} = isAuthenticated();
const [isLoading, setIsLoading] = useState(true);
const [redirect,setRedirect] = useState(false);
const [error,setError] = useState(false);

useEffect(() => {
getProducts();
},[]);

useEffect(()=>{
  const query = new URLSearchParams(window.location.search);

  if (query.get("success")) {
    const orderData = JSON.parse(localStorage.getItem('order'));
    // console.log(orderData);
    createOrder(user._id,orderData,token).then(data => {
      if(data.error) console.log(data.error);
    }).catch(err => console.log(err));
    localStorage.removeItem('order');
    alert('Order Successfully created');
    setRedirect(true);
    removeAllProductsFromCart();

  }

  if (query.get("canceled")) {
    alert('Order Canceled');
    setRedirect(true);
  }
},[]);

const doRedirect = (redirect) => {
  return redirect && <Redirect to = '/' />
}

const removeAllProductsFromCart = () => {
  deleteAllProductsFormCart(user._id,token).then(data => {
    if(data.error) console.log(data.error);
    else {
     console.log('cart empty');
    }
  });
}


const getProducts = () => {
getAllProducts().then(data =>{
  if(data.error)
  setError(data.error);
  else
  setProducts(data);
}).catch(err => console.log(err))
setIsLoading(false);
}

const ShowCarousel = () =>{
    return <Carousel className='carousel'>
    <Carousel.Item>
      <img
        src='\images\img1.jpg' 
        alt="First slide"
      />
      <Carousel.Caption className='captions'>
        <button className='btn btn-primary'>SHOP NOW</button>
        <p style={{color:'black',fontWeight:'900'}}>BRAND NEW STYLISH PRODUCTS ON SALE</p>
      </Carousel.Caption>
    </Carousel.Item>
    
    <Carousel.Item>
      <img
        src='\images\img2.jpg' 
        alt="Second slide"
      />  
      <Carousel.Caption>
      <button className='btn btn-light'>SHOP NOW</button>
      <p style={{color:'white',fontWeight:'900'}}>GO AHEAD AND BUY SOMETHING FOR LOVED ONES</p>
      </Carousel.Caption>
    </Carousel.Item>

    <Carousel.Item className='video-item'>
      <div>
      <video autoPlay muted controls loop>
  <source src='\images\video.mp4'  type="video/mp4" />
</video>
  </div>
  <Carousel.Caption  className='video-item'>
      <button className='btn btn-warning'>SHOP NOW</button>
      <p style={{color:'white',fontWeight:'500'}}>EXPLORE OUR SHOP IN THIS CITIES</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
} 


    return (
        <Base title=''>
        {ShowCarousel()}

        <div className='categories mt-4'>
          <div className='left-one'>
              <div className='sale'>
                <img src='https://cdn.shopify.com/s/files/1/0130/5041/3114/files/demo01_03_650x.jpg?v=1542298540' alt=""/>
                 <Link to='/collections/sale' className='btn btn-info'>SALE</Link>
              </div>
              <div className='new'>
              <img src='https://cdn.shopify.com/s/files/1/0130/5041/3114/files/demo01_04_325x.jpg?v=1542298540' />
              <Link to='/collections/new' className='btn btn-info'>NEW</Link>
              </div>
          </div>
          <div className='center-one women'>
          <img src='https://cdn.shopify.com/s/files/1/0130/5041/3114/files/demo01_06_325x.jpg?v=1542298540' />
          <Link to='/collections/women' className='btn btn-info'>WOMEN</Link>
          </div>
          <div className='right-one'>
          <div className='right-top'>
            <div className='men'>
            <img src='https://cdn.shopify.com/s/files/1/0130/5041/3114/files/demo01_05_325x.jpg?v=1542298540' />
            <Link to='/collections/men' className='btn btn-info'>MEN</Link>
            </div>
            <div className='accessories'>
            <img src='https://cdn.shopify.com/s/files/1/0130/5041/3114/files/demo01_07_325x.jpg?v=1542298540' />
            <Link to='/collections/accessories' className='btn btn-info'>ACCESSORIES</Link>
            </div>
          </div>
          <div className='right-bottom'>
          <img src='https://cdn.shopify.com/s/files/1/0130/5041/3114/files/demo01_08_669x.jpg?v=1542298540' />
          <Link to='/collections/shoe' className='btn btn-info'>SHOES</Link>
          </div>
          </div>
        </div>

          <div className='products-area text-center'>
          <h4>BEST SELLER</h4>
          <h6>TOP PRODUCTS OF THIS WEEK</h6>
          {!isLoading ? (<div className='products-container'>
          {
            products.map((item, index) => {
              return <Card key={index} id={item._id} name={item.name} className='col-md-4' price={item.price} />
            })
          }
        </div>) : (<div className="spinner-border text-primary" role="status">
          <span className="visually-hidden"></span>
        </div>)
        }
          </div>   
  
        {doRedirect(redirect)}
        </Base>
    )
}
