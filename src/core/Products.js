import React, { useState, useEffect } from "react";
import Card from "./Card";
import { isAuthenticated } from "../auth/helper/index";
import { Link ,useLocation} from "react-router-dom";
import Base from "./Base";
import "../styles.css";
import "./Home.css";
import { getAllProducts } from "../admin/helper";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const { user, token } = isAuthenticated();
  const search = new URLSearchParams(useLocation().search).get('q');

  useEffect(() => {
    
     getAllProducts().then(data => {
        setProducts([]);
         if(data.error) console.log(data.error) 
         else
         data.map((product, index) => {
             console.log(product);
            if (product.name.toLowerCase() == search.toLowerCase()) {
              setProducts(products => [...products, product]);
            }
          });
     });
  }, [reload]);

const fun = () => {
    return <div className="row container">
    {products.length ? (
      products.map((item, index) => {
        return (
          <Card
            key={index}
            id={item._id}
            name={item.name}
            className="col-md-4"
            price={item.price}
            isHome={true}
          />
        );
      })
    ) : (
      <h1>No Such Products</h1>
    )}
  </div>
}
  return (
    <Base children={fun()} title="" reload={reload} setReload={setReload}>
      
    </Base>
  );
}
