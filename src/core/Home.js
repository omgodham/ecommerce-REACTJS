import React,{useState} from 'react';
import Base from './Base';
import '../styles.css';
import Card from './Card';
import Carousel from 'react-bootstrap/Carousel';
export default function Home() {
const arr = [1,2,33];

const ShowCarousel = () =>{
    return<Carousel style={{height:'400px'}}>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://cdn.pixabay.com/photo/2019/07/12/18/22/lamp-4333322__340.jpg" style={{height:'300px'}}
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://cdn.pixabay.com/photo/2020/04/04/16/07/stadttheater-5002861__340.jpg"
        alt="Second slide"
      />
  
      <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://cdn.pixabay.com/photo/2021/02/08/16/03/dinosaur-5995333__340.png"
        alt="Third slide"
      />
  
      <Carousel.Caption>
        <h3>Third slide label</h3>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
} 


    return (
        <Base title='Home'>
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
