import React, { useState, useEffect } from 'react';
import Base from './Base';
import './CategoryProducts.css';
import './Home.css';
import { getAllCategories, getAllProducts, getProductsByCategory, getProductsBySubCategory } from '../admin/helper';
import Card from './Card';
export default function CategoryProducts({ match }) {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (match.params.category === 'sale' || match.params.category === 'new') {
      getAllProducts().then(data => {
        setProducts(data);
      });
    }
    else {
      getAllCategories().then(data => {
        data.map((category, index) => {
          const param = match.params.category === 'accessories' ? 'watch' : match.params.category;
          if ((category.name).toLowerCase() === param)
            getProducts(category._id);
        });
      });
    }
    setIsLoading(false);
  }, [products]);
  useEffect(() => {
    setIsLoading(true);
  }, []);

  const getProducts = (id) => {
    if (match.params.category !== 'shoe' && match.params.category !== 'accessories')
      getProductsByCategory(id).then(data => {
        setProducts(data);
      });
    else {
      getProductsBySubCategory(id).then(data => {
        setProducts(data);
      });
    }
  }
  return (
    <Base title="">
      <div className='products-area'>
        <h4>BEST FOR <span style={{ textTransform: 'uppercase' }}>{match.params.category} CATEGORIES</span></h4>
        <h6>TOP PRODUCTS OF THIS WEEK</h6>
        <h3 className='border-bottom'>{match.params.category + "(" + products.length + ")"}</h3>
        {!isLoading ? (<div className='products-container'>
          {
            products.map((item, index) => {
              return <Card key={index} id={item._id} name={item.name} className='col-md-4' price={item.price} />
            })
          }
        </div>) : (<div className="spinner-border text-primary" role="status">
          <span className="visually-hidden"></span>
        </div>)}
      </div>
    </Base>
  )
}
