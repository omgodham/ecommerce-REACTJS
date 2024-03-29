import React, { useEffect, useState } from 'react';
import Base from '../core/Base';
import {Link} from 'react-router-dom';
import './ManageProducts.css';
import { getAllProducts, getProductPhoto,deleteProduct } from './helper';
import { isAuthenticated } from '../auth/helper';
export default function ManageProducts() {
    const [products,setProducts] = useState([]);
    const {user,token} = isAuthenticated();
    useEffect(()=>{
        getProducts();
    },[]);
    

    const getProducts = () =>{
        getAllProducts().then(data => {
            if(data.error) console.log(data.error);
            else setProducts(data);
        });
    }
const handleDelete = (id) =>{
    console.log(products);
    deleteProduct(user._id,token,id).then(data=>{
        if(data.error) console.log(data.error)
        else {    
            getProducts();
            alert('product deleted successfully');
        }
    });
}

const card = (index,name,photo,price,id) =>{
    return <div className="indi-card" key={index}>
    <div className='indi-card-container'>
    <img src={photo} className="card-image" alt="" />
    </div>
    <div className="indi-card-body">
      <h5 className="card-title">{name}</h5>
      <p className="card-text">${price}</p>
      <Link to={`/admin/update/product/${id}`} className="btn btn-success m-2">Update</Link>
      <button className="btn btn-danger m-2" onClick={() => handleDelete(id)}>Delete</button>
    </div>
  </div>
}

    return (
        <Base title='Manage Products'>
           <div className='manage-products' style={{width:'95%',margin:'20px auto'}}>
                {products.map((product,index)=>{
                    return card(index,product.name,getProductPhoto(product._id),product.price,product._id);
                })}
           </div>
        </Base>
    )
}
