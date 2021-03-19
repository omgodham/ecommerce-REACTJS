import React, { useEffect, useState } from "react";
import Base from "../core/Base";

import { getAllOrders } from "./helper/index";
import { isAuthenticated } from "../auth/helper";
import IndividualOrder from "./IndividualOrder";

export default function ManageOrders() {
  const { user, token } = isAuthenticated();


  const [orders, setOrders] = useState([]);


  useEffect(() => {
    getOrders();
  }, []);

const getOrders = async () => {
   const data = await getAllOrders(user._id, token);
      setOrders(data);
}


  return (
    <Base title="Manage Orders">
      <div className="row container-fluid border">
        <div className="col-md-4">
          <h3>Order By</h3>
        </div>
        <div className="col-md-4">products</div>
        <div className="col-md-4">
          <h3>Update Order Status</h3>
        </div>
      </div>
      { orders.length &&
        orders.map((order, index) => {
          return <IndividualOrder key={index} order={order} products={order.products}/>
        })}
    </Base>
  );
}
