import React, { useEffect, useState } from "react";


import { getProduct, getUser ,updateOrderStatus } from "./helper/index";
import { isAuthenticated } from "../auth/helper";
export default function IndividualOrder({order,products , reload , setReload }) {
  const { user, token } = isAuthenticated();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [productNames, setProductNames] = useState([]);

  const getUserById = (userId) => {
    getUser(userId).then((data) => {
      if (data.error) console.log('error in getting username',data.error);
      else setName(data.name);
    });
  };

  useEffect(() => {
    products.map((product) => {
      getName(product.product);
    });
  }, []);

  const getName = async (productId) => {
    const data = await getProduct(productId);
        setProductNames(productNames => [...productNames,data.name]);
      }

      const handleChange = event => {
        updateOrderStatus(order._id,user._id,{
          status:event.target.value
        },token).then(data => {
          if(data.error) console.log(data.error)
        else {
          setReload(!reload);
        }
      })
      }

    return <div className="row container-fluid border">
                { getUserById(order.user) }
                  <div className="col-md-4">
                    <h4>{name}</h4>
                  </div>
                  <div className="col-md-4">
                    <ul className="list-group">
                      {productNames.map((thisProduct, index) => {           
                           return <li className="list-group-item" key={index}> {thisProduct} </li>
                        })
                        }
                      <li className="list-group-item"> Amount : {order.amount} </li>
                    </ul>
                  </div>
                  <div className="col-md-4">
                    <select onChange={handleChange} value={order.status}>
                      <option value='Received'>Received</option>
                      <option value='Deliverd'>Deliverd</option>
                      <option value='Shipped'>Shipped</option>
                      <option value='Cancelled'>Cancelled</option>
                    </select>
                  </div>
                </div>
}
