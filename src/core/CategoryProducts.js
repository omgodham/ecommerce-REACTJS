import React,{useState,useEffect} from 'react';
import Base from './Base';
import {getAllCategories,getAllProducts,getProductsByCategory,getProductsBySubCategory} from '../admin/helper';
import Card from './Card';
export default function CategoryProducts({match}) {

const [products,setProducts] = useState([]);

useEffect(()=>{
    if(match.params.category === 'sale' || match.params.category === 'new'){
      getAllProducts().then(data => {
        setProducts(data);
      });
    }
   else {
       getAllCategories().then(data => {
            data.map((category,index) => {
                    if((category.name).toLowerCase() === match.params.category)
                        getProducts(category._id);
            });    
        }); 
    } 
    },[products]);
    
const getProducts = (id) =>{
    if(match.params.category !=='shoe')
      getProductsByCategory(id).then(data=>{
        setProducts(data);
    });
    else
    {
   getProductsBySubCategory(id).then(data => {
       setProducts(data);
   });
    }
}
    return (
        <Base title="">
            <div className='container-fluid pb-5 text-center' style={{backgroundColor:"white",width:'95%',margin:"20px auto"}}>
          <h4>BEST FROM <span style={{textTransform:'uppercase'}}>{match.params.category}</span></h4>
          <h6>TOP PRODUCTS OF THIS WEEK</h6>
          <h3 className='text-left border-bottom' style={{textTransform:'uppercase'}}>{match.params.category+"("+products.length+")" }</h3>
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
