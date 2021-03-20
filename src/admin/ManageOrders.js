import React, { useEffect, useState } from "react";
import Base from "../core/Base";

import { getAllOrders } from "./helper/index";
import { isAuthenticated } from "../auth/helper";
import IndividualOrder from "./IndividualOrder";

export default function ManageOrders() {
  const { user, token } = isAuthenticated();


  const [orders, setOrders] = useState([]);
  const [reload, setReload] = useState(false);


  useEffect(() => {
    getOrders();
  }, [reload]);

const getOrders = async () => {
   const data = await getAllOrders(user._id, token);
      setOrders(data);
}


  return (
    <Base title="Manage Orders">
      <div className="row container m-auto border">
        <div className="col-md-4 ">
          <h3>Order By</h3>
        </div>
        <div className="col-md-4">products</div>
        <div className="col-md-4">
          <h3>Update Order Status</h3>
        </div>
      </div>
      { orders.length && (<div className='container'>
      <div>
      <h3 className='text-primary'>Received</h3>
        {orders.map((order, index) => { 
         if(order.status == 'Received')
          return <IndividualOrder key={index} order={order} products={order.products} reload={reload} setReload={setReload} />
        })}
      </div>
      <div>
      <h3 className='text-primary'>Shipped</h3>
        {orders.map((order, index) => {
          if(order.status == 'Shipped') 
          return <IndividualOrder key={index} order={order} products={order.products} reload={reload} setReload={setReload} />
        })}
      </div>
      <div>
      <h3 className='text-success'>Deliverd</h3>
        {orders.map((order, index) => {
          if(order.status == 'Deliverd') 
          return <IndividualOrder key={index} order={order} products={order.products} reload={reload} setReload={setReload} />
        })}
      </div>
      <div>
      <h3 className='text-warning'>Cancelled</h3>
        {orders.map((order, index) => {
          if(order.status == 'Cancelled') 
          return <IndividualOrder key={index} order={order} products={order.products} reload={reload} setReload={setReload} />
        })}
      </div>
      </div>
      )}
    </Base>
  );
}
